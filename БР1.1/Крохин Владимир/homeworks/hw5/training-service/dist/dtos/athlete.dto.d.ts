/**
 * DTO для создания спортсмена
 */
export declare class CreateAthleteDto {
  userId: number;
  coachIds?: number[];
}
/**
 * DTO для обновления спортсмена
 */
export declare class UpdateAthleteDto {
  coachIds?: number[];
}
/**
 * DTO для ответа с данными спортсмена
 */
export declare class AthleteDto {
  id: number;
  userId: number;
  coachIds: number[];
  createdAt: string;
  updatedAt: string;
}
