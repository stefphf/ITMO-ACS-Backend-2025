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
exports.QualificationTrainingController = void 0;
const routing_controllers_1 = require('routing-controllers');
const routing_controllers_openapi_1 = require('routing-controllers-openapi');
const training_service_1 = require('../services/training.service');
const dto_1 = require('@app/dto');
const database_1 = require('../config/database');
const athlete_entity_1 = require('../models/athlete.entity');
const auth_middleware_1 = __importDefault(
  require('../middlewares/auth.middleware'),
);
let QualificationTrainingController = class QualificationTrainingController {
  constructor() {
    this.trainingService = new training_service_1.TrainingService();
  }
  /**
   * Получить все квалификационные тренировки
   * @returns Список квалификационных тренировок
   */
  getAllQualificationTrainings() {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        return yield this.trainingService.getAllQualificationTrainings();
      } catch (error) {
        console.error(
          'Ошибка при получении списка квалификационных тренировок:',
          error,
        );
        throw new routing_controllers_1.BadRequestError(
          'Не удалось получить список квалификационных тренировок',
        );
      }
    });
  }
  /**
   * Получить квалификационную тренировку по ID
   * @param id ID тренировки
   * @returns Данные квалификационной тренировки
   */
  getQualificationTrainingById(id) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        return yield this.trainingService.getQualificationTrainingById(id);
      } catch (error) {
        console.error(
          `Ошибка при получении квалификационной тренировки с id ${id}:`,
          error,
        );
        throw new routing_controllers_1.NotFoundError(
          'Квалификационная тренировка не найдена',
        );
      }
    });
  }
  /**
   * Создать квалификационную тренировку
   * @param dto Данные для создания квалификационной тренировки
   * @returns Созданная квалификационная тренировка
   */
  createQualificationTraining(dto) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        return yield this.trainingService.createQualificationTraining(dto);
      } catch (error) {
        console.error(
          'Ошибка при создании квалификационной тренировки:',
          error,
        );
        throw new routing_controllers_1.BadRequestError(
          'Не удалось создать квалификационную тренировку',
        );
      }
    });
  }
  /**
   * Обновить квалификационную тренировку
   * @param id ID тренировки
   * @param dto Новые данные квалификационной тренировки
   * @returns Обновленная квалификационная тренировка
   */
  updateQualificationTraining(id, dto) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        return yield this.trainingService.updateQualificationTraining(id, dto);
      } catch (error) {
        console.error(
          `Ошибка при обновлении квалификационной тренировки ${id}:`,
          error,
        );
        throw new routing_controllers_1.NotFoundError(
          'Квалификационная тренировка не найдена',
        );
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
        yield this.trainingService.deleteQualificationTraining(id);
      } catch (error) {
        console.error(
          `Ошибка при удалении квалификационной тренировки ${id}:`,
          error,
        );
        throw new routing_controllers_1.NotFoundError(
          'Квалификационная тренировка не найдена',
        );
      }
    });
  }
  /**
   * Получить квалификационные тренировки по ID спортсмена
   * @param athleteId ID спортсмена
   * @returns Список квалификационных тренировок
   */
  getQualificationTrainingsByAthleteId(athleteId) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        return yield this.trainingService.getQualificationTrainingsByAthleteId(
          athleteId,
        );
      } catch (error) {
        console.error(
          `Ошибка при получении квалификационных тренировок для спортсмена ${athleteId}:`,
          error,
        );
        throw new routing_controllers_1.BadRequestError(
          'Не удалось получить квалификационные тренировки для спортсмена',
        );
      }
    });
  }
  /**
   * Получить квалификационные тренировки текущего пользователя
   * @returns Список квалификационных тренировок текущего пользователя
   */
  getCurrentUserQualificationTrainings(request) {
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
        return yield this.trainingService.getQualificationTrainingsByAthleteId(
          athlete.id,
        );
      } catch (error) {
        console.error(
          'Ошибка при получении квалификационных тренировок текущего пользователя:',
          error,
        );
        throw new routing_controllers_1.BadRequestError(
          'Не удалось получить квалификационные тренировки текущего пользователя',
        );
      }
    });
  }
};
exports.QualificationTrainingController = QualificationTrainingController;
__decorate(
  [
    (0, routing_controllers_1.Get)('/'),
    (0, routing_controllers_openapi_1.OpenAPI)({
      summary: 'Получить все квалификационные тренировки',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(
      dto_1.QualificationTrainingDto,
      {
        isArray: true,
      },
    ),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', []),
    __metadata('design:returntype', Promise),
  ],
  QualificationTrainingController.prototype,
  'getAllQualificationTrainings',
  null,
);
__decorate(
  [
    (0, routing_controllers_1.Get)('/:id'),
    (0, routing_controllers_openapi_1.OpenAPI)({
      summary: 'Получить квалификационную тренировку по id',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(
      dto_1.QualificationTrainingDto,
    ),
    __param(0, (0, routing_controllers_1.Param)('id')),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Number]),
    __metadata('design:returntype', Promise),
  ],
  QualificationTrainingController.prototype,
  'getQualificationTrainingById',
  null,
);
__decorate(
  [
    (0, routing_controllers_1.Post)('/'),
    (0, routing_controllers_1.UseBefore)(auth_middleware_1.default),
    (0, routing_controllers_openapi_1.OpenAPI)({
      summary: 'Создать квалификационную тренировку',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(
      dto_1.QualificationTrainingDto,
    ),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [dto_1.CreateQualificationTrainingDto]),
    __metadata('design:returntype', Promise),
  ],
  QualificationTrainingController.prototype,
  'createQualificationTraining',
  null,
);
__decorate(
  [
    (0, routing_controllers_1.Patch)('/:id'),
    (0, routing_controllers_1.UseBefore)(auth_middleware_1.default),
    (0, routing_controllers_openapi_1.OpenAPI)({
      summary: 'Обновить квалификационную тренировку',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(
      dto_1.QualificationTrainingDto,
    ),
    __param(0, (0, routing_controllers_1.Param)('id')),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [
      Number,
      dto_1.UpdateQualificationTrainingDto,
    ]),
    __metadata('design:returntype', Promise),
  ],
  QualificationTrainingController.prototype,
  'updateQualificationTraining',
  null,
);
__decorate(
  [
    (0, routing_controllers_1.Delete)('/:id'),
    (0, routing_controllers_1.UseBefore)(auth_middleware_1.default),
    (0, routing_controllers_openapi_1.OpenAPI)({
      summary: 'Удалить квалификационную тренировку',
    }),
    (0, routing_controllers_1.OnUndefined)(204),
    __param(0, (0, routing_controllers_1.Param)('id')),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Number]),
    __metadata('design:returntype', Promise),
  ],
  QualificationTrainingController.prototype,
  'deleteQualificationTraining',
  null,
);
__decorate(
  [
    (0, routing_controllers_1.Get)('/athlete/:athleteId'),
    (0, routing_controllers_openapi_1.OpenAPI)({
      summary: 'Получить квалификационные тренировки по id спортсмена',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(
      dto_1.QualificationTrainingDto,
      {
        isArray: true,
      },
    ),
    __param(0, (0, routing_controllers_1.Param)('athleteId')),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Number]),
    __metadata('design:returntype', Promise),
  ],
  QualificationTrainingController.prototype,
  'getQualificationTrainingsByAthleteId',
  null,
);
__decorate(
  [
    (0, routing_controllers_1.Get)('/current-user'),
    (0, routing_controllers_1.UseBefore)(auth_middleware_1.default),
    (0, routing_controllers_openapi_1.OpenAPI)({
      summary: 'Получить квалификационные тренировки текущего пользователя',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(
      dto_1.QualificationTrainingDto,
      {
        isArray: true,
      },
    ),
    __param(0, (0, routing_controllers_1.Req)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object]),
    __metadata('design:returntype', Promise),
  ],
  QualificationTrainingController.prototype,
  'getCurrentUserQualificationTrainings',
  null,
);
exports.QualificationTrainingController = QualificationTrainingController =
  __decorate(
    [
      (0, routing_controllers_1.JsonController)('/qualification-trainings'),
      __metadata('design:paramtypes', []),
    ],
    QualificationTrainingController,
  );
