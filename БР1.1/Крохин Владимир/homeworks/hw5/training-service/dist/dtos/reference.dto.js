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
exports.ExerciseDto =
  exports.UpdateExerciseDto =
  exports.CreateExerciseDto =
  exports.WeaponTypeDto =
  exports.UpdateWeaponTypeDto =
  exports.CreateWeaponTypeDto =
  exports.TargetDto =
  exports.UpdateTargetDto =
  exports.CreateTargetDto =
    void 0;
const class_validator_1 = require('class-validator');
const routing_controllers_openapi_1 = require('routing-controllers-openapi');
/**
 * DTO для создания мишени
 */
let CreateTargetDto = (() => {
  let _classDecorators = [(0, routing_controllers_openapi_1.OpenAPI)({})];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _name_decorators;
  let _name_initializers = [];
  let _name_extraInitializers = [];
  let _image_decorators;
  let _image_initializers = [];
  let _image_extraInitializers = [];
  let _description_decorators;
  let _description_initializers = [];
  let _description_extraInitializers = [];
  var CreateTargetDto = (_classThis = class {
    constructor() {
      this.name = __runInitializers(this, _name_initializers, void 0);
      this.image =
        (__runInitializers(this, _name_extraInitializers),
        __runInitializers(this, _image_initializers, void 0)); // URL изображения мишени
      this.description =
        (__runInitializers(this, _image_extraInitializers),
        __runInitializers(this, _description_initializers, void 0));
      __runInitializers(this, _description_extraInitializers);
    }
  });
  __setFunctionName(_classThis, 'CreateTargetDto');
  (() => {
    const _metadata =
      typeof Symbol === 'function' && Symbol.metadata
        ? Object.create(null)
        : void 0;
    _name_decorators = [
      (0, class_validator_1.IsString)({
        message: 'Название должно быть строкой',
      }),
      (0, class_validator_1.IsNotEmpty)({ message: 'Название обязательно' }),
    ];
    _image_decorators = [
      (0, class_validator_1.IsString)({
        message: 'URL изображения должен быть строкой',
      }),
      (0, class_validator_1.IsOptional)(),
    ];
    _description_decorators = [
      (0, class_validator_1.IsString)({
        message: 'Описание должно быть строкой',
      }),
      (0, class_validator_1.IsOptional)(),
    ];
    __esDecorate(
      null,
      null,
      _name_decorators,
      {
        kind: 'field',
        name: 'name',
        static: false,
        private: false,
        access: {
          has: obj => 'name' in obj,
          get: obj => obj.name,
          set: (obj, value) => {
            obj.name = value;
          },
        },
        metadata: _metadata,
      },
      _name_initializers,
      _name_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _image_decorators,
      {
        kind: 'field',
        name: 'image',
        static: false,
        private: false,
        access: {
          has: obj => 'image' in obj,
          get: obj => obj.image,
          set: (obj, value) => {
            obj.image = value;
          },
        },
        metadata: _metadata,
      },
      _image_initializers,
      _image_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _description_decorators,
      {
        kind: 'field',
        name: 'description',
        static: false,
        private: false,
        access: {
          has: obj => 'description' in obj,
          get: obj => obj.description,
          set: (obj, value) => {
            obj.description = value;
          },
        },
        metadata: _metadata,
      },
      _description_initializers,
      _description_extraInitializers,
    );
    __esDecorate(
      null,
      (_classDescriptor = { value: _classThis }),
      _classDecorators,
      { kind: 'class', name: _classThis.name, metadata: _metadata },
      null,
      _classExtraInitializers,
    );
    CreateTargetDto = _classThis = _classDescriptor.value;
    if (_metadata)
      Object.defineProperty(_classThis, Symbol.metadata, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _metadata,
      });
    __runInitializers(_classThis, _classExtraInitializers);
  })();
  return (CreateTargetDto = _classThis);
})();
exports.CreateTargetDto = CreateTargetDto;
/**
 * DTO для обновления мишени
 */
