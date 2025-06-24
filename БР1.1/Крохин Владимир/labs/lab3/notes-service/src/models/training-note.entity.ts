import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { NoteEntity } from './note.entity';

/**
 * Сущность заметки к тренировке
 */
@Entity('training_notes')
export class TrainingNoteEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'bigint' })
  note_id: number;

  @ManyToOne(() => NoteEntity)
  @JoinColumn({ name: 'note_id' })
  note: NoteEntity;

  @Column({ type: 'int' })
  training_id: number;
}
