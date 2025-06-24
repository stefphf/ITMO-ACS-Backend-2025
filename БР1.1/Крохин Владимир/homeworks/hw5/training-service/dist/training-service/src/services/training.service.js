'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.TrainingService = void 0;
const dto_1 = require('@app/dto');
class TrainingService {
  constructor(trainingRepository, seriesRepository, shotRepository) {
    this.trainingRepository = trainingRepository;
    this.seriesRepository = seriesRepository;
    this.shotRepository = shotRepository;
  }
  getAllTrainings() {
    return __awaiter(this, void 0, void 0, function* () {
      const trainings = yield this.trainingRepository.find({
        relations: ['series'],
      });
      return trainings.map(training => this.mapToDto(training));
    });
  }
  getTrainingById(id) {
    return __awaiter(this, void 0, void 0, function* () {
      const training = yield this.trainingRepository.findOne({
        where: { id },
        relations: ['series'],
      });
      if (!training) {
        throw new Error('Training not found');
      }
      return this.mapToDto(training);
    });
  }
  createTraining(dto) {
    return __awaiter(this, void 0, void 0, function* () {
      const training = this.trainingRepository.create({
        type: dto.type,
      });
      const savedTraining = yield this.trainingRepository.save(training);
      return this.mapToDto(savedTraining);
    });
  }
  createFreeTraining(dto) {
    return __awaiter(this, void 0, void 0, function* () {
      const training = this.trainingRepository.create({
        type: dto_1.TrainingType.FREE,
      });
      training.weaponTypeId = dto.weaponTypeId;
      training.targetId = dto.targetId;
      const savedTraining = yield this.trainingRepository.save(training);
      return this.mapToFreeDto(savedTraining);
    });
  }
  createQualificationTraining(dto) {
    return __awaiter(this, void 0, void 0, function* () {
      const training = this.trainingRepository.create({
        type: dto_1.TrainingType.QUALIFICATION,
      });
      training.exerciseId = dto.exerciseId;
      const savedTraining = yield this.trainingRepository.save(training);
      return this.mapToQualificationDto(savedTraining);
    });
  }
  updateTraining(id, dto) {
    return __awaiter(this, void 0, void 0, function* () {
      const training = yield this.trainingRepository.findOne({
        where: { id },
        relations: ['series'],
      });
      if (!training) {
        throw new Error('Training not found');
      }
      if (dto.type) {
        training.type = dto.type;
      }
      const updatedTraining = yield this.trainingRepository.save(training);
      return this.mapToDto(updatedTraining);
    });
  }
  updateFreeTraining(id, dto) {
    return __awaiter(this, void 0, void 0, function* () {
      const training = yield this.trainingRepository.findOne({
        where: { id },
        relations: ['series'],
      });
      if (!training) {
        throw new Error('Training not found');
      }
      if (dto.type) {
        training.type = dto.type;
      }
      if (dto.weaponTypeId) {
        training.weaponTypeId = dto.weaponTypeId;
      }
      if (dto.targetId) {
        training.targetId = dto.targetId;
      }
      const updatedTraining = yield this.trainingRepository.save(training);
      return this.mapToFreeDto(updatedTraining);
    });
  }
  updateQualificationTraining(id, dto) {
    return __awaiter(this, void 0, void 0, function* () {
      const training = yield this.trainingRepository.findOne({
        where: { id },
        relations: ['series'],
      });
      if (!training) {
        throw new Error('Training not found');
      }
      if (dto.type) {
        training.type = dto.type;
      }
      if (dto.exerciseId) {
        training.exerciseId = dto.exerciseId;
      }
      const updatedTraining = yield this.trainingRepository.save(training);
      return this.mapToQualificationDto(updatedTraining);
    });
  }
  deleteTraining(id) {
    return __awaiter(this, void 0, void 0, function* () {
      const training = yield this.trainingRepository.findOne({
        where: { id },
        relations: ['series'],
      });
      if (!training) {
        throw new Error('Training not found');
      }
      // Delete all series
      yield this.seriesRepository.remove(training.series);
      // Delete training
      yield this.trainingRepository.remove(training);
    });
  }
  addSeriesToTraining(trainingId, createSeriesDto) {
    return __awaiter(this, void 0, void 0, function* () {
      const training = yield this.trainingRepository.findOne({
        where: { id: trainingId },
      });
      if (!training) {
        throw new Error(`Training with id ${trainingId} not found`);
      }
      const series = this.seriesRepository.create({
        trainingId,
        order: createSeriesDto.order,
      });
      const savedSeries = yield this.seriesRepository.save(series);
      return this.mapSeriesToDto(savedSeries);
    });
  }
  updateSeries(id, updateSeriesDto) {
    return __awaiter(this, void 0, void 0, function* () {
      const series = yield this.seriesRepository.findOne({
        where: { id },
        relations: ['shots'],
      });
      if (!series) {
        throw new Error(`Series with id ${id} not found`);
      }
      if (updateSeriesDto.order !== undefined) {
        series.order = updateSeriesDto.order;
      }
      const updatedSeries = yield this.seriesRepository.save(series);
      return this.mapSeriesToDto(updatedSeries);
    });
  }
  deleteSeries(id) {
    return __awaiter(this, void 0, void 0, function* () {
      const series = yield this.seriesRepository.findOne({
        where: { id },
        relations: ['shots'],
      });
      if (!series) {
        throw new Error(`Series with id ${id} not found`);
      }
      // Delete all shots
      for (const shot of series.shots) {
        yield this.shotRepository.remove(shot);
      }
      // Delete series
      yield this.seriesRepository.remove(series);
    });
  }
  getSeriesByTrainingId(trainingId) {
    return __awaiter(this, void 0, void 0, function* () {
      const series = yield this.seriesRepository.find({
        where: { trainingId },
        relations: ['shots'],
      });
      return series.map(this.mapSeriesToDto);
    });
  }
  createShot(createShotDto) {
    return __awaiter(this, void 0, void 0, function* () {
      const shot = this.shotRepository.create({
        seriesId: createShotDto.seriesId,
        order: createShotDto.order,
        score: createShotDto.score,
        x: createShotDto.x,
        y: createShotDto.y,
      });
      const savedShot = yield this.shotRepository.save(shot);
      return this.mapShotToDto(savedShot);
    });
  }
  updateShot(id, updateShotDto) {
    return __awaiter(this, void 0, void 0, function* () {
      const shot = yield this.shotRepository.findOne({
        where: { id },
      });
      if (!shot) {
        throw new Error(`Shot with id ${id} not found`);
      }
      if (updateShotDto.order !== undefined) {
        shot.order = updateShotDto.order;
      }
      if (updateShotDto.score !== undefined) {
        shot.score = updateShotDto.score;
      }
      if (updateShotDto.x !== undefined) {
        shot.x = updateShotDto.x;
      }
      if (updateShotDto.y !== undefined) {
        shot.y = updateShotDto.y;
      }
      const updatedShot = yield this.shotRepository.save(shot);
      return this.mapShotToDto(updatedShot);
    });
  }
  deleteShot(id) {
    return __awaiter(this, void 0, void 0, function* () {
      const shot = yield this.shotRepository.findOne({
        where: { id },
      });
      if (!shot) {
        throw new Error(`Shot with id ${id} not found`);
      }
      yield this.shotRepository.remove(shot);
    });
  }
  getShotsBySeriesId(seriesId) {
    return __awaiter(this, void 0, void 0, function* () {
      const shots = yield this.shotRepository.find({
        where: { seriesId },
      });
      return shots.map(shot => this.mapShotToDto(shot));
    });
  }
  mapToDto(training) {
    return {
      id: training.id,
      type: training.type,
      series: training.series.map(series => ({
        id: series.id,
        trainingId: series.trainingId,
        type: series.type,
        order: series.order,
        shots: series.shots.map(shot => ({
          id: shot.id,
          seriesId: shot.seriesId,
          order: shot.order,
          score: shot.score,
          x: shot.x,
          y: shot.y,
          createdAt: shot.createdAt,
          updatedAt: shot.updatedAt,
        })),
        createdAt: series.createdAt,
        updatedAt: series.updatedAt,
      })),
      createdAt: training.createdAt,
      updatedAt: training.updatedAt,
    };
  }
  mapToFreeDto(training) {
    const baseDto = this.mapToDto(training);
    return Object.assign(Object.assign({}, baseDto), {
      weaponTypeId: training.weaponTypeId,
      targetId: training.targetId,
    });
  }
  mapToQualificationDto(training) {
    const baseDto = this.mapToDto(training);
    return Object.assign(Object.assign({}, baseDto), {
      exerciseId: training.exerciseId,
    });
  }
  mapSeriesToDto(series) {
    var _a;
    return {
      id: series.id,
      trainingId: series.trainingId,
      type: series.type,
      order: series.order,
      shots:
        ((_a = series.shots) === null || _a === void 0
          ? void 0
          : _a.map(this.mapShotToDto)) || [],
      createdAt: series.createdAt,
      updatedAt: series.updatedAt,
    };
  }
  mapShotToDto(shot) {
    return {
      id: shot.id,
      seriesId: shot.seriesId,
      order: shot.order,
      score: shot.score,
      x: shot.x,
      y: shot.y,
      createdAt: shot.createdAt,
      updatedAt: shot.updatedAt,
    };
  }
  /**
   * Получить все квалификационные тренировки
   * @returns Массив квалификационных тренировок
   */
  getAllQualificationTrainings() {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const trainings = yield this.trainingRepository.find({
          where: { type: dto_1.TrainingType.QUALIFICATION },
          relations: ['athlete', 'coach', 'series'],
        });
        return trainings.map(this.mapToQualificationTrainingDto);
      } catch (error) {
        console.error(
          'Ошибка при получении списка квалификационных тренировок:',
          error,
        );
        throw error;
      }
    });
  }
  /**
   * Получить квалификационную тренировку по ID
   * @param id ID тренировки
   * @returns Данные тренировки
   */
  getQualificationTrainingById(id) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const training = yield this.trainingRepository.findOne({
          where: { id, type: dto_1.TrainingType.QUALIFICATION },
          relations: ['athlete', 'coach', 'series'],
        });
        if (!training) {
          throw new Error(`Квалификационная тренировка с ID ${id} не найдена`);
        }
        return this.mapToQualificationTrainingDto(training);
      } catch (error) {
        console.error(
          `Ошибка при получении квалификационной тренировки ${id}:`,
          error,
        );
        throw error;
      }
    });
  }
  /**
   * Удалить квалификационную тренировку
   * @param id ID тренировки
   */
  deleteQualificationTraining(id) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const result = yield this.trainingRepository.delete({
          id,
          type: dto_1.TrainingType.QUALIFICATION,
        });
        if (!result.affected) {
          throw new Error(`Квалификационная тренировка с ID ${id} не найдена`);
        }
      } catch (error) {
        console.error(
          `Ошибка при удалении квалификационной тренировки ${id}:`,
          error,
        );
        throw error;
      }
    });
  }
  /**
   * Получить квалификационные тренировки спортсмена
   * @param athleteId ID спортсмена
   * @returns Массив тренировок
   */
  getQualificationTrainingsByAthleteId(athleteId) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const trainings = yield this.trainingRepository.find({
          where: { athleteId, type: dto_1.TrainingType.QUALIFICATION },
          relations: ['athlete', 'coach', 'series'],
        });
        return trainings.map(this.mapToQualificationTrainingDto);
      } catch (error) {
        console.error(
          `Ошибка при получении квалификационных тренировок спортсмена ${athleteId}:`,
          error,
        );
        throw error;
      }
    });
  }
  /**
   * Получить все свободные тренировки
   * @returns Массив свободных тренировок
   */
  getAllFreeTrainings() {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const trainings = yield this.trainingRepository.find({
          where: { type: dto_1.TrainingType.FREE },
          relations: ['athlete', 'coach', 'series'],
        });
        return trainings.map(this.mapToFreeTrainingDto);
      } catch (error) {
        console.error(
          'Ошибка при получении списка свободных тренировок:',
          error,
        );
        throw error;
      }
    });
  }
  /**
   * Получить свободную тренировку по ID
   * @param id ID тренировки
   * @returns Данные тренировки
   */
  getFreeTrainingById(id) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const training = yield this.trainingRepository.findOne({
          where: { id, type: dto_1.TrainingType.FREE },
          relations: ['athlete', 'coach', 'series'],
        });
        if (!training) {
          throw new Error(`Свободная тренировка с ID ${id} не найдена`);
        }
        return this.mapToFreeDto(training);
      } catch (error) {
        console.error(
          `Ошибка при получении свободной тренировки ${id}:`,
          error,
        );
        throw error;
      }
    });
  }
}
exports.TrainingService = TrainingService;
