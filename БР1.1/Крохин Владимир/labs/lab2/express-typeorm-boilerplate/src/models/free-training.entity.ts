import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { TargetEntity } from './target.entity';
import { WeaponTypeEntity } from './weapon-type.entity';
import { TrainingEntity } from './training.entity';

@Entity('free_trainings')
export class FreeTrainingEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => TrainingEntity)
    @JoinColumn({ name: 'training_id' })
    training: TrainingEntity;

    @Column({ name: 'training_id' })
    training_id: number;

    @ManyToOne(() => TargetEntity, (target) => target.free_trainings)
    @JoinColumn({ name: 'target_id' })
    target: TargetEntity;

    @Column({ name: 'target_id', nullable: true })
    target_id: number;
}
