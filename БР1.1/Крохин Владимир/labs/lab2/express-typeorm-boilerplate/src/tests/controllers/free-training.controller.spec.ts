import { DataSource, Repository } from 'typeorm';
import { testDataSourceOptions } from '../../config/test-database.config';
import { FreeTrainingController } from '../../controllers/free-training.controller';
import { Request, Response } from 'express';
import { CreateFreeTrainingDto } from '../../dtos/free-training/create-free-training.dto';
import { UpdateFreeTrainingDto } from '../../dtos/free-training/update-free-training.dto';
import { FreeTrainingEntity } from '../../models/free-training.entity';
import { UserEntity } from '../../models/user.entity';
import { WeaponTypeEntity } from '../../models/weapon-type.entity';
import { TargetEntity } from '../../models/target.entity';
import { TestUtils } from '../utils/test.utils';
import { SeriesEntity } from '../../models/series.entity';
import { NoteEntity } from '../../models/note.entity';
import { ShotEntity } from '../../models/shot.entity';
import { SeriesNotesEntity } from '../../models/series-notes.entity';
import { TrainingEntity } from '../../models/training.entity';

const mockFreeTrainingCrudHandler = {
    getAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    addSeries: jest.fn(),
    removeSeries: jest.fn(),
    addNote: jest.fn(),
    removeNote: jest.fn(),
};

