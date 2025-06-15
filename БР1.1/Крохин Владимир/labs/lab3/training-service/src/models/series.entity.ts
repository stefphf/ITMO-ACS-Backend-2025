import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { TrainingEntity } from './training.entity';
import { ShotEntity } from './shot.entity';

/**
 * Сущность серии
 */
@Entity('series')
export class SeriesEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'training_id' })
  trainingId: number;

  @ManyToOne(() => TrainingEntity, training => training.series)
  training: TrainingEntity;

  @Column({ name: 'training_type', type: 'varchar' })
  trainingType: 'qualification' | 'free';

  @Column({ name: 'begin_time_offset', type: 'float', nullable: true })
  beginTimeOffset?: number;

  @Column({ name: 'end_time_offset', type: 'float', nullable: true })
  endTimeOffset?: number;

  @OneToMany(() => ShotEntity, shot => shot.series)
  shots: ShotEntity[];

  @Column({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @Column({ name: 'updated_at', type: 'timestamp' })
  updated_at: Date;
}
