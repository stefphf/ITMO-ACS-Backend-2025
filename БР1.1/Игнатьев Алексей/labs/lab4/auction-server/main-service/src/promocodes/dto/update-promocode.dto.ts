import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePromocodeDto {
  @ApiProperty({ description: 'Код промокода', required: false })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty({ description: 'Бонус за пополнение', required: false })
  @IsOptional()
  @IsNumber()
  replinish_bonus?: number;

  @ApiProperty({ description: 'Количество активаций', required: false })
  @IsOptional()
  @IsNumber()
  activation_count?: number;

  @ApiProperty({ description: 'Текущее количество активаций', required: false })
  @IsOptional()
  @IsNumber()
  current_count?: number;
}
