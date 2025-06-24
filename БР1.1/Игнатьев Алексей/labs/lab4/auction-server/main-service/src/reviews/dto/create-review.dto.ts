import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({ description: 'ID аукциона' })
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  auction_id: number;
  @ApiProperty({ description: 'Комментарий' })
  @IsString()
  @IsNotEmpty()
  comment: string;
  @ApiPropertyOptional({
    type: 'array',
    items: { format: 'binary', type: 'string' },
    description: 'Медиа',
  })
  @IsOptional()
  media?: any;
}
