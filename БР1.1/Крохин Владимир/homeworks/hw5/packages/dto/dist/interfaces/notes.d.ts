import { NoteDto } from 'src/note.dto';
export interface INotesService {
  getAllNotes(): Promise<NoteDto[]>;
  getNoteById(id: number): Promise<NoteDto>;
  createNote(noteData: Partial<NoteDto>): Promise<NoteDto>;
  updateNote(id: number, noteData: Partial<NoteDto>): Promise<NoteDto>;
  deleteNote(id: number): Promise<void>;
  getNotesByUserId(userId: number): Promise<NoteDto[]>;
}
