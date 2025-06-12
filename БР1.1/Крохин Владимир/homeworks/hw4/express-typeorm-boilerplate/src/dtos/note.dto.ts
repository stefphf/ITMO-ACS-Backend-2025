import { IsNumber, IsString, IsOptional, IsDate } from 'class-validator';
import { OpenAPI } from 'routing-controllers-openapi';

@OpenAPI({ description: 'DTO для заметки' })
export class NoteDto {
    @IsNumber()
    id: number;

    @IsNumber()
    userId: number;

    @IsDate()
    createdAt: Date;

    @IsDate()
    @IsOptional()
    editedAt?: Date;

    @IsString()
    content: string;
}

@OpenAPI({ description: 'DTO для создания заметки' })
export class CreateNoteDto {
    @IsNumber()
    userId: number;

    @IsString()
    content: string;
}

@OpenAPI({ description: 'DTO для обновления заметки' })
export class UpdateNoteDto {
    @IsNumber()
    id: number;

    @IsString()
    @IsOptional()
    content?: string;
}
