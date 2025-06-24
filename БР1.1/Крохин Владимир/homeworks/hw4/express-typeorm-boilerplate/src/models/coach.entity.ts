import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    ManyToMany,
    OneToMany,
    JoinColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { AthleteEntity } from './athlete.entity';
import { TrainingEntity } from './training.entity';

@Entity('coaches')
export class CoachEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @ManyToOne(() => UserEntity, (user) => user.coaches, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @Column({ type: 'int' })
    user_id: number;

    @ManyToMany(() => AthleteEntity, (athlete) => athlete.coaches)
    athletes: AthleteEntity[];
}
