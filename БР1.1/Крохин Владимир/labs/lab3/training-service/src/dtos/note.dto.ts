import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { OpenAPI } from 'routing-controllers-openapi';

/**
 * Базовая заметка
 */
@OpenAPI({})
export class NoteDto {
  @IsNumber({}, { message: 'ID должен быть числом' })
  id: number;

  @IsNumber({}, { message: 'ID пользователя должен быть числом' })
  userId: number;

  @IsString({ message: 'Содержимое должно быть строкой' })
  @IsNotEmpty({ message: 'Содержимое обязательно' })
  content: string;

  @IsString({ message: 'Дата создания должна быть строкой' })
  createdAt: string;

  @IsString({ message: 'Дата редактирования должна быть строкой' })
  editedAt: string | null;
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
@OpenAPI({})
export class UpdateTrainingNoteDto {
  @IsString({ message: 'Содержание должно быть строкой' })
  @IsNotEmpty({ message: 'Содержание обязательно' })
  content: string;
}

/**
 * DTO для ответа с данными заметки тренировки
 */
@OpenAPI({})
export class TrainingNoteDto {
  id: number;
  noteId: number;
  trainingId: number;
  note: NoteDto; // вложенный note
}

/**
 * DTO для создания обычной заметки
 */
@OpenAPI({})
export class CreateNoteDto {
  @IsNumber({}, { message: 'ID пользователя должен быть числом' })
  @IsNotEmpty({ message: 'ID пользователя обязателен' })
  userId: number;

  @IsString({ message: 'Содержимое должно быть строкой' })
  @IsNotEmpty({ message: 'Содержимое обязательно' })
  content: string;
}

/**
 * DTO для обновления обычной заметки
 */
@OpenAPI({})
export class UpdateNoteDto {
  @IsString({ message: 'Содержимое должно быть строкой' })
  @IsNotEmpty({ message: 'Содержимое обязательно' })
  content: string;
}

/**
 * DTO для создания заметки серии
 */
@OpenAPI({})
export class CreateSeriesNoteDto {
  @IsNumber({}, { message: 'ID пользователя должен быть числом' })
  @IsNotEmpty({ message: 'ID пользователя обязателен' })
  userId: number;

  @IsNumber({}, { message: 'ID серии должен быть числом' })
  @IsNotEmpty({ message: 'ID серии обязателен' })
  seriesId: number;

  @IsString({ message: 'Содержимое должно быть строкой' })
  @IsNotEmpty({ message: 'Содержимое обязательно' })
  content: string;
}

/**
 * DTO для обновления заметки серии
 */
@OpenAPI({})
export class UpdateSeriesNoteDto {
  @IsString({ message: 'Содержание должно быть строкой' })
  @IsNotEmpty({ message: 'Содержание обязательно' })
  content: string;
}

/**
 * DTO для ответа с данными заметки серии
 */
@OpenAPI({})
export class SeriesNoteDto {
  @IsNumber({}, { message: 'ID должен быть числом' })
  id: number;

  @IsNumber({}, { message: 'ID заметки должен быть числом' })
  noteId: number;

  @IsNumber({}, { message: 'ID серии должен быть числом' })
  seriesId: number;

  @IsNotEmpty({ message: 'Заметка обязательна' })
  note: NoteDto;
}
