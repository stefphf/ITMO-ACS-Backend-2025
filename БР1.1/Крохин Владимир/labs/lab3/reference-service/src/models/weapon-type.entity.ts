import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ExerciseEntity } from './exercise.entity';

/**
 * Сущность типа оружия
 */
@Entity('weapon_types')
export class WeaponTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true, type: 'text' })
  description: string | null;

  @OneToMany(() => ExerciseEntity, exercise => exercise.weaponType)
  exercises: ExerciseEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
