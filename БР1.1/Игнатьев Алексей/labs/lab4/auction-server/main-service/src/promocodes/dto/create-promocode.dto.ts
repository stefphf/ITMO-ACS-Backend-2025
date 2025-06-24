import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePromocodeDto {
  @ApiProperty({ description: 'Код промокода' })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({ description: 'Бонус за пополнение' })
  @IsNotEmpty()
  @IsNumber()
  replinish_bonus: number;

  @ApiProperty({ description: 'Количество активаций', required: false })
  @IsOptional()
  @IsNumber()
  activation_count?: number;
}
