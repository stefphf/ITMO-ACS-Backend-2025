import { Repository } from 'typeorm';
import { SeriesEntity } from '../models/series.entity';
import { ShotEntity } from '../models/shot.entity';
import { SeriesDto, CreateSeriesDto, UpdateSeriesDto } from '@app/dto';
export declare class SeriesService {
  private seriesRepository;
  private shotRepository;
  constructor(
    seriesRepository: Repository<SeriesEntity>,
    shotRepository: Repository<ShotEntity>,
  );
  getAllSeries(): Promise<SeriesDto[]>;
  getSeriesById(id: number): Promise<SeriesDto>;
  createSeries(dto: CreateSeriesDto): Promise<SeriesDto>;
  updateSeries(id: number, dto: UpdateSeriesDto): Promise<SeriesDto>;
  deleteSeries(id: number): Promise<void>;
  getSeriesByTrainingId(
    trainingId: number,
    type: 'qualification' | 'free',
  ): Promise<SeriesDto[]>;
  private mapToDto;
}
