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
exports.ShotService = void 0;
class ShotService {
  constructor(shotRepository) {
    this.shotRepository = shotRepository;
  }
  getShotById(id) {
    return __awaiter(this, void 0, void 0, function* () {
      const shot = yield this.shotRepository.findOne({
        where: { id },
      });
      if (!shot) {
        throw new Error('Shot not found');
      }
      return this.mapToDto(shot);
    });
  }
  createShot(dto) {
    return __awaiter(this, void 0, void 0, function* () {
      const shot = this.shotRepository.create({
        seriesId: dto.seriesId,
        order: dto.order,
        score: dto.score,
        x: dto.x,
        y: dto.y,
      });
      const savedShot = yield this.shotRepository.save(shot);
      return this.mapToDto(savedShot);
    });
  }
  updateShot(id, dto) {
    return __awaiter(this, void 0, void 0, function* () {
      const shot = yield this.shotRepository.findOne({
        where: { id },
      });
      if (!shot) {
        throw new Error('Shot not found');
      }
      if (dto.order !== undefined) {
        shot.order = dto.order;
      }
      if (dto.score !== undefined) {
        shot.score = dto.score;
      }
      if (dto.x !== undefined) {
        shot.x = dto.x;
      }
      if (dto.y !== undefined) {
        shot.y = dto.y;
      }
      const updatedShot = yield this.shotRepository.save(shot);
      return this.mapToDto(updatedShot);
    });
  }
  deleteShot(id) {
    return __awaiter(this, void 0, void 0, function* () {
      const shot = yield this.shotRepository.findOne({
        where: { id },
      });
      if (!shot) {
        throw new Error('Shot not found');
      }
      yield this.shotRepository.remove(shot);
    });
  }
  getShotsBySeriesId(seriesId) {
    return __awaiter(this, void 0, void 0, function* () {
      const shots = yield this.shotRepository.find({
        where: { seriesId },
      });
      return shots.map(shot => this.mapToDto(shot));
    });
  }
  mapToDto(shot) {
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
}
exports.ShotService = ShotService;
