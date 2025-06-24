import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TrainingEntity } from './training.entity';

@Entity('weapon_types')
export class WeaponTypeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @OneToMany(() => TrainingEntity, (training) => training.weapon_type)
    trainings: TrainingEntity[];
}
