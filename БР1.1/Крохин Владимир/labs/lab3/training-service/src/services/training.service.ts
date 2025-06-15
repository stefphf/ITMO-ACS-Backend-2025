import { Repository } from 'typeorm';
import { ITrainingService } from '../interfaces/training.interface';
import {
  TrainingEntity,
  FreeTrainingEntity,
  QualificationTrainingEntity,
} from '../models/training.entity';
import { SeriesEntity } from '../models/series.entity';
import { AthleteEntity } from '../models/athlete.entity';
import { CoachEntity } from '../models/coach.entity';
import {
  CreateTrainingDto,
  UpdateTrainingDto,
  CreateFreeTrainingDto,
  FreeTrainingDto,
  UpdateFreeTrainingDto,
  CreateQualificationTrainingDto,
  QualificationTrainingDto,
  UpdateQualificationTrainingDto,
  BaseTrainingDto,
} from '../dtos/training.dto';
import { CreateSeriesDto, SeriesDto, UpdateSeriesDto } from '../dtos/series.dto';
import { ShotDto, CreateShotDto, UpdateShotDto } from '../dtos/shot.dto';
import { ShotEntity } from '../models/shot.entity';
import { dataSource } from '../config/database';
import { In } from 'typeorm';

export class TrainingService implements ITrainingService {
  private trainingRepository: Repository<TrainingEntity>;
  private freeTrainingRepository: Repository<FreeTrainingEntity>;
  private qualificationTrainingRepository: Repository<QualificationTrainingEntity>;
  private seriesRepository: Repository<SeriesEntity>;
  private athleteRepository: Repository<AthleteEntity>;
  private coachRepository: Repository<CoachEntity>;
  private shotRepository: Repository<ShotEntity>;

  constructor() {
    this.trainingRepository = dataSource.getRepository(TrainingEntity);
    this.freeTrainingRepository = dataSource.getRepository(FreeTrainingEntity);
    this.qualificationTrainingRepository = dataSource.getRepository(QualificationTrainingEntity);
    this.seriesRepository = dataSource.getRepository(SeriesEntity);
    this.athleteRepository = dataSource.getRepository(AthleteEntity);
    this.coachRepository = dataSource.getRepository(CoachEntity);
    this.shotRepository = dataSource.getRepository(ShotEntity);
  }

  async getAllTrainings(): Promise<(QualificationTrainingDto | FreeTrainingDto)[]> {
    try {
      const trainings = await this.trainingRepository.find({
        relations: ['series', 'series.shots'],
      });
      return trainings.map(training => {
        if (training instanceof QualificationTrainingEntity) {
          return this.mapToQualificationTrainingDto(training);
        } else if (training instanceof FreeTrainingEntity) {
          return this.mapToFreeTrainingDto(training);
        } else {
          throw new Error('Недопустимый тип тренировки');
        }
      });
    } catch (error) {
      console.error('Ошибка при получении списка тренировок:', error);
      throw error;
    }
  }

  async getTrainingById(id: number): Promise<FreeTrainingDto | QualificationTrainingDto> {
    const training = await this.trainingRepository.findOne({
      where: { id },
      relations: ['series', 'series.shots'],
    });

    if (!training) {
      throw new Error(`Тренировка с ID ${id} не найдена`);
    }

    if (training instanceof FreeTrainingEntity) {
      return this.mapToFreeTrainingDto(training);
    } else if (training instanceof QualificationTrainingEntity) {
      return this.mapToQualificationTrainingDto(training);
    }

    throw new Error('Недопустимый тип тренировки');
  }

  async createTraining(
    createTrainingDto: CreateTrainingDto,
  ): Promise<FreeTrainingDto | QualificationTrainingDto> {
    const training = this.trainingRepository.create({
      athleteId: createTrainingDto.athleteId,
      start_ts: createTrainingDto.start_ts,
      end_ts: createTrainingDto.end_ts,
      scheduledDate: createTrainingDto.scheduledDate,
      totalScore: createTrainingDto.totalScore,
    });

    if (createTrainingDto instanceof CreateFreeTrainingDto) {
      Object.assign(training, {
        weaponTypeId: createTrainingDto.weaponTypeId,
        targetId: createTrainingDto.targetId,
      });
    } else if (createTrainingDto instanceof CreateQualificationTrainingDto) {
      Object.assign(training, {
        exerciseId: createTrainingDto.exerciseId,
      });
    }

    const savedTraining = await this.trainingRepository.save(training);

    if (savedTraining instanceof FreeTrainingEntity) {
      return this.mapToFreeTrainingDto(savedTraining);
    } else if (savedTraining instanceof QualificationTrainingEntity) {
      return this.mapToQualificationTrainingDto(savedTraining);
    }

    throw new Error('Недопустимый тип тренировки');
  }

