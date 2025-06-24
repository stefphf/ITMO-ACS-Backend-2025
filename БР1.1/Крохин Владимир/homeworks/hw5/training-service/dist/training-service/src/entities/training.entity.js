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
exports.TrainingEntity = void 0;
const typeorm_1 = require('typeorm');
const series_entity_1 = require('./series.entity');
const dto_1 = require('@app/dto');
let TrainingEntity = class TrainingEntity {};
exports.TrainingEntity = TrainingEntity;
__decorate(
  [(0, typeorm_1.PrimaryGeneratedColumn)(), __metadata('design:type', Number)],
  TrainingEntity.prototype,
  'id',
  void 0,
);
__decorate(
  [(0, typeorm_1.Column)(), __metadata('design:type', Number)],
  TrainingEntity.prototype,
  'athleteId',
  void 0,
);
__decorate(
  [
    (0, typeorm_1.Column)({
      type: 'enum',
      enum: dto_1.TrainingType,
      default: dto_1.TrainingType.FREE,
    }),
    __metadata('design:type', String),
  ],
  TrainingEntity.prototype,
  'type',
  void 0,
);
__decorate(
  [
    (0, typeorm_1.OneToMany)(
      () => series_entity_1.SeriesEntity,
      series => series.training,
    ),
    __metadata('design:type', Array),
  ],
  TrainingEntity.prototype,
  'series',
  void 0,
);
__decorate(
  [(0, typeorm_1.CreateDateColumn)(), __metadata('design:type', Date)],
  TrainingEntity.prototype,
  'createdAt',
  void 0,
);
__decorate(
  [(0, typeorm_1.UpdateDateColumn)(), __metadata('design:type', Date)],
  TrainingEntity.prototype,
  'updatedAt',
  void 0,
);
exports.TrainingEntity = TrainingEntity = __decorate(
  [(0, typeorm_1.Entity)('trainings')],
  TrainingEntity,
);
