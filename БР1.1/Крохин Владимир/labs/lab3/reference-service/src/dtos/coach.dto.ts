import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

/**
 * DTO для создания тренера
 */
export class CreateCoachDto {
  @IsNumber({}, { message: 'ID пользователя должен быть числом' })
  @IsNotEmpty({ message: 'ID пользователя обязателен' })
  userId: number;
}

/**
 * DTO для ответа с данными тренера
 */
export class CoachDto {
  id: number;
  userId: number;
  athletesIds: number[];
  createdAt: Date;
  updatedAt: Date;
}