  async updateTraining(
    id: number,
    updateTrainingDto: UpdateTrainingDto,
  ): Promise<FreeTrainingDto | QualificationTrainingDto> {
    const training = await this.trainingRepository.findOne({
      where: { id },
      relations: ['series', 'series.shots'],
    });

    if (!training) {
      throw new Error(`Тренировка с ID ${id} не найдена`);
    }

    Object.assign(training, {
      ...updateTrainingDto,
    });

    if (updateTrainingDto instanceof UpdateFreeTrainingDto) {
      Object.assign(training, {
        weaponTypeId: updateTrainingDto.weaponTypeId,
        targetId: updateTrainingDto.targetId,
      });
    } else if (updateTrainingDto instanceof UpdateQualificationTrainingDto) {
      Object.assign(training, {
        exerciseId: updateTrainingDto.exerciseId,
      });
    }

    const updatedTraining = await this.trainingRepository.save(training);

    if (updatedTraining instanceof FreeTrainingEntity) {
      return this.mapToFreeTrainingDto(updatedTraining);
    } else if (updatedTraining instanceof QualificationTrainingEntity) {
      return this.mapToQualificationTrainingDto(updatedTraining);
    }

    throw new Error('Недопустимый тип тренировки');
  }

  async deleteTraining(id: number): Promise<void> {
    try {
      const result = await this.trainingRepository.delete(id);
      if (!result.affected) {
        throw new Error(`Тренировка с ID ${id} не найдена`);
      }
    } catch (error) {
      console.error(`Ошибка при удалении тренировки ${id}:`, error);
      throw error;
    }
  }

  async getAllFreeTrainings(): Promise<FreeTrainingDto[]> {
    try {
      const trainings = await this.trainingRepository.find({
        where: { id: In(await this.freeTrainingRepository.find({ select: { id: true } })) },
        relations: ['series', 'series.shots'],
      });
      return trainings.map(training => this.mapToFreeTrainingDto(training as FreeTrainingEntity));
    } catch (error) {
      console.error('Ошибка при получении списка свободных тренировок:', error);
      throw error;
    }
  }

  async getFreeTrainingById(id: number): Promise<FreeTrainingDto> {
    try {
      const training = await this.trainingRepository.findOne({
        where: { id },
        relations: ['series', 'series.shots'],
      });
      if (!training || !(training instanceof FreeTrainingEntity)) {
        throw new Error(`Свободная тренировка с ID ${id} не найдена`);
      }
      return this.mapToFreeTrainingDto(training);
    } catch (error) {
      console.error(`Ошибка при получении свободной тренировки ${id}:`, error);
      throw error;
    }
  }

  async createFreeTraining(createTrainingDto: CreateFreeTrainingDto): Promise<FreeTrainingDto> {
    try {
      const training = new FreeTrainingEntity();
      training.athleteId = createTrainingDto.athleteId;
      training.start_ts = new Date(createTrainingDto.start_ts);
      training.end_ts = createTrainingDto.end_ts ? new Date(createTrainingDto.end_ts) : undefined;
      training.scheduledDate = createTrainingDto.scheduledDate
        ? new Date(createTrainingDto.scheduledDate)
        : undefined;
      training.totalScore = createTrainingDto.totalScore;
      training.weaponTypeId = createTrainingDto.weaponTypeId;
      training.targetId = createTrainingDto.targetId;
      training.series = [];

      const savedTraining = await this.trainingRepository.save(training);
      return this.mapToFreeTrainingDto(savedTraining as FreeTrainingEntity);
    } catch (error) {
      console.error('Ошибка при создании свободной тренировки:', error);
      throw error;
    }
  }

