import {
  CreateFreeTrainingDto,
  FreeTrainingDto,
  UpdateFreeTrainingDto,
  CreateQualificationTrainingDto,
  QualificationTrainingDto,
  UpdateQualificationTrainingDto,
} from '../training.dto';
import { CreateSeriesDto, SeriesDto, UpdateSeriesDto } from '../series.dto';
import { CreateShotDto, ShotDto, UpdateShotDto } from '../shot.dto';
export interface ITrainingService {
  getAllTrainings(): Promise<(QualificationTrainingDto | FreeTrainingDto)[]>;
  getAllFreeTrainings(): Promise<FreeTrainingDto[]>;
  getFreeTrainingById(id: number): Promise<FreeTrainingDto>;
  createFreeTraining(
    trainingData: CreateFreeTrainingDto,
  ): Promise<FreeTrainingDto>;
  updateFreeTraining(
    id: number,
    trainingData: UpdateFreeTrainingDto,
  ): Promise<FreeTrainingDto>;
  deleteFreeTraining(id: number): Promise<void>;
  getAllQualificationTrainings(): Promise<QualificationTrainingDto[]>;
  getQualificationTrainingById(id: number): Promise<QualificationTrainingDto>;
  createQualificationTraining(
    trainingData: CreateQualificationTrainingDto,
  ): Promise<QualificationTrainingDto>;
  updateQualificationTraining(
    id: number,
    trainingData: UpdateQualificationTrainingDto,
  ): Promise<QualificationTrainingDto>;
  deleteQualificationTraining(id: number): Promise<void>;
  getSeriesByTrainingId(
    trainingId: number,
    training_type: 'qualification' | 'free',
  ): Promise<SeriesDto[]>;
  getSeriesById(id: number): Promise<SeriesDto>;
  addSeriesToFreeTraining(
    training_id: number,
    seriesData: CreateSeriesDto,
  ): Promise<SeriesDto>;
  addSeriesToQualificationTraining(
    seriesData: CreateSeriesDto,
  ): Promise<SeriesDto>;
  updateSeries(id: number, seriesData: UpdateSeriesDto): Promise<SeriesDto>;
  deleteSeries(id: number): Promise<void>;
  getShotsBySeriesId(seriesId: number): Promise<ShotDto[]>;
  getShotById(id: number): Promise<ShotDto>;
  createShot(shotData: CreateShotDto): Promise<ShotDto>;
  updateShot(id: number, shotData: UpdateShotDto): Promise<ShotDto>;
  deleteShot(id: number): Promise<void>;
  getFreeTrainingsByAthleteId(athleteId: number): Promise<FreeTrainingDto[]>;
  getQualificationTrainingsByAthleteId(
    athleteId: number,
  ): Promise<QualificationTrainingDto[]>;
}
