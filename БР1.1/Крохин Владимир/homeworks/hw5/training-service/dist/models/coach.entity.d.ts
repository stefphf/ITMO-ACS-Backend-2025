import { BaseEntity } from './base.entity';
import { AthleteEntity } from './athlete.entity';
/**
 * Сущность тренера
 */
export declare class CoachEntity extends BaseEntity {
  id: number;
  userId: number;
  athletes: AthleteEntity[];
}