  async updateFreeTraining(
    id: number,
    trainingData: UpdateFreeTrainingDto,
  ): Promise<FreeTrainingDto> {
    try {
      const training = await this.trainingRepository.findOne({
        where: { id },
      });
      if (!training || !(training instanceof FreeTrainingEntity)) {
        throw new Error(`Свободная тренировка с ID ${id} не найдена`);
      }

      const updatedTraining = await this.trainingRepository.save({
        ...training,
        ...trainingData,
      });
      return this.mapToFreeTrainingDto(updatedTraining as FreeTrainingEntity);
    } catch (error) {
      console.error(`Ошибка при обновлении свободной тренировки ${id}:`, error);
      throw error;
    }
  }

  async deleteFreeTraining(id: number): Promise<void> {
    try {
      const result = await this.trainingRepository.delete(id);
      if (!result.affected) {
        throw new Error(`Свободная тренировка с ID ${id} не найдена`);
      }
    } catch (error) {
      console.error(`Ошибка при удалении свободной тренировки ${id}:`, error);
      throw error;
    }
  }

  async getAllQualificationTrainings(): Promise<QualificationTrainingDto[]> {
    try {
      const trainings = await this.trainingRepository.find({
        where: {
          id: In(await this.qualificationTrainingRepository.find({ select: { id: true } })),
        },
        relations: ['series', 'series.shots'],
      });
      return trainings.map(training =>
        this.mapToQualificationTrainingDto(training as QualificationTrainingEntity),
      );
    } catch (error) {
      console.error('Ошибка при получении списка квалификационных тренировок:', error);
      throw error;
    }
  }

  async getQualificationTrainingById(id: number): Promise<QualificationTrainingDto> {
    try {
      const training = await this.trainingRepository.findOne({
        where: { id },
        relations: ['series', 'series.shots'],
      });
      if (!training || !(training instanceof QualificationTrainingEntity)) {
        throw new Error(`Квалификационная тренировка с ID ${id} не найдена`);
      }
      return this.mapToQualificationTrainingDto(training);
    } catch (error) {
      console.error(`Ошибка при получении квалификационной тренировки ${id}:`, error);
      throw error;
    }
  }

  async createQualificationTraining(
    createTrainingDto: CreateQualificationTrainingDto,
  ): Promise<QualificationTrainingDto> {
    try {
      const training = new QualificationTrainingEntity();
      training.athleteId = createTrainingDto.athleteId;
      training.start_ts = new Date(createTrainingDto.start_ts);
      training.end_ts = createTrainingDto.end_ts ? new Date(createTrainingDto.end_ts) : undefined;
      training.scheduledDate = createTrainingDto.scheduledDate
        ? new Date(createTrainingDto.scheduledDate)
        : undefined;
      training.totalScore = createTrainingDto.totalScore;
      training.exerciseId = createTrainingDto.exerciseId;
      training.series = [];

      const savedTraining = await this.trainingRepository.save(training);
      return this.mapToQualificationTrainingDto(savedTraining as QualificationTrainingEntity);
    } catch (error) {
      console.error('Ошибка при создании квалификационной тренировки:', error);
      throw error;
    }
  }

  async updateQualificationTraining(
    id: number,
    trainingData: UpdateQualificationTrainingDto,
  ): Promise<QualificationTrainingDto> {
    try {
      const training = await this.trainingRepository.findOne({
        where: { id },
      });
      if (!training || !(training instanceof QualificationTrainingEntity)) {
        throw new Error(`Квалификационная тренировка с ID ${id} не найдена`);
      }

      const updatedTraining = await this.trainingRepository.save({
        ...training,
        ...trainingData,
      });
      return this.mapToQualificationTrainingDto(updatedTraining as QualificationTrainingEntity);
    } catch (error) {
      console.error(`Ошибка при обновлении квалификационной тренировки ${id}:`, error);
      throw error;
    }
  }

  async deleteQualificationTraining(id: number): Promise<void> {
    try {
      const result = await this.trainingRepository.delete(id);
      if (!result.affected) {
        throw new Error(`Квалификационная тренировка с ID ${id} не найдена`);
      }
    } catch (error) {
      console.error(`Ошибка при удалении квалификационной тренировки ${id}:`, error);
      throw error;
    }
  }

