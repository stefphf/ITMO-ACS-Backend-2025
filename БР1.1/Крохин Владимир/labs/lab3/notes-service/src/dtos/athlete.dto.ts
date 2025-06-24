import { IsArray, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

/**
 * DTO для создания спортсмена
 */
export class CreateAthleteDto {
  @IsNumber({}, { message: 'ID пользователя должен быть числом' })
  @IsNotEmpty({ message: 'ID пользователя обязателен' })
  userId: number;

  @IsArray({ message: 'ID тренеров должны быть массивом' })
  @IsOptional()
  coachIds?: number[];
}

/**
 * DTO для обновления спортсмена
 */
export class UpdateAthleteDto {
  @IsArray({ message: 'ID тренеров должны быть массивом' })
  @IsOptional()
  coachIds?: number[];
}

/**
 * DTO для ответа с данными спортсмена
 */
export class AthleteDto {
  id: number;
  userId: number;
  coachIds: number[];
  createdAt: Date;
  updatedAt: Date;
}
