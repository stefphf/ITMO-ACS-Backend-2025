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
exports.TrainingController = void 0;
const routing_controllers_1 = require('routing-controllers');
const routing_controllers_openapi_1 = require('routing-controllers-openapi');
const training_service_1 = require('../services/training.service');
const rabbitmq_service_1 = require('../services/rabbitmq.service');
const typedi_1 = require('typedi');
const common_1 = require('@app/common');
const dto_1 = require('@app/dto');
let TrainingController = class TrainingController {
  constructor(trainingService, rabbitMQService) {
    this.trainingService = trainingService;
    this.rabbitMQService = rabbitMQService;
  }
  /**
   * Получить все тренировки
   * @returns Список тренировок
   */
  getAllTrainings() {
    return __awaiter(this, void 0, void 0, function* () {
      return this.trainingService.getAllTrainings();
    });
  }
  /**
   * Получить тренировку по ID
   * @param id ID тренировки
   * @returns Данные тренировки
   */
  getTrainingById(id) {
    return __awaiter(this, void 0, void 0, function* () {
      return this.trainingService.getTrainingById(id);
    });
  }
  /**
   * Создать тренировку
   * @param dto Данные для создания тренировки
   * @returns Созданная тренировка
   */
  createTraining(createTrainingDto) {
    return __awaiter(this, void 0, void 0, function* () {
      const result =
        yield this.trainingService.createTraining(createTrainingDto);
      const message = {
        type: common_1.RoutingKey.TRAINING_CREATED,
        data: {
          id: result.id,
          type: result.type,
          data: result,
        },
        timestamp: Date.now(),
      };
      yield this.rabbitMQService.sendMessage(
        common_1.RoutingKey.TRAINING_CREATED,
        message.data,
      );
      return result;
    });
  }
  createFreeTraining(training) {
    return __awaiter(this, void 0, void 0, function* () {
      const result = yield this.trainingService.createFreeTraining(training);
      const message = {
        type: common_1.RoutingKey.TRAINING_CREATED,
        data: {
          id: result.id,
          type: 'free',
          data: result,
        },
        timestamp: Date.now(),
      };
      yield this.rabbitMQService.sendMessage(
        common_1.RoutingKey.TRAINING_CREATED,
        message.data,
      );
      return result;
    });
  }
  createQualificationTraining(training) {
    return __awaiter(this, void 0, void 0, function* () {
      const result =
        yield this.trainingService.createQualificationTraining(training);
      const message = {
        type: common_1.RoutingKey.TRAINING_CREATED,
        data: {
          id: result.id,
          type: 'qualification',
          data: result,
        },
        timestamp: Date.now(),
      };
      yield this.rabbitMQService.sendMessage(
        common_1.RoutingKey.TRAINING_CREATED,
        message.data,
      );
      return result;
    });
  }
  updateFreeTraining(id, training) {
    return __awaiter(this, void 0, void 0, function* () {
      const result = yield this.trainingService.updateFreeTraining(
        id,
        training,
      );
      const message = {
        type: common_1.RoutingKey.TRAINING_UPDATED,
        data: {
          id: result.id,
          type: 'free',
          data: result,
        },
        timestamp: Date.now(),
      };
      yield this.rabbitMQService.sendMessage(
        common_1.RoutingKey.TRAINING_UPDATED,
        message.data,
      );
      return result;
    });
  }
  updateQualificationTraining(id, training) {
    return __awaiter(this, void 0, void 0, function* () {
      const result = yield this.trainingService.updateQualificationTraining(
        id,
        training,
      );
      const message = {
        type: common_1.RoutingKey.TRAINING_UPDATED,
        data: {
          id: result.id,
          type: 'qualification',
          data: result,
        },
        timestamp: Date.now(),
      };
      yield this.rabbitMQService.sendMessage(
        common_1.RoutingKey.TRAINING_UPDATED,
        message.data,
      );
      return result;
    });
  }
  updateTraining(id, updateTrainingDto) {
    return __awaiter(this, void 0, void 0, function* () {
      return this.trainingService.updateTraining(id, updateTrainingDto);
    });
  }
  deleteTraining(id) {
    return __awaiter(this, void 0, void 0, function* () {
      yield this.trainingService.deleteTraining(id);
    });
  }
};
exports.TrainingController = TrainingController;
__decorate(
  [
    (0, routing_controllers_1.Get)('/'),
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_openapi_1.OpenAPI)({
      summary: 'Получить все тренировки',
      responses: {
        200: {
          description: 'Список тренировок',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  oneOf: [
                    { $ref: '#/components/schemas/FreeTrainingDto' },
                    { $ref: '#/components/schemas/QualificationTrainingDto' },
                  ],
                },
              },
            },
          },
        },
      },
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(dto_1.TrainingDto, {
      isArray: true,
    }),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', []),
    __metadata('design:returntype', Promise),
  ],
  TrainingController.prototype,
  'getAllTrainings',
  null,
);
__decorate(
  [
    (0, routing_controllers_1.Get)('/:id'),
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_openapi_1.OpenAPI)({
      summary: 'Получить тренировку по ID',
      responses: {
        200: {
          description: 'Данные тренировки',
          content: {
            'application/json': {
              schema: {
                oneOf: [
                  { $ref: '#/components/schemas/FreeTrainingDto' },
                  { $ref: '#/components/schemas/QualificationTrainingDto' },
                ],
              },
            },
          },
        },
      },
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(dto_1.TrainingDto),
    __param(0, (0, routing_controllers_1.Param)('id')),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Number]),
    __metadata('design:returntype', Promise),
  ],
  TrainingController.prototype,
  'getTrainingById',
  null,
);
__decorate(
  [
    (0, routing_controllers_1.Post)('/'),
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_openapi_1.OpenAPI)({
      summary: 'Создать тренировку',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(dto_1.TrainingDto),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [dto_1.CreateTrainingDto]),
    __metadata('design:returntype', Promise),
  ],
  TrainingController.prototype,
  'createTraining',
  null,
);
__decorate(
  [
    (0, routing_controllers_1.Post)('/free'),
    (0, routing_controllers_1.HttpCode)(201),
    (0, routing_controllers_openapi_1.OpenAPI)({
      summary: 'Создать свободную тренировку',
      responses: {
        201: {
          description: 'Свободная тренировка создана',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/FreeTrainingDto' },
            },
          },
        },
      },
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(dto_1.FreeTrainingDto),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [dto_1.CreateFreeTrainingDto]),
    __metadata('design:returntype', Promise),
  ],
  TrainingController.prototype,
  'createFreeTraining',
  null,
);
__decorate(
  [
    (0, routing_controllers_1.Post)('/qualification'),
    (0, routing_controllers_1.HttpCode)(201),
    (0, routing_controllers_openapi_1.OpenAPI)({
      summary: 'Создать квалификационную тренировку',
      responses: {
        201: {
          description: 'Квалификационная тренировка создана',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/QualificationTrainingDto' },
            },
          },
        },
      },
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(
      dto_1.QualificationTrainingDto,
    ),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [dto_1.CreateQualificationTrainingDto]),
    __metadata('design:returntype', Promise),
  ],
  TrainingController.prototype,
  'createQualificationTraining',
  null,
);
__decorate(
  [
    (0, routing_controllers_1.Put)('/free/:id'),
    (0, routing_controllers_openapi_1.OpenAPI)({
      summary: 'Обновить свободную тренировку',
      responses: {
        200: {
          description: 'Свободная тренировка обновлена',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/FreeTrainingDto' },
            },
          },
        },
      },
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(dto_1.FreeTrainingDto),
    __param(0, (0, routing_controllers_1.Param)('id')),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Number, dto_1.UpdateFreeTrainingDto]),
    __metadata('design:returntype', Promise),
  ],
  TrainingController.prototype,
  'updateFreeTraining',
  null,
);
__decorate(
  [
    (0, routing_controllers_1.Put)('/qualification/:id'),
    (0, routing_controllers_openapi_1.OpenAPI)({
      summary: 'Обновить квалификационную тренировку',
      responses: {
        200: {
          description: 'Квалификационная тренировка обновлена',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/QualificationTrainingDto' },
            },
          },
        },
      },
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
  TrainingController.prototype,
  'updateQualificationTraining',
  null,
);
__decorate(
  [
    (0, routing_controllers_1.Put)('/:id'),
    (0, routing_controllers_openapi_1.OpenAPI)({
      summary: 'Обновить тренировку',
      responses: {
        200: {
          description: 'Тренировка обновлена',
          content: {
            'application/json': {
              schema: {
                oneOf: [
                  { $ref: '#/components/schemas/FreeTrainingDto' },
                  { $ref: '#/components/schemas/QualificationTrainingDto' },
                ],
              },
            },
          },
        },
      },
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(dto_1.TrainingDto),
    __param(0, (0, routing_controllers_1.Param)('id')),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Number, dto_1.UpdateTrainingDto]),
    __metadata('design:returntype', Promise),
  ],
  TrainingController.prototype,
  'updateTraining',
  null,
);
__decorate(
  [
    (0, routing_controllers_1.Delete)('/:id'),
    (0, routing_controllers_1.OnUndefined)(204),
    (0, routing_controllers_openapi_1.OpenAPI)({
      summary: 'Удалить тренировку',
      responses: {
        204: {
          description: 'Тренировка удалена',
        },
      },
    }),
    __param(0, (0, routing_controllers_1.Param)('id')),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Number]),
    __metadata('design:returntype', Promise),
  ],
  TrainingController.prototype,
  'deleteTraining',
  null,
);
exports.TrainingController = TrainingController = __decorate(
  [
    (0, routing_controllers_1.JsonController)('/trainings'),
    (0, typedi_1.Service)(),
    __metadata('design:paramtypes', [
      training_service_1.TrainingService,
      rabbitmq_service_1.RabbitMQService,
    ]),
  ],
  TrainingController,
);
