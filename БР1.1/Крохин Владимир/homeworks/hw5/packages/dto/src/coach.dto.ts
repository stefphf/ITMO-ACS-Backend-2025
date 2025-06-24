import { IsNumber, IsOptional, IsArray, IsString } from 'class-validator';

export class CoachDto {
  @IsNumber()
  id!: number;

  @IsNumber()
  userId!: number;

  @IsArray()
  @IsNumber({}, { each: true })
  athleteIds!: number[];

  createdAt!: string;

  updatedAt!: string;
}

export class CreateCoachDto {
  @IsNumber()
  userId!: number;

  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  athleteIds?: number[];
}

export class UpdateCoachDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  athleteIds?: number[];
}
