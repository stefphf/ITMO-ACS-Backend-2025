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
exports.SeriesEntity = void 0;
const typeorm_1 = require('typeorm');
const training_entity_1 = require('./training.entity');
const shot_entity_1 = require('./shot.entity');
const dto_1 = require('@app/dto');
/**
 * Сущность серии
 */
let SeriesEntity = class SeriesEntity {};
exports.SeriesEntity = SeriesEntity;
__decorate(
  [(0, typeorm_1.PrimaryGeneratedColumn)(), __metadata('design:type', Number)],
  SeriesEntity.prototype,
  'id',
  void 0,
);
__decorate(
  [
    (0, typeorm_1.Column)({ name: 'training_id' }),
    __metadata('design:type', Number),
  ],
  SeriesEntity.prototype,
  'trainingId',
  void 0,
);
__decorate(
  [
    (0, typeorm_1.ManyToOne)(
      () => training_entity_1.TrainingEntity,
      training => training.series,
    ),
    (0, typeorm_1.JoinColumn)({ name: 'training_id' }),
    __metadata('design:type', training_entity_1.TrainingEntity),
  ],
  SeriesEntity.prototype,
  'training',
  void 0,
);
__decorate(
  [
    (0, typeorm_1.OneToMany)(
      () => shot_entity_1.ShotEntity,
      shot => shot.series,
    ),
    __metadata('design:type', Array),
  ],
  SeriesEntity.prototype,
  'shots',
  void 0,
);
__decorate(
  [(0, typeorm_1.Column)({ type: 'int' }), __metadata('design:type', Number)],
  SeriesEntity.prototype,
  'order',
  void 0,
);
__decorate(
  [
    (0, typeorm_1.Column)({ type: 'enum', enum: dto_1.TrainingType }),
    __metadata('design:type', String),
  ],
  SeriesEntity.prototype,
  'type',
  void 0,
);
__decorate(
  [(0, typeorm_1.CreateDateColumn)(), __metadata('design:type', Date)],
  SeriesEntity.prototype,
  'createdAt',
  void 0,
);
__decorate(
  [(0, typeorm_1.UpdateDateColumn)(), __metadata('design:type', Date)],
  SeriesEntity.prototype,
  'updatedAt',
  void 0,
);
exports.SeriesEntity = SeriesEntity = __decorate(
  [(0, typeorm_1.Entity)('series')],
  SeriesEntity,
);