  async getSeriesByTrainingId(
    trainingId: number,
    trainingType: 'qualification' | 'free',
  ): Promise<SeriesDto[]> {
    try {
      const series = await this.seriesRepository.find({
        where: { trainingId, trainingType },
        relations: ['shots'],
      });
      return series.map(this.mapToSeriesDto);
    } catch (error) {
      console.error(`Ошибка при получении серий для тренировки ${trainingId}:`, error);
      throw error;
    }
  }

  async addSeriesToFreeTraining(
    trainingId: number,
    seriesData: CreateSeriesDto,
  ): Promise<SeriesDto> {
    try {
      const training = await this.trainingRepository.findOne({
        where: { id: trainingId },
      });
      if (!training || !(training instanceof FreeTrainingEntity)) {
        throw new Error(`Free training with ID ${trainingId} not found`);
      }

      const series = new SeriesEntity();
      series.trainingId = trainingId;
      series.trainingType = 'free';
      series.beginTimeOffset = seriesData.beginTimeOffset;
      series.endTimeOffset = seriesData.endTimeOffset;
      series.shots = [];

      const savedSeries = await this.seriesRepository.save(series);
      return this.mapToSeriesDto(savedSeries);
    } catch (error) {
      console.error(`Ошибка при создании серии для свободной тренировки ${trainingId}:`, error);
      throw error;
    }
  }

  async addSeriesToQualificationTraining(seriesData: CreateSeriesDto): Promise<SeriesDto> {
    try {
      const series = new SeriesEntity();
      series.trainingId = seriesData.trainingId;
      series.trainingType = 'qualification';
      series.beginTimeOffset = seriesData.beginTimeOffset;
      series.endTimeOffset = seriesData.endTimeOffset;
      series.shots = [];

      const savedSeries = await this.seriesRepository.save(series);
      return this.mapToSeriesDto(savedSeries);
    } catch (error) {
      console.error('Ошибка при создании серии для квалификационной тренировки:', error);
      throw error;
    }
  }

  async getShotsBySeriesId(seriesId: number): Promise<ShotDto[]> {
    try {
      const shots = await this.shotRepository.find({
        where: { seriesId },
      });
      return shots.map(this.mapToShotDto);
    } catch (error) {
      console.error(`Ошибка при получении выстрелов для серии ${seriesId}:`, error);
      throw error;
    }
  }

  async getShotById(id: number): Promise<ShotDto> {
    try {
      const shot = await this.shotRepository.findOne({
        where: { id },
      });
      if (!shot) {
        throw new Error(`Выстрел с ID ${id} не найден`);
      }
      return this.mapToShotDto(shot);
    } catch (error) {
      console.error(`Ошибка при получении выстрела ${id}:`, error);
      throw error;
    }
  }

  async getTrainingsByAthleteId(
    athleteId: number,
  ): Promise<(FreeTrainingDto | QualificationTrainingDto)[]> {
    try {
      const trainings = await this.trainingRepository.find({
        where: { athleteId },
        relations: ['series', 'series.shots'],
      });
      return trainings.map(training => {
        if (training instanceof QualificationTrainingEntity) {
          return this.mapToQualificationTrainingDto(training);
        } else if (training instanceof FreeTrainingEntity) {
          return this.mapToFreeTrainingDto(training);
        } else {
          throw new Error('Недопустимый тип тренировки');
        }
      });
    } catch (error) {
      console.error(`Ошибка при получении тренировок для спортсмена ${athleteId}:`, error);
      throw error;
    }
  }

  async getFreeTrainingsByAthleteId(athleteId: number): Promise<FreeTrainingDto[]> {
    try {
      const trainings = await this.trainingRepository.find({
        where: {
          athleteId,
          id: In(await this.freeTrainingRepository.find({ select: { id: true } })),
        },
        relations: ['series', 'series.shots'],
      });
      return trainings.map(training => this.mapToFreeTrainingDto(training as FreeTrainingEntity));
    } catch (error) {
      console.error(
        `Ошибка при получении свободных тренировок для спортсмена ${athleteId}:`,
        error,
      );
      throw error;
    }
  }

