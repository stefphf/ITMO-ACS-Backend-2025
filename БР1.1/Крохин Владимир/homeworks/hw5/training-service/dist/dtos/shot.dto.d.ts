/**
 * DTO для создания выстрела
 */
export declare class CreateShotDto {
  seriesId: number;
  order: number;
  x: number;
  y: number;
  score: number;
  timeOffset?: number;
}
/**
 * DTO для обновления выстрела
 */
export declare class UpdateShotDto {
  order?: number;
  x?: number;
  y?: number;
  score?: number;
  timeOffset?: number;
}
/**
 * DTO для ответа с данными выстрела
 */
export declare class ShotDto {
  id: number;
  seriesId: number;
  order: number;
  x: number;
  y: number;
  score: number;
  timeOffset?: number;
  createdAt: string;
  updatedAt: string;
}
