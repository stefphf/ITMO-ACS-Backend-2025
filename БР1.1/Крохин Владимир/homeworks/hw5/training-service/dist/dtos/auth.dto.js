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
exports.SuccessResponseDto =
  exports.ErrorResponseDto =
  exports.RegisterResponseDto =
  exports.LoginResponseDto =
  exports.ChangePasswordDto =
  exports.RegisterDto =
  exports.LoginDto =
    void 0;
const class_validator_1 = require('class-validator');
const routing_controllers_openapi_1 = require('routing-controllers-openapi');
/**
 * DTO для входа в систему
 */
let LoginDto = (() => {
  let _classDecorators = [(0, routing_controllers_openapi_1.OpenAPI)({})];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _email_decorators;
  let _email_initializers = [];
  let _email_extraInitializers = [];
  let _password_decorators;
  let _password_initializers = [];
  let _password_extraInitializers = [];
  var LoginDto = (_classThis = class {
    constructor(email = '', password = '') {
      this.email = __runInitializers(this, _email_initializers, void 0);
      this.password =
        (__runInitializers(this, _email_extraInitializers),
        __runInitializers(this, _password_initializers, void 0));
      __runInitializers(this, _password_extraInitializers);
      this.email = email;
      this.password = password;
    }
  });
  __setFunctionName(_classThis, 'LoginDto');
  (() => {
    const _metadata =
      typeof Symbol === 'function' && Symbol.metadata
        ? Object.create(null)
        : void 0;
    _email_decorators = [
      (0, class_validator_1.IsEmail)(
        {},
        { message: 'Некорректный формат email' },
      ),
      (0, class_validator_1.IsNotEmpty)({ message: 'Email обязателен' }),
    ];
    _password_decorators = [
      (0, class_validator_1.IsString)({
        message: 'Пароль должен быть строкой',
      }),
      (0, class_validator_1.IsNotEmpty)({ message: 'Пароль обязателен' }),
    ];
    __esDecorate(
      null,
      null,
      _email_decorators,
      {
        kind: 'field',
        name: 'email',
        static: false,
        private: false,
        access: {
          has: obj => 'email' in obj,
          get: obj => obj.email,
          set: (obj, value) => {
            obj.email = value;
          },
        },
        metadata: _metadata,
      },
      _email_initializers,
      _email_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _password_decorators,
      {
        kind: 'field',
        name: 'password',
        static: false,
        private: false,
        access: {
          has: obj => 'password' in obj,
          get: obj => obj.password,
          set: (obj, value) => {
            obj.password = value;
          },
        },
        metadata: _metadata,
      },
      _password_initializers,
      _password_extraInitializers,
    );
    __esDecorate(
      null,
      (_classDescriptor = { value: _classThis }),
      _classDecorators,
      { kind: 'class', name: _classThis.name, metadata: _metadata },
      null,
      _classExtraInitializers,
    );
    LoginDto = _classThis = _classDescriptor.value;
    if (_metadata)
      Object.defineProperty(_classThis, Symbol.metadata, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _metadata,
      });
    __runInitializers(_classThis, _classExtraInitializers);
  })();
  return (LoginDto = _classThis);
})();
exports.LoginDto = LoginDto;
/**
 * DTO для регистрации
 */
