import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { CommonService } from 'src/common/common.service';
import { AuctionEntity } from './entities/auction.entity';
import { AuctionState, AuctionStatus, PrismaClient } from '@prisma/client';
import { CronJob } from 'cron';
import { NotificationsService } from 'src/notifications/notifications.service';
import { AuctionGateway } from './auction.gateway';

@Injectable()
export class AuctionCronService
  extends CommonService<AuctionEntity>
  implements OnModuleInit
{
  constructor(
    protected readonly prisma: PrismaClient,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly notificationService: NotificationsService,
    private readonly auctionGateway: AuctionGateway,
  ) {
    super(prisma);
  }

  logger: Logger = new Logger(AuctionCronService.name);

  async onModuleInit() {
    const auctionJob = new CronJob(CronExpression.EVERY_SECOND, async () => {
      await this.checkUpcomingAuctions();
      await this.checkStartingAuctions();
      await this.checkExpiredAuctions();
    });

    this.schedulerRegistry.addCronJob('auction-check', auctionJob);
    auctionJob.start();
  }

  async checkUpcomingAuctions() {
    for (const auction of await this.getUpcomingAuctions()) {
      for (const participant of auction.auction_participants) {
        await this.notificationService.create(
          {
            type: 'AUCTION_REMINDER',
            message: `There are 30 minutes left until the auction: ${auction.title} starts`,
          },
          participant.user_id,
        );
      }
    }
  }

  async checkStartingAuctions() {
    for (const auction of await this.getStartingAuctions()) {
      this.logger.debug(`Start auction ${auction.auction_id}`);

      await this.prisma.auction.update({
        where: { auction_id: auction.auction_id },
        data: { status: AuctionStatus.ACTIVE },
      });

      // Отправляем уведомление через WebSocket
      await this.auctionGateway.broadcastAuctionStatusChange(
        auction.auction_id,
        AuctionStatus.ACTIVE,
      );

      for (const participant of auction.auction_participants) {
        await this.notificationService.create(
          {
            type: 'AUCTION_STARTED',
            message: `Auction ${auction.title} starts`,
          },
          participant.user_id,
        );
      }
    }
  }

  async checkExpiredAuctions() {
    const now = new Date();

    for (const auction of await this.getActiveAuctions()) {
      const timeoutMs = (auction.rate_time || 60) * 1000;

      let timeSinceLastBid = 0;

      if (auction.auction_participants.length > 0) {
        timeSinceLastBid =
          now.getTime() - auction.auction_participants[0].updated_at.getTime();
      }

      if (
        timeSinceLastBid < timeoutMs &&
        (auction.end_time == null || now < auction.end_time)
      ) {
        continue;
      }

      if (auction.auction_participants.length > 0) {
        const winner = auction.auction_participants[0];
        this.logger.debug(`Finish auction ${auction.auction_id}. WinnerId: ${winner.user_id}`);

        await this.prisma.$transaction(async (tx) => {
          await tx.auction.update({
            where: { auction_id: auction.auction_id },
            data: {
              status: AuctionStatus.COMPLETED,
              winner_id: winner.user_id,
              state: AuctionState.DELIVERY,
              completed_at: new Date(),
            },
          });

          // Отправляем уведомление через WebSocket о завершении аукциона
          await this.auctionGateway.broadcastAuctionStatusChange(
            auction.auction_id,
            AuctionStatus.COMPLETED,
          );

          // Отправляем информацию о победителе
          await this.auctionGateway.broadcastAuctionUpdate(auction.auction_id, {
            winner: {
              userId: winner.user_id,
              rate: winner.rate,
            },
            status: AuctionStatus.COMPLETED,
            state: AuctionState.DELIVERY,
          });

          await this.notificationService.create(
            {
              type: 'AUCTION_WON',
              message: `You won auction "${auction.title}"`,
            },
            winner.user_id,
          );

          await this.notificationService.create(
            {
              type: 'AUCTION_STATUS_CHANGE',
              message: `Auction status changed to "${auction.state}"`,
            },
            winner.user_id,
          );
        });
      } else {
        this.logger.debug(`Finish auction ${auction.auction_id}. No winner found`);

        await this.prisma.auction.update({
          where: { auction_id: auction.auction_id },
          data: {
            status: AuctionStatus.COMPLETED,
            state: AuctionState.DELIVERY,
            completed_at: new Date(),
          },
        });
      }
    }
  }

  private async getUpcomingAuctions() {
    const now = new Date();
    const soonTime = new Date(now.getTime() + 30 * 60 * 1000); // 30 минут до старта

    return this.prisma.auction.findMany({
      where: {
        status: AuctionStatus.NOT_STARTED,
        start_time: { lte: soonTime, gt: now },
      },
      include: { auction_participants: true },
    });
  }

  private async getStartingAuctions() {
    const now = new Date();
    return this.prisma.auction.findMany({
      where: {
        status: AuctionStatus.NOT_STARTED,
        start_time: { lte: now },
      },
      include: { auction_participants: true },
    });
  }

  private async getActiveAuctions() {
    return this.prisma.auction.findMany({
      where: { status: AuctionStatus.ACTIVE },
      include: {
        auction_participants: {
          where: {
            expired_rate: {
              not: null,
            },
          },
          orderBy: { expired_rate: 'desc' },
          take: 1,
        },
      },
    });
  }
}
