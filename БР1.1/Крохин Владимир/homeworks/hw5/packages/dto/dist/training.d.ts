import { SeriesDto } from './series';
export interface BaseTrainingDto {
  id: number;
  athleteId: number;
  startTs: Date;
  endTs?: Date;
  scheduledDate?: Date;
  totalScore?: number;
  series?: SeriesDto[];
  createdAt: Date;
  updatedAt: Date;
}
export interface CreateTrainingDto {
  athleteId: number;
  startTs: Date;
  endTs?: Date;
  scheduledDate?: Date;
  totalScore?: number;
}
export interface UpdateTrainingDto {
  startTs?: Date;
  endTs?: Date;
  scheduledDate?: Date;
  totalScore?: number;
}
export interface FreeTrainingDto extends BaseTrainingDto {
  weaponTypeId: number;
  targetId: number;
}
export interface CreateFreeTrainingDto extends CreateTrainingDto {
  weaponTypeId: number;
  targetId: number;
}
export interface UpdateFreeTrainingDto extends UpdateTrainingDto {
  weaponTypeId?: number;
  targetId?: number;
}
export interface QualificationTrainingDto extends BaseTrainingDto {
  exerciseId: number;
}
export interface CreateQualificationTrainingDto extends CreateTrainingDto {
  exerciseId: number;
}
export interface UpdateQualificationTrainingDto extends UpdateTrainingDto {
  exerciseId?: number;
}