let UpdateTargetDto = (() => {
  let _classDecorators = [(0, routing_controllers_openapi_1.OpenAPI)({})];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _name_decorators;
  let _name_initializers = [];
  let _name_extraInitializers = [];
  let _image_decorators;
  let _image_initializers = [];
  let _image_extraInitializers = [];
  let _description_decorators;
  let _description_initializers = [];
  let _description_extraInitializers = [];
  var UpdateTargetDto = (_classThis = class {
    constructor() {
      this.name = __runInitializers(this, _name_initializers, void 0);
      this.image =
        (__runInitializers(this, _name_extraInitializers),
        __runInitializers(this, _image_initializers, void 0)); // URL изображения мишени
      this.description =
        (__runInitializers(this, _image_extraInitializers),
        __runInitializers(this, _description_initializers, void 0));
      __runInitializers(this, _description_extraInitializers);
    }
  });
  __setFunctionName(_classThis, 'UpdateTargetDto');
  (() => {
    const _metadata =
      typeof Symbol === 'function' && Symbol.metadata
        ? Object.create(null)
        : void 0;
    _name_decorators = [
      (0, class_validator_1.IsString)({
        message: 'Название должно быть строкой',
      }),
      (0, class_validator_1.IsOptional)(),
    ];
    _image_decorators = [
      (0, class_validator_1.IsString)({
        message: 'URL изображения должен быть строкой',
      }),
      (0, class_validator_1.IsOptional)(),
    ];
    _description_decorators = [
      (0, class_validator_1.IsString)({
        message: 'Описание должно быть строкой',
      }),
      (0, class_validator_1.IsOptional)(),
    ];
    __esDecorate(
      null,
      null,
      _name_decorators,
      {
        kind: 'field',
        name: 'name',
        static: false,
        private: false,
        access: {
          has: obj => 'name' in obj,
          get: obj => obj.name,
          set: (obj, value) => {
            obj.name = value;
          },
        },
        metadata: _metadata,
      },
      _name_initializers,
      _name_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _image_decorators,
      {
        kind: 'field',
        name: 'image',
        static: false,
        private: false,
        access: {
          has: obj => 'image' in obj,
          get: obj => obj.image,
          set: (obj, value) => {
            obj.image = value;
          },
        },
        metadata: _metadata,
      },
      _image_initializers,
      _image_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _description_decorators,
      {
        kind: 'field',
        name: 'description',
        static: false,
        private: false,
        access: {
          has: obj => 'description' in obj,
          get: obj => obj.description,
          set: (obj, value) => {
            obj.description = value;
          },
        },
        metadata: _metadata,
      },
      _description_initializers,
      _description_extraInitializers,
    );
    __esDecorate(
      null,
      (_classDescriptor = { value: _classThis }),
      _classDecorators,
      { kind: 'class', name: _classThis.name, metadata: _metadata },
      null,
      _classExtraInitializers,
    );
    UpdateTargetDto = _classThis = _classDescriptor.value;
    if (_metadata)
      Object.defineProperty(_classThis, Symbol.metadata, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _metadata,
      });
    __runInitializers(_classThis, _classExtraInitializers);
  })();
  return (UpdateTargetDto = _classThis);
})();
exports.UpdateTargetDto = UpdateTargetDto;
/**
 * DTO для ответа с данными мишени
 */
let TargetDto = (() => {
  let _classDecorators = [(0, routing_controllers_openapi_1.OpenAPI)({})];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  var TargetDto = (_classThis = class {});
  __setFunctionName(_classThis, 'TargetDto');
  (() => {
    const _metadata =
      typeof Symbol === 'function' && Symbol.metadata
        ? Object.create(null)
        : void 0;
    __esDecorate(
      null,
      (_classDescriptor = { value: _classThis }),
      _classDecorators,
      { kind: 'class', name: _classThis.name, metadata: _metadata },
      null,
      _classExtraInitializers,
    );
    TargetDto = _classThis = _classDescriptor.value;
    if (_metadata)
      Object.defineProperty(_classThis, Symbol.metadata, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _metadata,
      });
    __runInitializers(_classThis, _classExtraInitializers);
  })();
  return (TargetDto = _classThis);
})();
exports.TargetDto = TargetDto;
/**
 * DTO для создания типа оружия
 */
