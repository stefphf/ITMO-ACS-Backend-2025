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
exports.AthleteController = void 0;
const routing_controllers_1 = require('routing-controllers');
const routing_controllers_openapi_1 = require('routing-controllers-openapi');
const athlete_service_1 = require('../services/athlete.service');
const dto_1 = require('@app/dto');
const auth_middleware_1 = __importDefault(
  require('../middlewares/auth.middleware'),
);
let AthleteController = class AthleteController {
  constructor() {
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
};
exports.AthleteController = AthleteController;
__decorate(
  [
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
    (0, routing_controllers_openapi_1.ResponseSchema)(dto_1.AthleteDto, {
      isArray: true,
    }),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', []),
    __metadata('design:returntype', Promise),
  ],
  AthleteController.prototype,
  'getAllAthletes',
  null,
);
__decorate(
  [
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
    (0, routing_controllers_openapi_1.ResponseSchema)(dto_1.AthleteDto),
    __param(0, (0, routing_controllers_1.Param)('id')),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Number]),
    __metadata('design:returntype', Promise),
  ],
  AthleteController.prototype,
  'getAthleteById',
  null,
);
__decorate(
  [
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
    (0, routing_controllers_openapi_1.ResponseSchema)(dto_1.AthleteDto),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [dto_1.CreateAthleteDto]),
    __metadata('design:returntype', Promise),
  ],
  AthleteController.prototype,
  'createAthlete',
  null,
);
__decorate(
  [
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
    (0, routing_controllers_openapi_1.ResponseSchema)(dto_1.AthleteDto),
    __param(0, (0, routing_controllers_1.Param)('id')),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Number, dto_1.UpdateAthleteDto]),
    __metadata('design:returntype', Promise),
  ],
  AthleteController.prototype,
  'updateAthlete',
  null,
);
__decorate(
  [
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
    __param(0, (0, routing_controllers_1.Param)('id')),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Number]),
    __metadata('design:returntype', Promise),
  ],
  AthleteController.prototype,
  'deleteAthlete',
  null,
);
__decorate(
  [
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
    (0, routing_controllers_openapi_1.ResponseSchema)(dto_1.AthleteDto),
    __param(0, (0, routing_controllers_1.Param)('userId')),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Number]),
    __metadata('design:returntype', Promise),
  ],
  AthleteController.prototype,
  'getAthleteByUserId',
  null,
);
__decorate(
  [
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
    (0, routing_controllers_openapi_1.ResponseSchema)(dto_1.AthleteDto),
    __param(0, (0, routing_controllers_1.Req)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object]),
    __metadata('design:returntype', Promise),
  ],
  AthleteController.prototype,
  'getCurrentAthlete',
  null,
);
__decorate(
  [
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
    (0, routing_controllers_openapi_1.ResponseSchema)(dto_1.AthleteDto, {
      isArray: true,
    }),
    __param(0, (0, routing_controllers_1.Param)('coachId')),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Number]),
    __metadata('design:returntype', Promise),
  ],
  AthleteController.prototype,
  'getAthletesByCoachId',
  null,
);
exports.AthleteController = AthleteController = __decorate(
  [
    (0, routing_controllers_1.JsonController)('/athletes'),
    __metadata('design:paramtypes', []),
  ],
  AthleteController,
);
