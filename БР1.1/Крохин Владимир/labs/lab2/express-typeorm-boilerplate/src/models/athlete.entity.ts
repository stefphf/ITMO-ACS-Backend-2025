import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    ManyToMany,
    JoinTable,
    OneToMany,
    JoinColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { CoachEntity } from './coach.entity';
import { TrainingEntity } from './training.entity';

@Entity('athletes')
export class AthleteEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @ManyToOne(() => UserEntity, (user) => user.athletes, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @Column({ type: 'int' })
    user_id: number;

    @ManyToMany(() => CoachEntity, (coach) => coach.athletes)
    @JoinTable({
        name: 'athlete_coaches',
        joinColumn: { name: 'athlete_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'coach_id', referencedColumnName: 'id' },
    })
    coaches: CoachEntity[];

    @OneToMany(() => TrainingEntity, (training) => training.athlete)
    trainings: TrainingEntity[];
}
