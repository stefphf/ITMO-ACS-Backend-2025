import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInvoiceDto {
  @ApiProperty({ description: 'Сумма' })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({ description: 'Промокод', required: false })
  @IsOptional()
  @IsString()
  promocode?: string;

  @ApiProperty({ description: 'URL перенаправления' })
  @IsNotEmpty()
  @IsString()
  redirect_url: string;

  @ApiProperty({ description: 'Применить бонус', required: false })
  @IsOptional()
  @IsBoolean()
  is_bonus_applied?: boolean;

  @ApiProperty({ description: 'Применить промокод', required: false })
  @IsOptional()
  @IsBoolean()
  is_promo_applied?: boolean;
}

export class CreateInvoiceCallbackDto {
  @ApiProperty({ description: 'ID счета' })
  @IsNotEmpty()
  @IsString()
  invoice_id: string;

  @ApiProperty({ description: 'Состояние' })
  @IsNotEmpty()
  @IsNumber()
  state: number;
}
