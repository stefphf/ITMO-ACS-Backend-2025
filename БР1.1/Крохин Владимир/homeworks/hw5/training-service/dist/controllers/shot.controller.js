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
exports.ShotController = void 0;
const routing_controllers_1 = require('routing-controllers');
const routing_controllers_openapi_1 = require('routing-controllers-openapi');
const shot_service_1 = require('../services/shot.service');
const auth_middleware_1 = __importDefault(
  require('../middlewares/auth.middleware'),
);
const typeorm_1 = require('typeorm');
const shot_entity_1 = require('../models/shot.entity');
let ShotController = (() => {
  let _classDecorators = [(0, routing_controllers_1.JsonController)('/shot')];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _instanceExtraInitializers = [];
  let _getShotById_decorators;
  let _createShot_decorators;
  let _updateShot_decorators;
  let _deleteShot_decorators;
  let _getShotsBySeriesId_decorators;
  var ShotController = (_classThis = class {
    constructor() {
      this.shotService = __runInitializers(this, _instanceExtraInitializers);
      const shotRepository = (0, typeorm_1.getRepository)(
        shot_entity_1.ShotEntity,
      );
      this.shotService = new shot_service_1.ShotService(shotRepository);
    }
    /**
     * Получить выстрел по ID
     * @param id ID выстрела
     * @returns Данные выстрела
     */
    getShotById(id) {
      return __awaiter(this, void 0, void 0, function* () {
        return yield this.shotService.getShotById(id);
      });
    }
    /**
     * Создать выстрел
     * @param dto Данные для создания выстрела
     * @returns Созданный выстрел
     */
    createShot(dto) {
      return __awaiter(this, void 0, void 0, function* () {
        return yield this.shotService.createShot(dto);
      });
    }
    /**
     * Обновить выстрел
     * @param id ID выстрела
     * @param dto Новые данные выстрела
     * @returns Обновленный выстрел
     */
    updateShot(id, dto) {
      return __awaiter(this, void 0, void 0, function* () {
        return yield this.shotService.updateShot(id, dto);
      });
    }
    /**
     * Удалить выстрел
     * @param id ID выстрела
     */
    deleteShot(id) {
      return __awaiter(this, void 0, void 0, function* () {
        yield this.shotService.deleteShot(id);
      });
    }
    /**
     * Получить выстрелы по ID серии
     * @param seriesId ID серии
     * @returns Список выстрелов
     */
    getShotsBySeriesId(seriesId) {
      return __awaiter(this, void 0, void 0, function* () {
        return yield this.shotService.getShotsBySeriesId(seriesId);
      });
    }
  });
  __setFunctionName(_classThis, 'ShotController');
  (() => {
    const _metadata =
      typeof Symbol === 'function' && Symbol.metadata
        ? Object.create(null)
        : void 0;
    _getShotById_decorators = [
      (0, routing_controllers_1.Get)('/:id'),
      (0, routing_controllers_1.Authorized)(),
      (0, routing_controllers_openapi_1.OpenAPI)({
        summary: 'Get shot by id',
        responses: {
          200: {
            description: 'Shot',
            type: 'object',
            $ref: '#/components/schemas/ShotDto',
          },
        },
      }),
    ];
    _createShot_decorators = [
      (0, routing_controllers_1.Post)(),
      (0, routing_controllers_1.Authorized)(),
      (0, routing_controllers_openapi_1.OpenAPI)({
        summary: 'Create shot',
        responses: {
          200: {
            description: 'Created shot',
            type: 'object',
            $ref: '#/components/schemas/ShotDto',
          },
        },
      }),
    ];
    _updateShot_decorators = [
      (0, routing_controllers_1.Patch)('/:id'),
      (0, routing_controllers_1.UseBefore)(auth_middleware_1.default),
      (0, routing_controllers_openapi_1.OpenAPI)({
        summary: 'Update shot',
        responses: {
          200: {
            description: 'Updated shot',
            type: 'object',
            $ref: '#/components/schemas/ShotDto',
          },
        },
      }),
    ];
    _deleteShot_decorators = [
      (0, routing_controllers_1.Delete)('/:id'),
      (0, routing_controllers_1.Authorized)(),
      (0, routing_controllers_openapi_1.OpenAPI)({
        summary: 'Delete shot',
        responses: {
          200: {
            description: 'Success',
          },
        },
      }),
    ];
    _getShotsBySeriesId_decorators = [
      (0, routing_controllers_1.Get)('/series/:seriesId'),
      (0, routing_controllers_1.Authorized)(),
      (0, routing_controllers_openapi_1.OpenAPI)({
        summary: 'Get shots by series id',
        responses: {
          200: {
            description: 'List of shots',
            type: 'array',
            items: { $ref: '#/components/schemas/ShotDto' },
          },
        },
      }),
    ];
    __esDecorate(
      _classThis,
      null,
      _getShotById_decorators,
      {
        kind: 'method',
        name: 'getShotById',
        static: false,
        private: false,
        access: {
          has: obj => 'getShotById' in obj,
          get: obj => obj.getShotById,
        },
        metadata: _metadata,
      },
      null,
      _instanceExtraInitializers,
    );
    __esDecorate(
      _classThis,
      null,
      _createShot_decorators,
      {
        kind: 'method',
        name: 'createShot',
        static: false,
        private: false,
        access: { has: obj => 'createShot' in obj, get: obj => obj.createShot },
        metadata: _metadata,
      },
      null,
      _instanceExtraInitializers,
    );
    __esDecorate(
      _classThis,
      null,
      _updateShot_decorators,
      {
        kind: 'method',
        name: 'updateShot',
        static: false,
        private: false,
        access: { has: obj => 'updateShot' in obj, get: obj => obj.updateShot },
        metadata: _metadata,
      },
      null,
      _instanceExtraInitializers,
    );
    __esDecorate(
      _classThis,
      null,
      _deleteShot_decorators,
      {
        kind: 'method',
        name: 'deleteShot',
        static: false,
        private: false,
        access: { has: obj => 'deleteShot' in obj, get: obj => obj.deleteShot },
        metadata: _metadata,
      },
      null,
      _instanceExtraInitializers,
    );
    __esDecorate(
      _classThis,
      null,
      _getShotsBySeriesId_decorators,
      {
        kind: 'method',
        name: 'getShotsBySeriesId',
        static: false,
        private: false,
        access: {
          has: obj => 'getShotsBySeriesId' in obj,
          get: obj => obj.getShotsBySeriesId,
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
    ShotController = _classThis = _classDescriptor.value;
    if (_metadata)
      Object.defineProperty(_classThis, Symbol.metadata, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _metadata,
      });
    __runInitializers(_classThis, _classExtraInitializers);
  })();
  return (ShotController = _classThis);
})();
exports.ShotController = ShotController;
