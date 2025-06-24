import { Injectable } from '@nestjs/common';
import { CommonService } from 'src/common/common.service';
import { UserEntity } from './entities/user.entity';
import { StatusOKDto } from 'src/common/dto/status.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { StorageService } from 'src/config/s3/s3.service';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UsersService extends CommonService<UserEntity> {
  constructor(
    private readonly s3Service: StorageService,
    protected readonly prisma: PrismaClient,
  ) {
    super(prisma);
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { user_id: id },
      include: { address: true },
    });

    if (!user) return null;

    return {
      ...user,
      address: user.address
        ? {
            ...user.address,
            zip_code: user.address.zip_code || null,
          }
        : null,
    } as UserEntity;
  }

  async creditTokens(id: number, value: number): Promise<StatusOKDto> {
    await this.prisma.user.update({
      where: { user_id: id },
      data: { rato_balance: { increment: value } },
    });
    return new StatusOKDto();
  }

  async withdrawTokens(id: number, value: number): Promise<StatusOKDto> {
    await this.prisma.user.update({
      where: { user_id: id },
      data: { rato_balance: { decrement: value } },
    });
    return new StatusOKDto();
  }

  async patchMe(
    id: number,
    data: UpdateUserDto,
    avatar: Express.Multer.File | undefined,
  ): Promise<UserEntity> {
    let user = await this.prisma.user.findFirst({
      where: { user_id: id },
      include: { address: true },
    });

    let img = user?.avatar_url;
    if (avatar) {
      if (img) {
        await this.s3Service.deleteFile(img);
      }
      img = await this.s3Service.uploadFile(avatar);
    }

    const { address: _, ...userData } = data;

    const updateData: any = {
      ...userData,
      avatar_url: img,
    };

    if (data.address) {
      const address = JSON.parse(data.address as unknown as string);
      const addressData = {
        country: address.country,
        city: address.city,
        street: address.street,
        house_number: address.house_number,
        zip_code: address.zip_code,
      };

      const existingAddress = await this.prisma.address.findUnique({
        where: { user_id: id },
      });

      if (existingAddress) {
        await this.prisma.address.delete({
          where: { user_id: id },
        });
      }

      await this.prisma.address.create({
        data: {
          user_id: id,
          ...addressData,
        },
      });
    }

    user = await this.prisma.user.update({
      where: { user_id: id },
      data: updateData,
      include: { address: true },
    });

    return user;
  }
}
