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
exports.UpdateShotDto = exports.CreateShotDto = exports.ShotDto = void 0;
const class_validator_1 = require('class-validator');
const routing_controllers_openapi_1 = require('routing-controllers-openapi');
let ShotDto = class ShotDto {};
exports.ShotDto = ShotDto;
__decorate(
  [(0, class_validator_1.IsInt)(), __metadata('design:type', Number)],
  ShotDto.prototype,
  'id',
  void 0,
);
__decorate(
  [(0, class_validator_1.IsInt)(), __metadata('design:type', Number)],
  ShotDto.prototype,
  'seriesId',
  void 0,
);
__decorate(
  [(0, class_validator_1.IsNumber)(), __metadata('design:type', Number)],
  ShotDto.prototype,
  'order',
  void 0,
);
__decorate(
  [(0, class_validator_1.IsNumber)(), __metadata('design:type', Number)],
  ShotDto.prototype,
  'score',
  void 0,
);
__decorate(
  [(0, class_validator_1.IsNumber)(), __metadata('design:type', Number)],
  ShotDto.prototype,
  'x',
  void 0,
);
__decorate(
  [(0, class_validator_1.IsNumber)(), __metadata('design:type', Number)],
  ShotDto.prototype,
  'y',
  void 0,
);
__decorate(
  [(0, class_validator_1.IsDateString)(), __metadata('design:type', Date)],
  ShotDto.prototype,
  'createdAt',
  void 0,
);
__decorate(
  [(0, class_validator_1.IsDateString)(), __metadata('design:type', Date)],
  ShotDto.prototype,
  'updatedAt',
  void 0,
);
exports.ShotDto = ShotDto = __decorate(
  [(0, routing_controllers_openapi_1.OpenAPI)({})],
  ShotDto,
);
let CreateShotDto = class CreateShotDto {};
exports.CreateShotDto = CreateShotDto;
__decorate(
  [(0, class_validator_1.IsInt)(), __metadata('design:type', Number)],
  CreateShotDto.prototype,
  'seriesId',
  void 0,
);
__decorate(
  [(0, class_validator_1.IsNumber)(), __metadata('design:type', Number)],
  CreateShotDto.prototype,
  'order',
  void 0,
);
__decorate(
  [(0, class_validator_1.IsNumber)(), __metadata('design:type', Number)],
  CreateShotDto.prototype,
  'score',
  void 0,
);
__decorate(
  [(0, class_validator_1.IsNumber)(), __metadata('design:type', Number)],
  CreateShotDto.prototype,
  'x',
  void 0,
);
__decorate(
  [(0, class_validator_1.IsNumber)(), __metadata('design:type', Number)],
  CreateShotDto.prototype,
  'y',
  void 0,
);
exports.CreateShotDto = CreateShotDto = __decorate(
  [(0, routing_controllers_openapi_1.OpenAPI)({})],
  CreateShotDto,
);
let UpdateShotDto = class UpdateShotDto {};
exports.UpdateShotDto = UpdateShotDto;
__decorate(
  [
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata('design:type', Number),
  ],
  UpdateShotDto.prototype,
  'order',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata('design:type', Number),
  ],
  UpdateShotDto.prototype,
  'score',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata('design:type', Number),
  ],
  UpdateShotDto.prototype,
  'x',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata('design:type', Number),
  ],
  UpdateShotDto.prototype,
  'y',
  void 0,
);
exports.UpdateShotDto = UpdateShotDto = __decorate(
  [(0, routing_controllers_openapi_1.OpenAPI)({})],
  UpdateShotDto,
);
