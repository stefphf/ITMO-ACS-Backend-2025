import { ApiProperty } from '@nestjs/swagger';
import { News } from '@prisma/client';
import { NewsLocalizationEntity } from 'src/admin/entities/localization.entity';
import { PaginatedResponse } from 'src/common/entities/pagination.entity';

export class NewsEntity implements News {
  @ApiProperty({ description: 'ID новости' })
  news_id: number;
  @ApiProperty({ description: 'Название' })
  title: string;
  @ApiProperty({ description: 'Текст' })
  text: string;
  @ApiProperty({
    description: 'URL изображения',
    required: false,
    type: String,
  })
  image_url: string | null;
  @ApiProperty({ description: 'Дата создания' })
  created_at: Date;
  @ApiProperty({ description: 'Локализации', type: [NewsLocalizationEntity] })
  locales: NewsLocalizationEntity[];
}

export class NewsResponseEntity extends PaginatedResponse {
  @ApiProperty({ type: [NewsEntity] })
  items: NewsEntity[];
}
