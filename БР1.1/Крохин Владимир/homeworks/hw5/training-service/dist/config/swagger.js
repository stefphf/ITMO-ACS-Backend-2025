'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.useSwagger = void 0;
const routing_controllers_openapi_1 = require('routing-controllers-openapi');
const routing_controllers_1 = require('routing-controllers');
const swagger_ui_express_1 = __importDefault(require('swagger-ui-express'));
const class_validator_jsonschema_1 = require('class-validator-jsonschema');
const useSwagger = (app, options) => {
  const schemas = (0,
  class_validator_jsonschema_1.validationMetadatasToSchemas)({
    refPointerPrefix: '#/components/schemas/',
  });
  const spec = (0, routing_controllers_openapi_1.routingControllersToSpec)(
    (0, routing_controllers_1.getMetadataArgsStorage)(),
    options,
    {
      components: {
        schemas,
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      info: {
        title: 'Training Service API',
        version: '1.0.0',
        description: 'API documentation for Training Service',
      },
    },
  );
  // Настройка Swagger UI с явным указанием пути для swagger.json
  app.use(
    '/api-docs/',
    swagger_ui_express_1.default.serve,
    swagger_ui_express_1.default.setup(spec, {
      swaggerOptions: {
        url: '/api-docs/swagger.json',
        persistAuthorization: true,
      },
    }),
  );
  // Добавляем маршрут для получения swagger.json
  app.get('/api-docs/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json(spec);
  });
  return app;
};
exports.useSwagger = useSwagger;
