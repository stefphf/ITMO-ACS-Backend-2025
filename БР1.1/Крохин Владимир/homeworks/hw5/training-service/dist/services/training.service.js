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
        weaponTypeId: dto.weaponTypeId,
        targetId: dto.targetId,
      });
      const savedTraining = yield this.trainingRepository.save(training);
      return this.mapToFreeDto(savedTraining);
    });
  }
  createQualificationTraining(dto) {
    return __awaiter(this, void 0, void 0, function* () {
      const training = this.trainingRepository.create({
        type: dto_1.TrainingType.QUALIFICATION,
        exerciseId: dto.exerciseId,
      });
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
        trainingType: createSeriesDto.trainingType,
        beginTimeOffset: createSeriesDto.beginTimeOffset,
        endTimeOffset: createSeriesDto.endTimeOffset,
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
      if (updateSeriesDto.trainingType) {
        series.trainingType = updateSeriesDto.trainingType;
      }
      if (updateSeriesDto.beginTimeOffset) {
        series.beginTimeOffset = updateSeriesDto.beginTimeOffset;
      }
      if (updateSeriesDto.endTimeOffset) {
        series.endTimeOffset = updateSeriesDto.endTimeOffset;
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
  getSeriesByTrainingId(trainingId, trainingType) {
    return __awaiter(this, void 0, void 0, function* () {
      const series = yield this.seriesRepository.find({
        where: { trainingId, trainingType },
        relations: ['shots'],
      });
      return series.map(series => this.mapSeriesToDto(series));
    });
  }
  createShot(createShotDto) {
    return __awaiter(this, void 0, void 0, function* () {
      const series = yield this.seriesRepository.findOne({
        where: { id: createShotDto.seriesId },
      });
      if (!series) {
        throw new Error(`Series with id ${createShotDto.seriesId} not found`);
      }
      const shot = this.shotRepository.create({
        seriesId: createShotDto.seriesId,
        order: createShotDto.order,
        x: createShotDto.x,
        y: createShotDto.y,
        score: createShotDto.score,
        timeOffset: createShotDto.timeOffset,
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
      if (updateShotDto.order) {
        shot.order = updateShotDto.order;
      }
      if (updateShotDto.score) {
        shot.score = updateShotDto.score;
      }
      if (updateShotDto.x) {
        shot.x = updateShotDto.x;
      }
      if (updateShotDto.y) {
        shot.y = updateShotDto.y;
      }
      if (updateShotDto.timeOffset) {
        shot.timeOffset = updateShotDto.timeOffset;
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
    return {
      id: series.id,
      trainingId: series.trainingId,
      trainingType: series.trainingType,
      beginTimeOffset: series.beginTimeOffset,
      endTimeOffset: series.endTimeOffset,
      shots: series.shots.map(shot => this.mapShotToDto(shot)),
      createdAt: series.created_at,
      updatedAt: series.updated_at,
    };
  }
  mapShotToDto(shot) {
    return {
      id: shot.id,
      seriesId: shot.seriesId,
      order: shot.order,
      x: shot.x,
      y: shot.y,
      score: shot.score,
      timeOffset: shot.timeOffset,
      createdAt: shot.created_at,
      updatedAt: shot.updated_at,
    };
  }
}
exports.TrainingService = TrainingService;
