import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResponse } from 'src/common/entities/pagination.entity';

export class BonusEntity {
  @ApiProperty({ description: 'ID бонуса' })
  bonus_id: number;

  @ApiProperty({ description: 'Сумма пополнения' })
  amount: number;

  @ApiProperty({ description: 'Процент бонуса' })
  percent: number;

  @ApiProperty({ description: 'Дата создания' })
  created_at: Date;
}

export class BonusResponseEntity extends PaginatedResponse {
  @ApiProperty({ type: [BonusEntity] })
  items: BonusEntity[];
}