  async getQualificationTrainingsByAthleteId(
    athleteId: number,
  ): Promise<QualificationTrainingDto[]> {
    try {
      const trainings = await this.trainingRepository.find({
        where: {
          athleteId,
          id: In(await this.qualificationTrainingRepository.find({ select: { id: true } })),
        },
        relations: ['series', 'series.shots'],
      });
      return trainings.map(training =>
        this.mapToQualificationTrainingDto(training as QualificationTrainingEntity),
      );
    } catch (error) {
      console.error(
        `Ошибка при получении квалификационных тренировок для спортсмена ${athleteId}:`,
        error,
      );
      throw error;
    }
  }

  async getAthleteTrainingsByCoachId(
    coachId: number,
  ): Promise<(QualificationTrainingDto | FreeTrainingDto)[]> {
    // Not implemented: depends on coach-athlete relation
    throw new Error('Not implemented');
  }

  async getSeriesById(id: number): Promise<SeriesDto> {
    try {
      const series = await this.seriesRepository.findOne({
        where: { id },
        relations: ['shots'],
      });
      if (!series) {
        throw new Error(`Серия с ID ${id} не найдена`);
      }
      return this.mapToSeriesDto(series);
    } catch (error) {
      console.error(`Ошибка при получении серии ${id}:`, error);
      throw error;
    }
  }

  async updateSeries(id: number, updateSeriesDto: Partial<SeriesDto>): Promise<SeriesDto> {
    try {
      const series = await this.seriesRepository.findOne({
        where: { id },
        relations: ['shots'],
      });
      if (!series) {
        throw new Error(`Серия с ID ${id} не найдена`);
      }

      const updatedSeries = await this.seriesRepository.save({
        ...series,
        ...updateSeriesDto,
      });
      return this.mapToSeriesDto(updatedSeries);
    } catch (error) {
      console.error(`Ошибка при обновлении серии ${id}:`, error);
      throw error;
    }
  }

  async deleteSeries(id: number): Promise<void> {
    try {
      const result = await this.seriesRepository.delete(id);
      if (!result.affected) {
        throw new Error(`Серия с ID ${id} не найдена`);
      }
    } catch (error) {
      console.error(`Ошибка при удалении серии ${id}:`, error);
      throw error;
    }
  }

  async createShot(shotData: CreateShotDto): Promise<ShotDto> {
    try {
      const series = await this.seriesRepository.findOne({
        where: { id: shotData.seriesId },
      });
      if (!series) {
        throw new Error(`Серия с ID ${shotData.seriesId} не найдена`);
      }

      const shot = new ShotEntity();
      shot.seriesId = shotData.seriesId;
      shot.order = shotData.order;
      shot.x = shotData.x;
      shot.y = shotData.y;
      shot.score = shotData.score;
      shot.timeOffset = shotData.timeOffset;

      const savedShot = await this.shotRepository.save(shot);
      return this.mapToShotDto(savedShot);
    } catch (error) {
      console.error(`Ошибка при создании выстрела для серии ${shotData.seriesId}:`, error);
      throw error;
    }
  }

  async updateShot(id: number, shotData: UpdateShotDto): Promise<ShotDto> {
    try {
      const shot = await this.shotRepository.findOne({
        where: { id },
      });
      if (!shot) {
        throw new Error(`Выстрел с ID ${id} не найден`);
      }

      const updatedShot = await this.shotRepository.save({
        ...shot,
        ...shotData,
      });
      return this.mapToShotDto(updatedShot);
    } catch (error) {
      console.error(`Ошибка при обновлении выстрела ${id}:`, error);
      throw error;
    }
  }

  async deleteShot(id: number): Promise<void> {
    try {
      const result = await this.shotRepository.delete(id);
      if (!result.affected) {
        throw new Error(`Выстрел с ID ${id} не найден`);
      }
    } catch (error) {
      console.error(`Ошибка при удалении выстрела ${id}:`, error);
      throw error;
    }
  }

  /**
   * Преобразовать сущность серии в DTO
   * @param series Сущность серии
   * @returns DTO серии
   */
  private mapToSeriesDto(series: SeriesEntity): SeriesDto {
    return {
      id: series.id,
      trainingId: series.trainingId,
      beginTimeOffset: series.beginTimeOffset,
      endTimeOffset: series.endTimeOffset,
      shots: series.shots?.map(this.mapToShotDto) || [],
      createdAt: series.created_at.toISOString(),
      updatedAt: series.updated_at.toISOString(),
    };
  }

