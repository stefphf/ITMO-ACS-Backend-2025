import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { AthleteEntity } from './athlete.entity';
import { CoachEntity } from './coach.entity';
import { WeaponTypeEntity } from './weapon-type.entity';
import { TargetEntity } from './target.entity';
import { SeriesEntity } from './series.entity';
import { TrainingNotesEntity } from './training-notes.entity';
import { NoteEntity } from './note.entity';

@Entity({ name: 'trainings' })
export class TrainingEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    id!: number;

    @ManyToOne(() => AthleteEntity, (athlete) => athlete.trainings, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'athlete_id' })
    athlete!: AthleteEntity;

    @Column({ type: 'int' })
    athlete_id!: number;

    @Column({ type: 'timestamp' })
    start_ts!: Date;

    @Column({ type: 'timestamp', nullable: true })
    end_ts!: Date | null;

    @ManyToOne(() => WeaponTypeEntity, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'weapon_type_id' })
    weapon_type!: WeaponTypeEntity;

    @Column({ type: 'smallint', nullable: true })
    weapon_type_id!: number | null;

    @ManyToOne(() => TargetEntity, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'target_id' })
    target!: TargetEntity;

    @Column({ type: 'smallint', nullable: true })
    target_id!: number | null;

    @Column({ type: 'date', nullable: true })
    scheduled_date!: Date | null;

    @Column({ type: 'smallint', nullable: true })
    total_score!: number | null;

    @OneToMany(() => SeriesEntity, (series) => series.training, {
        cascade: true,
        eager: true,
    })
    series!: SeriesEntity[];

    @OneToMany(() => TrainingNotesEntity, (tn) => tn.training, {
        cascade: true,
        eager: true,
    })
    trainingNotes!: TrainingNotesEntity[];

    @OneToMany(() => NoteEntity, (note) => note.training, { cascade: true })
    notes!: NoteEntity[];

    // TODO: добавить связи с QualificationTraining, FreeTraining
}
