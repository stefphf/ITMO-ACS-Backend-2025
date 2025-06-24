import { ApiProperty } from '@nestjs/swagger';
import { AuctionCategory } from '@prisma/client';
import { PartialLocalizationEntity } from 'src/entities/localization.entity';
import { PaginatedResponse } from 'src/entities/pagination.entity';

export class CategoryEntity implements AuctionCategory {
  auction_category_id: number;
  title: string;
  locales: PartialLocalizationEntity[];
}

export class CategoryResponseEntity extends PaginatedResponse {
  @ApiProperty({ type: [CategoryEntity] })
  items: CategoryEntity[];
}
