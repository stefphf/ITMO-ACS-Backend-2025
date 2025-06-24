import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { SeriesEntity } from './series.entity';

/**
 * Сущность выстрела
 */
@Entity('shots')
export class ShotEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'series_id' })
  seriesId: number;

  @ManyToOne(() => SeriesEntity, series => series.shots)
  series: SeriesEntity;

  @Column({ name: 'order' })
  order: number;

  @Column({ name: 'x', type: 'float' })
  x: number;

  @Column({ name: 'y', type: 'float' })
  y: number;

  @Column({ name: 'score', type: 'float' })
  score: number;

  @Column({ name: 'time_offset', type: 'float', nullable: true })
  timeOffset?: number;

  @Column({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @Column({ name: 'updated_at', type: 'timestamp' })
  updated_at: Date;
}
