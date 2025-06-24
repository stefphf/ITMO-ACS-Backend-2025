import { IsString, IsNumber, IsOptional, IsDate } from 'class-validator';

export class NoteDto {
  @IsNumber()
  id: number;

  @IsString()
  content: string;

  @IsNumber()
  userId: number;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}

export class CreateNoteDto {
  @IsString()
  content: string;
}

export class UpdateNoteDto {
  @IsString()
  @IsOptional()
  content?: string;
}
