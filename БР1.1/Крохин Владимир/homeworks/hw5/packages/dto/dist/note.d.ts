export interface NoteDto {
  id: number;
  content: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface CreateNoteDto {
  content: string;
}
export interface UpdateNoteDto {
  content?: string;
}
export interface TrainingNoteDto extends NoteDto {
  trainingId: number;
}
export interface CreateTrainingNoteDto extends CreateNoteDto {
  trainingId: number;
}
export interface UpdateTrainingNoteDto extends UpdateNoteDto {
  trainingId?: number;
}
export interface SeriesNoteDto extends NoteDto {
  seriesId: number;
}
export interface CreateSeriesNoteDto extends CreateNoteDto {
  seriesId: number;
}
export interface UpdateSeriesNoteDto extends UpdateNoteDto {
  seriesId?: number;
}
