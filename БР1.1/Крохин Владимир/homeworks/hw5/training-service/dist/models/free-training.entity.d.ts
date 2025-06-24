import { BaseEntity } from './base.entity';
import { TrainingEntity } from './training.entity';
/**
 * Сущность свободной тренировки
 */
export declare class FreeTrainingEntity extends BaseEntity {
  id: number;
  training_id: number;
  training: TrainingEntity;
  weapon_type_id: number;
  target_id: number;
}
