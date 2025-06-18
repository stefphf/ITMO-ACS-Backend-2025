'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.App = void 0;
require('reflect-metadata');
const express_1 = __importDefault(require('express'));
const cors_1 = __importDefault(require('cors'));
const helmet_1 = __importDefault(require('helmet'));
const routing_controllers_1 = require('routing-controllers');
const typedi_1 = require('typedi');
const settings_1 = __importDefault(require('./config/settings'));
const database_1 = require('./config/database');
const swagger_1 = require('./config/swagger');
const prometheus_1 = require('./config/prometheus');
const health_controller_1 = require('./controllers/health.controller');
const athlete_controller_1 = require('./controllers/athlete.controller');
const coach_controller_1 = require('./controllers/coach.controller');
const free_training_controller_1 = require('./controllers/free-training.controller');
const qualification_training_controller_1 = require('./controllers/qualification-training.controller');
const series_controller_1 = require('./controllers/series.controller');
const shot_controller_1 = require('./controllers/shot.controller');
const training_controller_1 = require('./controllers/training.controller');
const rabbitmq_service_1 = require('./services/rabbitmq.service');
// Используем контейнер TypeDI для инъекции зависимостей
(0, routing_controllers_1.useContainer)(typedi_1.Container);
class App {
  constructor(
    port = settings_1.default.APP_PORT,
    host = settings_1.default.APP_HOST,
    protocol = settings_1.default.APP_PROTOCOL,
  ) {
    this.port = port;
    this.host = host;
    this.protocol = protocol;
    this.app = (0, express_1.default)();
    this.rabbitMQService = new rabbitmq_service_1.RabbitMQService();
    this.configureApp();
  }
  /**
   * Настраивает приложение Express
   * @returns Настроенное приложение Express
   */
  configureApp() {
    // Настройка метрик Prometheus
    this.app.use(prometheus_1.metricsMiddleware);
    // Middleware
    this.app.use((0, cors_1.default)());
    this.app.use((0, helmet_1.default)());
    this.app.use(express_1.default.json());
    // Эндпоинт для метрик Prometheus
    this.app.get('/metrics', prometheus_1.metricsEndpoint);
    // Настройка контроллеров
    const options = {
      controllers: [
        health_controller_1.HealthController,
        athlete_controller_1.AthleteController,
        coach_controller_1.CoachController,
        free_training_controller_1.FreeTrainingController,
        qualification_training_controller_1.QualificationTrainingController,
        series_controller_1.SeriesController,
        shot_controller_1.ShotController,
        training_controller_1.TrainingController,
      ],
      routePrefix: settings_1.default.APP_API_PREFIX,
      classTransformer: true,
      validation: true,
    };
    (0, swagger_1.useSwagger)(
      this.app,
      Object.assign(Object.assign({}, options), {
        swagger: { path: '/api-docs' },
      }),
    );
    (0, routing_controllers_1.useExpressServer)(this.app, options);
    console.log('Swagger initialized with options:', options);
    return this.app;
  }
  /**
   * Запускает сервер
   */
  start() {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        yield database_1.dataSource.initialize();
        console.log('Database connection established');
        yield this.rabbitMQService.connect();
        console.log('RabbitMQ connection established');
        this.app.listen(this.port, () => {
          console.log(
            `Server is running on ${this.protocol}://${this.host}:${this.port}`,
          );
        });
        // Обработка завершения работы
        process.on('SIGTERM', () =>
          __awaiter(this, void 0, void 0, function* () {
            console.log('SIGTERM received. Closing RabbitMQ connection...');
            yield this.rabbitMQService.close();
            process.exit(0);
          }),
        );
        process.on('SIGINT', () =>
          __awaiter(this, void 0, void 0, function* () {
            console.log('SIGINT received. Closing RabbitMQ connection...');
            yield this.rabbitMQService.close();
            process.exit(0);
          }),
        );
      } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
      }
    });
  }
  getApp() {
    return this.app;
  }
}
exports.App = App;
new App().start();
exports.default = App;
