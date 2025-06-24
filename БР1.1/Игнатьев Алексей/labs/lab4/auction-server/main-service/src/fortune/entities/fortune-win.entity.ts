import { ApiProperty } from '@nestjs/swagger';
import { SpinItemEntity } from './spin-item.entity';
import { PaginatedResponse } from 'src/common/entities/pagination.entity';

export class FortuneWinEntity {
  @ApiProperty({ description: 'ID выигрыша' })
  fortune_win_id: number;
  @ApiProperty({ description: 'ID пользователя' })
  user_id: number;
  @ApiProperty({ description: 'Предмет', type: SpinItemEntity })
  spin_item: SpinItemEntity;
  @ApiProperty({ description: 'Получено' })
  is_received: boolean;
  @ApiProperty({ description: 'Дата создания' })
  created_at: Date;
}

export class FortuneWinResponseEntity extends PaginatedResponse {
  @ApiProperty({ type: [FortuneWinEntity] })
  items: FortuneWinEntity[];
}
