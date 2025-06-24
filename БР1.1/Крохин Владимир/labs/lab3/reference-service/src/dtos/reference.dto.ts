import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { OpenAPI } from 'routing-controllers-openapi';

/**
 * DTO для создания мишени
 */
@OpenAPI({
  description: 'DTO для создания мишени',
  example: {
    name: 'Мишень 1',
    image: 'https://example.com/target.png',
    description: 'Описание мишени',
  },
})
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
@OpenAPI({
  description: 'DTO для обновления мишени',
  example: {
    name: 'Новое имя',
    image: 'https://example.com/target2.png',
    description: 'Новое описание',
  },
})
export class UpdateTargetDto {
  @IsString({ message: 'Название должно быть строкой' })
  @IsOptional()
  name?: string;

  @IsString({ message: 'URL изображения должен быть строкой' })
  @IsOptional()
  image?: string; // URL изображения мишени

  @IsString({ message: 'Описание должно быть строкой' })
  @IsOptional()
  description?: string;
}

/**
 * DTO для ответа с данными мишени
 */
@OpenAPI({
  description: 'DTO для ответа с данными мишени',
  example: {
    id: 1,
    name: 'Мишень 1',
    image: 'https://example.com/target.png',
    description: 'Описание мишени',
    createdAt: '2024-06-01T12:00:00.000Z',
    updatedAt: '2024-06-01T12:00:00.000Z',
  },
  schema: {
    type: 'object',
    properties: {
      id: { type: 'number' },
      name: { type: 'string' },
      image: { type: 'string', nullable: true },
      description: { type: 'string', nullable: true },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
    },
    required: ['id', 'name', 'createdAt', 'updatedAt'],
  },
})
export class TargetDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  image?: string; // URL изображения мишени

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}

/**
 * DTO для создания типа оружия
 */
@OpenAPI({
  description: 'DTO для создания типа оружия',
  example: {
    name: 'Пистолет',
    description: 'Описание типа оружия',
  },
})
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
@OpenAPI({
  description: 'DTO для обновления типа оружия',
  example: {
    name: 'Новое имя',
    description: 'Новое описание',
  },
})
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
@OpenAPI({
  description: 'DTO для ответа с данными типа оружия',
  example: {
    id: 1,
    name: 'Пистолет',
    description: 'Описание типа оружия',
    createdAt: '2024-06-01T12:00:00.000Z',
    updatedAt: '2024-06-01T12:00:00.000Z',
  },
  schema: {
    type: 'object',
    properties: {
      id: { type: 'number' },
      name: { type: 'string' },
      description: { type: 'string', nullable: true },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
    },
    required: ['id', 'name', 'createdAt', 'updatedAt'],
  },
})
export class WeaponTypeDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}

export class ExerciseDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  weaponTypeId: number;

  @IsNumber()
  targetId: number;
}

export class CreateExerciseDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  weaponTypeId: number;

  @IsNumber()
  targetId: number;
}

export class UpdateExerciseDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  weaponTypeId?: number;

  @IsNumber()
  @IsOptional()
  targetId?: number;
}
