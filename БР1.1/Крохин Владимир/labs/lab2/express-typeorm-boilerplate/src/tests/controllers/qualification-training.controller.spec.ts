import { Repository } from 'typeorm';
import { QualificationTrainingEntity } from '../../models/qualification-training.entity';
import { UserEntity } from '../../models/user.entity';
import { ExerciseEntity } from '../../models/exercise.entity';
import { TestUtils } from '../utils/test.utils';
import { DataSource } from 'typeorm';
import { testDataSourceOptions } from '../../config/test-database.config';
import { QualificationTrainingController } from '../../controllers/qualification-training.controller';
import { Request, Response } from 'express';
import { CreateQualificationTrainingDto } from '../../dtos/qualification-training/create-qualification-training.dto';
import { UpdateQualificationTrainingDto } from '../../dtos/qualification-training/update-qualification-training.dto';
import { TrainingEntity } from '../../models/training.entity';
import { SeriesEntity } from '../../models/series.entity';
import { NoteEntity } from '../../models/note.entity';
import { ShotEntity } from '../../models/shot.entity';

describe('QualificationTrainingController', () => {
    let dataSource: DataSource;
    let repository: Repository<QualificationTrainingEntity>;
    let controller: QualificationTrainingController;
    let testUser: UserEntity;
    let testExercise: ExerciseEntity;
    let userRepository: Repository<UserEntity>;
    let exerciseRepository: Repository<ExerciseEntity>;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let qualificationTrainingRepo: Repository<QualificationTrainingEntity>;
    let trainingRepo: Repository<TrainingEntity>;
    let seriesRepo: Repository<SeriesEntity>;
    let noteRepo: Repository<NoteEntity>;
    let shotRepo: Repository<ShotEntity>;

    const createController = (dataSource: DataSource) => {
        return new QualificationTrainingController(dataSource);
    };

    beforeAll(async () => {
        process.env.NODE_ENV = 'test';
        dataSource = new DataSource(testDataSourceOptions);
        await dataSource.initialize();
        repository = dataSource.getRepository(QualificationTrainingEntity);
        userRepository = dataSource.getRepository(UserEntity);
        exerciseRepository = dataSource.getRepository(ExerciseEntity);
        controller = createController(dataSource);
        qualificationTrainingRepo = dataSource.getRepository(
            QualificationTrainingEntity,
        );
        trainingRepo = dataSource.getRepository(TrainingEntity);
        seriesRepo = dataSource.getRepository(SeriesEntity);
        noteRepo = dataSource.getRepository(NoteEntity);
        shotRepo = dataSource.getRepository(ShotEntity);
    });

    afterAll(async () => {
        await dataSource.destroy();
    });

    beforeEach(async () => {
        await TestUtils.clearDatabase(dataSource);
        repository = dataSource.getRepository(QualificationTrainingEntity);
        controller = createController(dataSource);
        userRepository = dataSource.getRepository(UserEntity);
        testUser = await TestUtils.createTestUser(userRepository);
        exerciseRepository = dataSource.getRepository(ExerciseEntity);
        testExercise = await TestUtils.createTestExercise(exerciseRepository);
        mockRequest = {};
        mockResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
    });

    describe('getAll', () => {
        it('должен вернуть пустой массив, если тренировок нет', async () => {
            await controller.getAll(
                mockRequest as Request,
                mockResponse as Response,
            );

            expect(mockResponse.json).toHaveBeenCalledWith([]);
        });

        it('должен вернуть все тренировки', async () => {
            const dto = {
                startTimeStamp: new Date(),
                endTimeStamp: new Date(),
                athleteId: testUser.id,
                exerciseId: testExercise.id,
                series: [],
                notes: [],
            };

            mockRequest.body = dto;
            await controller.create(
                mockRequest as Request,
                mockResponse as Response,
            );
            await controller.getAll(
                mockRequest as Request,
                mockResponse as Response,
            );

            expect(mockResponse.json).toHaveBeenCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({
                        athlete: expect.objectContaining({ id: testUser.id }),
                        exercise: expect.objectContaining({
                            id: testExercise.id,
                        }),
                    }),
                ]),
            );
        });
    });

    describe('create', () => {
        it('должен создать новую квалификационную тренировку', async () => {
            const dto: CreateQualificationTrainingDto = {
                athleteId: testUser.id,
                exerciseId: testExercise.id,
                startTimeStamp: new Date(),
                endTimeStamp: new Date(),
            };

            mockRequest.body = dto;

            await controller.create(
                mockRequest as Request,
                mockResponse as Response,
            );

            expect(mockResponse.json).toHaveBeenCalled();
            const created = (mockResponse.json as jest.Mock).mock.calls[0][0];
            expect(created).toHaveProperty('id');
            expect(created.athlete).toHaveProperty('id', testUser.id);
            expect(created.exercise).toHaveProperty('id', testExercise.id);
        });
    });

    describe('getById', () => {
        it('должен вернуть квалификационную тренировку по id', async () => {
            // Сначала создаем тренировку
            const createDto: CreateQualificationTrainingDto = {
                athleteId: testUser.id,
                exerciseId: testExercise.id,
                startTimeStamp: new Date(),
                endTimeStamp: new Date(),
            };

            mockRequest.body = createDto;
            await controller.create(
                mockRequest as Request,
                mockResponse as Response,
            );
            const created = (mockResponse.json as jest.Mock).mock.calls[0][0];

            // Теперь получаем её по id
            mockRequest.params = { id: created.id.toString() };
            await controller.getById(
                mockRequest as Request,
                mockResponse as Response,
            );

            expect(mockResponse.json).toHaveBeenCalled();
            const result = (mockResponse.json as jest.Mock).mock.calls[0][0];
            expect(result).toHaveProperty('id', created.id);
        });

        it('должен вернуть 404, если квалификационная тренировка не найдена', async () => {
            mockRequest.params = { id: '999' };
            await controller.getById(
                mockRequest as Request,
                mockResponse as Response,
            );

            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Квалификационная тренировка не найдена',
            });
        });
    });

    describe('update', () => {
        it('должен обновить квалификационную тренировку', async () => {
            // Сначала создаем тренировку
            const createDto: CreateQualificationTrainingDto = {
                athleteId: testUser.id,
                exerciseId: testExercise.id,
                startTimeStamp: new Date(),
                endTimeStamp: new Date(),
            };

            mockRequest.body = createDto;
            await controller.create(
                mockRequest as Request,
                mockResponse as Response,
            );
            const created = (mockResponse.json as jest.Mock).mock.calls[0][0];

            // Теперь обновляем её
            const updateDto: UpdateQualificationTrainingDto = {
                athleteId: testUser.id,
                exerciseId: testExercise.id,
            };

            mockRequest.params = { id: created.id.toString() };
            mockRequest.body = updateDto;
            await controller.update(
                mockRequest as Request,
                mockResponse as Response,
            );

            expect(mockResponse.json).toHaveBeenCalled();
            const result = (mockResponse.json as jest.Mock).mock.calls[0][0];
            expect(result.athlete).toHaveProperty('id', testUser.id);
            expect(result.exercise).toHaveProperty('id', testExercise.id);
        });

        it('должен вернуть 404, если квалификационная тренировка не найдена', async () => {
            mockRequest.params = { id: '999' };
            mockRequest.body = {};
            await controller.update(
                mockRequest as Request,
                mockResponse as Response,
            );

            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Квалификационная тренировка не найдена',
            });
        });
    });

    describe('delete', () => {
        it('should delete a qualification training', async () => {
            const request = { params: { id: '1' } } as any;
            const response = {
                send: jest.fn(),
                status: jest.fn().mockReturnThis(),
            } as any;

            await controller.delete(request, response);

            expect(qualificationTrainingRepo.delete).toHaveBeenCalledWith(1);
            expect(response.status).toHaveBeenCalledWith(204);
            expect(response.send).toHaveBeenCalled();
        });
    });

    describe('addSeries', () => {
        it('should add a series to a qualification training', async () => {
            const mockTraining = { id: 1, training_id: 2 };
            const mockBaseTraining = { id: 2, series: [] };
            (qualificationTrainingRepo.findOne as jest.Mock).mockResolvedValue(
                mockTraining,
            );
            (trainingRepo.findOne as jest.Mock).mockResolvedValue(
                mockBaseTraining,
            );
            (seriesRepo.create as jest.Mock).mockReturnValue({ id: 3 });
            (seriesRepo.save as jest.Mock).mockResolvedValue({ id: 3 });

            const request = {
                params: { id: '1' },
                body: { name: 'New Series' },
            } as any;
            const response = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            } as any;

            await controller.addSeries(request, response);

            expect(qualificationTrainingRepo.findOne).toHaveBeenCalledWith({
                where: { id: 1 },
            });
            expect(trainingRepo.findOne).toHaveBeenCalledWith({
                where: { id: 2 },
                relations: ['series'],
            });
            expect(seriesRepo.create).toHaveBeenCalledWith({
                name: 'New Series',
                training: { id: 2 },
                training_id: 2,
            });
            expect(seriesRepo.save).toHaveBeenCalled();
            expect(response.status).toHaveBeenCalledWith(201);
            expect(response.json).toHaveBeenCalledWith(mockBaseTraining);
        });

        it('should return 404 if training not found', async () => {
            (qualificationTrainingRepo.findOne as jest.Mock).mockResolvedValue(
                null,
            );

            const request = {
                params: { id: '1' },
                body: { name: 'New Series' },
            } as any;
            const response = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            } as any;

            await controller.addSeries(request, response);

            expect(response.status).toHaveBeenCalledWith(404);
            expect(response.json).toHaveBeenCalledWith({
                message: 'Квалификационная тренировка не найдена',
            });
        });
    });

    describe('addShot', () => {
        it('should add a shot to a series', async () => {
            const mockTraining = { id: 1, training_id: 2 };
            const mockBaseTraining = { id: 2, series: [{ id: 3 }] };
            (qualificationTrainingRepo.findOne as jest.Mock).mockResolvedValue(
                mockTraining,
            );
            (trainingRepo.findOne as jest.Mock).mockResolvedValue(
                mockBaseTraining,
            );
            (shotRepo.create as jest.Mock).mockReturnValue({ id: 4 });
            (shotRepo.save as jest.Mock).mockResolvedValue({ id: 4 });

            const request = {
                params: { id: '1', seriesId: '3' },
                body: { x: 10, y: 20 },
            } as any;
            const response = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            } as any;

            await controller.addShot(request, response);

            expect(qualificationTrainingRepo.findOne).toHaveBeenCalledWith({
                where: { id: 1 },
            });
            expect(trainingRepo.findOne).toHaveBeenCalledWith({
                where: { id: 2 },
                relations: ['series'],
            });
            expect(shotRepo.create).toHaveBeenCalledWith({
                x: 10,
                y: 20,
                series: { id: 3 },
                series_id: 3,
            });
            expect(shotRepo.save).toHaveBeenCalled();
            expect(response.status).toHaveBeenCalledWith(201);
            expect(response.json).toHaveBeenCalledWith(mockBaseTraining);
        });

        it('should return 404 if training not found', async () => {
            (qualificationTrainingRepo.findOne as jest.Mock).mockResolvedValue(
                null,
            );

            const request = {
                params: { id: '1', seriesId: '3' },
                body: { x: 10, y: 20 },
            } as any;
            const response = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            } as any;

            await controller.addShot(request, response);

            expect(response.status).toHaveBeenCalledWith(404);
            expect(response.json).toHaveBeenCalledWith({
                message: 'Квалификационная тренировка не найдена',
            });
        });
    });

    describe('addNote', () => {
        it('should add a note to a qualification training', async () => {
            const mockTraining = { id: 1, training_id: 2 };
            const mockBaseTraining = { id: 2, notes: [] };
            (qualificationTrainingRepo.findOne as jest.Mock).mockResolvedValue(
                mockTraining,
            );
            (trainingRepo.findOne as jest.Mock).mockResolvedValue(
                mockBaseTraining,
            );
            (noteRepo.create as jest.Mock).mockReturnValue({ id: 3 });
            (noteRepo.save as jest.Mock).mockResolvedValue({ id: 3 });

            const request = {
                params: { id: '1' },
                body: { content: 'New Note' },
            } as any;
            const response = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            } as any;

            await controller.addNote(request, response);

            expect(qualificationTrainingRepo.findOne).toHaveBeenCalledWith({
                where: { id: 1 },
            });
            expect(trainingRepo.findOne).toHaveBeenCalledWith({
                where: { id: 2 },
                relations: ['notes'],
            });
            expect(noteRepo.create).toHaveBeenCalledWith({
                content: 'New Note',
                training: { id: 2 },
                training_id: 2,
            });
            expect(noteRepo.save).toHaveBeenCalled();
            expect(response.status).toHaveBeenCalledWith(201);
            expect(response.json).toHaveBeenCalledWith(mockBaseTraining);
        });

        it('should return 404 if training not found', async () => {
            (qualificationTrainingRepo.findOne as jest.Mock).mockResolvedValue(
                null,
            );

            const request = {
                params: { id: '1' },
                body: { content: 'New Note' },
            } as any;
            const response = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            } as any;

            await controller.addNote(request, response);

            expect(response.status).toHaveBeenCalledWith(404);
            expect(response.json).toHaveBeenCalledWith({
                message: 'Квалификационная тренировка не найдена',
            });
        });
    });

    describe('addSeriesNote', () => {
        it('should add a note to a series', async () => {
            const mockTraining = { id: 1, training_id: 2 };
            const mockBaseTraining = { id: 2, series: [{ id: 3 }] };
            (qualificationTrainingRepo.findOne as jest.Mock).mockResolvedValue(
                mockTraining,
            );
            (trainingRepo.findOne as jest.Mock).mockResolvedValue(
                mockBaseTraining,
            );
            (noteRepo.create as jest.Mock).mockReturnValue({ id: 4 });
            (noteRepo.save as jest.Mock).mockResolvedValue({ id: 4 });

            const request = {
                params: { id: '1', seriesId: '3' },
                body: { content: 'New Series Note' },
            } as any;
            const response = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            } as any;

            await controller.addSeriesNote(request, response);

            expect(qualificationTrainingRepo.findOne).toHaveBeenCalledWith({
                where: { id: 1 },
            });
            expect(trainingRepo.findOne).toHaveBeenCalledWith({
                where: { id: 2 },
                relations: ['series'],
            });
            expect(noteRepo.create).toHaveBeenCalledWith({
                content: 'New Series Note',
            });
            expect(noteRepo.save).toHaveBeenCalled();
            expect(response.status).toHaveBeenCalledWith(201);
            expect(response.json).toHaveBeenCalledWith(mockBaseTraining);
        });

        it('should return 404 if training not found', async () => {
            (qualificationTrainingRepo.findOne as jest.Mock).mockResolvedValue(
                null,
            );

            const request = {
                params: { id: '1', seriesId: '3' },
                body: { content: 'New Series Note' },
            } as any;
            const response = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            } as any;

            await controller.addSeriesNote(request, response);

            expect(response.status).toHaveBeenCalledWith(404);
            expect(response.json).toHaveBeenCalledWith({
                message: 'Квалификационная тренировка не найдена',
            });
        });
    });
});
