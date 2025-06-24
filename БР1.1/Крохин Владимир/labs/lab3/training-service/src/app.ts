import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { useExpressServer } from 'routing-controllers';
import SETTINGS from './config/settings';
import { dataSource } from './config/database';
import { routingControllersOptions } from './config/routing-controllers';
import swaggerUi from 'swagger-ui-express';
import { useSwagger } from './config/swagger';
import { metricsMiddleware, metricsEndpoint } from './config/prometheus';
import { HealthController } from './controllers/health.controller';
import { AthleteController } from './controllers/athlete.controller';
import { CoachController } from './controllers/coach.controller';
import { FreeTrainingController } from './controllers/free-training.controller';
import { QualificationTrainingController } from './controllers/qualification-training.controller';
import { SeriesController } from './controllers/series.controller';
import { ShotController } from './controllers/shot.controller';
import { TrainingController } from './controllers/training.controller';

const app = express();

// Логирование всех запросов
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

app.use(express.json());
app.use(cors());
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    crossOriginOpenerPolicy: { policy: 'unsafe-none' },
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: false,
  }),
);

// Prometheus metrics
app.use(metricsMiddleware);
app.get('/metrics', metricsEndpoint);

// Настройка контроллеров
const options = {
  controllers: [
    HealthController,
    AthleteController,
    CoachController,
    FreeTrainingController,
    QualificationTrainingController,
    SeriesController,
    ShotController,
    TrainingController,
  ],
  routePrefix: SETTINGS.APP_API_PREFIX,
  classTransformer: true,
  validation: true,
};

// Инициализируем Swagger перед routing-controllers
useSwagger(app, options);
useExpressServer(app, options);

// Инициализация базы данных и запуск сервера
async function startServer() {
  try {
    await dataSource.initialize();
    console.log('Database connection established');

    app.listen(SETTINGS.APP_PORT, SETTINGS.APP_HOST, () => {
      console.log(
        `Server with Prometheus metrics endpoint is running on http://${SETTINGS.APP_HOST}:${SETTINGS.APP_PORT}`,
      );
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

startServer();

export default app;
