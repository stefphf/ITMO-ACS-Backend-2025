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
const training_dto_1 = require('../dtos/training.dto');
const database_1 = require('../config/database');
const athlete_entity_1 = require('../models/athlete.entity');
const auth_middleware_1 = __importDefault(
  require('../middlewares/auth.middleware'),
);
let FreeTrainingController = (() => {
  let _classDecorators = [
    (0, routing_controllers_1.JsonController)('/free-trainings'),
  ];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _instanceExtraInitializers = [];
  let _getAllFreeTrainings_decorators;
  let _getFreeTrainingById_decorators;
  let _createFreeTraining_decorators;
  let _updateFreeTraining_decorators;
  let _deleteFreeTraining_decorators;
  let _getFreeTrainingsByAthleteId_decorators;
  let _getCurrentUserFreeTrainings_decorators;
  var FreeTrainingController = (_classThis = class {
    constructor() {
      this.trainingService = __runInitializers(
        this,
        _instanceExtraInitializers,
      );
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
          console.error(
            `Ошибка при удалении свободной тренировки ${id}:`,
            error,
          );
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
  });
  __setFunctionName(_classThis, 'FreeTrainingController');
  (() => {
    const _metadata =
      typeof Symbol === 'function' && Symbol.metadata
        ? Object.create(null)
        : void 0;
    _getAllFreeTrainings_decorators = [
      (0, routing_controllers_1.Get)('/'),
      (0, routing_controllers_openapi_1.OpenAPI)({
        summary: 'Получить все свободные тренировки',
      }),
      (0, routing_controllers_openapi_1.ResponseSchema)(
        training_dto_1.FreeTrainingDto,
        {
          isArray: true,
        },
      ),
    ];
    _getFreeTrainingById_decorators = [
      (0, routing_controllers_1.Get)('/:id'),
      (0, routing_controllers_openapi_1.OpenAPI)({
        summary: 'Получить свободную тренировку по id',
      }),
      (0, routing_controllers_openapi_1.ResponseSchema)(
        training_dto_1.FreeTrainingDto,
      ),
    ];
    _createFreeTraining_decorators = [
      (0, routing_controllers_1.Post)('/'),
      (0, routing_controllers_1.UseBefore)(auth_middleware_1.default),
      (0, routing_controllers_openapi_1.OpenAPI)({
        summary: 'Создать свободную тренировку',
      }),
      (0, routing_controllers_openapi_1.ResponseSchema)(
        training_dto_1.FreeTrainingDto,
      ),
    ];
    _updateFreeTraining_decorators = [
      (0, routing_controllers_1.Patch)('/:id'),
      (0, routing_controllers_1.UseBefore)(auth_middleware_1.default),
      (0, routing_controllers_openapi_1.OpenAPI)({
        summary: 'Обновить свободную тренировку',
      }),
      (0, routing_controllers_openapi_1.ResponseSchema)(
        training_dto_1.FreeTrainingDto,
      ),
    ];
    _deleteFreeTraining_decorators = [
      (0, routing_controllers_1.Delete)('/:id'),
      (0, routing_controllers_1.UseBefore)(auth_middleware_1.default),
      (0, routing_controllers_openapi_1.OpenAPI)({
        summary: 'Удалить свободную тренировку',
      }),
      (0, routing_controllers_1.OnUndefined)(204),
    ];
    _getFreeTrainingsByAthleteId_decorators = [
      (0, routing_controllers_1.Get)('/athlete/:athleteId'),
      (0, routing_controllers_openapi_1.OpenAPI)({
        summary: 'Получить свободные тренировки по id спортсмена',
      }),
      (0, routing_controllers_openapi_1.ResponseSchema)(
        training_dto_1.FreeTrainingDto,
        {
          isArray: true,
        },
      ),
    ];
    _getCurrentUserFreeTrainings_decorators = [
      (0, routing_controllers_1.Get)('/current-user'),
      (0, routing_controllers_1.UseBefore)(auth_middleware_1.default),
      (0, routing_controllers_openapi_1.OpenAPI)({
        summary: 'Получить свободные тренировки текущего пользователя',
      }),
      (0, routing_controllers_openapi_1.ResponseSchema)(
        training_dto_1.FreeTrainingDto,
        {
          isArray: true,
        },
      ),
    ];
    __esDecorate(
      _classThis,
      null,
      _getAllFreeTrainings_decorators,
      {
        kind: 'method',
        name: 'getAllFreeTrainings',
        static: false,
        private: false,
        access: {
          has: obj => 'getAllFreeTrainings' in obj,
          get: obj => obj.getAllFreeTrainings,
        },
        metadata: _metadata,
      },
      null,
      _instanceExtraInitializers,
    );
    __esDecorate(
      _classThis,
      null,
      _getFreeTrainingById_decorators,
      {
        kind: 'method',
        name: 'getFreeTrainingById',
        static: false,
        private: false,
        access: {
          has: obj => 'getFreeTrainingById' in obj,
          get: obj => obj.getFreeTrainingById,
        },
        metadata: _metadata,
      },
      null,
      _instanceExtraInitializers,
    );
    __esDecorate(
      _classThis,
      null,
      _createFreeTraining_decorators,
      {
        kind: 'method',
        name: 'createFreeTraining',
        static: false,
        private: false,
        access: {
          has: obj => 'createFreeTraining' in obj,
          get: obj => obj.createFreeTraining,
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
      _deleteFreeTraining_decorators,
      {
        kind: 'method',
        name: 'deleteFreeTraining',
        static: false,
        private: false,
        access: {
          has: obj => 'deleteFreeTraining' in obj,
          get: obj => obj.deleteFreeTraining,
        },
        metadata: _metadata,
      },
      null,
      _instanceExtraInitializers,
    );
    __esDecorate(
      _classThis,
      null,
      _getFreeTrainingsByAthleteId_decorators,
      {
        kind: 'method',
        name: 'getFreeTrainingsByAthleteId',
        static: false,
        private: false,
        access: {
          has: obj => 'getFreeTrainingsByAthleteId' in obj,
          get: obj => obj.getFreeTrainingsByAthleteId,
        },
        metadata: _metadata,
      },
      null,
      _instanceExtraInitializers,
    );
    __esDecorate(
      _classThis,
      null,
      _getCurrentUserFreeTrainings_decorators,
      {
        kind: 'method',
        name: 'getCurrentUserFreeTrainings',
        static: false,
        private: false,
        access: {
          has: obj => 'getCurrentUserFreeTrainings' in obj,
          get: obj => obj.getCurrentUserFreeTrainings,
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
    FreeTrainingController = _classThis = _classDescriptor.value;
    if (_metadata)
      Object.defineProperty(_classThis, Symbol.metadata, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _metadata,
      });
    __runInitializers(_classThis, _classExtraInitializers);
  })();
  return (FreeTrainingController = _classThis);
})();
exports.FreeTrainingController = FreeTrainingController;
