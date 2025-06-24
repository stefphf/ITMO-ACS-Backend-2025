import 'reflect-metadata';

import express from 'express';
import cors from 'cors';
import { useExpressServer, useContainer, RoutingControllersOptions } from 'routing-controllers';
import { Container } from 'typedi';
import helmet from 'helmet';
import { json } from 'body-parser';
import { AppDataSource } from './config/database';
import { authRouter } from './routes/auth.routes';
import { userRouter } from './routes/user.routes';
import { healthRouter } from './routes/health.routes';

import SETTINGS from './config/settings';
import { useSwagger } from './config/swagger';
import { UserController } from './controllers/user.controller';
import { HealthController } from './controllers/health.controller';
import { AuthController } from './controllers/auth.controller';
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
    this.app.use(json());

    // Эндпоинт для метрик Prometheus
    this.app.get('/metrics', metricsEndpoint);

    // Настройка контроллеров
    const options: RoutingControllersOptions = {
      controllers: [UserController, HealthController, AuthController],
      routePrefix: '/api',
      classTransformer: true,
      validation: true,
    };
    useSwagger(this.app, { ...options, swagger: { path: '/api-docs' } });
    useExpressServer(this.app, options);
    console.log('Swagger initialized with options:', options);

    // this.app.use("/api/auth", authRouter);
    // this.app.use("/api/users", userRouter);
    // this.app.use("/health", healthRouter);

    return this.app;
  }

  /**
   * Запускает сервер
   */
  public async start(): Promise<void> {
    try {
      await AppDataSource.initialize();
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
