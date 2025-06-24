import { SeriesDto } from '../series/SeriesDto';
import { NoteDto } from '../note/NoteDto';

export interface FreeTrainingDto {
    id?: number;
    startTimeStamp: Date;
    endTimeStamp: Date | null;
    athleteId: number;
    weaponTypeId: number;
    targetId: number;
    series: SeriesDto[];
    notes: NoteDto[];
}
