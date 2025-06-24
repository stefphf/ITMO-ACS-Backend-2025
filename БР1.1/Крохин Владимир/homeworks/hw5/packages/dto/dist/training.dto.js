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
exports.UpdateQualificationTrainingDto =
  exports.CreateQualificationTrainingDto =
  exports.QualificationTrainingDto =
  exports.UpdateFreeTrainingDto =
  exports.CreateFreeTrainingDto =
  exports.FreeTrainingDto =
  exports.UpdateTrainingDto =
  exports.CreateTrainingDto =
  exports.TrainingDto =
    void 0;
const class_validator_1 = require('class-validator');
const routing_controllers_openapi_1 = require('routing-controllers-openapi');
const series_dto_1 = require('./series.dto');
const class_transformer_1 = require('class-transformer');
const enums_1 = require('./enums');
let TrainingDto = class TrainingDto {};
exports.TrainingDto = TrainingDto;
__decorate(
  [
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata('design:type', Number),
  ],
  TrainingDto.prototype,
  'id',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsEnum)(enums_1.TrainingType),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata('design:type', String),
  ],
  TrainingDto.prototype,
  'type',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata('design:type', Number),
  ],
  TrainingDto.prototype,
  'athleteId',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => series_dto_1.SeriesDto),
    __metadata('design:type', Array),
  ],
  TrainingDto.prototype,
  'series',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata('design:type', Date),
  ],
  TrainingDto.prototype,
  'createdAt',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata('design:type', Date),
  ],
  TrainingDto.prototype,
  'updatedAt',
  void 0,
);
exports.TrainingDto = TrainingDto = __decorate(
  [(0, routing_controllers_openapi_1.OpenAPI)({})],
  TrainingDto,
);
let CreateTrainingDto = class CreateTrainingDto {};
exports.CreateTrainingDto = CreateTrainingDto;
__decorate(
  [
    (0, class_validator_1.IsEnum)(enums_1.TrainingType),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata('design:type', String),
  ],
  CreateTrainingDto.prototype,
  'type',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata('design:type', Number),
  ],
  CreateTrainingDto.prototype,
  'athleteId',
  void 0,
);
exports.CreateTrainingDto = CreateTrainingDto = __decorate(
  [(0, routing_controllers_openapi_1.OpenAPI)({})],
  CreateTrainingDto,
);
let UpdateTrainingDto = class UpdateTrainingDto {};
exports.UpdateTrainingDto = UpdateTrainingDto;
__decorate(
  [
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.TrainingType),
    __metadata('design:type', String),
  ],
  UpdateTrainingDto.prototype,
  'type',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata('design:type', Number),
  ],
  UpdateTrainingDto.prototype,
  'athleteId',
  void 0,
);
exports.UpdateTrainingDto = UpdateTrainingDto = __decorate(
  [(0, routing_controllers_openapi_1.OpenAPI)({})],
  UpdateTrainingDto,
);
let FreeTrainingDto = class FreeTrainingDto extends TrainingDto {};
exports.FreeTrainingDto = FreeTrainingDto;
__decorate(
  [
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata('design:type', Number),
  ],
  FreeTrainingDto.prototype,
  'weaponTypeId',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata('design:type', Number),
  ],
  FreeTrainingDto.prototype,
  'targetId',
  void 0,
);
exports.FreeTrainingDto = FreeTrainingDto = __decorate(
  [(0, routing_controllers_openapi_1.OpenAPI)({})],
  FreeTrainingDto,
);
let CreateFreeTrainingDto = class CreateFreeTrainingDto extends CreateTrainingDto {};
exports.CreateFreeTrainingDto = CreateFreeTrainingDto;
__decorate(
  [
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata('design:type', Number),
  ],
  CreateFreeTrainingDto.prototype,
  'weaponTypeId',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata('design:type', Number),
  ],
  CreateFreeTrainingDto.prototype,
  'targetId',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata('design:type', Number),
  ],
  CreateFreeTrainingDto.prototype,
  'athleteId',
  void 0,
);
exports.CreateFreeTrainingDto = CreateFreeTrainingDto = __decorate(
  [(0, routing_controllers_openapi_1.OpenAPI)({})],
  CreateFreeTrainingDto,
);
let UpdateFreeTrainingDto = class UpdateFreeTrainingDto extends UpdateTrainingDto {};
exports.UpdateFreeTrainingDto = UpdateFreeTrainingDto;
__decorate(
  [
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata('design:type', Number),
  ],
  UpdateFreeTrainingDto.prototype,
  'weaponTypeId',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata('design:type', Number),
  ],
  UpdateFreeTrainingDto.prototype,
  'targetId',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata('design:type', Number),
  ],
  UpdateFreeTrainingDto.prototype,
  'athleteId',
  void 0,
);
exports.UpdateFreeTrainingDto = UpdateFreeTrainingDto = __decorate(
  [(0, routing_controllers_openapi_1.OpenAPI)({})],
  UpdateFreeTrainingDto,
);
let QualificationTrainingDto = class QualificationTrainingDto extends TrainingDto {};
exports.QualificationTrainingDto = QualificationTrainingDto;
__decorate(
  [
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata('design:type', Number),
  ],
  QualificationTrainingDto.prototype,
  'exerciseId',
  void 0,
);
exports.QualificationTrainingDto = QualificationTrainingDto = __decorate(
  [(0, routing_controllers_openapi_1.OpenAPI)({})],
  QualificationTrainingDto,
);
let CreateQualificationTrainingDto = class CreateQualificationTrainingDto extends CreateTrainingDto {};
exports.CreateQualificationTrainingDto = CreateQualificationTrainingDto;
__decorate(
  [
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata('design:type', Number),
  ],
  CreateQualificationTrainingDto.prototype,
  'exerciseId',
  void 0,
);
exports.CreateQualificationTrainingDto = CreateQualificationTrainingDto =
  __decorate(
    [(0, routing_controllers_openapi_1.OpenAPI)({})],
    CreateQualificationTrainingDto,
  );
let UpdateQualificationTrainingDto = class UpdateQualificationTrainingDto extends UpdateTrainingDto {};
exports.UpdateQualificationTrainingDto = UpdateQualificationTrainingDto;
__decorate(
  [
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata('design:type', Number),
  ],
  UpdateQualificationTrainingDto.prototype,
  'exerciseId',
  void 0,
);
exports.UpdateQualificationTrainingDto = UpdateQualificationTrainingDto =
  __decorate(
    [(0, routing_controllers_openapi_1.OpenAPI)({})],
    UpdateQualificationTrainingDto,
  );
//# sourceMappingURL=training.dto.js.map
