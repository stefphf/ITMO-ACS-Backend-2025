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
exports.CoachController = void 0;
const routing_controllers_1 = require('routing-controllers');
const routing_controllers_openapi_1 = require('routing-controllers-openapi');
const coach_service_1 = require('../services/coach.service');
const coach_dto_1 = require('../dtos/coach.dto');
const auth_middleware_1 = __importDefault(
  require('../middlewares/auth.middleware'),
);
let CoachController = (() => {
  let _classDecorators = [
    (0, routing_controllers_1.JsonController)('/coaches'),
  ];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _instanceExtraInitializers = [];
  let _getAllCoaches_decorators;
  let _getCoachById_decorators;
  let _createCoach_decorators;
  let _deleteCoach_decorators;
  let _getCoachByUserId_decorators;
  let _getCurrentCoach_decorators;
  var CoachController = (_classThis = class {
    constructor() {
      this.coachService = __runInitializers(this, _instanceExtraInitializers);
      this.coachService = new coach_service_1.CoachService();
    }
    /**
     * Получить всех тренеров
     * @returns Список тренеров
     */
    getAllCoaches() {
      return __awaiter(this, void 0, void 0, function* () {
        try {
          return yield this.coachService.getAllCoaches();
        } catch (error) {
          console.error('Ошибка при получении списка тренеров:', error);
          throw new routing_controllers_1.BadRequestError(
            'Не удалось получить список тренеров',
          );
        }
      });
    }
    /**
     * Получить тренера по ID
     * @param id ID тренера
     * @returns Данные тренера
     */
    getCoachById(id) {
      return __awaiter(this, void 0, void 0, function* () {
        try {
          return yield this.coachService.getCoachById(id);
        } catch (error) {
          console.error(`Ошибка при получении тренера с id ${id}:`, error);
          throw new routing_controllers_1.NotFoundError('Тренер не найден');
        }
      });
    }
    /**
     * Создать тренера
     * @param dto Данные для создания тренера
     * @returns Созданный тренер
     */
    createCoach(dto) {
      return __awaiter(this, void 0, void 0, function* () {
        try {
          return yield this.coachService.createCoach(dto);
        } catch (error) {
          console.error('Ошибка при создании тренера:', error);
          throw new routing_controllers_1.BadRequestError(
            'Не удалось создать тренера',
          );
        }
      });
    }
    /**
     * Удалить тренера
     * @param id ID тренера
     */
    deleteCoach(id) {
      return __awaiter(this, void 0, void 0, function* () {
        try {
          yield this.coachService.deleteCoach(id);
        } catch (error) {
          console.error(`Ошибка при удалении тренера ${id}:`, error);
          throw new routing_controllers_1.NotFoundError('Тренер не найден');
        }
      });
    }
    /**
     * Получить тренера по ID пользователя
     * @param userId ID пользователя
     * @returns Данные тренера
     */
    getCoachByUserId(userId) {
      return __awaiter(this, void 0, void 0, function* () {
        try {
          return yield this.coachService.getCoachByUserId(userId);
        } catch (error) {
          console.error(
            `Ошибка при получении тренера для пользователя ${userId}:`,
            error,
          );
          throw new routing_controllers_1.NotFoundError('Тренер не найден');
        }
      });
    }
    /**
     * Получить данные текущего тренера
     * @returns Данные текущего тренера
     */
    getCurrentCoach(request) {
      return __awaiter(this, void 0, void 0, function* () {
        try {
          const userId = request.user.id;
          return yield this.coachService.getCoachByUserId(userId);
        } catch (error) {
          console.error('Ошибка при получении данных текущего тренера:', error);
          throw new routing_controllers_1.NotFoundError('Тренер не найден');
        }
      });
    }
  });
  __setFunctionName(_classThis, 'CoachController');
  (() => {
    const _metadata =
      typeof Symbol === 'function' && Symbol.metadata
        ? Object.create(null)
        : void 0;
    _getAllCoaches_decorators = [
      (0, routing_controllers_1.Get)('/'),
      (0, routing_controllers_openapi_1.OpenAPI)({
        summary: 'Получить всех тренеров',
      }),
      (0, routing_controllers_openapi_1.ResponseSchema)(coach_dto_1.CoachDto, {
        isArray: true,
      }),
    ];
    _getCoachById_decorators = [
      (0, routing_controllers_1.Get)('/:id'),
      (0, routing_controllers_openapi_1.OpenAPI)({
        summary: 'Получить тренера по id',
      }),
      (0, routing_controllers_openapi_1.ResponseSchema)(coach_dto_1.CoachDto),
    ];
    _createCoach_decorators = [
      (0, routing_controllers_1.Post)('/'),
      (0, routing_controllers_1.UseBefore)(auth_middleware_1.default),
      (0, routing_controllers_openapi_1.OpenAPI)({
        summary: 'Создать тренера',
      }),
      (0, routing_controllers_openapi_1.ResponseSchema)(coach_dto_1.CoachDto),
    ];
    _deleteCoach_decorators = [
      (0, routing_controllers_1.Delete)('/:id'),
      (0, routing_controllers_1.UseBefore)(auth_middleware_1.default),
      (0, routing_controllers_openapi_1.OpenAPI)({
        summary: 'Удалить тренера',
      }),
      (0, routing_controllers_1.OnUndefined)(204),
    ];
    _getCoachByUserId_decorators = [
      (0, routing_controllers_1.Get)('/user/:userId'),
      (0, routing_controllers_openapi_1.OpenAPI)({
        summary: 'Получить тренера по id пользователя',
      }),
      (0, routing_controllers_openapi_1.ResponseSchema)(coach_dto_1.CoachDto),
    ];
    _getCurrentCoach_decorators = [
      (0, routing_controllers_1.Get)('/current'),
      (0, routing_controllers_1.UseBefore)(auth_middleware_1.default),
      (0, routing_controllers_openapi_1.OpenAPI)({
        summary: 'Получить данные текущего тренера',
      }),
      (0, routing_controllers_openapi_1.ResponseSchema)(coach_dto_1.CoachDto),
    ];
    __esDecorate(
      _classThis,
      null,
      _getAllCoaches_decorators,
      {
        kind: 'method',
        name: 'getAllCoaches',
        static: false,
        private: false,
        access: {
          has: obj => 'getAllCoaches' in obj,
          get: obj => obj.getAllCoaches,
        },
        metadata: _metadata,
      },
      null,
      _instanceExtraInitializers,
    );
    __esDecorate(
      _classThis,
      null,
      _getCoachById_decorators,
      {
        kind: 'method',
        name: 'getCoachById',
        static: false,
        private: false,
        access: {
          has: obj => 'getCoachById' in obj,
          get: obj => obj.getCoachById,
        },
        metadata: _metadata,
      },
      null,
      _instanceExtraInitializers,
    );
    __esDecorate(
      _classThis,
      null,
      _createCoach_decorators,
      {
        kind: 'method',
        name: 'createCoach',
        static: false,
        private: false,
        access: {
          has: obj => 'createCoach' in obj,
          get: obj => obj.createCoach,
        },
        metadata: _metadata,
      },
      null,
      _instanceExtraInitializers,
    );
    __esDecorate(
      _classThis,
      null,
      _deleteCoach_decorators,
      {
        kind: 'method',
        name: 'deleteCoach',
        static: false,
        private: false,
        access: {
          has: obj => 'deleteCoach' in obj,
          get: obj => obj.deleteCoach,
        },
        metadata: _metadata,
      },
      null,
      _instanceExtraInitializers,
    );
    __esDecorate(
      _classThis,
      null,
      _getCoachByUserId_decorators,
      {
        kind: 'method',
        name: 'getCoachByUserId',
        static: false,
        private: false,
        access: {
          has: obj => 'getCoachByUserId' in obj,
          get: obj => obj.getCoachByUserId,
        },
        metadata: _metadata,
      },
      null,
      _instanceExtraInitializers,
    );
    __esDecorate(
      _classThis,
      null,
      _getCurrentCoach_decorators,
      {
        kind: 'method',
        name: 'getCurrentCoach',
        static: false,
        private: false,
        access: {
          has: obj => 'getCurrentCoach' in obj,
          get: obj => obj.getCurrentCoach,
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
    CoachController = _classThis = _classDescriptor.value;
    if (_metadata)
      Object.defineProperty(_classThis, Symbol.metadata, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _metadata,
      });
    __runInitializers(_classThis, _classExtraInitializers);
  })();
  return (CoachController = _classThis);
})();
exports.CoachController = CoachController;