let CreateWeaponTypeDto = (() => {
  let _classDecorators = [(0, routing_controllers_openapi_1.OpenAPI)({})];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _name_decorators;
  let _name_initializers = [];
  let _name_extraInitializers = [];
  let _description_decorators;
  let _description_initializers = [];
  let _description_extraInitializers = [];
  var CreateWeaponTypeDto = (_classThis = class {
    constructor() {
      this.name = __runInitializers(this, _name_initializers, void 0);
      this.description =
        (__runInitializers(this, _name_extraInitializers),
        __runInitializers(this, _description_initializers, void 0));
      __runInitializers(this, _description_extraInitializers);
    }
  });
  __setFunctionName(_classThis, 'CreateWeaponTypeDto');
  (() => {
    const _metadata =
      typeof Symbol === 'function' && Symbol.metadata
        ? Object.create(null)
        : void 0;
    _name_decorators = [
      (0, class_validator_1.IsString)({
        message: 'Название должно быть строкой',
      }),
      (0, class_validator_1.IsNotEmpty)({ message: 'Название обязательно' }),
    ];
    _description_decorators = [
      (0, class_validator_1.IsString)({
        message: 'Описание должно быть строкой',
      }),
      (0, class_validator_1.IsOptional)(),
    ];
    __esDecorate(
      null,
      null,
      _name_decorators,
      {
        kind: 'field',
        name: 'name',
        static: false,
        private: false,
        access: {
          has: obj => 'name' in obj,
          get: obj => obj.name,
          set: (obj, value) => {
            obj.name = value;
          },
        },
        metadata: _metadata,
      },
      _name_initializers,
      _name_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _description_decorators,
      {
        kind: 'field',
        name: 'description',
        static: false,
        private: false,
        access: {
          has: obj => 'description' in obj,
          get: obj => obj.description,
          set: (obj, value) => {
            obj.description = value;
          },
        },
        metadata: _metadata,
      },
      _description_initializers,
      _description_extraInitializers,
    );
    __esDecorate(
      null,
      (_classDescriptor = { value: _classThis }),
      _classDecorators,
      { kind: 'class', name: _classThis.name, metadata: _metadata },
      null,
      _classExtraInitializers,
    );
    CreateWeaponTypeDto = _classThis = _classDescriptor.value;
    if (_metadata)
      Object.defineProperty(_classThis, Symbol.metadata, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _metadata,
      });
    __runInitializers(_classThis, _classExtraInitializers);
  })();
  return (CreateWeaponTypeDto = _classThis);
})();
exports.CreateWeaponTypeDto = CreateWeaponTypeDto;
/**
 * DTO для обновления типа оружия
 */
