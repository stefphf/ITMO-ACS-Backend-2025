import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { NoteEntity } from './note.entity';

/**
 * Сущность заметки к серии
 */
@Entity('series_notes')
export class SeriesNoteEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  note_id: number;

  @ManyToOne(() => NoteEntity)
  @JoinColumn({ name: 'note_id' })
  note: NoteEntity;

  @Column({ type: 'bigint' })
  series_id: number;
}
