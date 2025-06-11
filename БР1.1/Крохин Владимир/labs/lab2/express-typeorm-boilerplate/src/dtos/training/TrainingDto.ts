import { SeriesDto } from '../series/SeriesDto';
import { NoteDto } from '../note/NoteDto';

export interface TrainingDto {
    id: number | null;
    startTimeStamp: Date;
    endTimeStamp: Date | null;
    series: SeriesDto[];
    notes: NoteDto[];
    type: 'qualification' | 'free';
}

export interface TrainingStatisticsDto {
    totalSeries: number;
    totalShots: number;
    averageScore: number;
    averageHitPoint: number;
    averageHoleSize: number;
    bestScore: number;
    worstScore: number;
    completionRate: number;
    averageSeriesPerTraining: number;
}
