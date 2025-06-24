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
exports.SeriesController = void 0;
const routing_controllers_1 = require('routing-controllers');
const routing_controllers_openapi_1 = require('routing-controllers-openapi');
const auth_middleware_1 = __importDefault(
  require('../middlewares/auth.middleware'),
);
const series_service_1 = require('../services/series.service');
const typeorm_1 = require('typeorm');
const series_entity_1 = require('../models/series.entity');
const shot_entity_1 = require('../models/shot.entity');
let SeriesController = (() => {
  let _classDecorators = [(0, routing_controllers_1.JsonController)('/series')];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _instanceExtraInitializers = [];
  let _getAllSeries_decorators;
  let _getSeriesById_decorators;
  let _createSeries_decorators;
  let _createSeriesForFreeTraining_decorators;
  let _createSeriesForQualificationTraining_decorators;
  let _updateSeries_decorators;
  let _deleteSeries_decorators;
  let _getSeriesByTrainingId_decorators;
  var SeriesController = (_classThis = class {
    constructor() {
      this.trainingService = __runInitializers(
        this,
        _instanceExtraInitializers,
      );
      const seriesRepository = (0, typeorm_1.getRepository)(
        series_entity_1.SeriesEntity,
      );
      const shotRepository = (0, typeorm_1.getRepository)(
        shot_entity_1.ShotEntity,
      );
      this.seriesService = new series_service_1.SeriesService(
        seriesRepository,
        shotRepository,
      );
    }
    /**
     * Получить все серии
     * @returns Список всех серий
     */
    getAllSeries() {
      return __awaiter(this, void 0, void 0, function* () {
        return yield this.seriesService.getAllSeries();
      });
    }
    /**
     * Получить серию по ID
     * @param id ID серии
     * @returns Данные серии
     */
    getSeriesById(id) {
      return __awaiter(this, void 0, void 0, function* () {
        return yield this.seriesService.getSeriesById(id);
      });
    }
    /**
     * Создать серию
     * @param dto Данные для создания серии
     * @returns Созданная серия
     */
    createSeries(dto) {
      return __awaiter(this, void 0, void 0, function* () {
        return yield this.seriesService.createSeries(dto);
      });
    }
    /**
     * Создать серию для свободной тренировки
     * @param trainingId ID свободной тренировки
     * @param dto Данные для создания серии
     * @returns Созданная серия
     */
    createSeriesForFreeTraining(trainingId, dto) {
      return __awaiter(this, void 0, void 0, function* () {
        try {
          return yield this.trainingService.addSeriesToFreeTraining(
            trainingId,
            dto,
          );
        } catch (error) {
          console.error(
            'Ошибка при создании серии для свободной тренировки:',
            error,
          );
          throw new routing_controllers_1.BadRequestError(
            'Не удалось создать серию для свободной тренировки',
          );
        }
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
          return yield this.trainingService.addSeriesToQualificationTraining(
            dto,
          );
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
        return yield this.seriesService.updateSeries(id, dto);
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
    getSeriesByTrainingId(trainingId, trainingType) {
      return __awaiter(this, void 0, void 0, function* () {
        return yield this.seriesService.getSeriesByTrainingId(
          trainingId,
          trainingType,
        );
      });
    }
  });
  __setFunctionName(_classThis, 'SeriesController');
  (() => {
    const _metadata =
      typeof Symbol === 'function' && Symbol.metadata
        ? Object.create(null)
        : void 0;
    _getAllSeries_decorators = [
      (0, routing_controllers_1.Get)(),
      (0, routing_controllers_1.Authorized)(),
      (0, routing_controllers_openapi_1.OpenAPI)({
        summary: 'Get all series',
        responses: {
          200: {
            description: 'List of series',
            type: 'array',
            items: { $ref: '#/components/schemas/SeriesDto' },
          },
        },
      }),
    ];
    _getSeriesById_decorators = [
      (0, routing_controllers_1.Get)('/:id'),
      (0, routing_controllers_1.Authorized)(),
      (0, routing_controllers_openapi_1.OpenAPI)({
        summary: 'Get series by id',
        responses: {
          200: {
            description: 'Series',
            type: 'object',
            $ref: '#/components/schemas/SeriesDto',
          },
        },
      }),
    ];
    _createSeries_decorators = [
      (0, routing_controllers_1.Post)(),
      (0, routing_controllers_1.Authorized)(),
      (0, routing_controllers_openapi_1.OpenAPI)({
        summary: 'Create series',
        responses: {
          200: {
            description: 'Created series',
            type: 'object',
            $ref: '#/components/schemas/SeriesDto',
          },
        },
      }),
    ];
    _createSeriesForFreeTraining_decorators = [
      (0, routing_controllers_1.Post)('/free/:trainingId'),
      (0, routing_controllers_1.UseBefore)(auth_middleware_1.default),
      (0, routing_controllers_openapi_1.OpenAPI)({
        summary: 'Создать серию для свободной тренировки',
      }),
      (0, routing_controllers_openapi_1.ResponseSchema)(dto_1.SeriesDto),
    ];
    _createSeriesForQualificationTraining_decorators = [
      (0, routing_controllers_1.Post)('/qualification'),
      (0, routing_controllers_1.UseBefore)(auth_middleware_1.default),
      (0, routing_controllers_openapi_1.OpenAPI)({
        summary: 'Создать серию для квалификационной тренировки',
      }),
      (0, routing_controllers_openapi_1.ResponseSchema)(dto_1.SeriesDto),
    ];
    _updateSeries_decorators = [
      (0, routing_controllers_1.Patch)('/:id'),
      (0, routing_controllers_1.UseBefore)(auth_middleware_1.default),
      (0, routing_controllers_openapi_1.OpenAPI)({
        summary: 'Update series',
        responses: {
          200: {
            description: 'Updated series',
            type: 'object',
            $ref: '#/components/schemas/SeriesDto',
          },
        },
      }),
    ];
    _deleteSeries_decorators = [
      (0, routing_controllers_1.Delete)('/:id'),
      (0, routing_controllers_1.Authorized)(),
      (0, routing_controllers_openapi_1.OpenAPI)({
        summary: 'Delete series',
        responses: {
          200: {
            description: 'Success',
          },
        },
      }),
    ];
    _getSeriesByTrainingId_decorators = [
      (0, routing_controllers_1.Get)('/training/:trainingId'),
      (0, routing_controllers_1.Authorized)(),
      (0, routing_controllers_openapi_1.OpenAPI)({
        summary: 'Get series by training id',
        responses: {
          200: {
            description: 'List of series',
            type: 'array',
            items: { $ref: '#/components/schemas/SeriesDto' },
          },
        },
      }),
    ];
    __esDecorate(
      _classThis,
      null,
      _getAllSeries_decorators,
      {
        kind: 'method',
        name: 'getAllSeries',
        static: false,
        private: false,
        access: {
          has: obj => 'getAllSeries' in obj,
          get: obj => obj.getAllSeries,
        },
        metadata: _metadata,
      },
      null,
      _instanceExtraInitializers,
    );
    __esDecorate(
      _classThis,
      null,
      _getSeriesById_decorators,
      {
        kind: 'method',
        name: 'getSeriesById',
        static: false,
        private: false,
        access: {
          has: obj => 'getSeriesById' in obj,
          get: obj => obj.getSeriesById,
        },
        metadata: _metadata,
      },
      null,
      _instanceExtraInitializers,
    );
    __esDecorate(
      _classThis,
      null,
      _createSeries_decorators,
      {
        kind: 'method',
        name: 'createSeries',
        static: false,
        private: false,
        access: {
          has: obj => 'createSeries' in obj,
          get: obj => obj.createSeries,
        },
        metadata: _metadata,
      },
      null,
      _instanceExtraInitializers,
    );
    __esDecorate(
      _classThis,
      null,
      _createSeriesForFreeTraining_decorators,
      {
        kind: 'method',
        name: 'createSeriesForFreeTraining',
        static: false,
        private: false,
        access: {
          has: obj => 'createSeriesForFreeTraining' in obj,
          get: obj => obj.createSeriesForFreeTraining,
        },
        metadata: _metadata,
      },
      null,
      _instanceExtraInitializers,
    );
    __esDecorate(
      _classThis,
      null,
      _createSeriesForQualificationTraining_decorators,
      {
        kind: 'method',
        name: 'createSeriesForQualificationTraining',
        static: false,
        private: false,
        access: {
          has: obj => 'createSeriesForQualificationTraining' in obj,
          get: obj => obj.createSeriesForQualificationTraining,
        },
        metadata: _metadata,
      },
      null,
      _instanceExtraInitializers,
    );
    __esDecorate(
      _classThis,
      null,
      _updateSeries_decorators,
      {
        kind: 'method',
        name: 'updateSeries',
        static: false,
        private: false,
        access: {
          has: obj => 'updateSeries' in obj,
          get: obj => obj.updateSeries,
        },
        metadata: _metadata,
      },
      null,
      _instanceExtraInitializers,
    );
    __esDecorate(
      _classThis,
      null,
      _deleteSeries_decorators,
      {
        kind: 'method',
        name: 'deleteSeries',
        static: false,
        private: false,
        access: {
          has: obj => 'deleteSeries' in obj,
          get: obj => obj.deleteSeries,
        },
        metadata: _metadata,
      },
      null,
      _instanceExtraInitializers,
    );
    __esDecorate(
      _classThis,
      null,
      _getSeriesByTrainingId_decorators,
      {
        kind: 'method',
        name: 'getSeriesByTrainingId',
        static: false,
        private: false,
        access: {
          has: obj => 'getSeriesByTrainingId' in obj,
          get: obj => obj.getSeriesByTrainingId,
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
    SeriesController = _classThis = _classDescriptor.value;
    if (_metadata)
      Object.defineProperty(_classThis, Symbol.metadata, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _metadata,
      });
    __runInitializers(_classThis, _classExtraInitializers);
  })();
  return (SeriesController = _classThis);
})();
exports.SeriesController = SeriesController;
