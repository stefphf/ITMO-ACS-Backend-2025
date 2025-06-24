import { IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { SeriesDto } from './series.dto';
import { OpenAPI } from 'routing-controllers-openapi';

/**
 * Базовый DTO для тренировки
 */
export class BaseTrainingDto {
  id: number;
  athleteId: number;
  startTs: Date;
  endTs?: Date;
  scheduledDate?: Date;
  totalScore?: number;
  series?: SeriesDto[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * DTO для создания тренировки
 */
export class CreateTrainingDto {
  @IsNumber({}, { message: 'ID спортсмена должен быть числом' })
  @IsNotEmpty({ message: 'ID спортсмена обязателен' })
  athleteId: number;

  @IsDate({ message: 'Время начала должно быть валидной датой' })
  @IsNotEmpty({ message: 'Время начала обязательно' })
  startTs: Date;

  @IsDate({ message: 'Время окончания должно быть валидной датой' })
  @IsOptional()
  endTs?: Date;

  @IsDate({ message: 'Запланированная дата должна быть валидной датой' })
  @IsOptional()
  scheduledDate?: Date;

  @IsNumber({}, { message: 'Общий счет должен быть числом' })
  @IsOptional()
  totalScore?: number;
}

/**
 * DTO для обновления тренировки
 */
export class UpdateTrainingDto {
  @IsDate({ message: 'Время начала должно быть валидной датой' })
  @IsOptional()
  startTs?: Date;

  @IsDate({ message: 'Время окончания должно быть валидной датой' })
  @IsOptional()
  endTs?: Date;

  @IsDate({ message: 'Запланированная дата должна быть валидной датой' })
  @IsOptional()
  scheduledDate?: Date;

  @IsNumber({}, { message: 'Общий счет должен быть числом' })
  @IsOptional()
  totalScore?: number;
}

export class UpdateFreeTrainingDto extends UpdateTrainingDto {
  @IsNumber({}, { message: 'ID типа оружия должен быть числом' })
  @IsOptional()
  weaponTypeId?: number;

  @IsNumber({}, { message: 'ID мишени должен быть числом' })
  @IsOptional()
  targetId?: number;
}

/**
 * DTO для создания свободной тренировки
 */
export class CreateFreeTrainingDto extends CreateTrainingDto {
  @IsNumber({}, { message: 'ID типа оружия должен быть числом' })
  @IsNotEmpty({ message: 'ID типа оружия обязателен' })
  weaponTypeId: number;

  @IsNumber({}, { message: 'ID мишени должен быть числом' })
  @IsNotEmpty({ message: 'ID мишени обязателен' })
  targetId: number;
}

/**
 * DTO для ответа с данными свободной тренировки
 */
export class FreeTrainingDto extends BaseTrainingDto {
  weaponTypeId: number;
  targetId: number;
}

/**
 * DTO для создания квалификационной тренировки
 */
export class CreateQualificationTrainingDto extends CreateTrainingDto {
  @IsNumber({}, { message: 'ID упражнения должен быть числом' })
  @IsNotEmpty({ message: 'ID упражнения обязателен' })
  exerciseId: number;
}

/**
 * DTO для обновления квалификационной тренировки
 */
export class UpdateQualificationTrainingDto extends UpdateTrainingDto {
  @IsNumber({}, { message: 'ID упражнения должен быть числом' })
  @IsOptional()
  exerciseId?: number;
}

/**
 * DTO для ответа с данными квалификационной тренировки
 */
export class QualificationTrainingDto extends BaseTrainingDto {
  exerciseId: number;
}

export class TrainingDto {
  id: number;
  athleteId: number;
  startTime: Date;
  endTime?: Date;
  scheduledDate?: Date;
  totalScore?: number;
  weaponTypeId?: number;
  targetId?: number;
  exerciseId?: number;
  type: 'free' | 'qualification';
}

@OpenAPI({})
export class TrainingResponseDto {
  success: boolean;
  message: string;
  training?: TrainingDto;
}
