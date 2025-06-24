import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import {
  PromocodeEntity,
  PromocodeResponseEntity,
} from './entities/promocode.entity';
import { CreatePromocodeDto } from './dto/create-promocode.dto';
import { UpdatePromocodeDto } from './dto/update-promocode.dto';
import { PaginateParams } from './params/pagination.params.dto';
import { StatusOKDto } from './dto/status.dto';

@Injectable()
export class PromocodesService {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(params: PaginateParams): Promise<PromocodeResponseEntity> {
    const { skip, take } = params;
    const promocodes = await this.prisma.promocode.findMany({
      ...(skip !== undefined && take !== undefined ? { skip, take } : {}),
      orderBy: {
        created_at: 'desc',
      },
    });
    return {
      items: promocodes,
      total_items: promocodes.length,
    };
  }

  async findOne(id: number): Promise<PromocodeEntity | null> {
    return this.prisma.promocode.findUnique({
      where: { promocode_id: id },
    });
  }

  async findByCode(code: string): Promise<PromocodeEntity | null> {
    return this.prisma.promocode.findFirst({
      where: { code },
    });
  }

  async create(
    createPromocodeDto: CreatePromocodeDto,
  ): Promise<PromocodeEntity> {
    return this.prisma.promocode.create({
      data: {
        code: createPromocodeDto.code,
        replinish_bonus: createPromocodeDto.replinish_bonus,
        activation_count: createPromocodeDto.activation_count,
        current_count: 0,
      },
    });
  }

  async update(
    id: number,
    updatePromocodeDto: UpdatePromocodeDto,
  ): Promise<PromocodeEntity> {
    try {
      return await this.prisma.promocode.update({
        where: { promocode_id: id },
        data: updatePromocodeDto,
      });
    } catch {
      throw new BadRequestException('Promocode not found');
    }
  }

  async remove(id: number): Promise<StatusOKDto> {
    try {
      await this.prisma.promocode.delete({
        where: { promocode_id: id },
      });
      return new StatusOKDto();
    } catch {
      throw new BadRequestException('Promocode not found');
    }
  }
}
