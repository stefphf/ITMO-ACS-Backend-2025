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
exports.FreeTrainingEntity = void 0;
const typeorm_1 = require('typeorm');
const base_entity_1 = require('./base.entity');
const training_entity_1 = require('./training.entity');
/**
 * Сущность свободной тренировки
 */
let FreeTrainingEntity = (() => {
  let _classDecorators = [(0, typeorm_1.Entity)('free_trainings')];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _classSuper = base_entity_1.BaseEntity;
  let _id_decorators;
  let _id_initializers = [];
  let _id_extraInitializers = [];
  let _training_id_decorators;
  let _training_id_initializers = [];
  let _training_id_extraInitializers = [];
  let _training_decorators;
  let _training_initializers = [];
  let _training_extraInitializers = [];
  let _weapon_type_id_decorators;
  let _weapon_type_id_initializers = [];
  let _weapon_type_id_extraInitializers = [];
  let _target_id_decorators;
  let _target_id_initializers = [];
  let _target_id_extraInitializers = [];
  var FreeTrainingEntity = (_classThis = class extends _classSuper {
    constructor() {
      super(...arguments);
      this.id = __runInitializers(this, _id_initializers, void 0);
      this.training_id =
        (__runInitializers(this, _id_extraInitializers),
        __runInitializers(this, _training_id_initializers, void 0));
      this.training =
        (__runInitializers(this, _training_id_extraInitializers),
        __runInitializers(this, _training_initializers, void 0));
      this.weapon_type_id =
        (__runInitializers(this, _training_extraInitializers),
        __runInitializers(this, _weapon_type_id_initializers, void 0));
      this.target_id =
        (__runInitializers(this, _weapon_type_id_extraInitializers),
        __runInitializers(this, _target_id_initializers, void 0));
      __runInitializers(this, _target_id_extraInitializers);
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
    _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int' })];
    _training_id_decorators = [(0, typeorm_1.Column)({ type: 'int' })];
    _training_decorators = [
      (0, typeorm_1.ManyToOne)(() => training_entity_1.TrainingEntity),
      (0, typeorm_1.JoinColumn)({ name: 'training_id' }),
    ];
    _weapon_type_id_decorators = [(0, typeorm_1.Column)({ type: 'int' })];
    _target_id_decorators = [(0, typeorm_1.Column)({ type: 'int' })];
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
      _training_id_decorators,
      {
        kind: 'field',
        name: 'training_id',
        static: false,
        private: false,
        access: {
          has: obj => 'training_id' in obj,
          get: obj => obj.training_id,
          set: (obj, value) => {
            obj.training_id = value;
          },
        },
        metadata: _metadata,
      },
      _training_id_initializers,
      _training_id_extraInitializers,
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
      _weapon_type_id_decorators,
      {
        kind: 'field',
        name: 'weapon_type_id',
        static: false,
        private: false,
        access: {
          has: obj => 'weapon_type_id' in obj,
          get: obj => obj.weapon_type_id,
          set: (obj, value) => {
            obj.weapon_type_id = value;
          },
        },
        metadata: _metadata,
      },
      _weapon_type_id_initializers,
      _weapon_type_id_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _target_id_decorators,
      {
        kind: 'field',
        name: 'target_id',
        static: false,
        private: false,
        access: {
          has: obj => 'target_id' in obj,
          get: obj => obj.target_id,
          set: (obj, value) => {
            obj.target_id = value;
          },
        },
        metadata: _metadata,
      },
      _target_id_initializers,
      _target_id_extraInitializers,
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
