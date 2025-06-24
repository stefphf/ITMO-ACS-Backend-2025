import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { BonusEntity, BonusResponseEntity } from './entities/bonus.entity';
import { CreateBonusDto } from './dto/create-bonus.dto';
import { UpdateBonusDto } from './dto/update-bonus.dto';
import { StatusOKDto } from 'src/common/dto/status.dto';
import { PaginateParams } from 'src/common/params/pagination.params.dto';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class BonusesService extends CommonService<BonusEntity> {
  constructor(protected prisma: PrismaClient) {
    super(prisma);
  }

  async findAll(params: PaginateParams): Promise<BonusResponseEntity> {
    const { skip, take } = params;
    const bonuses = await this.prisma.bonus.findMany({
      ...(skip !== undefined && take !== undefined ? { skip, take } : {}),
      orderBy: {
        amount: 'asc',
      },
    });
    return {
      items: bonuses,
      total_items: bonuses.length,
    };
  }

  async findOne(id: number): Promise<BonusEntity | null> {
    return this.prisma.bonus.findUnique({
      where: { bonus_id: id },
    });
  }

  async create(createBonusDto: CreateBonusDto): Promise<BonusEntity> {
    return this.prisma.bonus.create({
      data: createBonusDto,
    });
  }

  async update(
    id: number,
    updateBonusDto: UpdateBonusDto,
  ): Promise<BonusEntity> {
    try {
      return await this.prisma.bonus.update({
        where: { bonus_id: id },
        data: updateBonusDto,
      });
    } catch {
      throw new BadRequestException('Bonus not found');
    }
  }

  async remove(id: number): Promise<StatusOKDto> {
    try {
      await this.prisma.bonus.delete({
        where: { bonus_id: id },
      });
      return new StatusOKDto();
    } catch {
      throw new BadRequestException('Bonus not found');
    }
  }
}
