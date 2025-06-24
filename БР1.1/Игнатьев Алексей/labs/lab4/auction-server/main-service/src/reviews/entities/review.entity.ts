import { ApiProperty } from '@nestjs/swagger';
import { $Enums, MediaType, ReviewMedia } from '@prisma/client';
import { PaginatedResponse } from 'src/common/entities/pagination.entity';

export class ReviewUserEntity {
  @ApiProperty({ description: 'ID пользователя' })
  user_id: number;
  @ApiProperty({
    description: 'Имя пользователя',
    required: false,
    type: String,
  })
  username: string | null;
  @ApiProperty({ description: 'Имя', required: false, type: String })
  first_name: string | null;
  @ApiProperty({ description: 'Фамилия', required: false, type: String })
  last_name: string | null;
  @ApiProperty({ description: 'Instagram', required: false, type: String })
  instagram: string | null;
  @ApiProperty({ description: 'Язык', required: false, type: String })
  language: string | null;
  @ApiProperty({
    description: 'URL изображения',
    required: false,
    type: String,
  })
  avatar_url: string | null;
}

export class ReviewAuctionEntity {
  @ApiProperty({ description: 'ID аукциона' })
  auction_id: number;
  @ApiProperty({ description: 'Название' })
  title: string;
  @ApiProperty({ description: 'Конечная цена' })
  end_price: number;
}

export class ReviewEntity {
  @ApiProperty({ description: 'ID отзыва' })
  review_id: number;
  @ApiProperty({ type: ReviewUserEntity, description: 'Пользователь' })
  user: ReviewUserEntity;
  @ApiProperty({ type: ReviewAuctionEntity, description: 'Аукцион' })
  auction: ReviewAuctionEntity;
  @ApiProperty({ description: 'Комментарий' })
  comment: string;
  @ApiProperty({ description: 'Дата создания' })
  created_at: Date;
  media: ReviewMediaEntity[];
}

export class ReviewMediaEntity implements ReviewMedia {
  @ApiProperty({ description: 'ID изображения' })
  review_id: number;
  @ApiProperty({ description: 'ID медиа' })
  review_media_id: number;
  @ApiProperty({ description: 'URL' })
  url: string;
  @ApiProperty({ enum: MediaType, description: 'Тип медиа' })
  media_type: $Enums.MediaType;
}

export class ReviewResponseEntity extends PaginatedResponse {
  @ApiProperty({ type: [ReviewEntity] })
  items: ReviewEntity[];
}
