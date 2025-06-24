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
exports.SeriesService = void 0;
class SeriesService {
  constructor(seriesRepository, shotRepository) {
    this.seriesRepository = seriesRepository;
    this.shotRepository = shotRepository;
  }
  getAllSeries() {
    return __awaiter(this, void 0, void 0, function* () {
      const series = yield this.seriesRepository.find({
        relations: ['shots'],
      });
      return series.map(series => this.mapToDto(series));
    });
  }
  getSeriesById(id) {
    return __awaiter(this, void 0, void 0, function* () {
      const series = yield this.seriesRepository.findOne({
        where: { id },
        relations: ['shots'],
      });
      if (!series) {
        throw new Error('Series not found');
      }
      return this.mapToDto(series);
    });
  }
  createSeries(dto) {
    return __awaiter(this, void 0, void 0, function* () {
      const series = this.seriesRepository.create({
        trainingId: dto.trainingId,
        type: dto.type,
      });
      const savedSeries = yield this.seriesRepository.save(series);
      return this.mapToDto(savedSeries);
    });
  }
  updateSeries(id, dto) {
    return __awaiter(this, void 0, void 0, function* () {
      const series = yield this.seriesRepository.findOne({
        where: { id },
        relations: ['shots'],
      });
      if (!series) {
        throw new Error('Series not found');
      }
      if (dto.type) {
        series.type = dto.type;
      }
      const updatedSeries = yield this.seriesRepository.save(series);
      return this.mapToDto(updatedSeries);
    });
  }
  deleteSeries(id) {
    return __awaiter(this, void 0, void 0, function* () {
      const series = yield this.seriesRepository.findOne({
        where: { id },
        relations: ['shots'],
      });
      if (!series) {
        throw new Error('Series not found');
      }
      // Delete all shots
      yield this.shotRepository.remove(series.shots);
      // Delete series
      yield this.seriesRepository.remove(series);
    });
  }
  getSeriesByTrainingId(trainingId, type) {
    return __awaiter(this, void 0, void 0, function* () {
      const series = yield this.seriesRepository.find({
        where: { trainingId, type },
        relations: ['shots'],
      });
      return series.map(series => this.mapToDto(series));
    });
  }
  mapToDto(series) {
    return {
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
    };
  }
}
exports.SeriesService = SeriesService;
