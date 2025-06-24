/**
 * DTO для создания тренера
 */
export declare class CreateCoachDto {
  userId: number;
}
/**
 * DTO для ответа с данными тренера
 */
export declare class CoachDto {
  id: number;
  userId: number;
  athletesIds: number[];
  createdAt: string;
  updatedAt: string;
}
