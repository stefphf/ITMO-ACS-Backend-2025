import { TrainingType } from './enums';
import { SeriesDto } from './series.dto';
export declare class TrainingDto {
  id: number;
  type: TrainingType;
  athleteId: number;
  series: SeriesDto[];
  createdAt: Date;
  updatedAt: Date;
}
export declare class CreateTrainingDto {
  type: TrainingType;
  athleteId: number;
}
export declare class UpdateTrainingDto {
  type?: TrainingType;
  athleteId?: number;
}
export declare class FreeTrainingDto extends TrainingDto {
  weaponTypeId: number;
  targetId: number;
}
export declare class CreateFreeTrainingDto extends CreateTrainingDto {
  weaponTypeId: number;
  targetId: number;
  athleteId: number;
}
export declare class UpdateFreeTrainingDto extends UpdateTrainingDto {
  weaponTypeId?: number;
  targetId?: number;
  athleteId?: number;
}
export declare class QualificationTrainingDto extends TrainingDto {
  exerciseId: number;
}
export declare class CreateQualificationTrainingDto extends CreateTrainingDto {
  exerciseId: number;
}
export declare class UpdateQualificationTrainingDto extends UpdateTrainingDto {
  exerciseId?: number;
}
