import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsInt,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { OpenAPI } from 'routing-controllers-openapi';
import { SeriesDto } from './series.dto';
import { Type } from 'class-transformer';
import { TrainingType } from './enums';

@OpenAPI({})
export class TrainingDto {
  @IsInt()
  @IsNotEmpty()
  id!: number;

  @IsEnum(TrainingType)
  @IsNotEmpty()
  type!: TrainingType;

  @IsInt()
  @IsNotEmpty()
  athleteId!: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SeriesDto)
  series!: SeriesDto[];

  @IsDate()
  @IsNotEmpty()
  createdAt!: Date;

  @IsDate()
  @IsNotEmpty()
  updatedAt!: Date;
}

@OpenAPI({})
export class CreateTrainingDto {
  @IsEnum(TrainingType)
  @IsNotEmpty()
  type!: TrainingType;

  @IsInt()
  @IsNotEmpty()
  athleteId!: number;
}

@OpenAPI({})
export class UpdateTrainingDto {
  @IsOptional()
  @IsEnum(TrainingType)
  type?: TrainingType;

  @IsOptional()
  @IsInt()
  athleteId?: number;
}

@OpenAPI({})
export class FreeTrainingDto extends TrainingDto {
  @IsInt()
  @IsNotEmpty()
  weaponTypeId!: number;

  @IsInt()
  @IsNotEmpty()
  targetId!: number;
}

@OpenAPI({})
export class CreateFreeTrainingDto extends CreateTrainingDto {
  @IsInt()
  @IsNotEmpty()
  weaponTypeId!: number;

  @IsInt()
  @IsNotEmpty()
  targetId!: number;

  @IsInt()
  @IsNotEmpty()
  athleteId!: number;
}

@OpenAPI({})
export class UpdateFreeTrainingDto extends UpdateTrainingDto {
  @IsOptional()
  @IsInt()
  weaponTypeId?: number;

  @IsOptional()
  @IsInt()
  targetId?: number;

  @IsOptional()
  @IsInt()
  athleteId?: number;
}

@OpenAPI({})
export class QualificationTrainingDto extends TrainingDto {
  @IsInt()
  @IsNotEmpty()
  exerciseId!: number;
}

@OpenAPI({})
export class CreateQualificationTrainingDto extends CreateTrainingDto {
  @IsInt()
  @IsNotEmpty()
  exerciseId!: number;
}

@OpenAPI({})
export class UpdateQualificationTrainingDto extends UpdateTrainingDto {
  @IsOptional()
  @IsInt()
  exerciseId?: number;
}
