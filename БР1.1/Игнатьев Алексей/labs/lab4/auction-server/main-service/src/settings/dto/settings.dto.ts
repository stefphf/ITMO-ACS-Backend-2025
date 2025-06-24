import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateSettingsDto {
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsOptional()
  cost_per_spin?: number;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsOptional()
  first_deposit_bonus?: number;
}
