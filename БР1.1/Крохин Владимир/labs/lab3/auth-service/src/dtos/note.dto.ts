import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

/**
 * Базовая заметка
 */
export class NoteDto {
  id: number;
  userId: number;
  content: string;
  createdAt: Date;
  editedAt: Date | null;
}

/**
 * DTO для создания заметки тренировки
 */
export interface CreateTrainingNoteDto {
  userId: number;
  trainingId: number;
  content: string;
}

/**
 * DTO для обновления заметки тренировки
 */
export class UpdateTrainingNoteDto {
  @IsString()
  @IsNotEmpty()
  content: string;
}

/**
 * DTO для ответа с данными заметки тренировки
 */
export class TrainingNoteDto {
  id: number;
  noteId: number;
  trainingId: number;
  note: NoteDto; // вложенный note
}

/**
 * DTO для создания обычной заметки
 */
export interface CreateNoteDto {
  userId: number;
  content: string; // без undefined
}

/**
 * DTO для обновления обычной заметки
 */
export interface UpdateNoteDto {
  content: string;
}

/**
 * DTO для создания заметки серии
 */
export interface CreateSeriesNoteDto {
  userId: number;
  seriesId: number;
  content: string; // без undefined
}

/**
 * DTO для обновления заметки серии
 */
export class UpdateSeriesNoteDto {
  @IsString()
  @IsOptional()
  content?: string;
}

/**
 * DTO для ответа с данными заметки серии
 */
export class SeriesNoteDto {
  id: number;
  noteId: number;
  seriesId: number;
  note: NoteDto; // вложенный note
}
