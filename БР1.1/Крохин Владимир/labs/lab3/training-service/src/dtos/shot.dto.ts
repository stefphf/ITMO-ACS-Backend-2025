import { IsNotEmpty, IsNumber, IsOptional, IsString, IsDate } from 'class-validator';
import { OpenAPI } from 'routing-controllers-openapi';

/**
 * DTO для создания выстрела
 */
@OpenAPI({})
export class CreateShotDto {
  @IsNumber({}, { message: 'ID серии должен быть числом' })
  @IsNotEmpty({ message: 'ID серии обязателен' })
  seriesId: number;

  @IsNumber({}, { message: 'Порядковый номер должен быть числом' })
  @IsNotEmpty({ message: 'Порядковый номер обязателен' })
  order: number;

  @IsNumber({}, { message: 'Координата X должна быть числом' })
  @IsNotEmpty({ message: 'Координата X обязательна' })
  x: number;

  @IsNumber({}, { message: 'Координата Y должна быть числом' })
  @IsNotEmpty({ message: 'Координата Y обязательна' })
  y: number;

  @IsNumber({}, { message: 'Очки должны быть числом' })
  @IsNotEmpty({ message: 'Очки обязательны' })
  score: number;

  @IsNumber({}, { message: 'Смещение времени должно быть числом' })
  @IsOptional()
  timeOffset?: number;
}

/**
 * DTO для обновления выстрела
 */
@OpenAPI({})
export class UpdateShotDto {
  @IsNumber({}, { message: 'Порядковый номер должен быть числом' })
  @IsOptional()
  order?: number;

  @IsNumber({}, { message: 'Координата X должна быть числом' })
  @IsOptional()
  x?: number;

  @IsNumber({}, { message: 'Координата Y должна быть числом' })
  @IsOptional()
  y?: number;

  @IsNumber({}, { message: 'Очки должны быть числом' })
  @IsOptional()
  score?: number;

  @IsNumber({}, { message: 'Смещение времени должно быть числом' })
  @IsOptional()
  timeOffset?: number;
}

/**
 * DTO для ответа с данными выстрела
 */
@OpenAPI({})
export class ShotDto {
  @IsNumber({}, { message: 'ID должен быть числом' })
  id: number;

  @IsNumber({}, { message: 'ID серии должен быть числом' })
  seriesId: number;

  @IsNumber({}, { message: 'Порядковый номер должен быть числом' })
  order: number;

  @IsNumber({}, { message: 'Координата X должна быть числом' })
  x: number;

  @IsNumber({}, { message: 'Координата Y должна быть числом' })
  y: number;

  @IsNumber({}, { message: 'Очки должны быть числом' })
  score: number;

  @IsOptional()
  @IsNumber({}, { message: 'Смещение времени должно быть числом' })
  timeOffset?: number;

  @IsString({ message: 'Дата создания должна быть строкой' })
  createdAt: string;

  @IsString({ message: 'Дата обновления должна быть строкой' })
  updatedAt: string;
}
