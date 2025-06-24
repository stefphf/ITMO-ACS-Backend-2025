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
exports.CoachEntity = void 0;
const typeorm_1 = require('typeorm');
const base_entity_1 = require('./base.entity');
const athlete_entity_1 = require('./athlete.entity');
/**
 * Сущность тренера
 */
let CoachEntity = (() => {
  let _classDecorators = [(0, typeorm_1.Entity)('coaches')];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _classSuper = base_entity_1.BaseEntity;
  let _id_decorators;
  let _id_initializers = [];
  let _id_extraInitializers = [];
  let _userId_decorators;
  let _userId_initializers = [];
  let _userId_extraInitializers = [];
  let _athletes_decorators;
  let _athletes_initializers = [];
  let _athletes_extraInitializers = [];
  var CoachEntity = (_classThis = class extends _classSuper {
    constructor() {
      super(...arguments);
      this.id = __runInitializers(this, _id_initializers, void 0);
      this.userId =
        (__runInitializers(this, _id_extraInitializers),
        __runInitializers(this, _userId_initializers, void 0));
      this.athletes =
        (__runInitializers(this, _userId_extraInitializers),
        __runInitializers(this, _athletes_initializers, void 0));
      __runInitializers(this, _athletes_extraInitializers);
    }
  });
  __setFunctionName(_classThis, 'CoachEntity');
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
    _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
    _userId_decorators = [(0, typeorm_1.Column)({ name: 'user_id' })];
    _athletes_decorators = [
      (0, typeorm_1.ManyToMany)(
        () => athlete_entity_1.AthleteEntity,
        athlete => athlete.coaches,
      ),
    ];
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
      _userId_decorators,
      {
        kind: 'field',
        name: 'userId',
        static: false,
        private: false,
        access: {
          has: obj => 'userId' in obj,
          get: obj => obj.userId,
          set: (obj, value) => {
            obj.userId = value;
          },
        },
        metadata: _metadata,
      },
      _userId_initializers,
      _userId_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _athletes_decorators,
      {
        kind: 'field',
        name: 'athletes',
        static: false,
        private: false,
        access: {
          has: obj => 'athletes' in obj,
          get: obj => obj.athletes,
          set: (obj, value) => {
            obj.athletes = value;
          },
        },
        metadata: _metadata,
      },
      _athletes_initializers,
      _athletes_extraInitializers,
    );
    __esDecorate(
      null,
      (_classDescriptor = { value: _classThis }),
      _classDecorators,
      { kind: 'class', name: _classThis.name, metadata: _metadata },
      null,
      _classExtraInitializers,
    );
    CoachEntity = _classThis = _classDescriptor.value;
    if (_metadata)
      Object.defineProperty(_classThis, Symbol.metadata, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _metadata,
      });
    __runInitializers(_classThis, _classExtraInitializers);
  })();
  return (CoachEntity = _classThis);
})();
exports.CoachEntity = CoachEntity;
