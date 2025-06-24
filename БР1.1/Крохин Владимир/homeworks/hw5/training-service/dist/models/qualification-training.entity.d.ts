import { BaseEntity } from './base.entity';
import { TrainingEntity } from './training.entity';
/**
 * Сущность квалификационной тренировки
 */
export declare class QualificationTrainingEntity extends BaseEntity {
  id: number;
  training_id: number;
  training: TrainingEntity;
  exercise_id: number;
}
