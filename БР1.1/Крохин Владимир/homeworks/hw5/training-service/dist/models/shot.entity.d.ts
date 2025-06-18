import { SeriesEntity } from './series.entity';
/**
 * Сущность выстрела
 */
export declare class ShotEntity {
  id: number;
  seriesId: number;
  series: SeriesEntity;
  order: number;
  score: number;
  x: number;
  y: number;
  createdAt: Date;
  updatedAt: Date;
}
