import { IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { SeriesDto } from './series.dto';
import { OpenAPI } from 'routing-controllers-openapi';

/**
 * Базовый DTO для тренировки
 */
@OpenAPI({})
export class BaseTrainingDto {
  @IsNumber({}, { message: 'ID должен быть числом' })
  id: number;

  @IsNumber({}, { message: 'ID спортсмена должен быть числом' })
  athleteId: number;

  @IsString({ message: 'Время начала должно быть строкой' })
  start_ts: string;

  @IsOptional()
  @IsString({ message: 'Время окончания должно быть строкой' })
  end_ts?: string;

  @IsOptional()
  @IsString({ message: 'Запланированная дата должна быть строкой' })
  scheduledDate?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Общий счет должен быть числом' })
  totalScore?: number;

  @IsOptional()
  @IsArray({ message: 'Список серий должен быть массивом' })
  series?: SeriesDto[];

  @IsString({ message: 'Дата создания должна быть строкой' })
  createdAt: string;

  @IsString({ message: 'Дата обновления должна быть строкой' })
  updatedAt: string;
}

/**
 * DTO для создания тренировки
 */
@OpenAPI({})
export class CreateTrainingDto {
  @IsNumber({}, { message: 'ID спортсмена должен быть числом' })
  @IsNotEmpty({ message: 'ID спортсмена обязателен' })
  athleteId: number;

  @IsString({ message: 'Время начала должно быть строкой' })
  @IsNotEmpty({ message: 'Время начала обязательно' })
  start_ts: string;

  @IsOptional()
  @IsString({ message: 'Время окончания должно быть строкой' })
  end_ts?: string;

  @IsOptional()
  @IsString({ message: 'Запланированная дата должна быть строкой' })
  scheduledDate?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Общий счет должен быть числом' })
  totalScore?: number;
}

/**
 * DTO для обновления тренировки
 */
@OpenAPI({})
export class UpdateTrainingDto {
  @IsOptional()
  @IsString({ message: 'Время начала должно быть строкой' })
  start_ts?: string;

  @IsOptional()
  @IsString({ message: 'Время окончания должно быть строкой' })
  end_ts?: string;

  @IsOptional()
  @IsString({ message: 'Запланированная дата должна быть строкой' })
  scheduledDate?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Общий счет должен быть числом' })
  totalScore?: number;
}

@OpenAPI({})
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
@OpenAPI({})
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
@OpenAPI({})
export class FreeTrainingDto extends BaseTrainingDto {
  @IsNumber({}, { message: 'ID типа оружия должен быть числом' })
  weaponTypeId: number;

  @IsNumber({}, { message: 'ID мишени должен быть числом' })
  targetId: number;
}

/**
 * DTO для создания квалификационной тренировки
 */
@OpenAPI({})
export class CreateQualificationTrainingDto extends CreateTrainingDto {
  @IsNumber({}, { message: 'ID упражнения должен быть числом' })
  @IsNotEmpty({ message: 'ID упражнения обязателен' })
  exerciseId: number;
}

/**
 * DTO для обновления квалификационной тренировки
 */
@OpenAPI({})
export class UpdateQualificationTrainingDto extends UpdateTrainingDto {
  @IsNumber({}, { message: 'ID упражнения должен быть числом' })
  @IsOptional()
  exerciseId?: number;
}

/**
 * DTO для ответа с данными квалификационной тренировки
 */
@OpenAPI({})
export class QualificationTrainingDto extends BaseTrainingDto {
  @IsNumber({}, { message: 'ID упражнения должен быть числом' })
  exerciseId: number;
}
