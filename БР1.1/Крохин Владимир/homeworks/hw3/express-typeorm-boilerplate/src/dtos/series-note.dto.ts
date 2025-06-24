import { IsNumber, IsString, IsOptional } from 'class-validator';
import { OpenAPI } from 'routing-controllers-openapi';

@OpenAPI({ description: 'DTO для заметки серии' })
export class SeriesNoteDto {
    @IsNumber()
    id: number;

    @IsNumber()
    noteId: number;
}

@OpenAPI({ description: 'DTO для создания заметки серии' })
export class CreateSeriesNoteDto {
    @IsNumber()
    seriesId: number;

    @IsString()
    content: string;
}
