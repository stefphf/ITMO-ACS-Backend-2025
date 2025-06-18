'use strict';
var __esDecorate =
  (this && this.__esDecorate) ||
  function (
    ctor,
    descriptorIn,
    decorators,
    contextIn,
    initializers,
    extraInitializers,
  ) {
    function accept(f) {
      if (f !== void 0 && typeof f !== 'function')
        throw new TypeError('Function expected');
      return f;
    }
    var kind = contextIn.kind,
      key = kind === 'getter' ? 'get' : kind === 'setter' ? 'set' : 'value';
    var target =
      !descriptorIn && ctor
        ? contextIn['static']
          ? ctor
          : ctor.prototype
        : null;
    var descriptor =
      descriptorIn ||
      (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _,
      done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
      var context = {};
      for (var p in contextIn) context[p] = p === 'access' ? {} : contextIn[p];
      for (var p in contextIn.access) context.access[p] = contextIn.access[p];
      context.addInitializer = function (f) {
        if (done)
          throw new TypeError(
            'Cannot add initializers after decoration has completed',
          );
        extraInitializers.push(accept(f || null));
      };
      var result = (0, decorators[i])(
        kind === 'accessor'
          ? { get: descriptor.get, set: descriptor.set }
          : descriptor[key],
        context,
      );
      if (kind === 'accessor') {
        if (result === void 0) continue;
        if (result === null || typeof result !== 'object')
          throw new TypeError('Object expected');
        if ((_ = accept(result.get))) descriptor.get = _;
        if ((_ = accept(result.set))) descriptor.set = _;
        if ((_ = accept(result.init))) initializers.unshift(_);
      } else if ((_ = accept(result))) {
        if (kind === 'field') initializers.unshift(_);
        else descriptor[key] = _;
      }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
  };
var __runInitializers =
  (this && this.__runInitializers) ||
  function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
      value = useValue
        ? initializers[i].call(thisArg, value)
        : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
  };
