import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { AthleteEntity } from './athlete.entity';

/**
 * Сущность тренера
 */
@Entity('coaches')
export class CoachEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'user_id' })
  userId!: number;

  @Column({ name: 'first_name', nullable: true })
  firstName!: string;

  @Column({ name: 'last_name', nullable: true })
  lastName!: string;

  @ManyToMany(() => AthleteEntity, athlete => athlete.coaches)
  athletes!: AthleteEntity[];
}