describe('FreeTrainingController', () => {
    let controller: FreeTrainingController;
    let dataSource: DataSource;
    let freeTrainingRepo: Repository<FreeTrainingEntity>;
    let trainingRepo: Repository<TrainingEntity>;
    let seriesRepo: Repository<SeriesEntity>;
    let noteRepo: Repository<NoteEntity>;
    let shotRepo: Repository<ShotEntity>;

    beforeEach(() => {
        freeTrainingRepo = {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        } as any;

        trainingRepo = {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
        } as any;

        seriesRepo = {
            create: jest.fn(),
            save: jest.fn(),
        } as any;

        noteRepo = {
            create: jest.fn(),
            save: jest.fn(),
        } as any;

        shotRepo = {
            create: jest.fn(),
            save: jest.fn(),
        } as any;

        dataSource = {
            getRepository: jest.fn((entity) => {
                if (entity === FreeTrainingEntity) return freeTrainingRepo;
                if (entity === TrainingEntity) return trainingRepo;
                if (entity === SeriesEntity) return seriesRepo;
                if (entity === NoteEntity) return noteRepo;
                if (entity === ShotEntity) return shotRepo;
                return null;
            }),
        } as any;

        controller = new FreeTrainingController(dataSource);
    });

    describe('getAll', () => {
        it('should return all free trainings', async () => {
            const mockTrainings = [{ id: 1 }, { id: 2 }];
            (freeTrainingRepo.find as jest.Mock).mockResolvedValue(
                mockTrainings,
            );

            const request = {} as Request;
            const response = {
                json: jest.fn(),
            } as any;

            await controller.getAll(request, response);

            expect(freeTrainingRepo.find).toHaveBeenCalled();
            expect(response.json).toHaveBeenCalledWith(mockTrainings);
        });
    });

    describe('getById', () => {
        it('should return a free training by id', async () => {
            const mockTraining = { id: 1 };
            (freeTrainingRepo.findOne as jest.Mock).mockResolvedValue(
                mockTraining,
            );

            const request = { params: { id: '1' } } as any;
            const response = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            } as any;

            await controller.getById(request, response);

            expect(freeTrainingRepo.findOne).toHaveBeenCalledWith({
                where: { id: 1 },
            });
            expect(response.json).toHaveBeenCalledWith(mockTraining);
        });

        it('should return 404 if training not found', async () => {
            (freeTrainingRepo.findOne as jest.Mock).mockResolvedValue(null);

            const request = { params: { id: '1' } } as any;
            const response = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            } as any;

            await controller.getById(request, response);

            expect(response.status).toHaveBeenCalledWith(404);
            expect(response.json).toHaveBeenCalledWith({
                message: 'Свободная тренировка не найдена',
            });
        });
    });

    describe('create', () => {
        it('should create a new free training', async () => {
            const mockTraining = { id: 1 };
            (freeTrainingRepo.create as jest.Mock).mockReturnValue(
                mockTraining,
            );
            (freeTrainingRepo.save as jest.Mock).mockResolvedValue(
                mockTraining,
            );

            const request = { body: { name: 'Test Training' } } as any;
            const response = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            } as any;

            await controller.create(request, response);

            expect(freeTrainingRepo.create).toHaveBeenCalledWith({
                name: 'Test Training',
            });
            expect(freeTrainingRepo.save).toHaveBeenCalledWith(mockTraining);
            expect(response.status).toHaveBeenCalledWith(201);
            expect(response.json).toHaveBeenCalledWith(mockTraining);
        });
    });

    describe('update', () => {
        it('should update a free training', async () => {
            const mockTraining = { id: 1 };
            (freeTrainingRepo.findOne as jest.Mock).mockResolvedValue(
                mockTraining,
            );

            const request = {
                params: { id: '1' },
                body: { name: 'Updated Training' },
            } as any;
            const response = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            } as any;

            await controller.update(request, response);

            expect(freeTrainingRepo.update).toHaveBeenCalledWith(1, {
                name: 'Updated Training',
            });
            expect(freeTrainingRepo.findOne).toHaveBeenCalledWith({
                where: { id: 1 },
            });
            expect(response.json).toHaveBeenCalledWith(mockTraining);
        });

        it('should return 404 if training not found', async () => {
            (freeTrainingRepo.findOne as jest.Mock).mockResolvedValue(null);

            const request = {
                params: { id: '1' },
                body: { name: 'Updated Training' },
            } as any;
            const response = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            } as any;

            await controller.update(request, response);

            expect(response.status).toHaveBeenCalledWith(404);
            expect(response.json).toHaveBeenCalledWith({
                message: 'Свободная тренировка не найдена',
            });
        });
    });

    describe('delete', () => {
        it('should delete a free training', async () => {
            const request = { params: { id: '1' } } as any;
            const response = {
                send: jest.fn(),
                status: jest.fn().mockReturnThis(),
            } as any;

            await controller.delete(request, response);

            expect(freeTrainingRepo.delete).toHaveBeenCalledWith(1);
            expect(response.status).toHaveBeenCalledWith(204);
            expect(response.send).toHaveBeenCalled();
        });
    });

    describe('addSeries', () => {
        it('should add a series to a free training', async () => {
            const mockTraining = { id: 1, training_id: 2 };
            const mockBaseTraining = { id: 2, series: [] };
            (freeTrainingRepo.findOne as jest.Mock).mockResolvedValue(
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

            expect(freeTrainingRepo.findOne).toHaveBeenCalledWith({
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
            (freeTrainingRepo.findOne as jest.Mock).mockResolvedValue(null);

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
                message: 'Свободная тренировка не найдена',
            });
        });
    });

    describe('addShot', () => {
        it('should add a shot to a series', async () => {
            const mockTraining = { id: 1, training_id: 2 };
            const mockBaseTraining = { id: 2, series: [{ id: 3 }] };
            (freeTrainingRepo.findOne as jest.Mock).mockResolvedValue(
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

            expect(freeTrainingRepo.findOne).toHaveBeenCalledWith({
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
            (freeTrainingRepo.findOne as jest.Mock).mockResolvedValue(null);

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
                message: 'Свободная тренировка не найдена',
            });
        });
    });

    describe('addNote', () => {
        it('should add a note to a free training', async () => {
            const mockTraining = { id: 1, training_id: 2 };
            const mockBaseTraining = { id: 2, notes: [] };
            (freeTrainingRepo.findOne as jest.Mock).mockResolvedValue(
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

            expect(freeTrainingRepo.findOne).toHaveBeenCalledWith({
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
            (freeTrainingRepo.findOne as jest.Mock).mockResolvedValue(null);

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
                message: 'Свободная тренировка не найдена',
            });
        });
    });

    describe('addSeriesNote', () => {
        it('should add a note to a series', async () => {
            const mockTraining = { id: 1, training_id: 2 };
            const mockBaseTraining = { id: 2, series: [{ id: 3 }] };
            (freeTrainingRepo.findOne as jest.Mock).mockResolvedValue(
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

            expect(freeTrainingRepo.findOne).toHaveBeenCalledWith({
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
            (freeTrainingRepo.findOne as jest.Mock).mockResolvedValue(null);

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
                message: 'Свободная тренировка не найдена',
            });
        });
    });
});

describe('FreeTrainingController (unit)', () => {
    let controller: FreeTrainingController;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;

    beforeEach(() => {
        controller = new FreeTrainingController(
            mockFreeTrainingCrudHandler as any,
            { getRepository: jest.fn() } as any,
        );
        mockRequest = {};
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(),
        };
    });

    it('create должен вернуть 201 Created', async () => {
        const dto = { athleteId: 1, weaponTypeId: 1, targetId: 1 };
        const training = { id: 1, ...dto };
        jest.spyOn(mockFreeTrainingCrudHandler, 'create').mockResolvedValue(
            training,
        );

        await controller.create(
            mockRequest as Request,
            mockResponse as Response,
        );

        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith(training);
    });

    it('getById должен вернуть 200 OK', async () => {
        const training = { id: 1, athleteId: 1, weaponTypeId: 1, targetId: 1 };
        jest.spyOn(mockFreeTrainingCrudHandler, 'getById').mockResolvedValue(
            training,
        );

        mockRequest.params = { id: '1' };
        await controller.getById(
            mockRequest as Request,
            mockResponse as Response,
        );

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(training);
    });

    it('update должен вернуть 200 OK', async () => {
        const dto = { athleteId: 2 };
        const training = { id: 1, athleteId: 2, weaponTypeId: 1, targetId: 1 };
        jest.spyOn(mockFreeTrainingCrudHandler, 'update').mockResolvedValue(
            training,
        );

        mockRequest.params = { id: '1' };
        mockRequest.body = dto;
        await controller.update(
            mockRequest as Request,
            mockResponse as Response,
        );

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(training);
    });

    it('delete должен вернуть 204 No Content', async () => {
        jest.spyOn(mockFreeTrainingCrudHandler, 'delete').mockResolvedValue(
            undefined,
        );

        mockRequest.params = { id: '1' };
        await controller.delete(
            mockRequest as Request,
            mockResponse as Response,
        );

        expect(mockResponse.status).toHaveBeenCalledWith(204);
        expect(mockResponse.send).toHaveBeenCalled();
    });

    it('addSeries должен вернуть 201 Created', async () => {
        const seriesDto = { value: 10 };
        const training = {
            id: 1,
            athleteId: 1,
            weaponTypeId: 1,
            targetId: 1,
            series: [seriesDto],
        };
        jest.spyOn(mockFreeTrainingCrudHandler, 'addSeries').mockResolvedValue(
            training,
        );

        mockRequest.params = { id: '1' };
        mockRequest.body = seriesDto;
        await controller.addSeries(
            mockRequest as Request,
            mockResponse as Response,
        );

        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith(training);
    });

    it('removeSeries должен вернуть 204 No Content', async () => {
        jest.spyOn(
            mockFreeTrainingCrudHandler,
            'removeSeries',
        ).mockResolvedValue(undefined);

        mockRequest.params = { id: '1', seriesId: '1' };
        await controller.removeSeries(
            mockRequest as Request,
            mockResponse as Response,
        );

        expect(mockResponse.status).toHaveBeenCalledWith(204);
        expect(mockResponse.send).toHaveBeenCalled();
    });

    it('addNote должен вернуть 201 Created', async () => {
        const noteDto = { text: 'Test note' };
        const training = {
            id: 1,
            athleteId: 1,
            weaponTypeId: 1,
            targetId: 1,
            notes: [noteDto],
        };
        jest.spyOn(mockFreeTrainingCrudHandler, 'addNote').mockResolvedValue(
            training,
        );

        mockRequest.params = { id: '1' };
        mockRequest.body = noteDto;
        await controller.addNote(
            mockRequest as Request,
            mockResponse as Response,
        );

        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith(training);
    });

    it('removeNote должен вернуть 204 No Content', async () => {
        jest.spyOn(mockFreeTrainingCrudHandler, 'removeNote').mockResolvedValue(
            undefined,
        );

        mockRequest.params = { id: '1', noteId: '1' };
        await controller.removeNote(
            mockRequest as Request,
            mockResponse as Response,
        );

        expect(mockResponse.status).toHaveBeenCalledWith(204);
        expect(mockResponse.send).toHaveBeenCalled();
    });
});
