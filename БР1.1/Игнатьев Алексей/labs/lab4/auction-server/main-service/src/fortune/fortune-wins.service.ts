import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PaginateParams } from 'src/common/params/pagination.params.dto';
import { CreateWinItemDto } from './dto/create-win-item.dto';
import { UpdateWinItemDto } from './dto/update-win-item.dto';
import { StatusOKDto } from 'src/common/dto/status.dto';
import {
  FortuneWinEntity,
  FortuneWinResponseEntity,
} from './entities/fortune-win.entity';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class FortuneWinsService extends CommonService<FortuneWinEntity> {
  constructor(protected prisma: PrismaClient) {
    super(prisma);
  }

  async findAll(
    params: PaginateParams,
    userId: number,
  ): Promise<FortuneWinResponseEntity> {
    const { skip, take } = params;
    const wins = await this.prisma.fortuneWins.findMany({
      where: { user_id: userId },
      include: { spin_item: true },
      ...(skip !== undefined && take !== undefined ? { skip, take } : {}),
    });
    return {
      items: wins,
      total_items: wins.length,
    };
  }

  async create(data: CreateWinItemDto): Promise<FortuneWinEntity> {
    // Проверяем существование пользователя
    const user = await this.prisma.user.findUnique({
      where: { user_id: data.user_id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${data.user_id} not found`);
    }

    // Проверяем существование spin_item
    const spinItem = await this.prisma.spinItem.findUnique({
      where: { spin_item_id: data.spin_item_id },
    });

    if (!spinItem) {
      throw new NotFoundException(
        `Spin item with ID ${data.spin_item_id} not found`,
      );
    }

    const win = await this.prisma.fortuneWins.create({
      data,
    });
    return {
      ...win,
      spin_item: spinItem,
    };
  }

  async update(id: number, data: UpdateWinItemDto) {
    return this.prisma.fortuneWins.update({
      where: { fortune_win_id: id },
      include: { spin_item: true },
      data,
    });
  }

  async remove(id: number): Promise<StatusOKDto> {
    await this.prisma.fortuneWins.delete({
      where: { fortune_win_id: id },
    });
    return new StatusOKDto();
  }
}
