import { IsString, IsOptional } from 'class-validator';

export class TelegramLoginDto {
  @IsString()
  id: string;

  @IsString()
  hash: string;

  @IsString()
  @IsOptional()
  photo_url?: string;

  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  first_name?: string;

  @IsString()
  @IsOptional()
  last_name?: string;

  @IsString()
  @IsOptional()
  auth_date?: string;
}
