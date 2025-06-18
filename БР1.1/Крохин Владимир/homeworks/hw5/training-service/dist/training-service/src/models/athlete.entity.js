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
exports.AthleteEntity = void 0;
const typeorm_1 = require('typeorm');
const base_entity_1 = require('./base.entity');
const coach_entity_1 = require('./coach.entity');
/**
 * Сущность спортсмена
 */
let AthleteEntity = class AthleteEntity extends base_entity_1.BaseEntity {};
exports.AthleteEntity = AthleteEntity;
__decorate(
  [(0, typeorm_1.PrimaryGeneratedColumn)(), __metadata('design:type', Number)],
  AthleteEntity.prototype,
  'id',
  void 0,
);
__decorate(
  [
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata('design:type', Number),
  ],
  AthleteEntity.prototype,
  'userId',
  void 0,
);
__decorate(
  [
    (0, typeorm_1.ManyToMany)(() => coach_entity_1.CoachEntity),
    (0, typeorm_1.JoinTable)({
      name: 'athlete_coaches',
      joinColumn: {
        name: 'athlete_id',
        referencedColumnName: 'id',
      },
      inverseJoinColumn: {
        name: 'coach_id',
        referencedColumnName: 'id',
      },
    }),
    __metadata('design:type', Array),
  ],
  AthleteEntity.prototype,
  'coaches',
  void 0,
);
exports.AthleteEntity = AthleteEntity = __decorate(
  [(0, typeorm_1.Entity)('athletes')],
  AthleteEntity,
);
