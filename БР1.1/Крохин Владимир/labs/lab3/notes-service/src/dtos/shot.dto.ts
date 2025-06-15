import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

/**
 * DTO для создания выстрела
 */
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
export class ShotDto {
  id: number;
  seriesId: number;
  order: number;
  x: number;
  y: number;
  score: number;
  timeOffset?: number;
  createdAt: Date;
  updatedAt: Date;
}
