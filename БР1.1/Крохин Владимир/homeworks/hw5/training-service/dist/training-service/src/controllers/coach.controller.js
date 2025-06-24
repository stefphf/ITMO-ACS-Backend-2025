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
exports.CoachController = void 0;
const routing_controllers_1 = require('routing-controllers');
const routing_controllers_openapi_1 = require('routing-controllers-openapi');
const coach_service_1 = require('../services/coach.service');
const dto_1 = require('@app/dto');
const auth_middleware_1 = __importDefault(
  require('../middlewares/auth.middleware'),
);
let CoachController = class CoachController {
  constructor() {
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
};
exports.CoachController = CoachController;
__decorate(
  [
    (0, routing_controllers_1.Get)('/'),
    (0, routing_controllers_openapi_1.OpenAPI)({
      summary: 'Получить всех тренеров',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(dto_1.CoachDto, {
      isArray: true,
    }),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', []),
    __metadata('design:returntype', Promise),
  ],
  CoachController.prototype,
  'getAllCoaches',
  null,
);
__decorate(
  [
    (0, routing_controllers_1.Get)('/:id'),
    (0, routing_controllers_openapi_1.OpenAPI)({
      summary: 'Получить тренера по id',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(dto_1.CoachDto),
    __param(0, (0, routing_controllers_1.Param)('id')),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Number]),
    __metadata('design:returntype', Promise),
  ],
  CoachController.prototype,
  'getCoachById',
  null,
);
__decorate(
  [
    (0, routing_controllers_1.Post)('/'),
    (0, routing_controllers_1.UseBefore)(auth_middleware_1.default),
    (0, routing_controllers_openapi_1.OpenAPI)({ summary: 'Создать тренера' }),
    (0, routing_controllers_openapi_1.ResponseSchema)(dto_1.CoachDto),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [dto_1.CreateCoachDto]),
    __metadata('design:returntype', Promise),
  ],
  CoachController.prototype,
  'createCoach',
  null,
);
__decorate(
  [
    (0, routing_controllers_1.Delete)('/:id'),
    (0, routing_controllers_1.UseBefore)(auth_middleware_1.default),
    (0, routing_controllers_openapi_1.OpenAPI)({ summary: 'Удалить тренера' }),
    (0, routing_controllers_1.OnUndefined)(204),
    __param(0, (0, routing_controllers_1.Param)('id')),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Number]),
    __metadata('design:returntype', Promise),
  ],
  CoachController.prototype,
  'deleteCoach',
  null,
);
__decorate(
  [
    (0, routing_controllers_1.Get)('/user/:userId'),
    (0, routing_controllers_openapi_1.OpenAPI)({
      summary: 'Получить тренера по id пользователя',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(dto_1.CoachDto),
    __param(0, (0, routing_controllers_1.Param)('userId')),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Number]),
    __metadata('design:returntype', Promise),
  ],
  CoachController.prototype,
  'getCoachByUserId',
  null,
);
__decorate(
  [
    (0, routing_controllers_1.Get)('/current'),
    (0, routing_controllers_1.UseBefore)(auth_middleware_1.default),
    (0, routing_controllers_openapi_1.OpenAPI)({
      summary: 'Получить данные текущего тренера',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(dto_1.CoachDto),
    __param(0, (0, routing_controllers_1.Req)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object]),
    __metadata('design:returntype', Promise),
  ],
  CoachController.prototype,
  'getCurrentCoach',
  null,
);
exports.CoachController = CoachController = __decorate(
  [
    (0, routing_controllers_1.JsonController)('/coaches'),
    __metadata('design:paramtypes', []),
  ],
  CoachController,
);