  private mapToShotDto(shot: ShotEntity): ShotDto {
    return {
      id: shot.id,
      seriesId: shot.seriesId,
      order: shot.order,
      x: shot.x,
      y: shot.y,
      score: shot.score,
      timeOffset: shot.timeOffset,
      createdAt: shot.created_at.toISOString(),
      updatedAt: shot.updated_at.toISOString(),
    };
  }

  private mapToFreeTrainingDto(training: FreeTrainingEntity): FreeTrainingDto {
    return {
      id: training.id,
      athleteId: training.athleteId,
      start_ts: training.start_ts.toISOString(),
      end_ts: training.end_ts ? training.end_ts.toISOString() : undefined,
      scheduledDate: training.scheduledDate ? training.scheduledDate.toISOString() : undefined,
      totalScore: training.totalScore,
      weaponTypeId: training.weaponTypeId,
      targetId: training.targetId,
      series: training.series?.map(this.mapToSeriesDto) || [],
      createdAt: training.created_at.toISOString(),
      updatedAt: training.updated_at.toISOString(),
    };
  }

  private mapToQualificationTrainingDto(
    training: QualificationTrainingEntity,
  ): QualificationTrainingDto {
    return {
      id: training.id,
      athleteId: training.athleteId,
      start_ts: training.start_ts.toISOString(),
      end_ts: training.end_ts ? training.end_ts.toISOString() : undefined,
      scheduledDate: training.scheduledDate ? training.scheduledDate.toISOString() : undefined,
      totalScore: training.totalScore,
      exerciseId: training.exerciseId,
      series: training.series?.map(this.mapToSeriesDto) || [],
      createdAt: training.created_at.toISOString(),
      updatedAt: training.updated_at.toISOString(),
    };
  }

  private mapToBaseTrainingDto(training: TrainingEntity): BaseTrainingDto {
    return {
      id: training.id,
      athleteId: training.athleteId,
      start_ts: training.start_ts.toISOString(),
      end_ts: training.end_ts ? training.end_ts.toISOString() : undefined,
      scheduledDate: training.scheduledDate ? training.scheduledDate.toISOString() : undefined,
      totalScore: training.totalScore,
      createdAt: training.created_at.toISOString(),
      updatedAt: training.updated_at.toISOString(),
    };
  }

  private mapToTrainingEntity(createTrainingDto: CreateTrainingDto): TrainingEntity {
    const training = new TrainingEntity();
    training.athleteId = createTrainingDto.athleteId;
    training.start_ts = new Date(createTrainingDto.start_ts);
    training.end_ts = createTrainingDto.end_ts ? new Date(createTrainingDto.end_ts) : undefined;
    training.scheduledDate = createTrainingDto.scheduledDate
      ? new Date(createTrainingDto.scheduledDate)
      : undefined;
    training.totalScore = createTrainingDto.totalScore;
    training.series = [];
    return training;
  }

  private mapToFreeTrainingEntity(createTrainingDto: CreateFreeTrainingDto): FreeTrainingEntity {
    const training = new FreeTrainingEntity();
    training.athleteId = createTrainingDto.athleteId;
    training.start_ts = new Date(createTrainingDto.start_ts);
    training.end_ts = createTrainingDto.end_ts ? new Date(createTrainingDto.end_ts) : undefined;
    training.scheduledDate = createTrainingDto.scheduledDate
      ? new Date(createTrainingDto.scheduledDate)
      : undefined;
    training.totalScore = createTrainingDto.totalScore;
    training.weaponTypeId = createTrainingDto.weaponTypeId;
    training.targetId = createTrainingDto.targetId;
    training.series = [];
    return training;
  }

  private mapToQualificationTrainingEntity(
    createTrainingDto: CreateQualificationTrainingDto,
  ): QualificationTrainingEntity {
    const training = new QualificationTrainingEntity();
    training.athleteId = createTrainingDto.athleteId;
    training.start_ts = new Date(createTrainingDto.start_ts);
    training.end_ts = createTrainingDto.end_ts ? new Date(createTrainingDto.end_ts) : undefined;
    training.scheduledDate = createTrainingDto.scheduledDate
      ? new Date(createTrainingDto.scheduledDate)
      : undefined;
    training.totalScore = createTrainingDto.totalScore;
    training.exerciseId = createTrainingDto.exerciseId;
    training.series = [];
    return training;
  }
}
