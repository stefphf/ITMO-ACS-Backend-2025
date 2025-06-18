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
        return coaches.map(this.mapToCoachDto);
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
        return this.mapToCoachDto(coach);
      } catch (error) {
        console.error(`Ошибка при получении тренера ${id}:`, error);
        throw error;
      }
    });
  }
  /**
   * Создать нового тренера
   * @param createCoachDto Данные тренера
   * @returns Созданный тренер
   */
  createCoach(createCoachDto) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const coach = new coach_entity_1.CoachEntity();
        coach.userId = createCoachDto.userId;
        const savedCoach = yield this.coachRepository.save(
          Object.assign({}, coach),
        );
        return this.mapToCoachDto(savedCoach);
      } catch (error) {
        console.error('Ошибка при создании тренера:', error);
        throw error;
      }
    });
  }
  /**
   * Удалить тренера
   * @param id ID тренера
   */
  deleteCoach(id) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const result = yield this.coachRepository.delete(id);
        if (!result.affected) {
          throw new Error(`Тренер с ID ${id} не найден`);
        }
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
        return this.mapToCoachDto(coach);
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
  mapToCoachDto(coach) {
    var _a;
    return {
      id: coach.id,
      userId: coach.userId,
      athletesIds:
        ((_a = coach.athletes) === null || _a === void 0
          ? void 0
          : _a.map(athlete => athlete.id)) || [],
      createdAt: coach.created_at.toISOString(),
      updatedAt: coach.updated_at.toISOString(),
    };
  }
  updateCoach(id, updateCoachDto) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const coach = yield this.coachRepository.findOne({
          where: { id },
          relations: ['athletes'],
        });
        if (!coach) {
          throw new Error(`Тренер с ID ${id} не найден`);
        }
        const updatedCoach = yield this.coachRepository.save(
          Object.assign(
            Object.assign(Object.assign({}, coach), updateCoachDto),
            {
              updated_at: new Date().toISOString(),
            },
          ),
        );
        return this.mapToCoachDto(updatedCoach);
      } catch (error) {
        console.error(`Ошибка при обновлении тренера ${id}:`, error);
        throw error;
      }
    });
  }
}
exports.CoachService = CoachService;
