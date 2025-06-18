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
Object.defineProperty(exports, '__esModule', { value: true });
exports.SeriesController = void 0;
const routing_controllers_1 = require('routing-controllers');
const routing_controllers_openapi_1 = require('routing-controllers-openapi');
const training_service_1 = require('../services/training.service');
const dto_1 = require('@app/dto');
const series_service_1 = require('../services/series.service');
const typedi_1 = require('typedi');
let SeriesController = class SeriesController {
  constructor(seriesService, trainingService) {
    this.seriesService = seriesService;
    this.trainingService = trainingService;
  }
  /**
   * Получить все серии
   * @returns Список всех серий
   */
  getAllSeries() {
    return __awaiter(this, void 0, void 0, function* () {
      return this.seriesService.getAllSeries();
    });
  }
  /**
   * Получить серию по ID
   * @param id ID серии
   * @returns Данные серии
   */
  getSeriesById(id) {
    return __awaiter(this, void 0, void 0, function* () {
      return this.seriesService.getSeriesById(id);
    });
  }
  /**
   * Создать серию
   * @param dto Данные для создания серии
   * @returns Созданная серия
   */
  createSeries(dto) {
    return __awaiter(this, void 0, void 0, function* () {
      return this.seriesService.createSeries(dto);
    });
  }
  /**
   * Создать серию для свободной тренировки
   * @param trainingId ID свободной тренировки
   * @param dto Данные для создания серии
   * @returns Созданная серия
   */
  createSeriesForTraining(trainingId, dto) {
    return __awaiter(this, void 0, void 0, function* () {
      const training = yield this.trainingService.getTrainingById(trainingId);
      if (!training) {
        throw new routing_controllers_1.NotFoundError(
          `Training with id ${trainingId} not found`,
        );
      }
      return this.seriesService.createSeriesForTraining(trainingId, dto);
    });
  }
  /**
   * Создать серию для квалификационной тренировки
   * @param dto Данные для создания серии (должен содержать trainingId)
   * @returns Созданная серия
   */
  createSeriesForQualificationTraining(dto) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        return yield this.trainingService.addSeriesToQualificationTraining(dto);
      } catch (error) {
        console.error(
          'Ошибка при создании серии для квалификационной тренировки:',
          error,
        );
        throw new routing_controllers_1.BadRequestError(
          'Не удалось создать серию для квалификационной тренировки',
        );
      }
    });
  }
  /**
   * Обновить серию
   * @param id ID серии
   * @param dto Новые данные серии
   * @returns Обновленная серия
   */
  updateSeries(id, dto) {
    return __awaiter(this, void 0, void 0, function* () {
      return this.seriesService.updateSeries(id, dto);
    });
  }
  /**
   * Удалить серию
   * @param id ID серии
   */
  deleteSeries(id) {
    return __awaiter(this, void 0, void 0, function* () {
      yield this.seriesService.deleteSeries(id);
    });
  }
  /**
   * Получить серии по ID тренировки
   * @param trainingId ID тренировки
   * @returns Список серий
   */
  getSeriesByTrainingId(trainingId) {
    return __awaiter(this, void 0, void 0, function* () {
      return this.seriesService.getSeriesByTrainingId(trainingId);
    });
  }
};
exports.SeriesController = SeriesController;
__decorate(
  [
    (0, routing_controllers_1.Get)('/'),
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_openapi_1.OpenAPI)({
      summary: 'Получить все серии',
      responses: {
        200: {
          description: 'Список серий',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: { $ref: '#/components/schemas/SeriesDto' },
              },
            },
          },
        },
      },
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(dto_1.SeriesDto, {
      isArray: true,
    }),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', []),
    __metadata('design:returntype', Promise),
  ],
  SeriesController.prototype,
  'getAllSeries',
  null,
);
__decorate(
  [
    (0, routing_controllers_1.Get)('/:id'),
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_openapi_1.OpenAPI)({
      summary: 'Получить серию по ID',
      responses: {
        200: {
          description: 'Данные серии',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/SeriesDto' },
            },
          },
        },
      },
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(dto_1.SeriesDto),
    __param(0, (0, routing_controllers_1.Param)('id')),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Number]),
    __metadata('design:returntype', Promise),
  ],
  SeriesController.prototype,
  'getSeriesById',
  null,
);
__decorate(
  [
    (0, routing_controllers_1.Post)('/'),
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_openapi_1.OpenAPI)({
      summary: 'Создать серию',
      responses: {
        201: {
          description: 'Серия создана',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/SeriesDto' },
            },
          },
        },
      },
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(dto_1.SeriesDto),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [dto_1.CreateSeriesDto]),
    __metadata('design:returntype', Promise),
  ],
  SeriesController.prototype,
  'createSeries',
  null,
);
__decorate(
  [
    (0, routing_controllers_1.Post)('/training/:trainingId'),
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_openapi_1.OpenAPI)({
      summary: 'Создать серию для тренировки',
      responses: {
        201: {
          description: 'Серия создана',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/SeriesDto' },
            },
          },
        },
      },
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(dto_1.SeriesDto),
    __param(0, (0, routing_controllers_1.Param)('trainingId')),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Number, dto_1.CreateSeriesDto]),
    __metadata('design:returntype', Promise),
  ],
  SeriesController.prototype,
  'createSeriesForTraining',
  null,
);
__decorate(
  [
    (0, routing_controllers_1.Post)('/qualification'),
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_openapi_1.OpenAPI)({
      summary: 'Создать серию для квалификационной тренировки',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(dto_1.SeriesDto),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [dto_1.CreateSeriesDto]),
    __metadata('design:returntype', Promise),
  ],
  SeriesController.prototype,
  'createSeriesForQualificationTraining',
  null,
);
__decorate(
  [
    (0, routing_controllers_1.Patch)('/:id'),
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_openapi_1.OpenAPI)({
      summary: 'Обновить серию',
      responses: {
        200: {
          description: 'Серия обновлена',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/SeriesDto' },
            },
          },
        },
      },
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(dto_1.SeriesDto),
    __param(0, (0, routing_controllers_1.Param)('id')),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Number, dto_1.UpdateSeriesDto]),
    __metadata('design:returntype', Promise),
  ],
  SeriesController.prototype,
  'updateSeries',
  null,
);
__decorate(
  [
    (0, routing_controllers_1.Delete)('/:id'),
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_openapi_1.OpenAPI)({
      summary: 'Удалить серию',
      responses: {
        204: {
          description: 'Серия удалена',
        },
      },
    }),
    (0, routing_controllers_1.OnUndefined)(204),
    __param(0, (0, routing_controllers_1.Param)('id')),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Number]),
    __metadata('design:returntype', Promise),
  ],
  SeriesController.prototype,
  'deleteSeries',
  null,
);
__decorate(
  [
    (0, routing_controllers_1.Get)('/training/:trainingId'),
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_openapi_1.OpenAPI)({
      summary: 'Получить все серии для тренировки',
      responses: {
        200: {
          description: 'Список серий для тренировки',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: { $ref: '#/components/schemas/SeriesDto' },
              },
            },
          },
        },
      },
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(dto_1.SeriesDto, {
      isArray: true,
    }),
    __param(0, (0, routing_controllers_1.Param)('trainingId')),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Number]),
    __metadata('design:returntype', Promise),
  ],
  SeriesController.prototype,
  'getSeriesByTrainingId',
  null,
);
exports.SeriesController = SeriesController = __decorate(
  [
    (0, routing_controllers_1.JsonController)('/series'),
    (0, typedi_1.Service)(),
    __metadata('design:paramtypes', [
      series_service_1.SeriesService,
      training_service_1.TrainingService,
    ]),
  ],
  SeriesController,
);
