import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '../../models/user.entity';
import { TestUtils } from '../utils/test-utils';
import authMiddleware, {
    RequestWithUser,
} from '../../middlewares/auth.middleware';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { dataSourceOptions } from '../../config/database.config';
import SETTINGS from '../../config/settings';
import { AthleteEntity } from '../../models/athlete.entity';
import { CoachEntity } from '../../models/coach.entity';
import { TrainingEntity } from '../../models/training.entity';
import { WeaponTypeEntity } from '../../models/weapon-type.entity';
import { TargetEntity } from '../../models/target.entity';
import { ExerciseEntity } from '../../models/exercise.entity';
import { FreeTrainingEntity } from '../../models/free-training.entity';
import { QualificationTrainingEntity } from '../../models/qualification-training.entity';
import { SeriesEntity } from '../../models/series.entity';
import { NoteEntity } from '../../models/note.entity';
import { ShotEntity } from '../../models/shot.entity';
import { SeriesNotesEntity } from '../../models/series-notes.entity';
import { TrainingNotesEntity } from '../../models/training-notes.entity';

describe('AuthMiddleware', () => {
    let dataSource: DataSource;
    let userRepository: Repository<UserEntity>;
    let mockRequest: Partial<Request> & { user?: any };
    let mockResponse: Partial<Response>;
    let nextFunction: NextFunction;

    beforeAll(async () => {
        dataSource = new DataSource({
            type: 'postgres',
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT || '5432', 10),
            username: process.env.DB_USERNAME || 'postgres',
            password: process.env.DB_PASSWORD || 'postgres',
            database: process.env.DB_DATABASE || 'test_db',
            synchronize: true,
            dropSchema: true,
            entities: [
                UserEntity,
                AthleteEntity,
                CoachEntity,
                TrainingEntity,
                WeaponTypeEntity,
                TargetEntity,
                ExerciseEntity,
                SeriesEntity,
                NoteEntity,
                ShotEntity,
                SeriesNotesEntity,
                TrainingNotesEntity,
                FreeTrainingEntity,
                QualificationTrainingEntity,
            ],
        });
        await dataSource.initialize();
        userRepository = dataSource.getRepository(UserEntity);
    });

    beforeEach(() => {
        mockRequest = {
            headers: {},
        };
        mockResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        nextFunction = jest.fn();
    });

    afterEach(async () => {
        await TestUtils.clearDatabase(dataSource);
    });

    afterAll(async () => {
        await dataSource.destroy();
    });

    it('должен пропустить запрос с валидным токеном', async () => {
        const user = await TestUtils.createTestUser(userRepository);
        const token = jwt.sign(
            { user: { id: user.id } },
            SETTINGS.JWT_SECRET_KEY,
            {
                expiresIn: SETTINGS.JWT_ACCESS_TOKEN_LIFETIME,
            },
        );

        mockRequest.headers = {
            authorization: `Bearer ${token}`,
        };

        await authMiddleware(
            mockRequest as RequestWithUser,
            mockResponse as Response,
            nextFunction,
        );

        expect(nextFunction).toHaveBeenCalled();
        expect(mockRequest.user).toBeDefined();
        expect(mockRequest.user.id).toBe(user.id);
    });

    it('должен вернуть 401 без токена', async () => {
        await authMiddleware(
            mockRequest as RequestWithUser,
            mockResponse as Response,
            nextFunction,
        );

        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.send).toHaveBeenCalledWith({
            message: 'Не авторизован: токен не предоставлен',
        });
        expect(nextFunction).not.toHaveBeenCalled();
    });

    it('должен вернуть 403 с невалидным токеном', async () => {
        mockRequest.headers = {
            authorization: 'Bearer invalid-token',
        };

        await authMiddleware(
            mockRequest as RequestWithUser,
            mockResponse as Response,
            nextFunction,
        );

        expect(mockResponse.status).toHaveBeenCalledWith(403);
        expect(mockResponse.send).toHaveBeenCalledWith({
            message: 'Доступ запрещен: токен недействителен или истек',
        });
        expect(nextFunction).not.toHaveBeenCalled();
    });
});
