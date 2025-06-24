export interface ShotDto {
  id: number;
  seriesId: number;
  order: number;
  score: number;
  x: number;
  y: number;
  timeOffset?: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface CreateShotDto {
  seriesId: number;
  order: number;
  score: number;
  x: number;
  y: number;
  timeOffset?: number;
}
export interface UpdateShotDto {
  order?: number;
  score?: number;
  x?: number;
  y?: number;
  timeOffset?: number;
}
