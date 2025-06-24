import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

/**
 * DTO для создания мишени
 */
export class CreateTargetDto {
  @IsString({ message: 'Название должно быть строкой' })
  @IsNotEmpty({ message: 'Название обязательно' })
  name: string;

  @IsString({ message: 'URL изображения должен быть строкой' })
  @IsOptional()
  image?: string; // URL изображения мишени

  @IsString({ message: 'Описание должно быть строкой' })
  @IsOptional()
  description?: string;
}

/**
 * DTO для обновления мишени
 */
export class UpdateTargetDto {
  @IsString({ message: 'Название должно быть строкой' })
  @IsOptional()
  name?: string;

  @IsString({ message: 'URL изображения должен быть строкой' })
  image?: string; // URL изображения мишени

  @IsString({ message: 'Описание должно быть строкой' })
  @IsOptional()
  description?: string;
}

/**
 * DTO для ответа с данными мишени
 */
export class TargetDto {
  id: number;
  name: string;
  description?: string;
  image?: string; // URL изображения мишени
  createdAt: Date;
  updatedAt: Date;
}

/**
 * DTO для создания типа оружия
 */
export class CreateWeaponTypeDto {
  @IsString({ message: 'Название должно быть строкой' })
  @IsNotEmpty({ message: 'Название обязательно' })
  name: string;

  @IsString({ message: 'Описание должно быть строкой' })
  @IsOptional()
  description?: string;
}

/**
 * DTO для обновления типа оружия
 */
export class UpdateWeaponTypeDto {
  @IsString({ message: 'Название должно быть строкой' })
  @IsOptional()
  name?: string;

  @IsString({ message: 'Описание должно быть строкой' })
  @IsOptional()
  description?: string;
}

/**
 * DTO для ответа с данными типа оружия
 */
export class WeaponTypeDto {
  id: number;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * DTO для создания упражнения
 */
export class CreateExerciseDto {
  @IsString({ message: 'Название должно быть строкой' })
  @IsNotEmpty({ message: 'Название обязательно' })
  name: string;

  @IsNumber({}, { message: 'ID типа оружия должен быть числом' })
  @IsNotEmpty({ message: 'ID типа оружия обязателен' })
  weaponTypeId: number;

  @IsNumber({}, { message: 'ID мишени должен быть числом' })
  @IsNotEmpty({ message: 'ID мишени обязателен' })
  targetId: number;

  @IsNumber({}, { message: 'Количество выстрелов должно быть числом' })
  @IsOptional()
  shots?: number;

  @IsNumber({}, { message: 'Количество выстрелов в серии должно быть числом' })
  @IsOptional()
  shotsInSeries?: number;

  @IsNumber({}, { message: 'Продолжительность должна быть числом' })
  @IsOptional()
  duration?: number;

  @IsString({ message: 'Описание должно быть строкой' })
  @IsOptional()
  description?: string;
}

/**
 * DTO для обновления упражнения
 */
export class UpdateExerciseDto {
  @IsString({ message: 'Название должно быть строкой' })
  @IsOptional()
  name?: string;

  @IsNumber({}, { message: 'ID типа оружия должен быть числом' })
  @IsOptional()
  weaponTypeId?: number;

  @IsNumber({}, { message: 'ID мишени должен быть числом' })
  @IsOptional()
  targetId?: number;

  @IsNumber({}, { message: 'Количество выстрелов должно быть числом' })
  @IsOptional()
  shots?: number;

  @IsNumber({}, { message: 'Количество выстрелов в серии должно быть числом' })
  @IsOptional()
  shotsInSeries?: number;

  @IsNumber({}, { message: 'Продолжительность должна быть числом' })
  @IsOptional()
  duration?: number;

  @IsString({ message: 'Описание должно быть строкой' })
  @IsOptional()
  description?: string;
}

/**
 * DTO для ответа с данными упражнения
 */
export class ExerciseDto {
  id: number;
  name: string;
  weaponTypeId: number;
  targetId: number;
  shots?: number;
  shotsInSeries?: number;
  duration?: number;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
