import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBonusDto {
  @ApiProperty({ description: 'Сумма пополнения' })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({ description: 'Процент бонуса' })
  @IsNotEmpty()
  @IsNumber()
  percent: number;
}
