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
exports.CoachService = void 0;
const coach_entity_1 = require('../models/coach.entity');
const database_1 = require('../config/database');
class CoachService {
  constructor() {
    this.coachRepository = database_1.dataSource.getRepository(
      coach_entity_1.CoachEntity,
    );
  }
  /**
   * Получить всех тренеров
   * @returns Массив тренеров
   */
  getAllCoaches() {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const coaches = yield this.coachRepository.find({
          relations: ['athletes'],
        });
        return coaches.map(this.mapToDto);
      } catch (error) {
        console.error('Ошибка при получении списка тренеров:', error);
        throw error;
      }
    });
  }
  /**
   * Получить тренера по ID
   * @param id ID тренера
   * @returns Данные тренера
   */
  getCoachById(id) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const coach = yield this.coachRepository.findOne({
          where: { id },
          relations: ['athletes'],
        });
        if (!coach) {
          throw new Error(`Тренер с ID ${id} не найден`);
        }
        return this.mapToDto(coach);
      } catch (error) {
        console.error(`Ошибка при получении тренера ${id}:`, error);
        throw error;
      }
    });
  }
  /**
   * Создать нового тренера
   * @param dto Данные тренера
   * @returns Созданный тренер
   */
  createCoach(dto) {
    return __awaiter(this, void 0, void 0, function* () {
      const coach = this.coachRepository.create({
        userId: dto.userId,
      });
      const savedCoach = yield this.coachRepository.save(coach);
      return this.mapToDto(savedCoach);
    });
  }
  /**
   * Удалить тренера
   * @param id ID тренера
   */
  deleteCoach(id) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const coach = yield this.coachRepository.findOne({
          where: { id },
        });
        if (!coach) {
          throw new Error('Coach not found');
        }
        yield this.coachRepository.remove(coach);
      } catch (error) {
        console.error(`Ошибка при удалении тренера ${id}:`, error);
        throw error;
      }
    });
  }
  /**
   * Получить тренера по ID пользователя
   * @param userId ID пользователя
   * @returns Данные тренера
   */
  getCoachByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const coach = yield this.coachRepository.findOne({
          where: { userId },
          relations: ['athletes'],
        });
        if (!coach) {
          throw new Error(`Тренер для пользователя ${userId} не найден`);
        }
        return this.mapToDto(coach);
      } catch (error) {
        console.error(
          `Ошибка при получении тренера для пользователя ${userId}:`,
          error,
        );
        throw error;
      }
    });
  }
  /**
   * Преобразовать сущность тренера в DTO
   * @param coach Сущность тренера
   * @returns DTO тренера
   */
  mapToDto(coach) {
    var _a;
    return {
      id: coach.id,
      userId: coach.userId,
      athleteIds:
        ((_a = coach.athletes) === null || _a === void 0
          ? void 0
          : _a.map(athlete => athlete.id)) || [],
      createdAt: coach.created_at.toISOString(),
      updatedAt: coach.updated_at.toISOString(),
    };
  }
  /**
   * Обновить данные тренера
   * @param id ID тренера
   * @param dto Данные для обновления
   * @returns Обновленный тренер
   */
  updateCoach(id, dto) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const coach = yield this.coachRepository.findOne({
          where: { id },
          relations: ['athletes'],
        });
        if (!coach) {
          throw new Error('Coach not found');
        }
        const updatedCoach = yield this.coachRepository.save(coach);
        return this.mapToDto(updatedCoach);
      } catch (error) {
        console.error(`Ошибка при обновлении тренера ${id}:`, error);
        throw error;
      }
    });
  }
}
exports.CoachService = CoachService;
