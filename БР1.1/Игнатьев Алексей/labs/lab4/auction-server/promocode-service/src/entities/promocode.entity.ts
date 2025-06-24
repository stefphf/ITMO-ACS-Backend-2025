import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResponse } from './pagination.entity';

export class PromocodeEntity {
  @ApiProperty({ description: 'ID промокода' })
  promocode_id: number;

  @ApiProperty({ description: 'Код промокода' })
  code: string;

  @ApiProperty({ description: 'Бонус за пополнение' })
  replinish_bonus: number;

  @ApiProperty({
    description: 'Количество активаций',
    type: Number,
    nullable: true,
  })
  activation_count: number | null;

  @ApiProperty({ description: 'Текущее количество активаций' })
  current_count: number;

  @ApiProperty({ description: 'Дата создания' })
  created_at: Date;
}

export class PromocodeResponseEntity extends PaginatedResponse {
  @ApiProperty({ type: [PromocodeEntity] })
  items: PromocodeEntity[];
}
