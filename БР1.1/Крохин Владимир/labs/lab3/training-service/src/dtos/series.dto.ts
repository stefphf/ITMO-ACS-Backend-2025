import { IsArray, IsDate, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ShotDto } from './shot.dto';
import { OpenAPI } from 'routing-controllers-openapi';

/**
 * DTO для создания серии
 */
@OpenAPI({})
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
@OpenAPI({})
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
@OpenAPI({})
export class SeriesDto {
  @IsNumber({}, { message: 'ID должен быть числом' })
  id: number;

  @IsNumber({}, { message: 'ID тренировки должен быть числом' })
  trainingId: number;

  @IsOptional()
  @IsNumber({}, { message: 'Начальное смещение времени должно быть числом' })
  beginTimeOffset?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Конечное смещение времени должно быть числом' })
  endTimeOffset?: number;

  @IsOptional()
  @IsArray({ message: 'Список выстрелов должен быть массивом' })
  shots?: ShotDto[];

  @IsString({ message: 'Дата создания должна быть строкой' })
  createdAt: string;

  @IsString({ message: 'Дата обновления должна быть строкой' })
  updatedAt: string;
}
