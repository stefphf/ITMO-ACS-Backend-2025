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
exports.UpdateSeriesDto = exports.CreateSeriesDto = exports.SeriesDto = void 0;
const class_validator_1 = require('class-validator');
const class_transformer_1 = require('class-transformer');
const shot_dto_1 = require('./shot.dto');
const training_dto_1 = require('./training.dto');
const routing_controllers_openapi_1 = require('routing-controllers-openapi');
let SeriesDto = class SeriesDto {};
exports.SeriesDto = SeriesDto;
__decorate(
  [(0, class_validator_1.IsNumber)(), __metadata('design:type', Number)],
  SeriesDto.prototype,
  'id',
  void 0,
);
__decorate(
  [(0, class_validator_1.IsNumber)(), __metadata('design:type', Number)],
  SeriesDto.prototype,
  'trainingId',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsEnum)(training_dto_1.TrainingType),
    __metadata('design:type', String),
  ],
  SeriesDto.prototype,
  'type',
  void 0,
);
__decorate(
  [(0, class_validator_1.IsNumber)(), __metadata('design:type', Number)],
  SeriesDto.prototype,
  'order',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => shot_dto_1.ShotDto),
    __metadata('design:type', Array),
  ],
  SeriesDto.prototype,
  'shots',
  void 0,
);
__decorate(
  [(0, class_validator_1.IsDateString)(), __metadata('design:type', Date)],
  SeriesDto.prototype,
  'createdAt',
  void 0,
);
__decorate(
  [(0, class_validator_1.IsDateString)(), __metadata('design:type', Date)],
  SeriesDto.prototype,
  'updatedAt',
  void 0,
);
exports.SeriesDto = SeriesDto = __decorate(
  [(0, routing_controllers_openapi_1.OpenAPI)({})],
  SeriesDto,
);
let CreateSeriesDto = class CreateSeriesDto {};
exports.CreateSeriesDto = CreateSeriesDto;
__decorate(
  [(0, class_validator_1.IsNumber)(), __metadata('design:type', Number)],
  CreateSeriesDto.prototype,
  'trainingId',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsEnum)(training_dto_1.TrainingType),
    __metadata('design:type', String),
  ],
  CreateSeriesDto.prototype,
  'type',
  void 0,
);
__decorate(
  [(0, class_validator_1.IsNumber)(), __metadata('design:type', Number)],
  CreateSeriesDto.prototype,
  'order',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => shot_dto_1.ShotDto),
    (0, class_validator_1.IsOptional)(),
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
let UpdateSeriesDto = class UpdateSeriesDto {};
exports.UpdateSeriesDto = UpdateSeriesDto;
__decorate(
  [
    (0, class_validator_1.IsEnum)(training_dto_1.TrainingType),
    (0, class_validator_1.IsOptional)(),
    __metadata('design:type', String),
  ],
  UpdateSeriesDto.prototype,
  'type',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata('design:type', Number),
  ],
  UpdateSeriesDto.prototype,
  'order',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => shot_dto_1.ShotDto),
    (0, class_validator_1.IsOptional)(),
    __metadata('design:type', Array),
  ],
  UpdateSeriesDto.prototype,
  'shots',
  void 0,
);
exports.UpdateSeriesDto = UpdateSeriesDto = __decorate(
  [(0, routing_controllers_openapi_1.OpenAPI)({})],
  UpdateSeriesDto,
);
