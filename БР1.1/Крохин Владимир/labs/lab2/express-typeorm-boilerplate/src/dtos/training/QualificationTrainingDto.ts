import { SeriesDto } from '../series/SeriesDto';
import { NoteDto } from '../note/NoteDto';

export interface QualificationTrainingDto {
    id?: number;
    startTimeStamp: Date;
    endTimeStamp: Date | null;
    athleteId: number;
    exerciseId: number;
    series: SeriesDto[];
    notes: NoteDto[];
}
