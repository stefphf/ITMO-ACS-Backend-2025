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
exports.CreateShotNoteDto =
  exports.CreateSeriesNoteDto =
  exports.CreateTrainingNoteDto =
  exports.ShotNoteDto =
  exports.SeriesNoteDto =
  exports.TrainingNoteDto =
  exports.UpdateNoteDto =
  exports.CreateNoteDto =
  exports.NoteDto =
    void 0;
const class_validator_1 = require('class-validator');
class NoteDto {}
exports.NoteDto = NoteDto;
class CreateNoteDto {}
exports.CreateNoteDto = CreateNoteDto;
__decorate(
  [(0, class_validator_1.IsString)(), __metadata('design:type', String)],
  CreateNoteDto.prototype,
  'content',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata('design:type', Number),
  ],
  CreateNoteDto.prototype,
  'trainingId',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata('design:type', Number),
  ],
  CreateNoteDto.prototype,
  'seriesId',
  void 0,
);
__decorate(
  [
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata('design:type', Number),
  ],
  CreateNoteDto.prototype,
  'shotId',
  void 0,
);
class UpdateNoteDto {}
exports.UpdateNoteDto = UpdateNoteDto;
__decorate(
  [
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata('design:type', String),
  ],
  UpdateNoteDto.prototype,
  'content',
  void 0,
);
class TrainingNoteDto extends NoteDto {}
exports.TrainingNoteDto = TrainingNoteDto;
class SeriesNoteDto extends NoteDto {}
exports.SeriesNoteDto = SeriesNoteDto;
class ShotNoteDto extends NoteDto {}
exports.ShotNoteDto = ShotNoteDto;
class CreateTrainingNoteDto extends CreateNoteDto {}
exports.CreateTrainingNoteDto = CreateTrainingNoteDto;
class CreateSeriesNoteDto extends CreateNoteDto {}
exports.CreateSeriesNoteDto = CreateSeriesNoteDto;
class CreateShotNoteDto extends CreateNoteDto {}
exports.CreateShotNoteDto = CreateShotNoteDto;
