import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CommonService } from 'src/common/common.service';
import {
  AuctionEntity,
  AuctionResponseEntity,
} from './entities/auction.entity';
import { UpdateAuctionDto } from './dto/update-auction.dto';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { StatusOKDto } from 'src/common/dto/status.dto';
import { AuctionParams } from './params/auction.params.dto';
import { generateAuctionNumber } from 'src/common/utils/generates.utils';
import { Auction, PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { StorageService } from 'src/config/s3/s3.service';
import { AuctionGateway } from './auction.gateway';
import { AuctionStatsDto } from './dto/auction-stats.dto';

@Injectable()
export class AuctionsService extends CommonService<AuctionEntity> {
  bucket = this.configService.get<string>('MINIO_BUCKET', 'my-bucket');
  endpoint = this.configService.get<string>(
    'MINIO_ENDPOINT',
    'http://localhost:9000',
  );
  logger: Logger = new Logger(AuctionsService.name);

  constructor(
    protected prisma: PrismaClient,
    private configService: ConfigService,
    private readonly s3Service: StorageService,
    private readonly auctionGateway: AuctionGateway,
  ) {
    super(prisma);
  }

  async findAll(
    params: AuctionParams,
    userId?: number,
    isAdmin?: boolean,
  ): Promise<AuctionResponseEntity> {
    const { skip, take, in_favorites, is_participant, ...filters } = params;

    const where: any = {
      ...filters,
      title: filters.title ? { contains: filters.title } : undefined,
    };

    if (params.brand_id) {
      where['brand_id'] = params.brand_id;
    }
    if (params.category_id) {
      where['category_id'] = params.category_id;
    }
    if (params.status && params.status.length > 0) {
      where['status'] = { in: params.status.split(',') };
    }

    if (!isAdmin) {
      where.is_draft = false;
    }

    if (userId && !isAdmin) {
      if (in_favorites === true) {
        where.favorites = { some: { user_id: userId } };
      }
      if (is_participant === true) {
        where.auction_participants = {
          some: {
            user_id: userId,
          },
        };
      }
    }

    const auctions = await this.prisma.auction.findMany({
      where,
      ...(skip !== undefined && take !== undefined ? { skip, take } : {}),
      include: {
        brand: true,
        favorites: userId
          ? {
              where: { user_id: userId },
            }
          : false,
        category: true,
        images: true,
        review: {
          include: {
            media: true,
          },
        },
        auction_participants: {
          where: {
            OR: [
              {
                expired_rate: {
                  not: null,
                },
              },
              {
                user_id: userId,
              },
            ],
          },
          orderBy: {
            expired_rate: 'desc',
          },
          take: 10,
          include: { user: { include: { address: true } } },
        },
        _count: { select: { auction_participants: true } },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
    const totalItems = await this.prisma.auction.count({ where });

    return {
      items: auctions.map((auction) => {
        const auctionData: any = {
          ...auction,
        };

        if (userId) {
          auctionData.in_favorites = auction.favorites.length > 0;
          auctionData.is_booked =
            auction.auction_participants.filter((p) => p.user_id == userId)
              .length > 0;
        }

        return auctionData;
      }),
      total_items: totalItems,
    };
  }

  async findOne(id: number, userId?: number): Promise<AuctionEntity | null> {
    const auction = await this.prisma.auction.findFirst({
      where: { auction_id: id },
      include: {
        brand: true,
        favorites: userId
          ? {
              where: { user_id: userId },
            }
          : false,
        category: true,
        images: true,
        review: {
          include: {
            media: true,
          },
        },
        auction_participants: {
          where: {
            expired_rate: {
              not: null,
            },
          },
          orderBy: {
            expired_rate: 'desc',
          },
          take: 10,
          include: { user: { include: { address: true } } },
        },
        _count: { select: { auction_participants: true } },
      },
    });

    const myParticipation = await this.prisma.auctionParticipant.findMany({
      where: {
        auction_id: id,
        user_id: userId,
      },
    });

    if (!auction) {
      throw new NotFoundException('Auction not found');
    }

    return {
      ...auction,
      in_favorites: auction.favorites && auction.favorites.length > 0,
      is_booked: myParticipation.length > 0,
    };
  }

  async deleteAuctionParticipant(participantId: number) {
    return this.prisma.auctionParticipant.delete({
      where: { auction_participant_id: participantId },
    });
  }

  async create(
    createAuctionDto: CreateAuctionDto,
    files: Express.Multer.File[] | undefined,
  ): Promise<AuctionEntity> {
    const images: string[] = [];
    if (files) {
      for (const file of files) {
        const img = await this.s3Service.uploadFile(file);
        images.push(img);
      }
    }

    this.logger.debug('Create Auction', JSON.stringify(createAuctionDto));

    return this.prisma.auction.create({
      data: {
        ...createAuctionDto,
        images: {
          create:
            images &&
            images.map((image) => ({
              url: image,
            })),
        },
        auction_number: generateAuctionNumber(),
      },
      include: {
        images: true,
        brand: true,
        category: true,
      },
    });
  }

  async update(
    id: number,
    updateAuctionDto: UpdateAuctionDto,
    files: Express.Multer.File[] | undefined,
  ): Promise<AuctionEntity> {
    return this.prisma.$transaction(async (tx) => {
      const images: string[] = [];
      if (files && files.length > 0) {
        for (const file of files) {
          const img = await this.s3Service.uploadFile(file);
          images.push(img);
        }

        const auctionImages = await tx.auctionImage.findMany({
          where: { auction_id: id },
        });
        for (const file of auctionImages) {
          this.s3Service.deleteFile(file.url).catch((e) => {
            this.logger.error('Failed to delete file', e);
          });
        }
        await tx.auctionImage.deleteMany({
          where: { auction_id: id },
        });
      }
      return this.prisma.auction.update({
        where: { auction_id: id },
        data: {
          ...updateAuctionDto,
          images: {
            create:
              images &&
              images.map((image) => ({
                url: image,
              })),
          },
        },
        include: {
          brand: true,
          category: true,
        },
      });
    });
  }

  async remove(id: number): Promise<StatusOKDto> {
    try {
      await this.prisma.auction.delete({ where: { auction_id: id } });
      return new StatusOKDto();
    } catch (error) {
      throw new NotFoundException(`Auction with ID ${id} not found`);
    }
  }

  async bookAuction(userId: number, auctionId: number) {
    this.logger.log(`bookAuction. UserId: ${userId}. AuctionId: ${auctionId}`);

    return this.prisma.$transaction(async (prisma) => {
      const auction = await prisma.auction.findUnique({
        where: { auction_id: auctionId },
        include: { auction_participants: { include: { user: true } } },
      });

      if (!auction) throw new NotFoundException('Auction not found');

      const isClosedAuction = auction.type === 'CLOSED';
      const alreadyBooked = auction.auction_participants.some(
        (p) => p.user_id === userId,
      );

      if (alreadyBooked)
        throw new BadRequestException(
          'You have already booked a place in this auction',
        );

      if (auction.max_participants) {
        if (auction.auction_participants.length >= auction.max_participants)
          throw new BadRequestException('Reached the limit of participants');
      }

      if (isClosedAuction) {
        if (!auction.reservation_price)
          throw new BadRequestException(
            'Reservation price is not set for closed auction',
          );

        const user = await prisma.user.findUnique({
          where: { user_id: userId },
        });
        if (!user) throw new NotFoundException('User not found');

        const isBot = user.is_bot;

        const totalBalance = user.rato_balance + user.bonus_balance;
        if (totalBalance < Number(auction.reservation_price) && !isBot)
          throw new BadRequestException('Insufficient funds');

        const bonusAmount = Math.min(
          user.bonus_balance,
          auction.reservation_price,
        );
        const realAmount = auction.reservation_price - bonusAmount;

        await prisma.user.update({
          where: { user_id: userId },
          data: {
            rato_balance: { decrement: realAmount },
            bonus_balance: { decrement: bonusAmount },
          },
        });
      }

      await prisma.auctionParticipant.create({
        data: {
          user_id: userId,
          auction_id: auctionId,
          rate: 0,
          expired_rate: null,
        },
      });

      await this.auctionGateway.broadcastAuctionUpdate(
        auctionId,
        await this.findOne(auctionId, userId),
      );

      return {
        success: true,
        message: 'Auction place successfully booked',
      };
    });
  }

  async calculateRealUsersBids(auctionId: number): Promise<number> {
    const participants = await this.prisma.auctionParticipant.findMany({
      where: {
        auction_id: auctionId,
      },
      select: {
        rate: true,
        user: true,
      },
    });

    return participants
      .filter((p) => !p.user.is_bot)
      .reduce((sum, p) => sum + Number(p.rate), 0);
  }

  async isEnoughRealBids(auction: Auction): Promise<boolean> {
    const realUsersBidsTotal = await this.calculateRealUsersBids(
      auction.auction_id,
    );
    const requiredBidsAmount = Number(auction.end_price) * 1.5;
    return realUsersBidsTotal >= requiredBidsAmount;
  }

  async makeRate(userId: number, auctionId: number) {
    this.logger.log(`makeRate. UserId: ${userId}. AuctionId: ${auctionId}`);

    return this.prisma.$transaction(async (prisma) => {
      const auction = await prisma.auction.findUnique({
        where: { auction_id: auctionId },
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

      if (!auction) throw new NotFoundException('Auction not found');

      const isBot = !!(await prisma.bot.findUnique({
        where: { user_id: userId },
      }));
      if (isBot) {
        const enoughRealBids = await this.isEnoughRealBids(auction);
        if (enoughRealBids) {
          throw new ForbiddenException('Reached the limit of real users bids');
        }
      }

      if (new Date() < auction.start_time || auction.status == 'NOT_STARTED')
        throw new BadRequestException('Auction is not active');

      if (
        auction.auction_participants.length > 0 &&
        auction.auction_participants[0].user_id === userId
      ) {
        throw new BadRequestException(
          'You cannot outbid your last bid. Wait for another participant to bid',
        );
      }

      const participant = await prisma.auctionParticipant.findFirst({
        where: {
          auction_id: auctionId,
          user_id: userId,
        },
      });

      const isClosedAuction = auction.type === 'CLOSED';
      if (isClosedAuction && !participant) {
        throw new ForbiddenException('You are not registered for this auction');
      }

      const user = await prisma.user.findUnique({
        where: { user_id: userId },
      });

      if (!user) throw new NotFoundException('User not found');

      const rateStep = Number(auction.rate_step);
      const totalBalance = user.rato_balance + user.bonus_balance;

      if (totalBalance < rateStep && !isBot)
        throw new BadRequestException('Insufficient funds to place a bid');

      const expireDate = new Date();
      expireDate.setSeconds(new Date().getSeconds() + auction.rate_time!);

      const bonusAmount = Math.min(user.bonus_balance, rateStep);
      const mainAmount = rateStep - bonusAmount;

      if (participant) {
        await prisma.auctionParticipant.update({
          where: {
            auction_participant_id: participant.auction_participant_id,
          },
          data: {
            rate: {
              increment: mainAmount,
            },
            bonus_rate: {
              increment: bonusAmount,
            },
            expired_rate: expireDate,
          },
        });
      } else {
        await prisma.auctionParticipant.create({
          data: {
            user_id: userId,
            auction_id: auctionId,
            rate: mainAmount,
            bonus_rate: bonusAmount,
            expired_rate: expireDate,
          },
        });
      }

      if (bonusAmount > 0) {
        await prisma.user.update({
          where: { user_id: userId },
          data: { bonus_balance: { decrement: bonusAmount } },
        });
      }

      if (mainAmount > 0) {
        await prisma.user.update({
          where: { user_id: userId },
          data: { rato_balance: { decrement: mainAmount } },
        });
      }

      await this.auctionGateway.broadcastNewBid(auctionId, {
        userId,
        rate: rateStep,
        timestamp: new Date(),
      });

      const currentParticipants = await prisma.auctionParticipant.findMany({
        where: {
          auction_id: auctionId,
          expired_rate: {
            not: null,
          },
        },
        orderBy: { expired_rate: 'desc' },
        take: 10,
        include: {
          user: true,
        },
      });

      await this.auctionGateway.broadcastAuctionUpdate(auctionId, {
        participants: currentParticipants,
      });

      return { success: true, message: 'Bid successfully placed' };
    });
  }

  async addToFavorites(userId: number, auctionId: number) {
    const favorite = await this.prisma.favorite.findUnique({
      where: { user_id_auction_id: { user_id: userId, auction_id: auctionId } },
    });

    if (favorite) {
      throw new BadRequestException('Auction already in favorites');
    }

    return this.prisma.favorite.create({
      data: { user_id: userId, auction_id: auctionId },
    });
  }

  async removeFromFavorites(userId: number, auctionId: number) {
    const favorite = await this.prisma.favorite.findUnique({
      where: { user_id_auction_id: { user_id: userId, auction_id: auctionId } },
    });

    if (!favorite) {
      throw new BadRequestException('Auction not in favorites');
    }

    return this.prisma.favorite.delete({
      where: { user_id_auction_id: { user_id: userId, auction_id: auctionId } },
    });
  }

  async getAuctionStats(auction_id: number): Promise<AuctionStatsDto> {
    const participants = await this.prisma.auctionParticipant.findMany({
      where: {
        auction_id: auction_id,
      },
      select: {
        bonus_rate: true,
        rate: true,
        user: {
          select: {
            user_id: true,
            username: true,
            bonus_balance: true,
            rato_balance: true,
          },
        },
      },
    });
    const auction = await this.prisma.auction.findUnique({
      where: {
        auction_id: auction_id,
      },
    });

    if (auction == null) {
      throw new BadRequestException('Auction not found');
    }

    return {
      auction_id: auction.auction_id,
      users_balance: participants.reduce(
        (sum, user) => sum + user.user.rato_balance + user.user.bonus_balance,
        0,
      ),
      lot_price: auction.end_price,
      participants: participants.map((participant) => {
        return {
          user_id: participant.user.user_id,
          username: participant.user.username || '',
          bet_amount:
            (participant.rate + participant.bonus_rate) /
            (auction.rate_step || 1),
          real_sum: participant.rate,
          bonus_sum: participant.bonus_rate,
        };
      }),
    };
  }
}
