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
exports.QualificationTrainingDto =
  exports.UpdateQualificationTrainingDto =
  exports.CreateQualificationTrainingDto =
  exports.FreeTrainingDto =
  exports.CreateFreeTrainingDto =
  exports.UpdateFreeTrainingDto =
  exports.UpdateTrainingDto =
  exports.CreateTrainingDto =
  exports.TrainingDto =
    void 0;
const class_validator_1 = require('class-validator');
const routing_controllers_openapi_1 = require('routing-controllers-openapi');
/**
 * Базовый DTO для тренировки
 */
let TrainingDto = class TrainingDto {};
exports.TrainingDto = TrainingDto;
__decorate(
  [
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata('design:type', Number),
  ],
  TrainingDto.prototype,
  'id',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata('design:type', Number),
  ],
  TrainingDto.prototype,
  'athleteId',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata('design:type', Date),
  ],
  TrainingDto.prototype,
  'startTs',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata('design:type', Date),
  ],
  TrainingDto.prototype,
  'endTs',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata('design:type', Date),
  ],
  TrainingDto.prototype,
  'scheduledDate',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata('design:type', Number),
  ],
  TrainingDto.prototype,
  'totalScore',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
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
/**
 * DTO для создания тренировки
 */
let CreateTrainingDto = class CreateTrainingDto {};
exports.CreateTrainingDto = CreateTrainingDto;
__decorate(
  [
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata('design:type', Number),
  ],
  CreateTrainingDto.prototype,
  'athleteId',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata('design:type', Date),
  ],
  CreateTrainingDto.prototype,
  'startTs',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata('design:type', Date),
  ],
  CreateTrainingDto.prototype,
  'endTs',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata('design:type', Date),
  ],
  CreateTrainingDto.prototype,
  'scheduledDate',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata('design:type', Number),
  ],
  CreateTrainingDto.prototype,
  'totalScore',
  void 0,
);
exports.CreateTrainingDto = CreateTrainingDto = __decorate(
  [(0, routing_controllers_openapi_1.OpenAPI)({})],
  CreateTrainingDto,
);
/**
 * DTO для обновления тренировки
 */
let UpdateTrainingDto = class UpdateTrainingDto {};
exports.UpdateTrainingDto = UpdateTrainingDto;
__decorate(
  [
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata('design:type', Date),
  ],
  UpdateTrainingDto.prototype,
  'startTs',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata('design:type', Date),
  ],
  UpdateTrainingDto.prototype,
  'endTs',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata('design:type', Date),
  ],
  UpdateTrainingDto.prototype,
  'scheduledDate',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata('design:type', Number),
  ],
  UpdateTrainingDto.prototype,
  'totalScore',
  void 0,
);
exports.UpdateTrainingDto = UpdateTrainingDto = __decorate(
  [(0, routing_controllers_openapi_1.OpenAPI)({})],
  UpdateTrainingDto,
);
let UpdateFreeTrainingDto = class UpdateFreeTrainingDto extends UpdateTrainingDto {};
exports.UpdateFreeTrainingDto = UpdateFreeTrainingDto;
__decorate(
  [
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata('design:type', Number),
  ],
  UpdateFreeTrainingDto.prototype,
  'weaponTypeId',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata('design:type', Number),
  ],
  UpdateFreeTrainingDto.prototype,
  'targetId',
  void 0,
);
exports.UpdateFreeTrainingDto = UpdateFreeTrainingDto = __decorate(
  [(0, routing_controllers_openapi_1.OpenAPI)({})],
  UpdateFreeTrainingDto,
);
/**
 * DTO для создания свободной тренировки
 */
let CreateFreeTrainingDto = class CreateFreeTrainingDto extends CreateTrainingDto {};
exports.CreateFreeTrainingDto = CreateFreeTrainingDto;
__decorate(
  [
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata('design:type', Number),
  ],
  CreateFreeTrainingDto.prototype,
  'weaponTypeId',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata('design:type', Number),
  ],
  CreateFreeTrainingDto.prototype,
  'targetId',
  void 0,
);
exports.CreateFreeTrainingDto = CreateFreeTrainingDto = __decorate(
  [(0, routing_controllers_openapi_1.OpenAPI)({})],
  CreateFreeTrainingDto,
);
/**
 * DTO для ответа с данными свободной тренировки
 */
let FreeTrainingDto = class FreeTrainingDto extends TrainingDto {};
exports.FreeTrainingDto = FreeTrainingDto;
__decorate(
  [
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata('design:type', Number),
  ],
  FreeTrainingDto.prototype,
  'weaponTypeId',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsNumber)(),
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
/**
 * DTO для создания квалификационной тренировки
 */
let CreateQualificationTrainingDto = class CreateQualificationTrainingDto extends CreateTrainingDto {};
exports.CreateQualificationTrainingDto = CreateQualificationTrainingDto;
__decorate(
  [
    (0, class_validator_1.IsNumber)(),
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
/**
 * DTO для обновления квалификационной тренировки
 */
let UpdateQualificationTrainingDto = class UpdateQualificationTrainingDto extends UpdateTrainingDto {};
exports.UpdateQualificationTrainingDto = UpdateQualificationTrainingDto;
__decorate(
  [
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
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
/**
 * DTO для ответа с данными квалификационной тренировки
 */
let QualificationTrainingDto = class QualificationTrainingDto extends TrainingDto {};
exports.QualificationTrainingDto = QualificationTrainingDto;
__decorate(
  [
    (0, class_validator_1.IsNumber)(),
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
