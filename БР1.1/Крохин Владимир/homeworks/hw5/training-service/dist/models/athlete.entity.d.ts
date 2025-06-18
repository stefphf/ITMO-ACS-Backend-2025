import { BaseEntity } from './base.entity';
import { CoachEntity } from './coach.entity';
/**
 * Сущность спортсмена
 */
export declare class AthleteEntity extends BaseEntity {
  id: number;
  userId: number;
  coaches: CoachEntity[];
}