var __setFunctionName =
  (this && this.__setFunctionName) ||
  function (f, name, prefix) {
    if (typeof name === 'symbol')
      name = name.description ? '['.concat(name.description, ']') : '';
    return Object.defineProperty(f, 'name', {
      configurable: true,
      value: prefix ? ''.concat(prefix, ' ', name) : name,
    });
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
let SeriesEntity = (() => {
  let _classDecorators = [(0, typeorm_1.Entity)('series')];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _id_decorators;
  let _id_initializers = [];
  let _id_extraInitializers = [];
  let _trainingId_decorators;
  let _trainingId_initializers = [];
  let _trainingId_extraInitializers = [];
  let _training_decorators;
  let _training_initializers = [];
  let _training_extraInitializers = [];
  let _shots_decorators;
  let _shots_initializers = [];
  let _shots_extraInitializers = [];
  let _number_decorators;
  let _number_initializers = [];
  let _number_extraInitializers = [];
  let _type_decorators;
  let _type_initializers = [];
  let _type_extraInitializers = [];
  let _beginTimeOffset_decorators;
  let _beginTimeOffset_initializers = [];
  let _beginTimeOffset_extraInitializers = [];
  let _endTimeOffset_decorators;
  let _endTimeOffset_initializers = [];
  let _endTimeOffset_extraInitializers = [];
  let _createdAt_decorators;
  let _createdAt_initializers = [];
  let _createdAt_extraInitializers = [];
  let _updatedAt_decorators;
  let _updatedAt_initializers = [];
  let _updatedAt_extraInitializers = [];
  var SeriesEntity = (_classThis = class {
    constructor() {
      this.id = __runInitializers(this, _id_initializers, void 0);
      this.trainingId =
        (__runInitializers(this, _id_extraInitializers),
        __runInitializers(this, _trainingId_initializers, void 0));
      this.training =
        (__runInitializers(this, _trainingId_extraInitializers),
        __runInitializers(this, _training_initializers, void 0));
      this.shots =
        (__runInitializers(this, _training_extraInitializers),
        __runInitializers(this, _shots_initializers, void 0));
      this.number =
        (__runInitializers(this, _shots_extraInitializers),
        __runInitializers(this, _number_initializers, void 0));
      this.type =
        (__runInitializers(this, _number_extraInitializers),
        __runInitializers(this, _type_initializers, void 0));
      this.beginTimeOffset =
        (__runInitializers(this, _type_extraInitializers),
        __runInitializers(this, _beginTimeOffset_initializers, void 0));
      this.endTimeOffset =
        (__runInitializers(this, _beginTimeOffset_extraInitializers),
        __runInitializers(this, _endTimeOffset_initializers, void 0));
      this.createdAt =
        (__runInitializers(this, _endTimeOffset_extraInitializers),
        __runInitializers(this, _createdAt_initializers, void 0));
      this.updatedAt =
        (__runInitializers(this, _createdAt_extraInitializers),
        __runInitializers(this, _updatedAt_initializers, void 0));
      __runInitializers(this, _updatedAt_extraInitializers);
    }
  });
  __setFunctionName(_classThis, 'SeriesEntity');
  (() => {
    const _metadata =
      typeof Symbol === 'function' && Symbol.metadata
        ? Object.create(null)
        : void 0;
    _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
    _trainingId_decorators = [(0, typeorm_1.Column)({ name: 'training_id' })];
    _training_decorators = [
      (0, typeorm_1.ManyToOne)(
        () => training_entity_1.TrainingEntity,
        training => training.series,
      ),
      (0, typeorm_1.JoinColumn)({ name: 'training_id' }),
    ];
    _shots_decorators = [
      (0, typeorm_1.OneToMany)(
        () => shot_entity_1.ShotEntity,
        shot => shot.series,
      ),
    ];
    _number_decorators = [(0, typeorm_1.Column)({ type: 'int' })];
    _type_decorators = [
      (0, typeorm_1.Column)({ type: 'enum', enum: dto_1.TrainingType }),
    ];
    _beginTimeOffset_decorators = [
      (0, typeorm_1.Column)({ type: 'int', name: 'begin_time_offset' }),
    ];
    _endTimeOffset_decorators = [
      (0, typeorm_1.Column)({ type: 'int', name: 'end_time_offset' }),
    ];
    _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
    _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
    __esDecorate(
      null,
      null,
      _id_decorators,
      {
        kind: 'field',
        name: 'id',
        static: false,
        private: false,
        access: {
          has: obj => 'id' in obj,
          get: obj => obj.id,
          set: (obj, value) => {
            obj.id = value;
          },
        },
        metadata: _metadata,
      },
      _id_initializers,
      _id_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _trainingId_decorators,
      {
        kind: 'field',
        name: 'trainingId',
        static: false,
        private: false,
        access: {
          has: obj => 'trainingId' in obj,
          get: obj => obj.trainingId,
          set: (obj, value) => {
            obj.trainingId = value;
          },
        },
        metadata: _metadata,
      },
      _trainingId_initializers,
      _trainingId_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _training_decorators,
      {
        kind: 'field',
        name: 'training',
        static: false,
        private: false,
        access: {
          has: obj => 'training' in obj,
          get: obj => obj.training,
          set: (obj, value) => {
            obj.training = value;
          },
        },
        metadata: _metadata,
      },
      _training_initializers,
      _training_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _shots_decorators,
      {
        kind: 'field',
        name: 'shots',
        static: false,
        private: false,
        access: {
          has: obj => 'shots' in obj,
          get: obj => obj.shots,
          set: (obj, value) => {
            obj.shots = value;
          },
        },
        metadata: _metadata,
      },
      _shots_initializers,
      _shots_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _number_decorators,
      {
        kind: 'field',
        name: 'number',
        static: false,
        private: false,
        access: {
          has: obj => 'number' in obj,
          get: obj => obj.number,
          set: (obj, value) => {
            obj.number = value;
          },
        },
        metadata: _metadata,
      },
      _number_initializers,
      _number_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _type_decorators,
      {
        kind: 'field',
        name: 'type',
        static: false,
        private: false,
        access: {
          has: obj => 'type' in obj,
          get: obj => obj.type,
          set: (obj, value) => {
            obj.type = value;
          },
        },
        metadata: _metadata,
      },
      _type_initializers,
      _type_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _beginTimeOffset_decorators,
      {
        kind: 'field',
        name: 'beginTimeOffset',
        static: false,
        private: false,
        access: {
          has: obj => 'beginTimeOffset' in obj,
          get: obj => obj.beginTimeOffset,
          set: (obj, value) => {
            obj.beginTimeOffset = value;
          },
        },
        metadata: _metadata,
      },
      _beginTimeOffset_initializers,
      _beginTimeOffset_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _endTimeOffset_decorators,
      {
        kind: 'field',
        name: 'endTimeOffset',
        static: false,
        private: false,
        access: {
          has: obj => 'endTimeOffset' in obj,
          get: obj => obj.endTimeOffset,
          set: (obj, value) => {
            obj.endTimeOffset = value;
          },
        },
        metadata: _metadata,
      },
      _endTimeOffset_initializers,
      _endTimeOffset_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _createdAt_decorators,
      {
        kind: 'field',
        name: 'createdAt',
        static: false,
        private: false,
        access: {
          has: obj => 'createdAt' in obj,
          get: obj => obj.createdAt,
          set: (obj, value) => {
            obj.createdAt = value;
          },
        },
        metadata: _metadata,
      },
      _createdAt_initializers,
      _createdAt_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _updatedAt_decorators,
      {
        kind: 'field',
        name: 'updatedAt',
        static: false,
        private: false,
        access: {
          has: obj => 'updatedAt' in obj,
          get: obj => obj.updatedAt,
          set: (obj, value) => {
            obj.updatedAt = value;
          },
        },
        metadata: _metadata,
      },
      _updatedAt_initializers,
      _updatedAt_extraInitializers,
    );
    __esDecorate(
      null,
      (_classDescriptor = { value: _classThis }),
      _classDecorators,
      { kind: 'class', name: _classThis.name, metadata: _metadata },
      null,
      _classExtraInitializers,
    );
    SeriesEntity = _classThis = _classDescriptor.value;
    if (_metadata)
      Object.defineProperty(_classThis, Symbol.metadata, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _metadata,
      });
    __runInitializers(_classThis, _classExtraInitializers);
  })();
  return (SeriesEntity = _classThis);
})();
exports.SeriesEntity = SeriesEntity;
