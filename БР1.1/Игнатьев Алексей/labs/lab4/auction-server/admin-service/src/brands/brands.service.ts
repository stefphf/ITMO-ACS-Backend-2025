import { BadRequestException, Injectable } from '@nestjs/common';
import { BrandEntity, BrandResponseEntity } from './entities/brand.entity';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { LocalizationType, PrismaClient } from '@prisma/client';
import { PartialLocalizationEntity } from '../entities/localization.entity';
import { PaginateParams } from 'src/params/pagination.params.dto';
import { StatusOKDto } from 'src/dto/status.dto';

@Injectable()
export class BrandsService {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(params: PaginateParams): Promise<BrandResponseEntity> {
    const { skip, take } = params;
    const brands = await this.prisma.auctionBrand.findMany({
      ...(skip !== undefined && take !== undefined ? { skip, take } : {}),
    });

    const brandIds = brands.map((brand) => brand.auction_brand_id);
    const localizations = await this.prisma.localization.findMany({
      where: {
        reference_id: { in: brandIds },
        type: LocalizationType.BRAND_TITLE,
      },
      select: {
        locale_id: true,
        language: true,
        text: true,
        reference_id: true,
      },
    });

    return {
      items: brands.map((brand) => ({
        ...brand,
        locales: localizations
          .filter((loc) => loc.reference_id === brand.auction_brand_id)
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .map(({ reference_id, ...rest }) => rest),
      })),
      total_items: brands.length,
    };
  }

  async findOne(id: number): Promise<BrandEntity | null> {
    const brand = await this.prisma.auctionBrand.findFirst({
      where: { auction_brand_id: id },
    });

    if (!brand) return null;

    const locales = await this.prisma.localization.findMany({
      where: { reference_id: id, type: LocalizationType.BRAND_TITLE },
      select: { locale_id: true, language: true, text: true },
    });

    return { ...brand, locales };
  }

  async create(createDto: CreateBrandDto): Promise<BrandEntity> {
    return await this.prisma.$transaction(async (tx) => {
      const auctionBrand = await this.prisma.auctionBrand.create({
        data: {
          title: createDto.title,
        },
      });
      const localizations: PartialLocalizationEntity[] = await Promise.all(
        createDto.locales.map((locale) =>
          tx.localization.create({
            data: {
              reference_id: auctionBrand.auction_brand_id,
              language: locale.language,
              text: locale.text,
              type: LocalizationType.BRAND_TITLE,
            },
            select: { locale_id: true, language: true, text: true },
          }),
        ),
      );
      return {
        auction_brand_id: auctionBrand.auction_brand_id,
        title: auctionBrand.title,
        locales: localizations,
      };
    });
  }

  async update(id: number, updateDto: UpdateBrandDto): Promise<BrandEntity> {
    return await this.prisma.$transaction(async (tx) => {
      // Обновляем название бренда
      const updatedBrand = await tx.auctionBrand.update({
        where: { auction_brand_id: id },
        data: { title: updateDto.title },
      });

      if (!updateDto.locales?.length) {
        const currentLocalizations = await tx.localization.findMany({
          where: { reference_id: id, type: LocalizationType.BRAND_TITLE },
          select: { locale_id: true, language: true, text: true },
        });
        return { ...updatedBrand, locales: currentLocalizations };
      }
      // Удаляем старые локализации
      await tx.localization.deleteMany({
        where: { reference_id: id, type: LocalizationType.BRAND_TITLE },
      });

      // Создаем новые локализации
      const newLocalizations = await Promise.all(
        updateDto.locales.map((locale) =>
          tx.localization.create({
            data: {
              reference_id: id,
              language: locale.language,
              text: locale.text,
              type: LocalizationType.BRAND_TITLE,
            },
            select: { locale_id: true, language: true, text: true },
          }),
        ),
      );

      return { ...updatedBrand, locales: newLocalizations };
    });
  }

  async remove(id: number): Promise<StatusOKDto> {
    try {
      await this.prisma.$transaction(async (tx) => {
        await tx.auctionBrand.delete({
          where: { auction_brand_id: id },
        });
        await tx.localization.deleteMany({
          where: { reference_id: id, type: LocalizationType.BRAND_TITLE },
        });
      });
      return new StatusOKDto();
    } catch {
      throw new BadRequestException('Brand not found');
    }
  }
}
