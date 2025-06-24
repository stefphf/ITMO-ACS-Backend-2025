import { ApiProperty } from '@nestjs/swagger';
import { AuctionBrand } from '@prisma/client';
import { PartialLocalizationEntity } from 'src/admin/entities/localization.entity';
import { PaginatedResponse } from 'src/common/entities/pagination.entity';

export class BrandEntity implements AuctionBrand {
  @ApiProperty({ description: 'ID бренда' })
  auction_brand_id: number;
  @ApiProperty({ description: 'Название бренда' })
  title: string;
  @ApiProperty({
    description: 'Локализации',
    type: [PartialLocalizationEntity],
  })
  locales: PartialLocalizationEntity[];
}

export class BrandResponseEntity extends PaginatedResponse {
  @ApiProperty({ type: [BrandEntity] })
  items: BrandEntity[];
}
