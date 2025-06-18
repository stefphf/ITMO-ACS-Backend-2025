'use strict';
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
            ? (desc = Object.getOwnPropertyDescriptor(target, key))
            : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
var __param =
  (this && this.__param) ||
  function (paramIndex, decorator) {
    return function (target, key) {
      decorator(target, key, paramIndex);
    };
  };
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
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.FreeTrainingController = void 0;
const routing_controllers_1 = require('routing-controllers');
const routing_controllers_openapi_1 = require('routing-controllers-openapi');
const training_service_1 = require('../services/training.service');
const dto_1 = require('@app/dto');
const database_1 = require('../config/database');
const athlete_entity_1 = require('../models/athlete.entity');
const auth_middleware_1 = __importDefault(
  require('../middlewares/auth.middleware'),
);
let FreeTrainingController = class FreeTrainingController {
  constructor() {
    this.trainingService = new training_service_1.TrainingService();
  }
  /**
   * Получить все свободные тренировки
   * @returns Список свободных тренировок
   */
  getAllFreeTrainings() {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        return yield this.trainingService.getAllFreeTrainings();
      } catch (error) {
        console.error(
          'Ошибка при получении списка свободных тренировок:',
          error,
        );
        throw new routing_controllers_1.BadRequestError(
          'Не удалось получить список свободных тренировок',
        );
      }
    });
  }
  /**
   * Получить свободную тренировку по ID
   * @param id ID тренировки
   * @returns Данные свободной тренировки
   */
  getFreeTrainingById(id) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        return yield this.trainingService.getFreeTrainingById(id);
      } catch (error) {
        console.error(
          `Ошибка при получении свободной тренировки с id ${id}:`,
          error,
        );
        throw new routing_controllers_1.NotFoundError(
          'Свободная тренировка не найдена',
        );
      }
    });
  }
  /**
   * Создать свободную тренировку
   * @param dto Данные для создания свободной тренировки
   * @returns Созданная свободная тренировка
   */
  createFreeTraining(dto) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        return yield this.trainingService.createFreeTraining(dto);
      } catch (error) {
        console.error('Ошибка при создании свободной тренировки:', error);
        throw new routing_controllers_1.BadRequestError(
          'Не удалось создать свободную тренировку',
        );
      }
    });
  }
  /**
   * Обновить свободную тренировку
   * @param id ID тренировки
   * @param dto Новые данные свободной тренировки
   * @returns Обновленная свободная тренировка
   */
  updateFreeTraining(id, dto) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        return yield this.trainingService.updateFreeTraining(id, dto);
      } catch (error) {
        console.error(
          `Ошибка при обновлении свободной тренировки ${id}:`,
          error,
        );
        throw new routing_controllers_1.NotFoundError(
          'Свободная тренировка не найдена',
        );
      }
    });
  }
  /**
   * Удалить свободную тренировку
   * @param id ID тренировки
   */
  deleteFreeTraining(id) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        yield this.trainingService.deleteFreeTraining(id);
      } catch (error) {
        console.error(`Ошибка при удалении свободной тренировки ${id}:`, error);
        throw new routing_controllers_1.NotFoundError(
          'Свободная тренировка не найдена',
        );
      }
    });
  }
  /**
   * Получить свободные тренировки по ID спортсмена
   * @param athleteId ID спортсмена
   * @returns Список свободных тренировок
   */
  getFreeTrainingsByAthleteId(athleteId) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        return yield this.trainingService.getFreeTrainingsByAthleteId(
          athleteId,
        );
      } catch (error) {
        console.error(
          `Ошибка при получении свободных тренировок для спортсмена ${athleteId}:`,
          error,
        );
        throw new routing_controllers_1.BadRequestError(
          'Не удалось получить свободные тренировки для спортсмена',
        );
      }
    });
  }
  /**
   * Получить свободные тренировки текущего пользователя
   * @returns Список свободных тренировок текущего пользователя
   */
  getCurrentUserFreeTrainings(request) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const userId = request.user.id;
        // Получаем спортсмена по userId
        const athlete = yield database_1.dataSource
          .getRepository(athlete_entity_1.AthleteEntity)
          .findOne({
            where: { userId },
          });
        if (!athlete) {
          throw new routing_controllers_1.BadRequestError(
            'Пользователь не является спортсменом',
          );
        }
        return yield this.trainingService.getFreeTrainingsByAthleteId(
          athlete.id,
        );
      } catch (error) {
        console.error(
          'Ошибка при получении свободных тренировок текущего пользователя:',
          error,
        );
        throw new routing_controllers_1.BadRequestError(
          'Не удалось получить свободные тренировки текущего пользователя',
        );
      }
    });
  }
};
exports.FreeTrainingController = FreeTrainingController;
__decorate(
  [
    (0, routing_controllers_1.Get)('/'),
    (0, routing_controllers_openapi_1.OpenAPI)({
      summary: 'Получить все свободные тренировки',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(dto_1.FreeTrainingDto, {
      isArray: true,
    }),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', []),
    __metadata('design:returntype', Promise),
  ],
  FreeTrainingController.prototype,
  'getAllFreeTrainings',
  null,
);
__decorate(
  [
    (0, routing_controllers_1.Get)('/:id'),
    (0, routing_controllers_openapi_1.OpenAPI)({
      summary: 'Получить свободную тренировку по id',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(dto_1.FreeTrainingDto),
    __param(0, (0, routing_controllers_1.Param)('id')),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Number]),
    __metadata('design:returntype', Promise),
  ],
  FreeTrainingController.prototype,
  'getFreeTrainingById',
  null,
);
__decorate(
  [
    (0, routing_controllers_1.Post)('/'),
    (0, routing_controllers_1.UseBefore)(auth_middleware_1.default),
    (0, routing_controllers_openapi_1.OpenAPI)({
      summary: 'Создать свободную тренировку',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(dto_1.FreeTrainingDto),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [dto_1.CreateFreeTrainingDto]),
    __metadata('design:returntype', Promise),
  ],
  FreeTrainingController.prototype,
  'createFreeTraining',
  null,
);
__decorate(
  [
    (0, routing_controllers_1.Patch)('/:id'),
    (0, routing_controllers_1.UseBefore)(auth_middleware_1.default),
    (0, routing_controllers_openapi_1.OpenAPI)({
      summary: 'Обновить свободную тренировку',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(dto_1.FreeTrainingDto),
    __param(0, (0, routing_controllers_1.Param)('id')),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Number, dto_1.UpdateFreeTrainingDto]),
    __metadata('design:returntype', Promise),
  ],
  FreeTrainingController.prototype,
  'updateFreeTraining',
  null,
);
__decorate(
  [
    (0, routing_controllers_1.Delete)('/:id'),
    (0, routing_controllers_1.UseBefore)(auth_middleware_1.default),
    (0, routing_controllers_openapi_1.OpenAPI)({
      summary: 'Удалить свободную тренировку',
    }),
    (0, routing_controllers_1.OnUndefined)(204),
    __param(0, (0, routing_controllers_1.Param)('id')),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Number]),
    __metadata('design:returntype', Promise),
  ],
  FreeTrainingController.prototype,
  'deleteFreeTraining',
  null,
);
__decorate(
  [
    (0, routing_controllers_1.Get)('/athlete/:athleteId'),
    (0, routing_controllers_openapi_1.OpenAPI)({
      summary: 'Получить свободные тренировки по id спортсмена',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(dto_1.FreeTrainingDto, {
      isArray: true,
    }),
    __param(0, (0, routing_controllers_1.Param)('athleteId')),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Number]),
    __metadata('design:returntype', Promise),
  ],
  FreeTrainingController.prototype,
  'getFreeTrainingsByAthleteId',
  null,
);
__decorate(
  [
    (0, routing_controllers_1.Get)('/current-user'),
    (0, routing_controllers_1.UseBefore)(auth_middleware_1.default),
    (0, routing_controllers_openapi_1.OpenAPI)({
      summary: 'Получить свободные тренировки текущего пользователя',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(dto_1.FreeTrainingDto, {
      isArray: true,
    }),
    __param(0, (0, routing_controllers_1.Req)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object]),
    __metadata('design:returntype', Promise),
  ],
  FreeTrainingController.prototype,
  'getCurrentUserFreeTrainings',
  null,
);
exports.FreeTrainingController = FreeTrainingController = __decorate(
  [
    (0, routing_controllers_1.JsonController)('/free-trainings'),
    __metadata('design:paramtypes', []),
  ],
  FreeTrainingController,
);
