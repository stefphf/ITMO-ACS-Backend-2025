import { SeriesEntity } from './series.entity';
/**
 * Сущность тренировки
 */
export declare class TrainingEntity {
  id: number;
  type: 'qualification' | 'free';
  series: SeriesEntity[];
  createdAt: Date;
  updatedAt: Date;
}
export declare class FreeTrainingEntity extends TrainingEntity {
  weaponTypeId: number;
  targetId: number;
}
export declare class QualificationTrainingEntity extends TrainingEntity {
  exerciseId: number;
}
