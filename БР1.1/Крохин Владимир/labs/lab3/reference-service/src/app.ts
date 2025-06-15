import 'reflect-metadata';

import express from 'express';
import cors from 'cors';
import { useExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';
import helmet from 'helmet';

import SETTINGS from './config/settings';
import { dataSource } from './config/database';
import { useSwagger } from './config/swagger';
import { ReferenceController } from './controllers/reference.controller';
import { HealthController } from './controllers/health.controller';
import { metricsMiddleware, metricsEndpoint } from './config/prometheus';

// Используем контейнер TypeDI для инъекции зависимостей
useContainer(Container);

export class App {
  public port: number;
  public host: string;
  public protocol: string;

  private app: any;

  constructor(
    port: number = SETTINGS.APP_PORT,
    host: string = SETTINGS.APP_HOST,
    protocol: string = SETTINGS.APP_PROTOCOL,
  ) {
    this.port = port;
    this.host = host;
    this.protocol = protocol;
    this.app = express();
    this.configureApp();
  }

  /**
   * Настраивает приложение Express
   * @returns Настроенное приложение Express
   */
  private configureApp(): any {
    // Настройка метрик Prometheus
    this.app.use(metricsMiddleware);

    // Middleware
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(express.json());

    // Эндпоинт для метрик Prometheus
    this.app.get('/metrics', metricsEndpoint);

    // Настройка контроллеров
    const options = {
      controllers: [ReferenceController, HealthController],
      routePrefix: SETTINGS.APP_API_PREFIX,
      classTransformer: true,
      validation: true,
    };

    // Инициализируем Swagger перед routing-controllers
    this.app = useSwagger(this.app, options);
    this.app = useExpressServer(this.app, options);

    return this.app;
  }

  /**
   * Запускает сервер
   */
  public async start(): Promise<void> {
    try {
      await dataSource.initialize();
      console.log('Database connection established');

      this.app.listen(this.port, () => {
        console.log(`Server is running on ${this.protocol}://${this.host}:${this.port}`);
      });
    } catch (error) {
      console.error('Error starting server:', error);
      process.exit(1);
    }
  }

  public getApp(): any {
    return this.app;
  }
}

new App().start();

export default App;
