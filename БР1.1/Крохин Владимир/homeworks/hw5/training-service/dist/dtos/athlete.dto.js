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
exports.AthleteDto =
  exports.UpdateAthleteDto =
  exports.CreateAthleteDto =
    void 0;
const class_validator_1 = require('class-validator');
const routing_controllers_openapi_1 = require('routing-controllers-openapi');
/**
 * DTO для создания спортсмена
 */
let CreateAthleteDto = (() => {
  let _classDecorators = [
    (0, routing_controllers_openapi_1.OpenAPI)({
      schema: {
        type: 'object',
        properties: {
          userId: { type: 'number', description: 'ID пользователя' },
          coachIds: {
            type: 'array',
            items: { type: 'number' },
            description: 'ID тренеров',
          },
        },
        required: ['userId'],
      },
    }),
  ];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _userId_decorators;
  let _userId_initializers = [];
  let _userId_extraInitializers = [];
  let _coachIds_decorators;
  let _coachIds_initializers = [];
  let _coachIds_extraInitializers = [];
  var CreateAthleteDto = (_classThis = class {
    constructor() {
      this.userId = __runInitializers(this, _userId_initializers, void 0);
      this.coachIds =
        (__runInitializers(this, _userId_extraInitializers),
        __runInitializers(this, _coachIds_initializers, void 0));
      __runInitializers(this, _coachIds_extraInitializers);
    }
  });
  __setFunctionName(_classThis, 'CreateAthleteDto');
  (() => {
    const _metadata =
      typeof Symbol === 'function' && Symbol.metadata
        ? Object.create(null)
        : void 0;
    _userId_decorators = [
      (0, class_validator_1.IsNumber)(
        {},
        { message: 'ID пользователя должен быть числом' },
      ),
      (0, class_validator_1.IsNotEmpty)({
        message: 'ID пользователя обязателен',
      }),
    ];
    _coachIds_decorators = [
      (0, class_validator_1.IsArray)({
        message: 'ID тренеров должны быть массивом',
      }),
      (0, class_validator_1.IsNumber)(
        {},
        { each: true, message: 'ID тренера должен быть числом' },
      ),
      (0, class_validator_1.IsOptional)(),
    ];
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
      _coachIds_decorators,
      {
        kind: 'field',
        name: 'coachIds',
        static: false,
        private: false,
        access: {
          has: obj => 'coachIds' in obj,
          get: obj => obj.coachIds,
          set: (obj, value) => {
            obj.coachIds = value;
          },
        },
        metadata: _metadata,
      },
      _coachIds_initializers,
      _coachIds_extraInitializers,
    );
    __esDecorate(
      null,
      (_classDescriptor = { value: _classThis }),
      _classDecorators,
      { kind: 'class', name: _classThis.name, metadata: _metadata },
      null,
      _classExtraInitializers,
    );
    CreateAthleteDto = _classThis = _classDescriptor.value;
    if (_metadata)
      Object.defineProperty(_classThis, Symbol.metadata, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _metadata,
      });
    __runInitializers(_classThis, _classExtraInitializers);
  })();
  return (CreateAthleteDto = _classThis);
})();
exports.CreateAthleteDto = CreateAthleteDto;
/**
 * DTO для обновления спортсмена
 */
let UpdateAthleteDto = (() => {
  let _classDecorators = [
    (0, routing_controllers_openapi_1.OpenAPI)({
      schema: {
        type: 'object',
        properties: {
          coachIds: {
            type: 'array',
            items: { type: 'number' },
            description: 'ID тренеров',
          },
        },
      },
    }),
  ];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _coachIds_decorators;
  let _coachIds_initializers = [];
  let _coachIds_extraInitializers = [];
  var UpdateAthleteDto = (_classThis = class {
    constructor() {
      this.coachIds = __runInitializers(this, _coachIds_initializers, void 0);
      __runInitializers(this, _coachIds_extraInitializers);
    }
  });
  __setFunctionName(_classThis, 'UpdateAthleteDto');
  (() => {
    const _metadata =
      typeof Symbol === 'function' && Symbol.metadata
        ? Object.create(null)
        : void 0;
    _coachIds_decorators = [
      (0, class_validator_1.IsArray)({
        message: 'ID тренеров должны быть массивом',
      }),
      (0, class_validator_1.IsNumber)(
        {},
        { each: true, message: 'ID тренера должен быть числом' },
      ),
      (0, class_validator_1.IsOptional)(),
    ];
    __esDecorate(
      null,
      null,
      _coachIds_decorators,
      {
        kind: 'field',
        name: 'coachIds',
        static: false,
        private: false,
        access: {
          has: obj => 'coachIds' in obj,
          get: obj => obj.coachIds,
          set: (obj, value) => {
            obj.coachIds = value;
          },
        },
        metadata: _metadata,
      },
      _coachIds_initializers,
      _coachIds_extraInitializers,
    );
    __esDecorate(
      null,
      (_classDescriptor = { value: _classThis }),
      _classDecorators,
      { kind: 'class', name: _classThis.name, metadata: _metadata },
      null,
      _classExtraInitializers,
    );
    UpdateAthleteDto = _classThis = _classDescriptor.value;
    if (_metadata)
      Object.defineProperty(_classThis, Symbol.metadata, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _metadata,
      });
    __runInitializers(_classThis, _classExtraInitializers);
  })();
  return (UpdateAthleteDto = _classThis);
})();
exports.UpdateAthleteDto = UpdateAthleteDto;
/**
 * DTO для ответа с данными спортсмена
 */
