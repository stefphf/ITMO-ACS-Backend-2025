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
exports.ShotDto = exports.UpdateShotDto = exports.CreateShotDto = void 0;
const class_validator_1 = require('class-validator');
const routing_controllers_openapi_1 = require('routing-controllers-openapi');
/**
 * DTO для создания выстрела
 */
let CreateShotDto = (() => {
  let _classDecorators = [(0, routing_controllers_openapi_1.OpenAPI)({})];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _seriesId_decorators;
  let _seriesId_initializers = [];
  let _seriesId_extraInitializers = [];
  let _order_decorators;
  let _order_initializers = [];
  let _order_extraInitializers = [];
  let _x_decorators;
  let _x_initializers = [];
  let _x_extraInitializers = [];
  let _y_decorators;
  let _y_initializers = [];
  let _y_extraInitializers = [];
  let _score_decorators;
  let _score_initializers = [];
  let _score_extraInitializers = [];
  let _timeOffset_decorators;
  let _timeOffset_initializers = [];
  let _timeOffset_extraInitializers = [];
  var CreateShotDto = (_classThis = class {
    constructor() {
      this.seriesId = __runInitializers(this, _seriesId_initializers, void 0);
      this.order =
        (__runInitializers(this, _seriesId_extraInitializers),
        __runInitializers(this, _order_initializers, void 0));
      this.x =
        (__runInitializers(this, _order_extraInitializers),
        __runInitializers(this, _x_initializers, void 0));
      this.y =
        (__runInitializers(this, _x_extraInitializers),
        __runInitializers(this, _y_initializers, void 0));
      this.score =
        (__runInitializers(this, _y_extraInitializers),
        __runInitializers(this, _score_initializers, void 0));
      this.timeOffset =
        (__runInitializers(this, _score_extraInitializers),
        __runInitializers(this, _timeOffset_initializers, void 0));
      __runInitializers(this, _timeOffset_extraInitializers);
    }
  });
  __setFunctionName(_classThis, 'CreateShotDto');
  (() => {
    const _metadata =
      typeof Symbol === 'function' && Symbol.metadata
        ? Object.create(null)
        : void 0;
    _seriesId_decorators = [
      (0, class_validator_1.IsNumber)(
        {},
        { message: 'ID серии должен быть числом' },
      ),
      (0, class_validator_1.IsNotEmpty)({ message: 'ID серии обязателен' }),
    ];
    _order_decorators = [
      (0, class_validator_1.IsNumber)(
        {},
        { message: 'Порядковый номер должен быть числом' },
      ),
      (0, class_validator_1.IsNotEmpty)({
        message: 'Порядковый номер обязателен',
      }),
    ];
    _x_decorators = [
      (0, class_validator_1.IsNumber)(
        {},
        { message: 'Координата X должна быть числом' },
      ),
      (0, class_validator_1.IsNotEmpty)({
        message: 'Координата X обязательна',
      }),
    ];
    _y_decorators = [
      (0, class_validator_1.IsNumber)(
        {},
        { message: 'Координата Y должна быть числом' },
      ),
      (0, class_validator_1.IsNotEmpty)({
        message: 'Координата Y обязательна',
      }),
    ];
    _score_decorators = [
      (0, class_validator_1.IsNumber)(
        {},
        { message: 'Очки должны быть числом' },
      ),
      (0, class_validator_1.IsNotEmpty)({ message: 'Очки обязательны' }),
    ];
    _timeOffset_decorators = [
      (0, class_validator_1.IsNumber)(
        {},
        { message: 'Смещение времени должно быть числом' },
      ),
      (0, class_validator_1.IsOptional)(),
    ];
    __esDecorate(
      null,
      null,
      _seriesId_decorators,
      {
        kind: 'field',
        name: 'seriesId',
        static: false,
        private: false,
        access: {
          has: obj => 'seriesId' in obj,
          get: obj => obj.seriesId,
          set: (obj, value) => {
            obj.seriesId = value;
          },
        },
        metadata: _metadata,
      },
      _seriesId_initializers,
      _seriesId_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _order_decorators,
      {
        kind: 'field',
        name: 'order',
        static: false,
        private: false,
        access: {
          has: obj => 'order' in obj,
          get: obj => obj.order,
          set: (obj, value) => {
            obj.order = value;
          },
        },
        metadata: _metadata,
      },
      _order_initializers,
      _order_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _x_decorators,
      {
        kind: 'field',
        name: 'x',
        static: false,
        private: false,
        access: {
          has: obj => 'x' in obj,
          get: obj => obj.x,
          set: (obj, value) => {
            obj.x = value;
          },
        },
        metadata: _metadata,
      },
      _x_initializers,
      _x_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _y_decorators,
      {
        kind: 'field',
        name: 'y',
        static: false,
        private: false,
        access: {
          has: obj => 'y' in obj,
          get: obj => obj.y,
          set: (obj, value) => {
            obj.y = value;
          },
        },
        metadata: _metadata,
      },
      _y_initializers,
      _y_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _score_decorators,
      {
        kind: 'field',
        name: 'score',
        static: false,
        private: false,
        access: {
          has: obj => 'score' in obj,
          get: obj => obj.score,
          set: (obj, value) => {
            obj.score = value;
          },
        },
        metadata: _metadata,
      },
      _score_initializers,
      _score_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _timeOffset_decorators,
      {
        kind: 'field',
        name: 'timeOffset',
        static: false,
        private: false,
        access: {
          has: obj => 'timeOffset' in obj,
          get: obj => obj.timeOffset,
          set: (obj, value) => {
            obj.timeOffset = value;
          },
        },
        metadata: _metadata,
      },
      _timeOffset_initializers,
      _timeOffset_extraInitializers,
    );
    __esDecorate(
      null,
      (_classDescriptor = { value: _classThis }),
      _classDecorators,
      { kind: 'class', name: _classThis.name, metadata: _metadata },
      null,
      _classExtraInitializers,
    );
    CreateShotDto = _classThis = _classDescriptor.value;
    if (_metadata)
      Object.defineProperty(_classThis, Symbol.metadata, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _metadata,
      });
    __runInitializers(_classThis, _classExtraInitializers);
  })();
  return (CreateShotDto = _classThis);
})();
exports.CreateShotDto = CreateShotDto;
/**
 * DTO для обновления выстрела
 */
