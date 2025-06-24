'use strict';
var __runInitializers =
  (this && this.__runInitializers) ||
  function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
      value = useValue
        ? initializers[i].call(thisArg, value)
        : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
  };
var __esDecorate =
  (this && this.__esDecorate) ||
  function (
    ctor,
    descriptorIn,
    decorators,
    contextIn,
    initializers,
    extraInitializers,
  ) {
    function accept(f) {
      if (f !== void 0 && typeof f !== 'function')
        throw new TypeError('Function expected');
      return f;
    }
    var kind = contextIn.kind,
      key = kind === 'getter' ? 'get' : kind === 'setter' ? 'set' : 'value';
    var target =
      !descriptorIn && ctor
        ? contextIn['static']
          ? ctor
          : ctor.prototype
        : null;
    var descriptor =
      descriptorIn ||
      (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _,
      done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
      var context = {};
      for (var p in contextIn) context[p] = p === 'access' ? {} : contextIn[p];
      for (var p in contextIn.access) context.access[p] = contextIn.access[p];
      context.addInitializer = function (f) {
        if (done)
          throw new TypeError(
            'Cannot add initializers after decoration has completed',
          );
        extraInitializers.push(accept(f || null));
      };
      var result = (0, decorators[i])(
        kind === 'accessor'
          ? { get: descriptor.get, set: descriptor.set }
          : descriptor[key],
        context,
      );
      if (kind === 'accessor') {
        if (result === void 0) continue;
        if (result === null || typeof result !== 'object')
          throw new TypeError('Object expected');
        if ((_ = accept(result.get))) descriptor.get = _;
        if ((_ = accept(result.set))) descriptor.set = _;
        if ((_ = accept(result.init))) initializers.unshift(_);
      } else if ((_ = accept(result))) {
        if (kind === 'field') initializers.unshift(_);
        else descriptor[key] = _;
      }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
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
var __setFunctionName =
  (this && this.__setFunctionName) ||
  function (f, name, prefix) {
    if (typeof name === 'symbol')
      name = name.description ? '['.concat(name.description, ']') : '';
    return Object.defineProperty(f, 'name', {
      configurable: true,
      value: prefix ? ''.concat(prefix, ' ', name) : name,
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.TrainingController = void 0;
const routing_controllers_1 = require('routing-controllers');
const routing_controllers_openapi_1 = require('routing-controllers-openapi');
const training_dto_1 = require('../dtos/training.dto');
const typedi_1 = require('typedi');
const common_1 = require('@app/common');
let TrainingController = (() => {
  let _classDecorators = [
    (0, routing_controllers_1.JsonController)('/trainings'),
    (0, typedi_1.Service)(),
  ];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _instanceExtraInitializers = [];
  let _getAllTrainings_decorators;
  let _getTrainingById_decorators;
  let _createTraining_decorators;
  let _createQualificationTraining_decorators;
  let _updateFreeTraining_decorators;
  let _updateQualificationTraining_decorators;
  let _updateTrainingProgress_decorators;
  let _updateTraining_decorators;
  let _deleteTraining_decorators;
  var TrainingController = (_classThis = class {
    constructor(trainingService, rabbitMQService) {
      this.trainingService =
        (__runInitializers(this, _instanceExtraInitializers), trainingService);
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
    updateTrainingProgress(id, data) {
      return __awaiter(this, void 0, void 0, function* () {
        const result = yield this.trainingService.updateTrainingProgress(
          id,
          data.progress,
        );
        yield this.rabbitMQService.sendMessage(
          common_1.RoutingKey.TRAINING_PROGRESS,
          {
            id: result.id,
            type:
              result instanceof training_dto_1.FreeTrainingDto
                ? 'free'
                : 'qualification',
            data: result,
          },
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
        return this.trainingService.deleteTraining(id);
      });
    }
  });
  __setFunctionName(_classThis, 'TrainingController');
  (() => {
    const _metadata =
      typeof Symbol === 'function' && Symbol.metadata
        ? Object.create(null)
        : void 0;
    _getAllTrainings_decorators = [
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
      (0, routing_controllers_openapi_1.ResponseSchema)(
        training_dto_1.FreeTrainingDto,
        {
          isArray: true,
        },
      ),
    ];
    _getTrainingById_decorators = [
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
      (0, routing_controllers_openapi_1.ResponseSchema)(
        training_dto_1.FreeTrainingDto,
      ),
    ];
    _createTraining_decorators = [
      (0, routing_controllers_1.Post)('/'),
      (0, routing_controllers_1.Authorized)(),
      (0, routing_controllers_openapi_1.OpenAPI)({
        summary: 'Создать тренировку',
      }),
      (0, routing_controllers_openapi_1.ResponseSchema)(
        training_dto_1.FreeTrainingDto,
      ),
    ];
    _createQualificationTraining_decorators = [
      (0, routing_controllers_1.Post)('/qualification'),
      (0, routing_controllers_1.HttpCode)(201),
      (0, routing_controllers_openapi_1.OpenAPI)({
        summary: 'Создать квалификационную тренировку',
        responses: {
          201: {
            description: 'Квалификационная тренировка создана',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/QualificationTrainingDto',
                },
              },
            },
          },
        },
      }),
      (0, routing_controllers_openapi_1.ResponseSchema)(
        training_dto_1.QualificationTrainingDto,
      ),
    ];
    _updateFreeTraining_decorators = [
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
      (0, routing_controllers_openapi_1.ResponseSchema)(
        training_dto_1.FreeTrainingDto,
      ),
    ];
    _updateQualificationTraining_decorators = [
      (0, routing_controllers_1.Put)('/qualification/:id'),
      (0, routing_controllers_openapi_1.OpenAPI)({
        summary: 'Обновить квалификационную тренировку',
        responses: {
          200: {
            description: 'Квалификационная тренировка обновлена',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/QualificationTrainingDto',
                },
              },
            },
          },
        },
      }),
      (0, routing_controllers_openapi_1.ResponseSchema)(
        training_dto_1.QualificationTrainingDto,
      ),
    ];
    _updateTrainingProgress_decorators = [
      (0, routing_controllers_1.Put)('/:id/progress'),
      (0, routing_controllers_openapi_1.OpenAPI)({
        summary: 'Обновить прогресс тренировки',
        responses: {
          200: {
            description: 'Прогресс тренировки обновлен',
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
      (0, routing_controllers_openapi_1.ResponseSchema)(
        training_dto_1.FreeTrainingDto,
      ),
    ];
    _updateTraining_decorators = [
      (0, routing_controllers_1.Put)('/:id'),
      (0, routing_controllers_1.Authorized)(),
      (0, routing_controllers_openapi_1.OpenAPI)({
        summary: 'Update training',
      }),
    ];
    _deleteTraining_decorators = [
      (0, routing_controllers_1.Delete)('/:id'),
      (0, routing_controllers_1.Authorized)(),
      (0, routing_controllers_openapi_1.OpenAPI)({
        summary: 'Delete training',
      }),
    ];
    __esDecorate(
      _classThis,
      null,
      _getAllTrainings_decorators,
      {
        kind: 'method',
        name: 'getAllTrainings',
        static: false,
        private: false,
        access: {
          has: obj => 'getAllTrainings' in obj,
          get: obj => obj.getAllTrainings,
        },
        metadata: _metadata,
      },
      null,
      _instanceExtraInitializers,
    );
    __esDecorate(
      _classThis,
      null,
      _getTrainingById_decorators,
      {
        kind: 'method',
        name: 'getTrainingById',
        static: false,
        private: false,
        access: {
          has: obj => 'getTrainingById' in obj,
          get: obj => obj.getTrainingById,
        },
        metadata: _metadata,
      },
      null,
      _instanceExtraInitializers,
    );
    __esDecorate(
      _classThis,
      null,
      _createTraining_decorators,
      {
        kind: 'method',
        name: 'createTraining',
        static: false,
        private: false,
        access: {
          has: obj => 'createTraining' in obj,
          get: obj => obj.createTraining,
        },
        metadata: _metadata,
      },
      null,
      _instanceExtraInitializers,
    );
    __esDecorate(
      _classThis,
      null,
      _createQualificationTraining_decorators,
      {
        kind: 'method',
        name: 'createQualificationTraining',
        static: false,
        private: false,
        access: {
          has: obj => 'createQualificationTraining' in obj,
          get: obj => obj.createQualificationTraining,
        },
        metadata: _metadata,
      },
      null,
      _instanceExtraInitializers,
    );
    __esDecorate(
      _classThis,
      null,
      _updateFreeTraining_decorators,
      {
        kind: 'method',
        name: 'updateFreeTraining',
        static: false,
        private: false,
        access: {
          has: obj => 'updateFreeTraining' in obj,
          get: obj => obj.updateFreeTraining,
        },
        metadata: _metadata,
      },
      null,
      _instanceExtraInitializers,
    );
    __esDecorate(
      _classThis,
      null,
      _updateQualificationTraining_decorators,
      {
        kind: 'method',
        name: 'updateQualificationTraining',
        static: false,
        private: false,
        access: {
          has: obj => 'updateQualificationTraining' in obj,
          get: obj => obj.updateQualificationTraining,
        },
        metadata: _metadata,
      },
      null,
      _instanceExtraInitializers,
    );
    __esDecorate(
      _classThis,
      null,
      _updateTrainingProgress_decorators,
      {
        kind: 'method',
        name: 'updateTrainingProgress',
        static: false,
        private: false,
        access: {
          has: obj => 'updateTrainingProgress' in obj,
          get: obj => obj.updateTrainingProgress,
        },
        metadata: _metadata,
      },
      null,
      _instanceExtraInitializers,
    );
    __esDecorate(
      _classThis,
      null,
      _updateTraining_decorators,
      {
        kind: 'method',
        name: 'updateTraining',
        static: false,
        private: false,
        access: {
          has: obj => 'updateTraining' in obj,
          get: obj => obj.updateTraining,
        },
        metadata: _metadata,
      },
      null,
      _instanceExtraInitializers,
    );
    __esDecorate(
      _classThis,
      null,
      _deleteTraining_decorators,
      {
        kind: 'method',
        name: 'deleteTraining',
        static: false,
        private: false,
        access: {
          has: obj => 'deleteTraining' in obj,
          get: obj => obj.deleteTraining,
        },
        metadata: _metadata,
      },
      null,
      _instanceExtraInitializers,
    );
    __esDecorate(
      null,
      (_classDescriptor = { value: _classThis }),
      _classDecorators,
      { kind: 'class', name: _classThis.name, metadata: _metadata },
      null,
      _classExtraInitializers,
    );
    TrainingController = _classThis = _classDescriptor.value;
    if (_metadata)
      Object.defineProperty(_classThis, Symbol.metadata, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _metadata,
      });
    __runInitializers(_classThis, _classExtraInitializers);
  })();
  return (TrainingController = _classThis);
})();
exports.TrainingController = TrainingController;