let AthleteDto = (() => {
  let _classDecorators = [
    (0, routing_controllers_openapi_1.OpenAPI)({
      schema: {
        type: 'object',
        properties: {
          id: { type: 'number', description: 'ID спортсмена' },
          userId: { type: 'number', description: 'ID пользователя' },
          coachIds: {
            type: 'array',
            items: { type: 'number' },
            description: 'ID тренеров',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Дата создания',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Дата обновления',
          },
        },
        required: ['id', 'userId', 'coachIds', 'createdAt', 'updatedAt'],
      },
    }),
  ];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _id_decorators;
  let _id_initializers = [];
  let _id_extraInitializers = [];
  let _userId_decorators;
  let _userId_initializers = [];
  let _userId_extraInitializers = [];
  let _coachIds_decorators;
  let _coachIds_initializers = [];
  let _coachIds_extraInitializers = [];
  let _createdAt_decorators;
  let _createdAt_initializers = [];
  let _createdAt_extraInitializers = [];
  let _updatedAt_decorators;
  let _updatedAt_initializers = [];
  let _updatedAt_extraInitializers = [];
  var AthleteDto = (_classThis = class {
    constructor() {
      this.id = __runInitializers(this, _id_initializers, void 0);
      this.userId =
        (__runInitializers(this, _id_extraInitializers),
        __runInitializers(this, _userId_initializers, void 0));
      this.coachIds =
        (__runInitializers(this, _userId_extraInitializers),
        __runInitializers(this, _coachIds_initializers, void 0));
      this.createdAt =
        (__runInitializers(this, _coachIds_extraInitializers),
        __runInitializers(this, _createdAt_initializers, void 0));
      this.updatedAt =
        (__runInitializers(this, _createdAt_extraInitializers),
        __runInitializers(this, _updatedAt_initializers, void 0));
      __runInitializers(this, _updatedAt_extraInitializers);
    }
  });
  __setFunctionName(_classThis, 'AthleteDto');
  (() => {
    const _metadata =
      typeof Symbol === 'function' && Symbol.metadata
        ? Object.create(null)
        : void 0;
    _id_decorators = [
      (0, class_validator_1.IsNumber)({}, { message: 'ID должен быть числом' }),
    ];
    _userId_decorators = [
      (0, class_validator_1.IsNumber)(
        {},
        { message: 'ID пользователя должен быть числом' },
      ),
    ];
    _coachIds_decorators = [
      (0, class_validator_1.IsArray)({
        message: 'ID тренеров должны быть массивом',
      }),
      (0, class_validator_1.IsNumber)(
        {},
        { each: true, message: 'ID тренера должен быть числом' },
      ),
    ];
    _createdAt_decorators = [
      (0, class_validator_1.IsString)({
        message: 'Дата создания должна быть строкой',
      }),
    ];
    _updatedAt_decorators = [
      (0, class_validator_1.IsString)({
        message: 'Дата обновления должна быть строкой',
      }),
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
      _coachIds_decorators,
      {
        kind: 'field',
        name: 'coachIds',
        static: false,
        private: false,
        access: {
          has: obj => 'coachIds' in obj,
          get: obj => obj.coachIds,
          set: (obj, value) => {
            obj.coachIds = value;
          },
        },
        metadata: _metadata,
      },
      _coachIds_initializers,
      _coachIds_extraInitializers,
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
    AthleteDto = _classThis = _classDescriptor.value;
    if (_metadata)
      Object.defineProperty(_classThis, Symbol.metadata, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _metadata,
      });
    __runInitializers(_classThis, _classExtraInitializers);
  })();
  return (AthleteDto = _classThis);
})();
exports.AthleteDto = AthleteDto;
