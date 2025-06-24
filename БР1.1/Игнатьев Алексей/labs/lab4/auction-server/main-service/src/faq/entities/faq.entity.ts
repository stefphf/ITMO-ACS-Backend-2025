import { ApiProperty } from '@nestjs/swagger';
import { Faq } from '@prisma/client';
import { FaqLocalizationEntity } from 'src/admin/entities/localization.entity';
import { PaginatedResponse } from 'src/common/entities/pagination.entity';

export class FaqEntity implements Faq {
  @ApiProperty({ description: 'ID FAQ' })
  faq_id: number;
  @ApiProperty({ description: 'Вопрос' })
  question: string;
  @ApiProperty({ description: 'Ответ' })
  answer: string;
  @ApiProperty({
    description: 'Локализации',
    type: [FaqLocalizationEntity],
  })
  locales: FaqLocalizationEntity[];
}

export class FaqResponseEntity extends PaginatedResponse {
  @ApiProperty({ type: [FaqEntity] })
  items: FaqEntity[];
}
