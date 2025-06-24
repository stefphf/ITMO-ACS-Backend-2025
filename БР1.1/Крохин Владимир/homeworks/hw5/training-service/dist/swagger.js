'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  (function () {
    var ownKeys = function (o) {
      ownKeys =
        Object.getOwnPropertyNames ||
        function (o) {
          var ar = [];
          for (var k in o)
            if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
          return ar;
        };
      return ownKeys(o);
    };
    return function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null)
        for (var k = ownKeys(mod), i = 0; i < k.length; i++)
          if (k[i] !== 'default') __createBinding(result, mod, k[i]);
      __setModuleDefault(result, mod);
      return result;
    };
  })();
Object.defineProperty(exports, '__esModule', { value: true });
exports.useSwagger = useSwagger;
const routing_controllers_1 = require('routing-controllers');
const routing_controllers_openapi_1 = require('routing-controllers-openapi');
const swaggerUiExpress = __importStar(require('swagger-ui-express'));
/**
 * Настройка Swagger для документации API
 * @param app Приложение Express
 * @param options Опции для routing-controllers
 * @returns Приложение Express с настроенным Swagger
 */
function useSwagger(app, options) {
  const storage = (0, routing_controllers_1.getMetadataArgsStorage)();
  const spec = (0, routing_controllers_openapi_1.routingControllersToSpec)(
    storage,
    options,
    {
      info: {
        title: 'API Сервиса Тренировок',
        version: '1.0.0',
        description:
          'API для сервиса управления тренировками, сериями, спортсменами и тренерами',
      },
    },
  );
  app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(spec));
  return app;
}
