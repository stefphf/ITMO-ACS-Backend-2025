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
exports.AthleteService = void 0;
const coach_entity_1 = require('../models/coach.entity');
const database_1 = require('../config/database');
class AthleteService {
  constructor(athleteRepository) {
    this.athleteRepository = athleteRepository;
  }
  /**
   * Получить всех спортсменов
   * @returns Массив спортсменов
   */
  getAllAthletes() {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const athletes = yield this.athleteRepository.find({
          relations: ['coaches'],
        });
        return athletes.map(this.mapToDto);
      } catch (error) {
        console.error('Ошибка при получении списка спортсменов:', error);
        throw error;
      }
    });
  }
  /**
   * Получить спортсмена по ID
   * @param id ID спортсмена
   * @returns Данные спортсмена
   */
  getAthleteById(id) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const athlete = yield this.athleteRepository.findOne({
          where: { id },
          relations: ['coaches'],
        });
        if (!athlete) {
          throw new Error('Athlete not found');
        }
        return this.mapToDto(athlete);
      } catch (error) {
        console.error(`Ошибка при получении спортсмена ${id}:`, error);
        throw error;
      }
    });
  }
  /**
   * Создать нового спортсмена
   * @param dto Данные спортсмена
   * @returns Созданный спортсмен
   */
  createAthlete(dto) {
    return __awaiter(this, void 0, void 0, function* () {
      const athlete = this.athleteRepository.create({
        userId: dto.userId,
      });
      const savedAthlete = yield this.athleteRepository.save(athlete);
      return this.mapToDto(savedAthlete);
    });
  }
  /**
   * Обновить спортсмена
   * @param id ID спортсмена
   * @param dto Новые данные спортсмена
   * @returns Обновленный спортсмен
   */
  updateAthlete(id, dto) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const athlete = yield this.athleteRepository.findOne({
          where: { id },
          relations: ['coaches'],
        });
        if (!athlete) {
          throw new Error('Athlete not found');
        }
        if (dto.coachIds !== undefined) {
          const coachRepo = database_1.dataSource.getRepository(
            coach_entity_1.CoachEntity,
          );
          athlete.coaches = yield coachRepo.findByIds(dto.coachIds);
        }
        const updatedAthlete = yield this.athleteRepository.save(athlete);
        return this.mapToDto(updatedAthlete);
      } catch (error) {
        console.error(`Ошибка при обновлении спортсмена ${id}:`, error);
        throw error;
      }
    });
  }
  /**
   * Удалить спортсмена
   * @param id ID спортсмена
   */
  deleteAthlete(id) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const athlete = yield this.athleteRepository.findOne({
          where: { id },
        });
        if (!athlete) {
          throw new Error('Athlete not found');
        }
        yield this.athleteRepository.remove(athlete);
      } catch (error) {
        console.error('Ошибка при удалении спортсмена:', error);
        throw error;
      }
    });
  }
  /**
   * Получить спортсмена по ID пользователя
   * @param userId ID пользователя
   * @returns Данные спортсмена
   */
  getAthleteByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const athlete = yield this.athleteRepository.findOne({
          where: { userId },
          relations: ['coaches'],
        });
        if (!athlete) {
          throw new Error(`Спортсмен с ID пользователя ${userId} не найден`);
        }
        return this.mapToDto(athlete);
      } catch (error) {
        console.error(
          `Ошибка при получении спортсмена по ID пользователя ${userId}:`,
          error,
        );
        throw error;
      }
    });
  }
  /**
   * Получить спортсменов по ID тренера
   * @param coachId ID тренера
   * @returns Массив спортсменов
   */
  getAthletesByCoachId(coachId) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const athletes = yield this.athleteRepository.find({
          relations: ['coaches'],
        });
        return athletes
          .filter(athlete =>
            athlete.coaches.some(coach => coach.id === coachId),
          )
          .map(this.mapToDto);
      } catch (error) {
        console.error(
          `Ошибка при получении спортсменов тренера ${coachId}:`,
          error,
        );
        throw error;
      }
    });
  }
  /**
   * Преобразовать сущность спортсмена в DTO
   * @param athlete Сущность спортсмена
   * @returns DTO спортсмена
   */
  mapToDto(athlete) {
    var _a;
    return {
      id: athlete.id,
      userId: athlete.userId,
      coachIds:
        ((_a = athlete.coaches) === null || _a === void 0
          ? void 0
          : _a.map(coach => coach.id)) || [],
      createdAt: athlete.created_at.toISOString(),
      updatedAt: athlete.updated_at.toISOString(),
    };
  }
}
exports.AthleteService = AthleteService;
