/**
 * Базовая заметка
 */
export declare class NoteDto {
  id: number;
  userId: number;
  content: string;
  createdAt: string;
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
export declare class UpdateTrainingNoteDto {
  content: string;
}
/**
 * DTO для ответа с данными заметки тренировки
 */
export declare class TrainingNoteDto {
  id: number;
  noteId: number;
  trainingId: number;
  note: NoteDto;
}
/**
 * DTO для создания обычной заметки
 */
export declare class CreateNoteDto {
  userId: number;
  content: string;
}
/**
 * DTO для обновления обычной заметки
 */
export declare class UpdateNoteDto {
  content: string;
}