let UpdateWeaponTypeDto = (() => {
  let _classDecorators = [(0, routing_controllers_openapi_1.OpenAPI)({})];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _name_decorators;
  let _name_initializers = [];
  let _name_extraInitializers = [];
  let _description_decorators;
  let _description_initializers = [];
  let _description_extraInitializers = [];
  var UpdateWeaponTypeDto = (_classThis = class {
    constructor() {
      this.name = __runInitializers(this, _name_initializers, void 0);
      this.description =
        (__runInitializers(this, _name_extraInitializers),
        __runInitializers(this, _description_initializers, void 0));
      __runInitializers(this, _description_extraInitializers);
    }
  });
  __setFunctionName(_classThis, 'UpdateWeaponTypeDto');
  (() => {
    const _metadata =
      typeof Symbol === 'function' && Symbol.metadata
        ? Object.create(null)
        : void 0;
    _name_decorators = [
      (0, class_validator_1.IsString)({
        message: 'Название должно быть строкой',
      }),
      (0, class_validator_1.IsOptional)(),
    ];
    _description_decorators = [
      (0, class_validator_1.IsString)({
        message: 'Описание должно быть строкой',
      }),
      (0, class_validator_1.IsOptional)(),
    ];
    __esDecorate(
      null,
      null,
      _name_decorators,
      {
        kind: 'field',
        name: 'name',
        static: false,
        private: false,
        access: {
          has: obj => 'name' in obj,
          get: obj => obj.name,
          set: (obj, value) => {
            obj.name = value;
          },
        },
        metadata: _metadata,
      },
      _name_initializers,
      _name_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _description_decorators,
      {
        kind: 'field',
        name: 'description',
        static: false,
        private: false,
        access: {
          has: obj => 'description' in obj,
          get: obj => obj.description,
          set: (obj, value) => {
            obj.description = value;
          },
        },
        metadata: _metadata,
      },
      _description_initializers,
      _description_extraInitializers,
    );
    __esDecorate(
      null,
      (_classDescriptor = { value: _classThis }),
      _classDecorators,
      { kind: 'class', name: _classThis.name, metadata: _metadata },
      null,
      _classExtraInitializers,
    );
    UpdateWeaponTypeDto = _classThis = _classDescriptor.value;
    if (_metadata)
      Object.defineProperty(_classThis, Symbol.metadata, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _metadata,
      });
    __runInitializers(_classThis, _classExtraInitializers);
  })();
  return (UpdateWeaponTypeDto = _classThis);
})();
exports.UpdateWeaponTypeDto = UpdateWeaponTypeDto;
/**
 * DTO для ответа с данными типа оружия
 */
let WeaponTypeDto = (() => {
  let _classDecorators = [(0, routing_controllers_openapi_1.OpenAPI)({})];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  var WeaponTypeDto = (_classThis = class {});
  __setFunctionName(_classThis, 'WeaponTypeDto');
  (() => {
    const _metadata =
      typeof Symbol === 'function' && Symbol.metadata
        ? Object.create(null)
        : void 0;
    __esDecorate(
      null,
      (_classDescriptor = { value: _classThis }),
      _classDecorators,
      { kind: 'class', name: _classThis.name, metadata: _metadata },
      null,
      _classExtraInitializers,
    );
    WeaponTypeDto = _classThis = _classDescriptor.value;
    if (_metadata)
      Object.defineProperty(_classThis, Symbol.metadata, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _metadata,
      });
    __runInitializers(_classThis, _classExtraInitializers);
  })();
  return (WeaponTypeDto = _classThis);
})();
exports.WeaponTypeDto = WeaponTypeDto;
/**
 * DTO для создания упражнения
 */
