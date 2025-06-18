import { ShotDto } from './shot';
export interface SeriesDto {
  id: number;
  trainingId: number;
  trainingType: 'qualification' | 'free';
  beginTimeOffset?: number;
  endTimeOffset?: number;
  shots: ShotDto[];
  createdAt: Date;
  updatedAt: Date;
}
export interface CreateSeriesDto {
  trainingId: number;
  trainingType: 'qualification' | 'free';
  beginTimeOffset?: number;
  endTimeOffset?: number;
}
export interface UpdateSeriesDto {
  trainingType?: 'qualification' | 'free';
  beginTimeOffset?: number;
  endTimeOffset?: number;
}
