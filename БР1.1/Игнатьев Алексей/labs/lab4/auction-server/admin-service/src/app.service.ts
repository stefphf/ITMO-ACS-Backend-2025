import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserParams } from './params/user.params';
import { UserDetailDto } from './dto/user-detail.dto';
import { ConfigService } from '@nestjs/config';
import { AdminLoginDto } from './dto/admin-login.dto';
import { UserEntity } from './entities/user.entity';
import { StatusOKDto } from './dto/status.dto';

@Injectable()
export class AdminService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly configService: ConfigService,
  ) {}

  async getAllUsers(params: UserParams): Promise<UserEntity[]> {
    const { skip, take, attach_stats, ...rest } = params;

    const where: any = {};
    for (const [key, value] of Object.entries(rest)) {
      if (value === 'true' || value === 'false') {
        where[key] = value === 'true';
      } else if (value !== undefined && value !== null) {
        where[key] = value;
      }
    }

    const users = await this.prisma.user.findMany({
      where,
      ...(skip !== undefined && take !== undefined ? { skip, take } : {}),
      include: {
        address: true,
        ip_detail: true,
      },
    });

    if (attach_stats === true) {
      const res: UserEntity[] = [];
      for (const user of users) {
        res.push({
          ...user,
          stats: await this.getUserInfo(user.user_id),
        });
      }
      return res;
    } else {
      return users;
    }
  }

  async getUser(userId: number): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({
      where: {
        user_id: userId,
      },
      include: {
        address: true,
        ip_detail: true,
      },
    });

    if (user == null) {
      throw new BadRequestException('User not found');
    }

    return {
      ...user,
      stats: await this.getUserInfo(user.user_id),
    };
  }

  async verifyAdmin(body: AdminLoginDto): Promise<StatusOKDto> {
    const adminLogin = await this.configService.get('SWAGGER_ADMIN_LOGIN');
    const adminPassword = await this.configService.get(
      'SWAGGER_ADMIN_PASSWORD',
    );

    if (body.login !== adminLogin || body.password !== adminPassword) {
      throw new UnauthorizedException('Invalid admin credentials');
    }
    return new StatusOKDto();
  }

  async getUserInfo(userId: number): Promise<UserDetailDto> {
    const auctions_count = await this.prisma.auctionParticipant.count({
      where: { user_id: userId },
    });

    const ftd = await this.prisma.transaction.findFirst({
      where: { user_id: userId, status: 'COMPLETED' },
      orderBy: { created_at: 'asc' },
    });

    const ftdDate = ftd != null ? ftd.created_at : null;
    const ftdSum = ftd != null ? ftd.amount : null;

    const rdStats = await this.prisma.transaction.aggregate({
      where: {
        user_id: userId,
        status: 'COMPLETED',
        transaction_id: {
          not: ftd != null ? ftd.transaction_id : undefined,
        },
      },
      _avg: { amount: true },
      _sum: { amount: true },
      _count: { transaction_id: true },
    });

    const [totalBets, totalWins] = await Promise.all([
      this.prisma.auctionParticipant.aggregate({
        where: { user_id: userId },
        _sum: { rate: true },
      }),
      this.prisma.auction.aggregate({
        where: { winner_id: userId },
        _sum: { end_price: true },
      }),
    ]);
    const ngr = (totalBets._sum.rate || 0) - (totalWins._sum.end_price || 0);

    const utm_marker = await this.prisma.utmMarker.findFirst({
      where: { user_id: userId },
    });

    const wins_count = await this.prisma.auction.count({
      where: { winner_id: userId },
    });

    return {
      user_id: userId,
      ftd_date: ftdDate,
      ftd_sum: ftdSum,
      rd_count: rdStats._count.transaction_id,
      rd_sum: rdStats._sum.amount,
      ngr: ngr,
      total_deps: rdStats._count.transaction_id + (ftd != null ? 1 : 0),
      deposit_sum: (rdStats._sum.amount || 0) + (ftd != null ? ftd.amount : 0),
      rd_avg: rdStats._avg.amount || 0,
      auctions_count: auctions_count,
      win_count: wins_count,
      utm_marker: utm_marker,
    };
  }
}
