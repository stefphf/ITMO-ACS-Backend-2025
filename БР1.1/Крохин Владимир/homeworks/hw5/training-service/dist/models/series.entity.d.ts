import { TrainingEntity } from './training.entity';
import { ShotEntity } from './shot.entity';
/**
 * Сущность серии
 */
export declare class SeriesEntity {
  id: number;
  trainingId: number;
  training: TrainingEntity;
  shots: ShotEntity[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
}
