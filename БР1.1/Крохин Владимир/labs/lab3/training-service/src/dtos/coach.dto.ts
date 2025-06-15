import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, IsDate } from 'class-validator';
import { OpenAPI } from 'routing-controllers-openapi';

/**
 * DTO для создания тренера
 */
@OpenAPI({})
export class CreateCoachDto {
  @IsNumber({}, { message: 'ID пользователя должен быть числом' })
  @IsNotEmpty({ message: 'ID пользователя обязателен' })
  userId: number;
}

/**
 * DTO для ответа с данными тренера
 */
@OpenAPI({})
export class CoachDto {
  @IsNumber({}, { message: 'ID должен быть числом' })
  id: number;

  @IsNumber({}, { message: 'ID пользователя должен быть числом' })
  userId: number;

  @IsArray({ message: 'ID спортсменов должны быть массивом' })
  @IsNumber({}, { each: true, message: 'ID спортсмена должен быть числом' })
  athletesIds: number[];

  @IsString({ message: 'Дата создания должна быть строкой' })
  createdAt: string;

  @IsString({ message: 'Дата обновления должна быть строкой' })
  updatedAt: string;
}
