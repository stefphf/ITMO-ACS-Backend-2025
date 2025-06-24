import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class UtmMarkerDto {
  @IsNumber()
  @IsOptional()
  utm_id: number;
  @IsString()
  @IsOptional()
  utm_source: string;
  @IsString()
  @IsOptional()
  utm_medium: string;
  @IsString()
  @IsOptional()
  utm_campaign: string;
  @IsString()
  @IsOptional()
  utm_term: string;
  @IsString()
  @IsOptional()
  utm_content: string;
}

export class RegistrationUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  referral_code: string | null;

  @IsOptional()
  utm?: UtmMarkerDto;
}
