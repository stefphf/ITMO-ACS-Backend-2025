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
  exports.UpdateReferenceDto =
  exports.CreateReferenceDto =
  exports.ReferenceDto =
    void 0;
const class_validator_1 = require('class-validator');
class ReferenceDto {}
exports.ReferenceDto = ReferenceDto;
__decorate(
  [(0, class_validator_1.IsNumber)(), __metadata('design:type', Number)],
  ReferenceDto.prototype,
  'id',
  void 0,
);
__decorate(
  [(0, class_validator_1.IsString)(), __metadata('design:type', String)],
  ReferenceDto.prototype,
  'name',
  void 0,
);
__decorate(
  [(0, class_validator_1.IsString)(), __metadata('design:type', String)],
  ReferenceDto.prototype,
  'description',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata('design:type', Array),
  ],
  ReferenceDto.prototype,
  'exerciseIds',
  void 0,
);
class CreateReferenceDto {}
exports.CreateReferenceDto = CreateReferenceDto;
__decorate(
  [(0, class_validator_1.IsString)(), __metadata('design:type', String)],
  CreateReferenceDto.prototype,
  'name',
  void 0,
);
__decorate(
  [(0, class_validator_1.IsString)(), __metadata('design:type', String)],
  CreateReferenceDto.prototype,
  'description',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata('design:type', Array),
  ],
  CreateReferenceDto.prototype,
  'exerciseIds',
  void 0,
);
class UpdateReferenceDto {}
exports.UpdateReferenceDto = UpdateReferenceDto;
__decorate(
  [
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata('design:type', String),
  ],
  UpdateReferenceDto.prototype,
  'name',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata('design:type', String),
  ],
  UpdateReferenceDto.prototype,
  'description',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata('design:type', Array),
  ],
  UpdateReferenceDto.prototype,
  'exerciseIds',
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
class CreateExerciseDto {}
exports.CreateExerciseDto = CreateExerciseDto;
__decorate(
  [(0, class_validator_1.IsString)(), __metadata('design:type', String)],
  CreateExerciseDto.prototype,
  'name',
  void 0,
);
__decorate(
  [(0, class_validator_1.IsString)(), __metadata('design:type', String)],
  CreateExerciseDto.prototype,
  'description',
  void 0,
);
class UpdateExerciseDto {}
exports.UpdateExerciseDto = UpdateExerciseDto;
__decorate(
  [
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata('design:type', String),
  ],
  UpdateExerciseDto.prototype,
  'name',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata('design:type', String),
  ],
  UpdateExerciseDto.prototype,
  'description',
  void 0,
);
