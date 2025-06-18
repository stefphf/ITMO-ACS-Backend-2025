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
exports.QualificationTrainingEntity =
  exports.FreeTrainingEntity =
  exports.TrainingEntity =
    void 0;
const typeorm_1 = require('typeorm');
const series_entity_1 = require('./series.entity');
/**
 * Сущность тренировки
 */
let TrainingEntity = (() => {
  let _classDecorators = [(0, typeorm_1.Entity)('training')];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _id_decorators;
  let _id_initializers = [];
  let _id_extraInitializers = [];
  let _type_decorators;
  let _type_initializers = [];
  let _type_extraInitializers = [];
  let _series_decorators;
  let _series_initializers = [];
  let _series_extraInitializers = [];
  let _createdAt_decorators;
  let _createdAt_initializers = [];
  let _createdAt_extraInitializers = [];
  let _updatedAt_decorators;
  let _updatedAt_initializers = [];
  let _updatedAt_extraInitializers = [];
  var TrainingEntity = (_classThis = class {
    constructor() {
      this.id = __runInitializers(this, _id_initializers, void 0);
      this.type =
        (__runInitializers(this, _id_extraInitializers),
        __runInitializers(this, _type_initializers, void 0));
      this.series =
        (__runInitializers(this, _type_extraInitializers),
        __runInitializers(this, _series_initializers, void 0));
      this.createdAt =
        (__runInitializers(this, _series_extraInitializers),
        __runInitializers(this, _createdAt_initializers, void 0));
      this.updatedAt =
        (__runInitializers(this, _createdAt_extraInitializers),
        __runInitializers(this, _updatedAt_initializers, void 0));
      __runInitializers(this, _updatedAt_extraInitializers);
    }
  });
  __setFunctionName(_classThis, 'TrainingEntity');
  (() => {
    const _metadata =
      typeof Symbol === 'function' && Symbol.metadata
        ? Object.create(null)
        : void 0;
    _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
    _type_decorators = [
      (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['qualification', 'free'],
        default: 'free',
      }),
    ];
    _series_decorators = [
      (0, typeorm_1.OneToMany)(
        () => series_entity_1.SeriesEntity,
        series => series.training,
      ),
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
      _series_decorators,
      {
        kind: 'field',
        name: 'series',
        static: false,
        private: false,
        access: {
          has: obj => 'series' in obj,
          get: obj => obj.series,
          set: (obj, value) => {
            obj.series = value;
          },
        },
        metadata: _metadata,
      },
      _series_initializers,
      _series_extraInitializers,
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
    TrainingEntity = _classThis = _classDescriptor.value;
    if (_metadata)
      Object.defineProperty(_classThis, Symbol.metadata, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _metadata,
      });
    __runInitializers(_classThis, _classExtraInitializers);
  })();
  return (TrainingEntity = _classThis);
})();
exports.TrainingEntity = TrainingEntity;
let FreeTrainingEntity = (() => {
  let _classDecorators = [(0, typeorm_1.Entity)('free_trainings')];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _classSuper = TrainingEntity;
  let _weaponTypeId_decorators;
  let _weaponTypeId_initializers = [];
  let _weaponTypeId_extraInitializers = [];
  let _targetId_decorators;
  let _targetId_initializers = [];
  let _targetId_extraInitializers = [];
  var FreeTrainingEntity = (_classThis = class extends _classSuper {
    constructor() {
      super(...arguments);
      this.weaponTypeId = __runInitializers(
        this,
        _weaponTypeId_initializers,
        void 0,
      );
      this.targetId =
        (__runInitializers(this, _weaponTypeId_extraInitializers),
        __runInitializers(this, _targetId_initializers, void 0));
      __runInitializers(this, _targetId_extraInitializers);
    }
  });
  __setFunctionName(_classThis, 'FreeTrainingEntity');
  (() => {
    var _a;
    const _metadata =
      typeof Symbol === 'function' && Symbol.metadata
        ? Object.create(
            (_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0
              ? _a
              : null,
          )
        : void 0;
    _weaponTypeId_decorators = [
      (0, typeorm_1.Column)({ name: 'weapon_type_id' }),
    ];
    _targetId_decorators = [(0, typeorm_1.Column)({ name: 'target_id' })];
    __esDecorate(
      null,
      null,
      _weaponTypeId_decorators,
      {
        kind: 'field',
        name: 'weaponTypeId',
        static: false,
        private: false,
        access: {
          has: obj => 'weaponTypeId' in obj,
          get: obj => obj.weaponTypeId,
          set: (obj, value) => {
            obj.weaponTypeId = value;
          },
        },
        metadata: _metadata,
      },
      _weaponTypeId_initializers,
      _weaponTypeId_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _targetId_decorators,
      {
        kind: 'field',
        name: 'targetId',
        static: false,
        private: false,
        access: {
          has: obj => 'targetId' in obj,
          get: obj => obj.targetId,
          set: (obj, value) => {
            obj.targetId = value;
          },
        },
        metadata: _metadata,
      },
      _targetId_initializers,
      _targetId_extraInitializers,
    );
    __esDecorate(
      null,
      (_classDescriptor = { value: _classThis }),
      _classDecorators,
      { kind: 'class', name: _classThis.name, metadata: _metadata },
      null,
      _classExtraInitializers,
    );
    FreeTrainingEntity = _classThis = _classDescriptor.value;
    if (_metadata)
      Object.defineProperty(_classThis, Symbol.metadata, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _metadata,
      });
    __runInitializers(_classThis, _classExtraInitializers);
  })();
  return (FreeTrainingEntity = _classThis);
})();
exports.FreeTrainingEntity = FreeTrainingEntity;
let QualificationTrainingEntity = (() => {
  let _classDecorators = [(0, typeorm_1.Entity)('qualification_trainings')];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _classSuper = TrainingEntity;
  let _exerciseId_decorators;
  let _exerciseId_initializers = [];
  let _exerciseId_extraInitializers = [];
  var QualificationTrainingEntity = (_classThis = class extends _classSuper {
    constructor() {
      super(...arguments);
      this.exerciseId = __runInitializers(
        this,
        _exerciseId_initializers,
        void 0,
      );
      __runInitializers(this, _exerciseId_extraInitializers);
    }
  });
  __setFunctionName(_classThis, 'QualificationTrainingEntity');
  (() => {
    var _a;
    const _metadata =
      typeof Symbol === 'function' && Symbol.metadata
        ? Object.create(
            (_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0
              ? _a
              : null,
          )
        : void 0;
    _exerciseId_decorators = [(0, typeorm_1.Column)({ name: 'exercise_id' })];
    __esDecorate(
      null,
      null,
      _exerciseId_decorators,
      {
        kind: 'field',
        name: 'exerciseId',
        static: false,
        private: false,
        access: {
          has: obj => 'exerciseId' in obj,
          get: obj => obj.exerciseId,
          set: (obj, value) => {
            obj.exerciseId = value;
          },
        },
        metadata: _metadata,
      },
      _exerciseId_initializers,
      _exerciseId_extraInitializers,
    );
    __esDecorate(
      null,
      (_classDescriptor = { value: _classThis }),
      _classDecorators,
      { kind: 'class', name: _classThis.name, metadata: _metadata },
      null,
      _classExtraInitializers,
    );
    QualificationTrainingEntity = _classThis = _classDescriptor.value;
    if (_metadata)
      Object.defineProperty(_classThis, Symbol.metadata, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _metadata,
      });
    __runInitializers(_classThis, _classExtraInitializers);
  })();
  return (QualificationTrainingEntity = _classThis);
})();
exports.QualificationTrainingEntity = QualificationTrainingEntity;
