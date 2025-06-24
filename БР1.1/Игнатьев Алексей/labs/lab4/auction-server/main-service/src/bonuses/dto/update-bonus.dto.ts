import { IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBonusDto {
  @ApiProperty({ description: 'Сумма пополнения', required: false })
  @IsOptional()
  @IsNumber()
  amount?: number;

  @ApiProperty({ description: 'Процент бонуса', required: false })
  @IsOptional()
  @IsNumber()
  percent?: number;
}
