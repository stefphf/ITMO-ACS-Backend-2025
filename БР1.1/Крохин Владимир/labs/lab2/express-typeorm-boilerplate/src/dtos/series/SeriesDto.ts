import { ShotDto } from '../shot/ShotDto';

export interface SeriesDto {
    id: number | null;
    shots: ShotDto[];
    timeOffset: number;
}