let CreateExerciseDto = (() => {
  let _classDecorators = [(0, routing_controllers_openapi_1.OpenAPI)({})];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _name_decorators;
  let _name_initializers = [];
  let _name_extraInitializers = [];
  let _weaponTypeId_decorators;
  let _weaponTypeId_initializers = [];
  let _weaponTypeId_extraInitializers = [];
  let _targetId_decorators;
  let _targetId_initializers = [];
  let _targetId_extraInitializers = [];
  let _shots_decorators;
  let _shots_initializers = [];
  let _shots_extraInitializers = [];
  let _shotsInSeries_decorators;
  let _shotsInSeries_initializers = [];
  let _shotsInSeries_extraInitializers = [];
  let _duration_decorators;
  let _duration_initializers = [];
  let _duration_extraInitializers = [];
  let _description_decorators;
  let _description_initializers = [];
  let _description_extraInitializers = [];
  var CreateExerciseDto = (_classThis = class {
    constructor() {
      this.name = __runInitializers(this, _name_initializers, void 0);
      this.weaponTypeId =
        (__runInitializers(this, _name_extraInitializers),
        __runInitializers(this, _weaponTypeId_initializers, void 0));
      this.targetId =
        (__runInitializers(this, _weaponTypeId_extraInitializers),
        __runInitializers(this, _targetId_initializers, void 0));
      this.shots =
        (__runInitializers(this, _targetId_extraInitializers),
        __runInitializers(this, _shots_initializers, void 0));
      this.shotsInSeries =
        (__runInitializers(this, _shots_extraInitializers),
        __runInitializers(this, _shotsInSeries_initializers, void 0));
      this.duration =
        (__runInitializers(this, _shotsInSeries_extraInitializers),
        __runInitializers(this, _duration_initializers, void 0));
      this.description =
        (__runInitializers(this, _duration_extraInitializers),
        __runInitializers(this, _description_initializers, void 0));
      __runInitializers(this, _description_extraInitializers);
    }
  });
  __setFunctionName(_classThis, 'CreateExerciseDto');
  (() => {
    const _metadata =
      typeof Symbol === 'function' && Symbol.metadata
        ? Object.create(null)
        : void 0;
    _name_decorators = [
      (0, class_validator_1.IsString)({
        message: 'Название должно быть строкой',
      }),
      (0, class_validator_1.IsNotEmpty)({ message: 'Название обязательно' }),
    ];
    _weaponTypeId_decorators = [
      (0, class_validator_1.IsNumber)(
        {},
        { message: 'ID типа оружия должен быть числом' },
      ),
      (0, class_validator_1.IsNotEmpty)({
        message: 'ID типа оружия обязателен',
      }),
    ];
    _targetId_decorators = [
      (0, class_validator_1.IsNumber)(
        {},
        { message: 'ID мишени должен быть числом' },
      ),
      (0, class_validator_1.IsNotEmpty)({ message: 'ID мишени обязателен' }),
    ];
    _shots_decorators = [
      (0, class_validator_1.IsNumber)(
        {},
        { message: 'Количество выстрелов должно быть числом' },
      ),
      (0, class_validator_1.IsOptional)(),
    ];
    _shotsInSeries_decorators = [
      (0, class_validator_1.IsNumber)(
        {},
        { message: 'Количество выстрелов в серии должно быть числом' },
      ),
      (0, class_validator_1.IsOptional)(),
    ];
    _duration_decorators = [
      (0, class_validator_1.IsNumber)(
        {},
        { message: 'Продолжительность должна быть числом' },
      ),
      (0, class_validator_1.IsOptional)(),
    ];
    _description_decorators = [
      (0, class_validator_1.IsString)({
        message: 'Описание должно быть строкой',
      }),
      (0, class_validator_1.IsOptional)(),
    ];
    __esDecorate(
      null,
      null,
      _name_decorators,
      {
        kind: 'field',
        name: 'name',
        static: false,
        private: false,
        access: {
          has: obj => 'name' in obj,
          get: obj => obj.name,
          set: (obj, value) => {
            obj.name = value;
          },
        },
        metadata: _metadata,
      },
      _name_initializers,
      _name_extraInitializers,
    );
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
      _shotsInSeries_decorators,
      {
        kind: 'field',
        name: 'shotsInSeries',
        static: false,
        private: false,
        access: {
          has: obj => 'shotsInSeries' in obj,
          get: obj => obj.shotsInSeries,
          set: (obj, value) => {
            obj.shotsInSeries = value;
          },
        },
        metadata: _metadata,
      },
      _shotsInSeries_initializers,
      _shotsInSeries_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _duration_decorators,
      {
        kind: 'field',
        name: 'duration',
        static: false,
        private: false,
        access: {
          has: obj => 'duration' in obj,
          get: obj => obj.duration,
          set: (obj, value) => {
            obj.duration = value;
          },
        },
        metadata: _metadata,
      },
      _duration_initializers,
      _duration_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _description_decorators,
      {
        kind: 'field',
        name: 'description',
        static: false,
        private: false,
        access: {
          has: obj => 'description' in obj,
          get: obj => obj.description,
          set: (obj, value) => {
            obj.description = value;
          },
        },
        metadata: _metadata,
      },
      _description_initializers,
      _description_extraInitializers,
    );
    __esDecorate(
      null,
      (_classDescriptor = { value: _classThis }),
      _classDecorators,
      { kind: 'class', name: _classThis.name, metadata: _metadata },
      null,
      _classExtraInitializers,
    );
    CreateExerciseDto = _classThis = _classDescriptor.value;
    if (_metadata)
      Object.defineProperty(_classThis, Symbol.metadata, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _metadata,
      });
    __runInitializers(_classThis, _classExtraInitializers);
  })();
  return (CreateExerciseDto = _classThis);
})();
exports.CreateExerciseDto = CreateExerciseDto;
/**
 * DTO для обновления упражнения
 */
