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
exports.QualificationTrainingController = void 0;
const routing_controllers_1 = require('routing-controllers');
const routing_controllers_openapi_1 = require('routing-controllers-openapi');
const training_service_1 = require('../services/training.service');
const training_dto_1 = require('../dtos/training.dto');
const database_1 = require('../config/database');
const athlete_entity_1 = require('../models/athlete.entity');
const auth_middleware_1 = __importDefault(
  require('../middlewares/auth.middleware'),
);
let QualificationTrainingController = (() => {
  let _classDecorators = [
    (0, routing_controllers_1.JsonController)('/qualification-trainings'),
  ];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _instanceExtraInitializers = [];
  let _getAllQualificationTrainings_decorators;
  let _getQualificationTrainingById_decorators;
  let _createQualificationTraining_decorators;
  let _updateQualificationTraining_decorators;
  let _deleteQualificationTraining_decorators;
  let _getQualificationTrainingsByAthleteId_decorators;
  let _getCurrentUserQualificationTrainings_decorators;
  var QualificationTrainingController = (_classThis = class {
    constructor() {
      this.trainingService = __runInitializers(
        this,
        _instanceExtraInitializers,
      );
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
          return yield this.trainingService.updateQualificationTraining(
            id,
            dto,
          );
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
  });
  __setFunctionName(_classThis, 'QualificationTrainingController');
  (() => {
    const _metadata =
      typeof Symbol === 'function' && Symbol.metadata
        ? Object.create(null)
        : void 0;
    _getAllQualificationTrainings_decorators = [
      (0, routing_controllers_1.Get)('/'),
      (0, routing_controllers_openapi_1.OpenAPI)({
        summary: 'Получить все квалификационные тренировки',
      }),
      (0, routing_controllers_openapi_1.ResponseSchema)(
        training_dto_1.QualificationTrainingDto,
        {
          isArray: true,
        },
      ),
    ];
    _getQualificationTrainingById_decorators = [
      (0, routing_controllers_1.Get)('/:id'),
      (0, routing_controllers_openapi_1.OpenAPI)({
        summary: 'Получить квалификационную тренировку по id',
      }),
      (0, routing_controllers_openapi_1.ResponseSchema)(
        training_dto_1.QualificationTrainingDto,
      ),
    ];
    _createQualificationTraining_decorators = [
      (0, routing_controllers_1.Post)('/'),
      (0, routing_controllers_1.UseBefore)(auth_middleware_1.default),
      (0, routing_controllers_openapi_1.OpenAPI)({
        summary: 'Создать квалификационную тренировку',
      }),
      (0, routing_controllers_openapi_1.ResponseSchema)(
        training_dto_1.QualificationTrainingDto,
      ),
    ];
    _updateQualificationTraining_decorators = [
      (0, routing_controllers_1.Patch)('/:id'),
      (0, routing_controllers_1.UseBefore)(auth_middleware_1.default),
      (0, routing_controllers_openapi_1.OpenAPI)({
        summary: 'Обновить квалификационную тренировку',
      }),
      (0, routing_controllers_openapi_1.ResponseSchema)(
        training_dto_1.QualificationTrainingDto,
      ),
    ];
    _deleteQualificationTraining_decorators = [
      (0, routing_controllers_1.Delete)('/:id'),
      (0, routing_controllers_1.UseBefore)(auth_middleware_1.default),
      (0, routing_controllers_openapi_1.OpenAPI)({
        summary: 'Удалить квалификационную тренировку',
      }),
      (0, routing_controllers_1.OnUndefined)(204),
    ];
    _getQualificationTrainingsByAthleteId_decorators = [
      (0, routing_controllers_1.Get)('/athlete/:athleteId'),
      (0, routing_controllers_openapi_1.OpenAPI)({
        summary: 'Получить квалификационные тренировки по id спортсмена',
      }),
      (0, routing_controllers_openapi_1.ResponseSchema)(
        training_dto_1.QualificationTrainingDto,
        {
          isArray: true,
        },
      ),
    ];
    _getCurrentUserQualificationTrainings_decorators = [
      (0, routing_controllers_1.Get)('/current-user'),
      (0, routing_controllers_1.UseBefore)(auth_middleware_1.default),
      (0, routing_controllers_openapi_1.OpenAPI)({
        summary: 'Получить квалификационные тренировки текущего пользователя',
      }),
      (0, routing_controllers_openapi_1.ResponseSchema)(
        training_dto_1.QualificationTrainingDto,
        {
          isArray: true,
        },
      ),
    ];
    __esDecorate(
      _classThis,
      null,
      _getAllQualificationTrainings_decorators,
      {
        kind: 'method',
        name: 'getAllQualificationTrainings',
        static: false,
        private: false,
        access: {
          has: obj => 'getAllQualificationTrainings' in obj,
          get: obj => obj.getAllQualificationTrainings,
        },
        metadata: _metadata,
      },
      null,
      _instanceExtraInitializers,
    );
    __esDecorate(
      _classThis,
      null,
      _getQualificationTrainingById_decorators,
      {
        kind: 'method',
        name: 'getQualificationTrainingById',
        static: false,
        private: false,
        access: {
          has: obj => 'getQualificationTrainingById' in obj,
          get: obj => obj.getQualificationTrainingById,
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
      _deleteQualificationTraining_decorators,
      {
        kind: 'method',
        name: 'deleteQualificationTraining',
        static: false,
        private: false,
        access: {
          has: obj => 'deleteQualificationTraining' in obj,
          get: obj => obj.deleteQualificationTraining,
        },
        metadata: _metadata,
      },
      null,
      _instanceExtraInitializers,
    );
    __esDecorate(
      _classThis,
      null,
      _getQualificationTrainingsByAthleteId_decorators,
      {
        kind: 'method',
        name: 'getQualificationTrainingsByAthleteId',
        static: false,
        private: false,
        access: {
          has: obj => 'getQualificationTrainingsByAthleteId' in obj,
          get: obj => obj.getQualificationTrainingsByAthleteId,
        },
        metadata: _metadata,
      },
      null,
      _instanceExtraInitializers,
    );
    __esDecorate(
      _classThis,
      null,
      _getCurrentUserQualificationTrainings_decorators,
      {
        kind: 'method',
        name: 'getCurrentUserQualificationTrainings',
        static: false,
        private: false,
        access: {
          has: obj => 'getCurrentUserQualificationTrainings' in obj,
          get: obj => obj.getCurrentUserQualificationTrainings,
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
    QualificationTrainingController = _classThis = _classDescriptor.value;
    if (_metadata)
      Object.defineProperty(_classThis, Symbol.metadata, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _metadata,
      });
    __runInitializers(_classThis, _classExtraInitializers);
  })();
  return (QualificationTrainingController = _classThis);
})();
exports.QualificationTrainingController = QualificationTrainingController;
