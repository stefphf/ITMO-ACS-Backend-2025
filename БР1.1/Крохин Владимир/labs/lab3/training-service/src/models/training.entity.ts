import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { SeriesEntity } from './series.entity';
import { AthleteEntity } from './athlete.entity';

/**
 * Сущность тренировки
 */
@Entity('trainings')
export class TrainingEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'athlete_id' })
  athleteId: number;

  @ManyToOne(() => AthleteEntity)
  @JoinColumn({ name: 'athlete_id' })
  athlete: AthleteEntity;

  @Column({ name: 'start_ts', type: 'timestamp' })
  start_ts: Date;

  @Column({ name: 'end_ts', type: 'timestamp', nullable: true })
  end_ts?: Date;

  @Column({ name: 'scheduled_date', type: 'date', nullable: true })
  scheduledDate?: Date;

  @Column({ name: 'total_score', type: 'float', nullable: true })
  totalScore?: number;

  @OneToMany(() => SeriesEntity, series => series.training)
  series: SeriesEntity[];
}

@Entity('free_trainings')
export class FreeTrainingEntity extends TrainingEntity {
  @Column({ name: 'weapon_type_id' })
  weaponTypeId: number;

  @Column({ name: 'target_id' })
  targetId: number;
}

@Entity('qualification_trainings')
export class QualificationTrainingEntity extends TrainingEntity {
  @Column({ name: 'exercise_id' })
  exerciseId: number;
}
