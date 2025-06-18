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
exports.FreeTrainingEntity = void 0;
const typeorm_1 = require('typeorm');
const base_entity_1 = require('./base.entity');
const training_entity_1 = require('./training.entity');
/**
 * Сущность свободной тренировки
 */
let FreeTrainingEntity = class FreeTrainingEntity extends base_entity_1.BaseEntity {};
exports.FreeTrainingEntity = FreeTrainingEntity;
__decorate(
  [
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int' }),
    __metadata('design:type', Number),
  ],
  FreeTrainingEntity.prototype,
  'id',
  void 0,
);
__decorate(
  [(0, typeorm_1.Column)({ type: 'int' }), __metadata('design:type', Number)],
  FreeTrainingEntity.prototype,
  'training_id',
  void 0,
);
__decorate(
  [
    (0, typeorm_1.ManyToOne)(() => training_entity_1.TrainingEntity),
    (0, typeorm_1.JoinColumn)({ name: 'training_id' }),
    __metadata('design:type', training_entity_1.TrainingEntity),
  ],
  FreeTrainingEntity.prototype,
  'training',
  void 0,
);
__decorate(
  [(0, typeorm_1.Column)({ type: 'int' }), __metadata('design:type', Number)],
  FreeTrainingEntity.prototype,
  'weapon_type_id',
  void 0,
);
__decorate(
  [(0, typeorm_1.Column)({ type: 'int' }), __metadata('design:type', Number)],
  FreeTrainingEntity.prototype,
  'target_id',
  void 0,
);
exports.FreeTrainingEntity = FreeTrainingEntity = __decorate(
  [(0, typeorm_1.Entity)('free_trainings')],
  FreeTrainingEntity,
);
