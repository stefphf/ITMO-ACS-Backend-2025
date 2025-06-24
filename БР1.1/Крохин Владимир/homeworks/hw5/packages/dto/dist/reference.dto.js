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
exports.UpdateExerciseDto =
  exports.CreateExerciseDto =
  exports.ExerciseDto =
  exports.UpdateWeaponTypeDto =
  exports.CreateWeaponTypeDto =
  exports.WeaponTypeDto =
  exports.UpdateTargetDto =
  exports.CreateTargetDto =
  exports.TargetDto =
    void 0;
const class_validator_1 = require('class-validator');
class TargetDto {}
exports.TargetDto = TargetDto;
class CreateTargetDto {}
exports.CreateTargetDto = CreateTargetDto;
__decorate(
  [(0, class_validator_1.IsString)(), __metadata('design:type', String)],
  CreateTargetDto.prototype,
  'name',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata('design:type', String),
  ],
  CreateTargetDto.prototype,
  'description',
  void 0,
);
class UpdateTargetDto {}
exports.UpdateTargetDto = UpdateTargetDto;
__decorate(
  [
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata('design:type', String),
  ],
  UpdateTargetDto.prototype,
  'name',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata('design:type', String),
  ],
  UpdateTargetDto.prototype,
  'description',
  void 0,
);
class WeaponTypeDto {}
exports.WeaponTypeDto = WeaponTypeDto;
class CreateWeaponTypeDto {}
exports.CreateWeaponTypeDto = CreateWeaponTypeDto;
__decorate(
  [(0, class_validator_1.IsString)(), __metadata('design:type', String)],
  CreateWeaponTypeDto.prototype,
  'name',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata('design:type', String),
  ],
  CreateWeaponTypeDto.prototype,
  'description',
  void 0,
);
class UpdateWeaponTypeDto {}
exports.UpdateWeaponTypeDto = UpdateWeaponTypeDto;
__decorate(
  [
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata('design:type', String),
  ],
  UpdateWeaponTypeDto.prototype,
  'name',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata('design:type', String),
  ],
  UpdateWeaponTypeDto.prototype,
  'description',
  void 0,
);
class ExerciseDto {}
exports.ExerciseDto = ExerciseDto;
__decorate(
  [(0, class_validator_1.IsNumber)(), __metadata('design:type', Number)],
  ExerciseDto.prototype,
  'id',
  void 0,
);
__decorate(
  [(0, class_validator_1.IsString)(), __metadata('design:type', String)],
  ExerciseDto.prototype,
  'name',
  void 0,
);
__decorate(
  [(0, class_validator_1.IsString)(), __metadata('design:type', String)],
  ExerciseDto.prototype,
  'description',
  void 0,
);
__decorate(
  [(0, class_validator_1.IsNumber)(), __metadata('design:type', Number)],
  ExerciseDto.prototype,
  'targetId',
  void 0,
);
__decorate(
  [(0, class_validator_1.IsNumber)(), __metadata('design:type', Number)],
  ExerciseDto.prototype,
  'weaponTypeId',
  void 0,
);
class CreateExerciseDto {}
exports.CreateExerciseDto = CreateExerciseDto;
__decorate(
  [(0, class_validator_1.IsString)(), __metadata('design:type', String)],
  CreateExerciseDto.prototype,
  'name',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata('design:type', String),
  ],
  CreateExerciseDto.prototype,
  'description',
  void 0,
);
__decorate(
  [(0, class_validator_1.IsNumber)(), __metadata('design:type', Number)],
  CreateExerciseDto.prototype,
  'targetId',
  void 0,
);
__decorate(
  [(0, class_validator_1.IsNumber)(), __metadata('design:type', Number)],
  CreateExerciseDto.prototype,
  'weaponTypeId',
  void 0,
);
class UpdateExerciseDto {}
exports.UpdateExerciseDto = UpdateExerciseDto;
__decorate(
  [
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata('design:type', String),
  ],
  UpdateExerciseDto.prototype,
  'name',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata('design:type', String),
  ],
  UpdateExerciseDto.prototype,
  'description',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata('design:type', Number),
  ],
  UpdateExerciseDto.prototype,
  'targetId',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata('design:type', Number),
  ],
  UpdateExerciseDto.prototype,
  'weaponTypeId',
  void 0,
);
//# sourceMappingURL=reference.dto.js.map
