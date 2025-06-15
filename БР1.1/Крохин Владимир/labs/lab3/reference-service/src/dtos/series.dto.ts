import { IsArray, IsIn, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ShotDto } from './shot.dto';

/**
 * DTO для создания серии
 */
export class CreateSeriesDto {
  @IsNumber({}, { message: 'ID тренировки должен быть числом' })
  @IsNotEmpty({ message: 'ID тренировки обязателен' })
  trainingId!: number;

  @IsNotEmpty({ message: 'Тип тренировки обязателен' })
  @IsIn(['qualification', 'free'], {
    message: 'Тип тренировки должен быть qualification или free',
  })
  trainingType!: 'qualification' | 'free';

  @IsOptional()
  @IsNumber({}, { message: 'Начальное смещение времени должно быть числом' })
  beginTimeOffset?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Конечное смещение времени должно быть числом' })
  endTimeOffset?: number;

  @IsOptional()
  @IsArray({ message: 'Список выстрелов должен быть массивом' })
  shots?: ShotDto[];
}

/**
 * DTO для обновления серии
 */
export class UpdateSeriesDto {
  @IsOptional()
  @IsNumber({}, { message: 'Начальное смещение времени должно быть числом' })
  beginTimeOffset?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Конечное смещение времени должно быть числом' })
  endTimeOffset?: number;
}

/**
 * DTO для ответа с данными серии
 */
export class SeriesDto {
  id: number;
  trainingId: number;
  beginTimeOffset?: number;
  endTimeOffset?: number;
  shots?: ShotDto[];
  createdAt: Date;
  updatedAt: Date;
}
