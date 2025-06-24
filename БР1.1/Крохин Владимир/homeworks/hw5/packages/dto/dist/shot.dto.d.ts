export declare class ShotDto {
  id: number;
  seriesId: number;
  order: number;
  score: number;
  x: number;
  y: number;
  createdAt: Date;
  updatedAt: Date;
}
export declare class CreateShotDto {
  seriesId: number;
  order: number;
  score: number;
  x: number;
  y: number;
}
export declare class UpdateShotDto {
  order?: number;
  score?: number;
  x?: number;
  y?: number;
}
