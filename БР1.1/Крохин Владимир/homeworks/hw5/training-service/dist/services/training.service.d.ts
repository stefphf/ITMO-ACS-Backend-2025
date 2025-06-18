import { Repository } from 'typeorm';
import { TrainingEntity } from '../models/training.entity';
import { SeriesEntity } from '../models/series.entity';
import { ShotEntity } from '../models/shot.entity';
import {
  TrainingDto,
  CreateTrainingDto,
  UpdateTrainingDto,
  FreeTrainingDto,
  CreateFreeTrainingDto,
  UpdateFreeTrainingDto,
  QualificationTrainingDto,
  CreateQualificationTrainingDto,
  UpdateQualificationTrainingDto,
} from '@app/dto';
import {
  SeriesDtoClass,
  CreateSeriesDtoClass,
  UpdateSeriesDtoClass,
} from '@app/dto';
import { ShotDto, CreateShotDto, UpdateShotDto } from '@app/dto';
export declare class TrainingService {
  private trainingRepository;
  private seriesRepository;
  private shotRepository;
  constructor(
    trainingRepository: Repository<TrainingEntity>,
    seriesRepository: Repository<SeriesEntity>,
    shotRepository: Repository<ShotEntity>,
  );
  getAllTrainings(): Promise<TrainingDto[]>;
  getTrainingById(id: number): Promise<TrainingDto>;
  createTraining(dto: CreateTrainingDto): Promise<TrainingDto>;
  createFreeTraining(dto: CreateFreeTrainingDto): Promise<FreeTrainingDto>;
  createQualificationTraining(
    dto: CreateQualificationTrainingDto,
  ): Promise<QualificationTrainingDto>;
  updateTraining(id: number, dto: UpdateTrainingDto): Promise<TrainingDto>;
  updateFreeTraining(
    id: number,
    dto: UpdateFreeTrainingDto,
  ): Promise<FreeTrainingDto>;
  updateQualificationTraining(
    id: number,
    dto: UpdateQualificationTrainingDto,
  ): Promise<QualificationTrainingDto>;
  deleteTraining(id: number): Promise<void>;
  addSeriesToTraining(
    trainingId: number,
    createSeriesDto: CreateSeriesDtoClass,
  ): Promise<SeriesDtoClass>;
  updateSeries(
    id: number,
    updateSeriesDto: UpdateSeriesDtoClass,
  ): Promise<SeriesDtoClass>;
  deleteSeries(id: number): Promise<void>;
  getSeriesByTrainingId(
    trainingId: number,
    trainingType: 'qualification' | 'free',
  ): Promise<SeriesDtoClass[]>;
  createShot(createShotDto: CreateShotDto): Promise<ShotDto>;
  updateShot(id: number, updateShotDto: UpdateShotDto): Promise<ShotDto>;
  deleteShot(id: number): Promise<void>;
  getShotsBySeriesId(seriesId: number): Promise<ShotDto[]>;
  private mapToDto;
  private mapToFreeDto;
  private mapToQualificationDto;
  private mapSeriesToDto;
  private mapShotToDto;
}