let UpdateShotDto = (() => {
  let _classDecorators = [(0, routing_controllers_openapi_1.OpenAPI)({})];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _order_decorators;
  let _order_initializers = [];
  let _order_extraInitializers = [];
  let _x_decorators;
  let _x_initializers = [];
  let _x_extraInitializers = [];
  let _y_decorators;
  let _y_initializers = [];
  let _y_extraInitializers = [];
  let _score_decorators;
  let _score_initializers = [];
  let _score_extraInitializers = [];
  let _timeOffset_decorators;
  let _timeOffset_initializers = [];
  let _timeOffset_extraInitializers = [];
  var UpdateShotDto = (_classThis = class {
    constructor() {
      this.order = __runInitializers(this, _order_initializers, void 0);
      this.x =
        (__runInitializers(this, _order_extraInitializers),
        __runInitializers(this, _x_initializers, void 0));
      this.y =
        (__runInitializers(this, _x_extraInitializers),
        __runInitializers(this, _y_initializers, void 0));
      this.score =
        (__runInitializers(this, _y_extraInitializers),
        __runInitializers(this, _score_initializers, void 0));
      this.timeOffset =
        (__runInitializers(this, _score_extraInitializers),
        __runInitializers(this, _timeOffset_initializers, void 0));
      __runInitializers(this, _timeOffset_extraInitializers);
    }
  });
  __setFunctionName(_classThis, 'UpdateShotDto');
  (() => {
    const _metadata =
      typeof Symbol === 'function' && Symbol.metadata
        ? Object.create(null)
        : void 0;
    _order_decorators = [
      (0, class_validator_1.IsNumber)(
        {},
        { message: 'Порядковый номер должен быть числом' },
      ),
      (0, class_validator_1.IsOptional)(),
    ];
    _x_decorators = [
      (0, class_validator_1.IsNumber)(
        {},
        { message: 'Координата X должна быть числом' },
      ),
      (0, class_validator_1.IsOptional)(),
    ];
    _y_decorators = [
      (0, class_validator_1.IsNumber)(
        {},
        { message: 'Координата Y должна быть числом' },
      ),
      (0, class_validator_1.IsOptional)(),
    ];
    _score_decorators = [
      (0, class_validator_1.IsNumber)(
        {},
        { message: 'Очки должны быть числом' },
      ),
      (0, class_validator_1.IsOptional)(),
    ];
    _timeOffset_decorators = [
      (0, class_validator_1.IsNumber)(
        {},
        { message: 'Смещение времени должно быть числом' },
      ),
      (0, class_validator_1.IsOptional)(),
    ];
    __esDecorate(
      null,
      null,
      _order_decorators,
      {
        kind: 'field',
        name: 'order',
        static: false,
        private: false,
        access: {
          has: obj => 'order' in obj,
          get: obj => obj.order,
          set: (obj, value) => {
            obj.order = value;
          },
        },
        metadata: _metadata,
      },
      _order_initializers,
      _order_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _x_decorators,
      {
        kind: 'field',
        name: 'x',
        static: false,
        private: false,
        access: {
          has: obj => 'x' in obj,
          get: obj => obj.x,
          set: (obj, value) => {
            obj.x = value;
          },
        },
        metadata: _metadata,
      },
      _x_initializers,
      _x_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _y_decorators,
      {
        kind: 'field',
        name: 'y',
        static: false,
        private: false,
        access: {
          has: obj => 'y' in obj,
          get: obj => obj.y,
          set: (obj, value) => {
            obj.y = value;
          },
        },
        metadata: _metadata,
      },
      _y_initializers,
      _y_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _score_decorators,
      {
        kind: 'field',
        name: 'score',
        static: false,
        private: false,
        access: {
          has: obj => 'score' in obj,
          get: obj => obj.score,
          set: (obj, value) => {
            obj.score = value;
          },
        },
        metadata: _metadata,
      },
      _score_initializers,
      _score_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _timeOffset_decorators,
      {
        kind: 'field',
        name: 'timeOffset',
        static: false,
        private: false,
        access: {
          has: obj => 'timeOffset' in obj,
          get: obj => obj.timeOffset,
          set: (obj, value) => {
            obj.timeOffset = value;
          },
        },
        metadata: _metadata,
      },
      _timeOffset_initializers,
      _timeOffset_extraInitializers,
    );
    __esDecorate(
      null,
      (_classDescriptor = { value: _classThis }),
      _classDecorators,
      { kind: 'class', name: _classThis.name, metadata: _metadata },
      null,
      _classExtraInitializers,
    );
    UpdateShotDto = _classThis = _classDescriptor.value;
    if (_metadata)
      Object.defineProperty(_classThis, Symbol.metadata, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _metadata,
      });
    __runInitializers(_classThis, _classExtraInitializers);
  })();
  return (UpdateShotDto = _classThis);
})();
exports.UpdateShotDto = UpdateShotDto;
/**
 * DTO для ответа с данными выстрела
 */
