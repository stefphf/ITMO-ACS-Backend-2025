import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

/**
 * Базовая заметка
 */
export class NoteDto {
  @IsNumber()
  id: number;

  @IsNumber()
  userId: number;

  @IsString()
  content: string;

  @IsDate()
  createdAt: Date;

  @IsOptional()
  @IsDate()
  editedAt: Date | null;
}

/**
 * DTO для создания заметки тренировки
 */
export class CreateTrainingNoteDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  trainingId: number;

  @IsString()
  @IsNotEmpty()
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
export class CreateNoteDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  content: string;
}

/**
 * DTO для обновления обычной заметки
 */
export class UpdateNoteDto {
  @IsString()
  @IsNotEmpty()
  content: string;
}

/**
 * DTO для создания заметки серии
 */
export class CreateSeriesNoteDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  seriesId: number;

  @IsString()
  @IsNotEmpty()
  content: string;
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