let UpdateExerciseDto = (() => {
  let _classDecorators = [(0, routing_controllers_openapi_1.OpenAPI)({})];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _name_decorators;
  let _name_initializers = [];
  let _name_extraInitializers = [];
  let _weaponTypeId_decorators;
  let _weaponTypeId_initializers = [];
  let _weaponTypeId_extraInitializers = [];
  let _targetId_decorators;
  let _targetId_initializers = [];
  let _targetId_extraInitializers = [];
  let _shots_decorators;
  let _shots_initializers = [];
  let _shots_extraInitializers = [];
  let _shotsInSeries_decorators;
  let _shotsInSeries_initializers = [];
  let _shotsInSeries_extraInitializers = [];
  let _duration_decorators;
  let _duration_initializers = [];
  let _duration_extraInitializers = [];
  let _description_decorators;
  let _description_initializers = [];
  let _description_extraInitializers = [];
  var UpdateExerciseDto = (_classThis = class {
    constructor() {
      this.name = __runInitializers(this, _name_initializers, void 0);
      this.weaponTypeId =
        (__runInitializers(this, _name_extraInitializers),
        __runInitializers(this, _weaponTypeId_initializers, void 0));
      this.targetId =
        (__runInitializers(this, _weaponTypeId_extraInitializers),
        __runInitializers(this, _targetId_initializers, void 0));
      this.shots =
        (__runInitializers(this, _targetId_extraInitializers),
        __runInitializers(this, _shots_initializers, void 0));
      this.shotsInSeries =
        (__runInitializers(this, _shots_extraInitializers),
        __runInitializers(this, _shotsInSeries_initializers, void 0));
      this.duration =
        (__runInitializers(this, _shotsInSeries_extraInitializers),
        __runInitializers(this, _duration_initializers, void 0));
      this.description =
        (__runInitializers(this, _duration_extraInitializers),
        __runInitializers(this, _description_initializers, void 0));
      __runInitializers(this, _description_extraInitializers);
    }
  });
  __setFunctionName(_classThis, 'UpdateExerciseDto');
  (() => {
    const _metadata =
      typeof Symbol === 'function' && Symbol.metadata
        ? Object.create(null)
        : void 0;
    _name_decorators = [
      (0, class_validator_1.IsString)({
        message: 'Название должно быть строкой',
      }),
      (0, class_validator_1.IsOptional)(),
    ];
    _weaponTypeId_decorators = [
      (0, class_validator_1.IsNumber)(
        {},
        { message: 'ID типа оружия должен быть числом' },
      ),
      (0, class_validator_1.IsOptional)(),
    ];
    _targetId_decorators = [
      (0, class_validator_1.IsNumber)(
        {},
        { message: 'ID мишени должен быть числом' },
      ),
      (0, class_validator_1.IsOptional)(),
    ];
    _shots_decorators = [
      (0, class_validator_1.IsNumber)(
        {},
        { message: 'Количество выстрелов должно быть числом' },
      ),
      (0, class_validator_1.IsOptional)(),
    ];
    _shotsInSeries_decorators = [
      (0, class_validator_1.IsNumber)(
        {},
        { message: 'Количество выстрелов должно быть числом' },
      ),
      (0, class_validator_1.IsOptional)(),
    ];
    _duration_decorators = [
      (0, class_validator_1.IsNumber)(
        {},
        { message: 'Время на серию должно быть числом' },
      ),
      (0, class_validator_1.IsOptional)(),
    ];
    _description_decorators = [
      (0, class_validator_1.IsString)({
        message: 'Описание должно быть строкой',
      }),
      (0, class_validator_1.IsOptional)(),
    ];
    __esDecorate(
      null,
      null,
      _name_decorators,
      {
        kind: 'field',
        name: 'name',
        static: false,
        private: false,
        access: {
          has: obj => 'name' in obj,
          get: obj => obj.name,
          set: (obj, value) => {
            obj.name = value;
          },
        },
        metadata: _metadata,
      },
      _name_initializers,
      _name_extraInitializers,
    );
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
      _shotsInSeries_decorators,
      {
        kind: 'field',
        name: 'shotsInSeries',
        static: false,
        private: false,
        access: {
          has: obj => 'shotsInSeries' in obj,
          get: obj => obj.shotsInSeries,
          set: (obj, value) => {
            obj.shotsInSeries = value;
          },
        },
        metadata: _metadata,
      },
      _shotsInSeries_initializers,
      _shotsInSeries_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _duration_decorators,
      {
        kind: 'field',
        name: 'duration',
        static: false,
        private: false,
        access: {
          has: obj => 'duration' in obj,
          get: obj => obj.duration,
          set: (obj, value) => {
            obj.duration = value;
          },
        },
        metadata: _metadata,
      },
      _duration_initializers,
      _duration_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _description_decorators,
      {
        kind: 'field',
        name: 'description',
        static: false,
        private: false,
        access: {
          has: obj => 'description' in obj,
          get: obj => obj.description,
          set: (obj, value) => {
            obj.description = value;
          },
        },
        metadata: _metadata,
      },
      _description_initializers,
      _description_extraInitializers,
    );
    __esDecorate(
      null,
      (_classDescriptor = { value: _classThis }),
      _classDecorators,
      { kind: 'class', name: _classThis.name, metadata: _metadata },
      null,
      _classExtraInitializers,
    );
    UpdateExerciseDto = _classThis = _classDescriptor.value;
    if (_metadata)
      Object.defineProperty(_classThis, Symbol.metadata, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _metadata,
      });
    __runInitializers(_classThis, _classExtraInitializers);
  })();
  return (UpdateExerciseDto = _classThis);
})();
exports.UpdateExerciseDto = UpdateExerciseDto;
/**
 * DTO для ответа с данными упражнения
 */
let ExerciseDto = (() => {
  let _classDecorators = [(0, routing_controllers_openapi_1.OpenAPI)({})];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  var ExerciseDto = (_classThis = class {});
  __setFunctionName(_classThis, 'ExerciseDto');
  (() => {
    const _metadata =
      typeof Symbol === 'function' && Symbol.metadata
        ? Object.create(null)
        : void 0;
    __esDecorate(
      null,
      (_classDescriptor = { value: _classThis }),
      _classDecorators,
      { kind: 'class', name: _classThis.name, metadata: _metadata },
      null,
      _classExtraInitializers,
    );
    ExerciseDto = _classThis = _classDescriptor.value;
    if (_metadata)
      Object.defineProperty(_classThis, Symbol.metadata, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _metadata,
      });
    __runInitializers(_classThis, _classExtraInitializers);
  })();
  return (ExerciseDto = _classThis);
})();
exports.ExerciseDto = ExerciseDto;