let ShotDto = (() => {
  let _classDecorators = [(0, routing_controllers_openapi_1.OpenAPI)({})];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _id_decorators;
  let _id_initializers = [];
  let _id_extraInitializers = [];
  let _seriesId_decorators;
  let _seriesId_initializers = [];
  let _seriesId_extraInitializers = [];
  let _order_decorators;
  let _order_initializers = [];
  let _order_extraInitializers = [];
  let _x_decorators;
  let _x_initializers = [];
  let _x_extraInitializers = [];
  let _y_decorators;
  let _y_initializers = [];
  let _y_extraInitializers = [];
  let _score_decorators;
  let _score_initializers = [];
  let _score_extraInitializers = [];
  let _timeOffset_decorators;
  let _timeOffset_initializers = [];
  let _timeOffset_extraInitializers = [];
  let _createdAt_decorators;
  let _createdAt_initializers = [];
  let _createdAt_extraInitializers = [];
  let _updatedAt_decorators;
  let _updatedAt_initializers = [];
  let _updatedAt_extraInitializers = [];
  var ShotDto = (_classThis = class {
    constructor() {
      this.id = __runInitializers(this, _id_initializers, void 0);
      this.seriesId =
        (__runInitializers(this, _id_extraInitializers),
        __runInitializers(this, _seriesId_initializers, void 0));
      this.order =
        (__runInitializers(this, _seriesId_extraInitializers),
        __runInitializers(this, _order_initializers, void 0));
      this.x =
        (__runInitializers(this, _order_extraInitializers),
        __runInitializers(this, _x_initializers, void 0));
      this.y =
        (__runInitializers(this, _x_extraInitializers),
        __runInitializers(this, _y_initializers, void 0));
      this.score =
        (__runInitializers(this, _y_extraInitializers),
        __runInitializers(this, _score_initializers, void 0));
      this.timeOffset =
        (__runInitializers(this, _score_extraInitializers),
        __runInitializers(this, _timeOffset_initializers, void 0));
      this.createdAt =
        (__runInitializers(this, _timeOffset_extraInitializers),
        __runInitializers(this, _createdAt_initializers, void 0));
      this.updatedAt =
        (__runInitializers(this, _createdAt_extraInitializers),
        __runInitializers(this, _updatedAt_initializers, void 0));
      __runInitializers(this, _updatedAt_extraInitializers);
    }
  });
  __setFunctionName(_classThis, 'ShotDto');
  (() => {
    const _metadata =
      typeof Symbol === 'function' && Symbol.metadata
        ? Object.create(null)
        : void 0;
    _id_decorators = [
      (0, class_validator_1.IsNumber)({}, { message: 'ID должен быть числом' }),
    ];
    _seriesId_decorators = [
      (0, class_validator_1.IsNumber)(
        {},
        { message: 'ID серии должен быть числом' },
      ),
    ];
    _order_decorators = [
      (0, class_validator_1.IsNumber)(
        {},
        { message: 'Порядковый номер должен быть числом' },
      ),
    ];
    _x_decorators = [
      (0, class_validator_1.IsNumber)(
        {},
        { message: 'Координата X должна быть числом' },
      ),
    ];
    _y_decorators = [
      (0, class_validator_1.IsNumber)(
        {},
        { message: 'Координата Y должна быть числом' },
      ),
    ];
    _score_decorators = [
      (0, class_validator_1.IsNumber)(
        {},
        { message: 'Очки должны быть числом' },
      ),
    ];
    _timeOffset_decorators = [
      (0, class_validator_1.IsOptional)(),
      (0, class_validator_1.IsNumber)(
        {},
        { message: 'Смещение времени должно быть числом' },
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
      _seriesId_decorators,
      {
        kind: 'field',
        name: 'seriesId',
        static: false,
        private: false,
        access: {
          has: obj => 'seriesId' in obj,
          get: obj => obj.seriesId,
          set: (obj, value) => {
            obj.seriesId = value;
          },
        },
        metadata: _metadata,
      },
      _seriesId_initializers,
      _seriesId_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _order_decorators,
      {
        kind: 'field',
        name: 'order',
        static: false,
        private: false,
        access: {
          has: obj => 'order' in obj,
          get: obj => obj.order,
          set: (obj, value) => {
            obj.order = value;
          },
        },
        metadata: _metadata,
      },
      _order_initializers,
      _order_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _x_decorators,
      {
        kind: 'field',
        name: 'x',
        static: false,
        private: false,
        access: {
          has: obj => 'x' in obj,
          get: obj => obj.x,
          set: (obj, value) => {
            obj.x = value;
          },
        },
        metadata: _metadata,
      },
      _x_initializers,
      _x_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _y_decorators,
      {
        kind: 'field',
        name: 'y',
        static: false,
        private: false,
        access: {
          has: obj => 'y' in obj,
          get: obj => obj.y,
          set: (obj, value) => {
            obj.y = value;
          },
        },
        metadata: _metadata,
      },
      _y_initializers,
      _y_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _score_decorators,
      {
        kind: 'field',
        name: 'score',
        static: false,
        private: false,
        access: {
          has: obj => 'score' in obj,
          get: obj => obj.score,
          set: (obj, value) => {
            obj.score = value;
          },
        },
        metadata: _metadata,
      },
      _score_initializers,
      _score_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _timeOffset_decorators,
      {
        kind: 'field',
        name: 'timeOffset',
        static: false,
        private: false,
        access: {
          has: obj => 'timeOffset' in obj,
          get: obj => obj.timeOffset,
          set: (obj, value) => {
            obj.timeOffset = value;
          },
        },
        metadata: _metadata,
      },
      _timeOffset_initializers,
      _timeOffset_extraInitializers,
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
    ShotDto = _classThis = _classDescriptor.value;
    if (_metadata)
      Object.defineProperty(_classThis, Symbol.metadata, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _metadata,
      });
    __runInitializers(_classThis, _classExtraInitializers);
  })();
  return (ShotDto = _classThis);
})();
exports.ShotDto = ShotDto;
