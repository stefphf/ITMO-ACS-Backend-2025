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
const athlete_entity_1 = require('../models/athlete.entity');
const coach_entity_1 = require('../models/coach.entity');
const database_1 = require('../config/database');
class AthleteService {
  constructor() {
    this.athleteRepository = database_1.dataSource.getRepository(
      athlete_entity_1.AthleteEntity,
    );
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
        return athletes.map(this.mapToAthleteDto);
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
          throw new Error(`Спортсмен с ID ${id} не найден`);
        }
        return this.mapToAthleteDto(athlete);
      } catch (error) {
        console.error(`Ошибка при получении спортсмена ${id}:`, error);
        throw error;
      }
    });
  }
  /**
   * Создать нового спортсмена
   * @param athleteData Данные спортсмена
   * @returns Созданный спортсмен
   */
  createAthlete(createAthleteDto) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const athlete = new athlete_entity_1.AthleteEntity();
        athlete.userId = createAthleteDto.userId;
        if (createAthleteDto.coachIds) {
          const coachRepo = database_1.dataSource.getRepository(
            coach_entity_1.CoachEntity,
          );
          athlete.coaches = yield coachRepo.findByIds(
            createAthleteDto.coachIds,
          );
        } else {
          athlete.coaches = [];
        }
        const savedAthlete = yield this.athleteRepository.save(
          Object.assign({}, athlete),
        );
        return this.mapToAthleteDto(savedAthlete);
      } catch (error) {
        console.error('Ошибка при создании спортсмена:', error);
        throw error;
      }
    });
  }
  /**
   * Обновить спортсмена
   * @param id ID спортсмена
   * @param athleteData Новые данные спортсмена
   * @returns Обновленный спортсмен
   */
  updateAthlete(id, athleteData) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const athlete = yield this.athleteRepository.findOne({
          where: { id },
          relations: ['coaches'],
        });
        if (!athlete) {
          throw new Error(`Спортсмен с ID ${id} не найден`);
        }
        if (athleteData.coachIds !== undefined) {
          const coachRepo = database_1.dataSource.getRepository(
            coach_entity_1.CoachEntity,
          );
          athlete.coaches = yield coachRepo.findByIds(athleteData.coachIds);
        }
        const updatedAthlete = yield this.athleteRepository.save(
          Object.assign(Object.assign({}, athlete), athleteData),
        );
        return this.mapToAthleteDto(updatedAthlete);
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
        const result = yield this.athleteRepository.delete(id);
        if (!result.affected) {
          throw new Error(`Спортсмен с ID ${id} не найден`);
        }
      } catch (error) {
        console.error(`Ошибка при удалении спортсмена ${id}:`, error);
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
          throw new Error(`Спортсмен для пользователя ${userId} не найден`);
        }
        return this.mapToAthleteDto(athlete);
      } catch (error) {
        console.error(
          `Ошибка при получении спортсмена для пользователя ${userId}:`,
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
        const filteredAthletes = athletes.filter(athlete =>
          athlete.coaches.some(coach => coach.id === coachId),
        );
        return filteredAthletes.map(this.mapToAthleteDto);
      } catch (error) {
        console.error(
          `Ошибка при получении спортсменов для тренера ${coachId}:`,
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
  mapToAthleteDto(athlete) {
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
  mapToAthleteEntity(athleteDto) {
    return __awaiter(this, void 0, void 0, function* () {
      const coachRepo = database_1.dataSource.getRepository(
        coach_entity_1.CoachEntity,
      );
      const athlete = new athlete_entity_1.AthleteEntity();
      athlete.id = athleteDto.id;
      athlete.userId = athleteDto.userId;
      athlete.coaches = yield coachRepo.findByIds(athleteDto.coachIds);
      return athlete;
    });
  }
}
exports.AthleteService = AthleteService;