let RegisterDto = (() => {
  let _classDecorators = [(0, routing_controllers_openapi_1.OpenAPI)({})];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _email_decorators;
  let _email_initializers = [];
  let _email_extraInitializers = [];
  let _username_decorators;
  let _username_initializers = [];
  let _username_extraInitializers = [];
  let _password_decorators;
  let _password_initializers = [];
  let _password_extraInitializers = [];
  let _firstName_decorators;
  let _firstName_initializers = [];
  let _firstName_extraInitializers = [];
  let _lastName_decorators;
  let _lastName_initializers = [];
  let _lastName_extraInitializers = [];
  var RegisterDto = (_classThis = class {
    constructor(email = '', username = '', password = '', firstName, lastName) {
      this.email = __runInitializers(this, _email_initializers, void 0);
      this.username =
        (__runInitializers(this, _email_extraInitializers),
        __runInitializers(this, _username_initializers, void 0));
      this.password =
        (__runInitializers(this, _username_extraInitializers),
        __runInitializers(this, _password_initializers, void 0));
      this.firstName =
        (__runInitializers(this, _password_extraInitializers),
        __runInitializers(this, _firstName_initializers, void 0));
      this.lastName =
        (__runInitializers(this, _firstName_extraInitializers),
        __runInitializers(this, _lastName_initializers, void 0));
      __runInitializers(this, _lastName_extraInitializers);
      this.email = email;
      this.username = username;
      this.password = password;
      this.firstName = firstName;
      this.lastName = lastName;
    }
  });
  __setFunctionName(_classThis, 'RegisterDto');
  (() => {
    const _metadata =
      typeof Symbol === 'function' && Symbol.metadata
        ? Object.create(null)
        : void 0;
    _email_decorators = [
      (0, class_validator_1.IsEmail)(
        {},
        { message: 'Некорректный формат email' },
      ),
      (0, class_validator_1.IsNotEmpty)({ message: 'Email обязателен' }),
    ];
    _username_decorators = [
      (0, class_validator_1.IsString)({
        message: 'Имя пользователя должно быть строкой',
      }),
      (0, class_validator_1.IsNotEmpty)({
        message: 'Имя пользователя обязательно',
      }),
    ];
    _password_decorators = [
      (0, class_validator_1.IsString)({
        message: 'Пароль должен быть строкой',
      }),
      (0, class_validator_1.IsNotEmpty)({ message: 'Пароль обязателен' }),
      (0, class_validator_1.MinLength)(6, {
        message: 'Пароль должен содержать минимум 6 символов',
      }),
    ];
    _firstName_decorators = [
      (0, class_validator_1.IsString)({ message: 'Имя должно быть строкой' }),
      (0, class_validator_1.IsOptional)(),
    ];
    _lastName_decorators = [
      (0, class_validator_1.IsString)({
        message: 'Фамилия должна быть строкой',
      }),
      (0, class_validator_1.IsOptional)(),
    ];
    __esDecorate(
      null,
      null,
      _email_decorators,
      {
        kind: 'field',
        name: 'email',
        static: false,
        private: false,
        access: {
          has: obj => 'email' in obj,
          get: obj => obj.email,
          set: (obj, value) => {
            obj.email = value;
          },
        },
        metadata: _metadata,
      },
      _email_initializers,
      _email_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _username_decorators,
      {
        kind: 'field',
        name: 'username',
        static: false,
        private: false,
        access: {
          has: obj => 'username' in obj,
          get: obj => obj.username,
          set: (obj, value) => {
            obj.username = value;
          },
        },
        metadata: _metadata,
      },
      _username_initializers,
      _username_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _password_decorators,
      {
        kind: 'field',
        name: 'password',
        static: false,
        private: false,
        access: {
          has: obj => 'password' in obj,
          get: obj => obj.password,
          set: (obj, value) => {
            obj.password = value;
          },
        },
        metadata: _metadata,
      },
      _password_initializers,
      _password_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _firstName_decorators,
      {
        kind: 'field',
        name: 'firstName',
        static: false,
        private: false,
        access: {
          has: obj => 'firstName' in obj,
          get: obj => obj.firstName,
          set: (obj, value) => {
            obj.firstName = value;
          },
        },
        metadata: _metadata,
      },
      _firstName_initializers,
      _firstName_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _lastName_decorators,
      {
        kind: 'field',
        name: 'lastName',
        static: false,
        private: false,
        access: {
          has: obj => 'lastName' in obj,
          get: obj => obj.lastName,
          set: (obj, value) => {
            obj.lastName = value;
          },
        },
        metadata: _metadata,
      },
      _lastName_initializers,
      _lastName_extraInitializers,
    );
    __esDecorate(
      null,
      (_classDescriptor = { value: _classThis }),
      _classDecorators,
      { kind: 'class', name: _classThis.name, metadata: _metadata },
      null,
      _classExtraInitializers,
    );
    RegisterDto = _classThis = _classDescriptor.value;
    if (_metadata)
      Object.defineProperty(_classThis, Symbol.metadata, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _metadata,
      });
    __runInitializers(_classThis, _classExtraInitializers);
  })();
  return (RegisterDto = _classThis);
})();
exports.RegisterDto = RegisterDto;
/**
 * DTO для изменения пароля
 */
