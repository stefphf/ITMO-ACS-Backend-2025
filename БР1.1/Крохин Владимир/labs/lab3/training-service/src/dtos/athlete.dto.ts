import { IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { OpenAPI } from 'routing-controllers-openapi';

/**
 * DTO для создания спортсмена
 */
@OpenAPI({
  schema: {
    type: 'object',
    properties: {
      userId: { type: 'number', description: 'ID пользователя' },
      coachIds: {
        type: 'array',
        items: { type: 'number' },
        description: 'ID тренеров',
      },
    },
    required: ['userId'],
  },
})
export class CreateAthleteDto {
  @IsNumber({}, { message: 'ID пользователя должен быть числом' })
  @IsNotEmpty({ message: 'ID пользователя обязателен' })
  userId: number;

  @IsArray({ message: 'ID тренеров должны быть массивом' })
  @IsNumber({}, { each: true, message: 'ID тренера должен быть числом' })
  @IsOptional()
  coachIds?: number[];
}

/**
 * DTO для обновления спортсмена
 */
@OpenAPI({
  schema: {
    type: 'object',
    properties: {
      coachIds: {
        type: 'array',
        items: { type: 'number' },
        description: 'ID тренеров',
      },
    },
  },
})
export class UpdateAthleteDto {
  @IsArray({ message: 'ID тренеров должны быть массивом' })
  @IsNumber({}, { each: true, message: 'ID тренера должен быть числом' })
  @IsOptional()
  coachIds?: number[];
}

/**
 * DTO для ответа с данными спортсмена
 */
@OpenAPI({
  schema: {
    type: 'object',
    properties: {
      id: { type: 'number', description: 'ID спортсмена' },
      userId: { type: 'number', description: 'ID пользователя' },
      coachIds: {
        type: 'array',
        items: { type: 'number' },
        description: 'ID тренеров',
      },
      createdAt: { type: 'string', format: 'date-time', description: 'Дата создания' },
      updatedAt: { type: 'string', format: 'date-time', description: 'Дата обновления' },
    },
    required: ['id', 'userId', 'coachIds', 'createdAt', 'updatedAt'],
  },
})
export class AthleteDto {
  @IsNumber({}, { message: 'ID должен быть числом' })
  id: number;

  @IsNumber({}, { message: 'ID пользователя должен быть числом' })
  userId: number;

  @IsArray({ message: 'ID тренеров должны быть массивом' })
  @IsNumber({}, { each: true, message: 'ID тренера должен быть числом' })
  coachIds: number[];

  @IsString({ message: 'Дата создания должна быть строкой' })
  createdAt: string;

  @IsString({ message: 'Дата обновления должна быть строкой' })
  updatedAt: string;
}
