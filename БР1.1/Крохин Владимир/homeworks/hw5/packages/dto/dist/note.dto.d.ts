export declare class NoteDto {
  id: number;
  userId: number;
  content: string;
  trainingId?: number;
  seriesId?: number;
  shotId?: number;
  createdAt: string;
  updatedAt: string;
}
export declare class CreateNoteDto {
  userId: number;
  content: string;
  trainingId?: number;
  seriesId?: number;
  shotId?: number;
}
export declare class UpdateNoteDto {
  content?: string;
}
export declare class TrainingNoteDto extends NoteDto {
  trainingId: number;
  noteId: number;
}
export declare class SeriesNoteDto extends NoteDto {
  seriesId: number;
  noteId: number;
}
export declare class ShotNoteDto extends NoteDto {
  shotId: number;
}
export declare class CreateTrainingNoteDto extends CreateNoteDto {
  trainingId: number;
}
export declare class CreateSeriesNoteDto extends CreateNoteDto {
  seriesId: number;
}
export declare class CreateShotNoteDto extends CreateNoteDto {
  shotId: number;
}