let ChangePasswordDto = (() => {
  let _classDecorators = [(0, routing_controllers_openapi_1.OpenAPI)({})];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _currentPassword_decorators;
  let _currentPassword_initializers = [];
  let _currentPassword_extraInitializers = [];
  let _newPassword_decorators;
  let _newPassword_initializers = [];
  let _newPassword_extraInitializers = [];
  var ChangePasswordDto = (_classThis = class {
    constructor(currentPassword = '', newPassword = '') {
      this.currentPassword = __runInitializers(
        this,
        _currentPassword_initializers,
        void 0,
      );
      this.newPassword =
        (__runInitializers(this, _currentPassword_extraInitializers),
        __runInitializers(this, _newPassword_initializers, void 0));
      __runInitializers(this, _newPassword_extraInitializers);
      this.currentPassword = currentPassword;
      this.newPassword = newPassword;
    }
  });
  __setFunctionName(_classThis, 'ChangePasswordDto');
  (() => {
    const _metadata =
      typeof Symbol === 'function' && Symbol.metadata
        ? Object.create(null)
        : void 0;
    _currentPassword_decorators = [
      (0, class_validator_1.IsString)({
        message: 'Текущий пароль должен быть строкой',
      }),
      (0, class_validator_1.IsNotEmpty)({
        message: 'Текущий пароль обязателен',
      }),
    ];
    _newPassword_decorators = [
      (0, class_validator_1.IsString)({
        message: 'Новый пароль должен быть строкой',
      }),
      (0, class_validator_1.IsNotEmpty)({ message: 'Новый пароль обязателен' }),
      (0, class_validator_1.MinLength)(6, {
        message: 'Новый пароль должен содержать минимум 6 символов',
      }),
    ];
    __esDecorate(
      null,
      null,
      _currentPassword_decorators,
      {
        kind: 'field',
        name: 'currentPassword',
        static: false,
        private: false,
        access: {
          has: obj => 'currentPassword' in obj,
          get: obj => obj.currentPassword,
          set: (obj, value) => {
            obj.currentPassword = value;
          },
        },
        metadata: _metadata,
      },
      _currentPassword_initializers,
      _currentPassword_extraInitializers,
    );
    __esDecorate(
      null,
      null,
      _newPassword_decorators,
      {
        kind: 'field',
        name: 'newPassword',
        static: false,
        private: false,
        access: {
          has: obj => 'newPassword' in obj,
          get: obj => obj.newPassword,
          set: (obj, value) => {
            obj.newPassword = value;
          },
        },
        metadata: _metadata,
      },
      _newPassword_initializers,
      _newPassword_extraInitializers,
    );
    __esDecorate(
      null,
      (_classDescriptor = { value: _classThis }),
      _classDecorators,
      { kind: 'class', name: _classThis.name, metadata: _metadata },
      null,
      _classExtraInitializers,
    );
    ChangePasswordDto = _classThis = _classDescriptor.value;
    if (_metadata)
      Object.defineProperty(_classThis, Symbol.metadata, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _metadata,
      });
    __runInitializers(_classThis, _classExtraInitializers);
  })();
  return (ChangePasswordDto = _classThis);
})();
exports.ChangePasswordDto = ChangePasswordDto;
/**
 * DTO для ответа при входе
 */
let LoginResponseDto = (() => {
  let _classDecorators = [(0, routing_controllers_openapi_1.OpenAPI)({})];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  var LoginResponseDto = (_classThis = class {
    constructor(accessToken = '') {
      this.accessToken = accessToken;
    }
  });
  __setFunctionName(_classThis, 'LoginResponseDto');
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
    LoginResponseDto = _classThis = _classDescriptor.value;
    if (_metadata)
      Object.defineProperty(_classThis, Symbol.metadata, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _metadata,
      });
    __runInitializers(_classThis, _classExtraInitializers);
  })();
  return (LoginResponseDto = _classThis);
})();
exports.LoginResponseDto = LoginResponseDto;
/**
 * DTO для ответа при регистрации
 */
let RegisterResponseDto = (() => {
  let _classDecorators = [(0, routing_controllers_openapi_1.OpenAPI)({})];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  var RegisterResponseDto = (_classThis = class {});
  __setFunctionName(_classThis, 'RegisterResponseDto');
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
    RegisterResponseDto = _classThis = _classDescriptor.value;
    if (_metadata)
      Object.defineProperty(_classThis, Symbol.metadata, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _metadata,
      });
    __runInitializers(_classThis, _classExtraInitializers);
  })();
  return (RegisterResponseDto = _classThis);
})();
exports.RegisterResponseDto = RegisterResponseDto;
/**
 * DTO для ответа с ошибкой
 */
let ErrorResponseDto = (() => {
  let _classDecorators = [(0, routing_controllers_openapi_1.OpenAPI)({})];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  var ErrorResponseDto = (_classThis = class {});
  __setFunctionName(_classThis, 'ErrorResponseDto');
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
    ErrorResponseDto = _classThis = _classDescriptor.value;
    if (_metadata)
      Object.defineProperty(_classThis, Symbol.metadata, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _metadata,
      });
    __runInitializers(_classThis, _classExtraInitializers);
  })();
  return (ErrorResponseDto = _classThis);
})();
exports.ErrorResponseDto = ErrorResponseDto;
/**
 * DTO для успешного ответа
 */
let SuccessResponseDto = (() => {
  let _classDecorators = [(0, routing_controllers_openapi_1.OpenAPI)({})];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  var SuccessResponseDto = (_classThis = class {});
  __setFunctionName(_classThis, 'SuccessResponseDto');
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
    SuccessResponseDto = _classThis = _classDescriptor.value;
    if (_metadata)
      Object.defineProperty(_classThis, Symbol.metadata, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _metadata,
      });
    __runInitializers(_classThis, _classExtraInitializers);
  })();
  return (SuccessResponseDto = _classThis);
})();
exports.SuccessResponseDto = SuccessResponseDto;
