import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { OpenAPI } from 'routing-controllers-openapi';

/**
 * DTO для создания упражнения
 */
@OpenAPI({
  description: 'DTO для создания упражнения',
  example: {
    name: 'Стрельба по мишени',
    weaponTypeId: 2,
    targetId: 3,
    description: 'Описание упражнения',
  },
})
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

  @IsString({ message: 'Описание должно быть строкой' })
  @IsOptional()
  description?: string;
}

/**
 * DTO для обновления упражнения
 */
@OpenAPI({
  description: 'DTO для обновления упражнения',
  example: {
    name: 'Новое название',
    weaponTypeId: 2,
    targetId: 3,
    description: 'Новое описание',
  },
})
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

  @IsString({ message: 'Описание должно быть строкой' })
  @IsOptional()
  description?: string;
}

/**
 * DTO для ответа с данными упражнения
 */
@OpenAPI({
  schema: {
    type: 'object',
    properties: {
      id: { type: 'number' },
      name: { type: 'string' },
      weaponTypeId: { type: 'number' },
      targetId: { type: 'number' },
      description: { type: 'string', nullable: true },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
    },
  },
})
export class ExerciseDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsNumber()
  weaponTypeId: number;

  @IsNumber()
  targetId: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
