import { ShotDto } from './shot.dto';
import { TrainingType } from './enums';
export declare class SeriesDto {
  id: number;
  trainingId: number;
  type: TrainingType;
  order: number;
  shots: ShotDto[];
  createdAt: Date;
  updatedAt: Date;
}
export declare class CreateSeriesDto {
  trainingId: number;
  type: TrainingType;
  order: number;
  shots?: ShotDto[];
}
export declare class UpdateSeriesDto {
  type?: TrainingType;
  order?: number;
  shots?: ShotDto[];
}
