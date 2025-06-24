import { Injectable, Logger } from '@nestjs/common';
import { AuctionStatus, PrismaClient } from '@prisma/client';
import { AuctionsService } from 'src/auctions/auctions.service';

@Injectable()
export class BotRunnerService {
  logger: Logger = new Logger(BotRunnerService.name);

  constructor(
    private readonly prisma: PrismaClient,
    private readonly auctionService: AuctionsService,
  ) {}

  async startBookRunner() {
    try {
      const auctions = await this.prisma.auction.findMany({
        where: {
          status: AuctionStatus.NOT_STARTED,
          is_draft: false,
        },
        include: { auction_participants: true },
      });

      for (const auction of auctions) {
        const bots = await this.prisma.bot.findMany({
          where: {
            auction_id: auction.auction_id,
            is_active: true,
          },
        });

        for (const bot of bots) {
          const isRegistered =
            auction.auction_participants.filter(
              (p) => p.user_id === bot.user_id,
            ).length > 0;

          if (!isRegistered) {
            try {
              this.logger.debug(
                `Register bot ${bot.bot_id} to auction ${auction.auction_id}`,
              );
              await this.auctionService.bookAuction(
                bot.user_id,
                auction.auction_id,
              );
            } catch (error) {}
          }
        }
      }
    } catch (error) {
      this.logger.error('Error in book runner', error);
    }
  }

  async startRateRunner() {
    try {
      const auctions = await this.prisma.auction.findMany({
        where: {
          status: AuctionStatus.ACTIVE,
          is_draft: false,
        },
        include: { auction_participants: true },
      });

      for (const auction of auctions) {
        this.logger.verbose(`Auction ${auction.auction_id}. Start handle`);

        const isEnoughBids =
          await this.auctionService.isEnoughRealBids(auction);

        if (isEnoughBids) {
          this.logger.verbose(
            `Auction ${auction.auction_id}. Enough bids reached. Exit`,
          );
          continue;
        }

        const bots = await this.prisma.bot.findMany({
          where: {
            auction_id: auction.auction_id,
          },
          include: {
            strategy: true,
          },
        });
        const botUserIds = bots.map((bot) => bot.user_id);

        const realParticipantsCount = auction.auction_participants.filter(
          (p) => !botUserIds.includes(p.user_id),
        ).length;

        let lastRatePlaceTime: Date = auction.start_time;
        let lastUserId: number | null = null;

        const rates = auction.auction_participants.filter(
          (p) => p.expired_rate != null,
        );

        if (rates.length > 0) {
          const lastRate = rates.reduce(function (prev, current) {
            return prev &&
              prev.expired_rate!.getTime() > current.expired_rate!.getTime()
              ? prev
              : current;
          })!;
          lastRatePlaceTime = lastRate.updated_at!;
          lastUserId = lastRate.user_id;
        }

        let timeFromStart = Date.now() - lastRatePlaceTime.getTime();
        let timeToEnd =
          lastRatePlaceTime.getTime() + auction.rate_time! * 1000 - Date.now();

        if (timeFromStart > auction.rate_time! * 1000) {
          timeFromStart = auction.rate_time! * 1000;
        }

        if (timeToEnd < 0) {
          timeToEnd = 0;
        }

        this.logger.verbose(`Auction ${auction.auction_id}. Params`, {
          botUserIds,
          realParticipantsCount,
          lastRatePlaceTime,
          lastUserId,
          timeFromStart,
          timeToEnd,
        });

        const activeBots = bots.filter((b) => b.is_active);
        for (const bot of this.shuffleArray(activeBots)) {
          this.logger.verbose(
            `Auction ${auction.auction_id}. Bot ${bot.bot_id}. Start handle`,
          );

          const participation = auction.auction_participants.filter(
            (p) => p.user_id === bot.user_id,
          )[0];

          if (!participation) {
            this.logger.verbose(
              `Auction ${auction.auction_id}. Bot ${bot.bot_id}. Not participant. Exit`,
            );
            continue;
          }

          const bidsCount =
            (participation.rate + participation.bonus_rate) /
            Number(auction.rate_step);
          let maxBidsCount: number | null = null;

          if (bot.strategy.max_bid_amount != null) {
            const minBidAmount =
              bot.strategy.min_bid_amount == null ||
              bot.strategy.min_bid_amount == 0
                ? 1
                : bot.strategy.min_bid_amount;
            maxBidsCount =
              ((bot.bot_id * auction.auction_id) %
                (bot.strategy.max_bid_amount - minBidAmount)) +
              minBidAmount;
          }

          const bidWindowTime =
            auction.rate_time! * 1000 -
            (bot.strategy.time_from_start || 0) * 1000 -
            (bot.strategy.time_to_end || 0) * 1000;

          const timesAmount = 10;
          const selectedTime =
            (auction.auction_id * bot.bot_id * (bidsCount + 1)) % timesAmount;

          const waitNeedTime = (bidWindowTime / timesAmount) * selectedTime;

          this.logger.verbose(
            `Auction ${auction.auction_id}. Bot ${bot.bot_id}. Params`,
            {
              bidsCount,
              maxBidsCount,
              waitNeedTime,
            },
          );

          const canPlaceBid =
            bot.user_id != lastUserId &&
            (bot.strategy.min_participants_on_activate == null ||
              realParticipantsCount >=
                bot.strategy.min_participants_on_activate) &&
            (bot.strategy.max_participants_on_activate == null ||
              realParticipantsCount <=
                bot.strategy.max_participants_on_activate) &&
            (maxBidsCount == null || bidsCount < maxBidsCount) &&
            (bot.strategy.time_from_start || 0) * 1000 + waitNeedTime <=
              timeFromStart &&
            (bot.strategy.time_to_end || 0) * 1000 <= timeToEnd;

          this.logger.verbose(
            `Auction ${auction.auction_id}. Bot ${bot.bot_id}. CanPlaceBid: ${canPlaceBid}`,
          );

          if (canPlaceBid) {
            try {
              this.logger.debug(
                `Place bid. Bot ${bot.bot_id}. Auction ${auction.auction_id}`,
              );
              await this.auctionService.makeRate(
                bot.user_id,
                auction.auction_id,
              );
              break;
            } catch (error) {}
          }
        }
      }
    } catch (error) {
      this.logger.error('Error in rate runner', error);
    }
  }

  shuffleArray<T>(array: T[]): T[] {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }
}
