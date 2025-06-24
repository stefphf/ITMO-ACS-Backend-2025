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
exports.ShotController = void 0;
const routing_controllers_1 = require('routing-controllers');
const routing_controllers_openapi_1 = require('routing-controllers-openapi');
const shot_service_1 = require('../services/shot.service');
const dto_1 = require('@app/dto');
const auth_middleware_1 = __importDefault(
  require('../middlewares/auth.middleware'),
);
const typeorm_1 = require('typeorm');
const shot_entity_1 = require('../models/shot.entity');
let ShotController = class ShotController {
  constructor() {
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
};
exports.ShotController = ShotController;
__decorate(
  [
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
    __param(0, (0, routing_controllers_1.Param)('id')),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Number]),
    __metadata('design:returntype', Promise),
  ],
  ShotController.prototype,
  'getShotById',
  null,
);
__decorate(
  [
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
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [dto_1.CreateShotDto]),
    __metadata('design:returntype', Promise),
  ],
  ShotController.prototype,
  'createShot',
  null,
);
__decorate(
  [
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
    __param(0, (0, routing_controllers_1.Param)('id')),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Number, dto_1.UpdateShotDto]),
    __metadata('design:returntype', Promise),
  ],
  ShotController.prototype,
  'updateShot',
  null,
);
__decorate(
  [
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
    __param(0, (0, routing_controllers_1.Param)('id')),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Number]),
    __metadata('design:returntype', Promise),
  ],
  ShotController.prototype,
  'deleteShot',
  null,
);
__decorate(
  [
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
    __param(0, (0, routing_controllers_1.Param)('seriesId')),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Number]),
    __metadata('design:returntype', Promise),
  ],
  ShotController.prototype,
  'getShotsBySeriesId',
  null,
);
exports.ShotController = ShotController = __decorate(
  [
    (0, routing_controllers_1.JsonController)('/shot'),
    __metadata('design:paramtypes', []),
  ],
  ShotController,
);
