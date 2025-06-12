import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { TrainingEntity } from './training.entity';

@Entity('notes')
export class NoteEntity {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: string;

    @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @Column({ type: 'int' })
    user_id: number;

    @ManyToOne(() => TrainingEntity, (training) => training.notes, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'training_id' })
    training: TrainingEntity;

    @Column({ type: 'int' })
    training_id: number;

    @Column({ type: 'timestamp' })
    created_at: Date;

    @Column({ type: 'timestamp', nullable: true })
    edited_at: Date;

    @Column({ type: 'text' })
    content: string;
}
