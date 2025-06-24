import { ShotDto } from './shot.dto';
/**
 * DTO для создания серии
 */
export declare class CreateSeriesDto {
  trainingId: number;
  trainingType: 'qualification' | 'free';
  beginTimeOffset?: number;
  endTimeOffset?: number;
  shots?: ShotDto[];
}
/**
 * DTO для обновления серии
 */
export declare class UpdateSeriesDto {
  beginTimeOffset?: number;
  endTimeOffset?: number;
}
/**
 * DTO для ответа с данными серии
 */
export declare class SeriesDto {
  id: number;
  trainingId: number;
  beginTimeOffset?: number;
  endTimeOffset?: number;
  shots?: ShotDto[];
  createdAt: string;
  updatedAt: string;
}
