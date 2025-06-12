import 'reflect-metadata';

import express from 'express';
import cors from 'cors';
import { useExpressServer } from 'routing-controllers';

import SETTINGS from './config/settings';
import dataSource from './config/data-source';
import { useSwagger } from './swagger';
import { FreeTrainingController } from './controllers/free-training.controller';
import NoteController from './controllers/note.controller';
import { TargetController } from './controllers/target.controller';
import AthleteController from './controllers/athlete.controller';
import CoachController from './controllers/coach.controller';
import { ExerciseController } from './controllers/exercise.controller';
import { QualificationTrainingController } from './controllers/qualification-training.controller';
import { UserController } from './controllers/user.controller';
import { AuthController } from './controllers/auth.controller';
import WeaponTypeController from './controllers/weapon-type.controller';

class App {
    public port: number;
    public host: string;
    public protocol: string;
    public controllersPath: string;

    private app: express.Application;

    constructor(
        port = SETTINGS.APP_PORT,
        host = SETTINGS.APP_HOST,
        protocol = SETTINGS.APP_PROTOCOL,
        controllersPath = SETTINGS.APP_CONTROLLERS_PATH,
    ) {
        this.port = port;
        this.host = host;
        this.protocol = protocol;

        this.controllersPath = controllersPath;

        this.app = this.configureApp();
    }

    private configureApp(): express.Application {
        let app = express();

        // middlewares section
        app.use(cors());
        app.use(express.json());


        const options = {
            routePrefix: SETTINGS.APP_API_PREFIX,
            validation: true,
            classTransformer: true,
            defaultErrorHandler: true,
            controllers: [
                FreeTrainingController,
                NoteController,
                TargetController,
                AthleteController,
                CoachController,
                ExerciseController,
                QualificationTrainingController,
                UserController,
                AuthController,
                WeaponTypeController,
            ],
            defaults: {
                // Добавляем глобальные настройки для авторизации
                nullResultCode: 404,
                undefinedResultCode: 204,
                paramOptions: {
                    required: true
                }
            }
        };

        app = useExpressServer(app, options);
        app = useSwagger(app, options);

        return app;
    }

    public start(): void {
        // establish database connection
        dataSource
            .initialize()
            .then(() => {
                console.log('Data Source has been initialized!');
            })
            .catch((err) => {
                console.error('Error during Data Source initialization:', err);
            });

        this.app.listen(this.port, this.host, () => {
            console.log(
                `Running server on ${this.protocol}://${this.host}:${this.port}`,
            );
        });
    }
}

const app = new App();
app.start();

export default app;
