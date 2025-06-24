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
exports.AthleteController = void 0;
const routing_controllers_1 = require('routing-controllers');
const routing_controllers_openapi_1 = require('routing-controllers-openapi');
const athlete_service_1 = require('../services/athlete.service');
const athlete_dto_1 = require('../dtos/athlete.dto');
const auth_middleware_1 = __importDefault(
  require('../middlewares/auth.middleware'),
);
let AthleteController = (() => {
  let _classDecorators = [
    (0, routing_controllers_1.JsonController)('/athletes'),
  ];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _instanceExtraInitializers = [];
  let _getAllAthletes_decorators;
  let _getAthleteById_decorators;
  let _createAthlete_decorators;
  let _updateAthlete_decorators;
  let _deleteAthlete_decorators;
  let _getAthleteByUserId_decorators;
  let _getCurrentAthlete_decorators;
  let _getAthletesByCoachId_decorators;
  var AthleteController = (_classThis = class {
    constructor() {
      this.athleteService = __runInitializers(this, _instanceExtraInitializers);
      this.athleteService = new athlete_service_1.AthleteService();
    }
    /**
     * Получить всех спортсменов
     * @returns Список спортсменов
     */
    getAllAthletes() {
      return __awaiter(this, void 0, void 0, function* () {
        try {
          return yield this.athleteService.getAllAthletes();
        } catch (error) {
          console.error('Ошибка при получении списка спортсменов:', error);
          throw new routing_controllers_1.BadRequestError(
            'Не удалось получить список спортсменов',
          );
        }
      });
    }
    /**
     * Получить спортсмена по ID
     * @param id ID спортсмена
     * @returns Данные спортсмена
     */
    getAthleteById(id) {
      return __awaiter(this, void 0, void 0, function* () {
        try {
          return yield this.athleteService.getAthleteById(id);
        } catch (error) {
          console.error(`Ошибка при получении спортсмена с id ${id}:`, error);
          throw new routing_controllers_1.NotFoundError('Спортсмен не найден');
        }
      });
    }
    /**
     * Создать спортсмена
     * @param dto Данные для создания спортсмена
     * @returns Созданный спортсмен
     */
    createAthlete(dto) {
      return __awaiter(this, void 0, void 0, function* () {
        try {
          return yield this.athleteService.createAthlete(dto);
        } catch (error) {
          console.error('Ошибка при создании спортсмена:', error);
          throw new routing_controllers_1.BadRequestError(
            'Не удалось создать спортсмена',
          );
        }
      });
    }
    /**
     * Обновить спортсмена
     * @param id ID спортсмена
     * @param dto Новые данные спортсмена
     * @returns Обновленный спортсмен
     */
    updateAthlete(id, dto) {
      return __awaiter(this, void 0, void 0, function* () {
        try {
          return yield this.athleteService.updateAthlete(id, dto);
        } catch (error) {
          console.error(`Ошибка при обновлении спортсмена ${id}:`, error);
          throw new routing_controllers_1.NotFoundError('Спортсмен не найден');
        }
      });
    }
    /**
     * Удалить спортсмена
     * @param id ID спортсмена
     */
    deleteAthlete(id) {
      return __awaiter(this, void 0, void 0, function* () {
        try {
          yield this.athleteService.deleteAthlete(id);
        } catch (error) {
          console.error(`Ошибка при удалении спортсмена ${id}:`, error);
          throw new routing_controllers_1.NotFoundError('Спортсмен не найден');
        }
      });
    }
    /**
     * Получить спортсмена по ID пользователя
     * @param userId ID пользователя
     * @returns Данные спортсмена
     */
    getAthleteByUserId(userId) {
      return __awaiter(this, void 0, void 0, function* () {
        try {
          return yield this.athleteService.getAthleteByUserId(userId);
        } catch (error) {
          console.error(
            `Ошибка при получении спортсмена для пользователя ${userId}:`,
            error,
          );
          throw new routing_controllers_1.NotFoundError('Спортсмен не найден');
        }
      });
    }
    /**
     * Получить данные текущего спортсмена
     * @returns Данные текущего спортсмена
     */
    getCurrentAthlete(request) {
      return __awaiter(this, void 0, void 0, function* () {
        try {
          return yield this.athleteService.getAthleteByUserId(request.user.id);
        } catch (error) {
          console.error(
            'Ошибка при получении данных текущего спортсмена:',
            error,
          );
          throw new routing_controllers_1.NotFoundError('Спортсмен не найден');
        }
      });
    }
    /**
     * Получить спортсменов по ID тренера
     * @param coachId ID тренера
     * @returns Список спортсменов
     */
    getAthletesByCoachId(coachId) {
      return __awaiter(this, void 0, void 0, function* () {
        try {
          return yield this.athleteService.getAthletesByCoachId(coachId);
        } catch (error) {
          console.error(
            `Ошибка при получении спортсменов для тренера ${coachId}:`,
            error,
          );
          throw new routing_controllers_1.BadRequestError(
            'Не удалось получить список спортсменов',
          );
        }
      });
    }
  });
  __setFunctionName(_classThis, 'AthleteController');
  (() => {
    const _metadata =
      typeof Symbol === 'function' && Symbol.metadata
        ? Object.create(null)
        : void 0;
    _getAllAthletes_decorators = [
      (0, routing_controllers_1.Get)('/'),
      (0, routing_controllers_openapi_1.OpenAPI)({
        summary: 'Получить всех спортсменов',
        responses: {
          200: {
            description: 'Список спортсменов',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/AthleteDto',
                  },
                },
              },
            },
          },
        },
      }),
      (0, routing_controllers_openapi_1.ResponseSchema)(
        athlete_dto_1.AthleteDto,
        {
          isArray: true,
        },
      ),
    ];
    _getAthleteById_decorators = [
      (0, routing_controllers_1.Get)('/:id'),
      (0, routing_controllers_openapi_1.OpenAPI)({
        summary: 'Получить спортсмена по id',
        responses: {
          200: {
            description: 'Данные спортсмена',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/AthleteDto',
                },
              },
            },
          },
        },
      }),
      (0, routing_controllers_openapi_1.ResponseSchema)(
        athlete_dto_1.AthleteDto,
      ),
    ];
    _createAthlete_decorators = [
      (0, routing_controllers_1.Post)('/'),
      (0, routing_controllers_1.UseBefore)(auth_middleware_1.default),
      (0, routing_controllers_openapi_1.OpenAPI)({
        summary: 'Создать спортсмена',
        responses: {
          200: {
            description: 'Созданный спортсмен',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/AthleteDto',
                },
              },
            },
          },
        },
      }),
      (0, routing_controllers_openapi_1.ResponseSchema)(
        athlete_dto_1.AthleteDto,
      ),
    ];
    _updateAthlete_decorators = [
      (0, routing_controllers_1.Patch)('/:id'),
      (0, routing_controllers_1.UseBefore)(auth_middleware_1.default),
      (0, routing_controllers_openapi_1.OpenAPI)({
        summary: 'Обновить спортсмена',
        responses: {
          200: {
            description: 'Обновленный спортсмен',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/AthleteDto',
                },
              },
            },
          },
        },
      }),
      (0, routing_controllers_openapi_1.ResponseSchema)(
        athlete_dto_1.AthleteDto,
      ),
    ];
    _deleteAthlete_decorators = [
      (0, routing_controllers_1.Delete)('/:id'),
      (0, routing_controllers_1.UseBefore)(auth_middleware_1.default),
      (0, routing_controllers_openapi_1.OpenAPI)({
        summary: 'Удалить спортсмена',
        responses: {
          204: {
            description: 'Спортсмен успешно удален',
          },
        },
      }),
      (0, routing_controllers_1.OnUndefined)(204),
    ];
    _getAthleteByUserId_decorators = [
      (0, routing_controllers_1.Get)('/user/:userId'),
      (0, routing_controllers_openapi_1.OpenAPI)({
        summary: 'Получить спортсмена по id пользователя',
        responses: {
          200: {
            description: 'Данные спортсмена',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/AthleteDto',
                },
              },
            },
          },
        },
      }),
      (0, routing_controllers_openapi_1.ResponseSchema)(
        athlete_dto_1.AthleteDto,
      ),
    ];
    _getCurrentAthlete_decorators = [
      (0, routing_controllers_1.Get)('/current'),
      (0, routing_controllers_1.UseBefore)(auth_middleware_1.default),
      (0, routing_controllers_openapi_1.OpenAPI)({
        summary: 'Получить данные текущего спортсмена',
        responses: {
          200: {
            description: 'Данные текущего спортсмена',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/AthleteDto',
                },
              },
            },
          },
        },
      }),
      (0, routing_controllers_openapi_1.ResponseSchema)(
        athlete_dto_1.AthleteDto,
      ),
    ];
    _getAthletesByCoachId_decorators = [
      (0, routing_controllers_1.Get)('/coach/:coachId'),
      (0, routing_controllers_openapi_1.OpenAPI)({
        summary: 'Получить спортсменов по id тренера',
        responses: {
          200: {
            description: 'Список спортсменов',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/AthleteDto',
                  },
                },
              },
            },
          },
        },
      }),
      (0, routing_controllers_openapi_1.ResponseSchema)(
        athlete_dto_1.AthleteDto,
        {
          isArray: true,
        },
      ),
    ];
    __esDecorate(
      _classThis,
      null,
      _getAllAthletes_decorators,
      {
        kind: 'method',
        name: 'getAllAthletes',
        static: false,
        private: false,
        access: {
          has: obj => 'getAllAthletes' in obj,
          get: obj => obj.getAllAthletes,
        },
        metadata: _metadata,
      },
      null,
      _instanceExtraInitializers,
    );
    __esDecorate(
      _classThis,
      null,
      _getAthleteById_decorators,
      {
        kind: 'method',
        name: 'getAthleteById',
        static: false,
        private: false,
        access: {
          has: obj => 'getAthleteById' in obj,
          get: obj => obj.getAthleteById,
        },
        metadata: _metadata,
      },
      null,
      _instanceExtraInitializers,
    );
    __esDecorate(
      _classThis,
      null,
      _createAthlete_decorators,
      {
        kind: 'method',
        name: 'createAthlete',
        static: false,
        private: false,
        access: {
          has: obj => 'createAthlete' in obj,
          get: obj => obj.createAthlete,
        },
        metadata: _metadata,
      },
      null,
      _instanceExtraInitializers,
    );
    __esDecorate(
      _classThis,
      null,
      _updateAthlete_decorators,
      {
        kind: 'method',
        name: 'updateAthlete',
        static: false,
        private: false,
        access: {
          has: obj => 'updateAthlete' in obj,
          get: obj => obj.updateAthlete,
        },
        metadata: _metadata,
      },
      null,
      _instanceExtraInitializers,
    );
    __esDecorate(
      _classThis,
      null,
      _deleteAthlete_decorators,
      {
        kind: 'method',
        name: 'deleteAthlete',
        static: false,
        private: false,
        access: {
          has: obj => 'deleteAthlete' in obj,
          get: obj => obj.deleteAthlete,
        },
        metadata: _metadata,
      },
      null,
      _instanceExtraInitializers,
    );
    __esDecorate(
      _classThis,
      null,
      _getAthleteByUserId_decorators,
      {
        kind: 'method',
        name: 'getAthleteByUserId',
        static: false,
        private: false,
        access: {
          has: obj => 'getAthleteByUserId' in obj,
          get: obj => obj.getAthleteByUserId,
        },
        metadata: _metadata,
      },
      null,
      _instanceExtraInitializers,
    );
    __esDecorate(
      _classThis,
      null,
      _getCurrentAthlete_decorators,
      {
        kind: 'method',
        name: 'getCurrentAthlete',
        static: false,
        private: false,
        access: {
          has: obj => 'getCurrentAthlete' in obj,
          get: obj => obj.getCurrentAthlete,
        },
        metadata: _metadata,
      },
      null,
      _instanceExtraInitializers,
    );
    __esDecorate(
      _classThis,
      null,
      _getAthletesByCoachId_decorators,
      {
        kind: 'method',
        name: 'getAthletesByCoachId',
        static: false,
        private: false,
        access: {
          has: obj => 'getAthletesByCoachId' in obj,
          get: obj => obj.getAthletesByCoachId,
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
    AthleteController = _classThis = _classDescriptor.value;
    if (_metadata)
      Object.defineProperty(_classThis, Symbol.metadata, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _metadata,
      });
    __runInitializers(_classThis, _classExtraInitializers);
  })();
  return (AthleteController = _classThis);
})();
exports.AthleteController = AthleteController;
