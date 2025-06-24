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
Object.defineProperty(exports, '__esModule', { value: true });
exports.SeriesDto = exports.UpdateSeriesDto = exports.CreateSeriesDto = void 0;
const class_validator_1 = require('class-validator');
const routing_controllers_openapi_1 = require('routing-controllers-openapi');
/**
 * DTO для создания серии
 */
let CreateSeriesDto = class CreateSeriesDto {};
exports.CreateSeriesDto = CreateSeriesDto;
__decorate(
  [
    (0, class_validator_1.IsNumber)(
      {},
      { message: 'ID тренировки должен быть числом' },
    ),
    (0, class_validator_1.IsNotEmpty)({ message: 'ID тренировки обязателен' }),
    __metadata('design:type', Number),
  ],
  CreateSeriesDto.prototype,
  'trainingId',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsNotEmpty)({ message: 'Тип тренировки обязателен' }),
    (0, class_validator_1.IsIn)(['qualification', 'free'], {
      message: 'Тип тренировки должен быть qualification или free',
    }),
    __metadata('design:type', String),
  ],
  CreateSeriesDto.prototype,
  'trainingType',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(
      {},
      { message: 'Начальное смещение времени должно быть числом' },
    ),
    __metadata('design:type', Number),
  ],
  CreateSeriesDto.prototype,
  'beginTimeOffset',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(
      {},
      { message: 'Конечное смещение времени должно быть числом' },
    ),
    __metadata('design:type', Number),
  ],
  CreateSeriesDto.prototype,
  'endTimeOffset',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)({
      message: 'Список выстрелов должен быть массивом',
    }),
    __metadata('design:type', Array),
  ],
  CreateSeriesDto.prototype,
  'shots',
  void 0,
);
exports.CreateSeriesDto = CreateSeriesDto = __decorate(
  [(0, routing_controllers_openapi_1.OpenAPI)({})],
  CreateSeriesDto,
);
/**
 * DTO для обновления серии
 */
let UpdateSeriesDto = class UpdateSeriesDto {};
exports.UpdateSeriesDto = UpdateSeriesDto;
__decorate(
  [
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(
      {},
      { message: 'Начальное смещение времени должно быть числом' },
    ),
    __metadata('design:type', Number),
  ],
  UpdateSeriesDto.prototype,
  'beginTimeOffset',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(
      {},
      { message: 'Конечное смещение времени должно быть числом' },
    ),
    __metadata('design:type', Number),
  ],
  UpdateSeriesDto.prototype,
  'endTimeOffset',
  void 0,
);
exports.UpdateSeriesDto = UpdateSeriesDto = __decorate(
  [(0, routing_controllers_openapi_1.OpenAPI)({})],
  UpdateSeriesDto,
);
/**
 * DTO для ответа с данными серии
 */
let SeriesDto = class SeriesDto {};
exports.SeriesDto = SeriesDto;
__decorate(
  [
    (0, class_validator_1.IsNumber)({}, { message: 'ID должен быть числом' }),
    __metadata('design:type', Number),
  ],
  SeriesDto.prototype,
  'id',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsNumber)(
      {},
      { message: 'ID тренировки должен быть числом' },
    ),
    __metadata('design:type', Number),
  ],
  SeriesDto.prototype,
  'trainingId',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(
      {},
      { message: 'Начальное смещение времени должно быть числом' },
    ),
    __metadata('design:type', Number),
  ],
  SeriesDto.prototype,
  'beginTimeOffset',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(
      {},
      { message: 'Конечное смещение времени должно быть числом' },
    ),
    __metadata('design:type', Number),
  ],
  SeriesDto.prototype,
  'endTimeOffset',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)({
      message: 'Список выстрелов должен быть массивом',
    }),
    __metadata('design:type', Array),
  ],
  SeriesDto.prototype,
  'shots',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsString)({
      message: 'Дата создания должна быть строкой',
    }),
    __metadata('design:type', String),
  ],
  SeriesDto.prototype,
  'createdAt',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsString)({
      message: 'Дата обновления должна быть строкой',
    }),
    __metadata('design:type', String),
  ],
  SeriesDto.prototype,
  'updatedAt',
  void 0,
);
exports.SeriesDto = SeriesDto = __decorate(
  [(0, routing_controllers_openapi_1.OpenAPI)({})],
  SeriesDto,
);
