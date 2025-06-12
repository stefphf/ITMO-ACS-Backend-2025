import { DataSource } from 'typeorm';
import { QualificationTrainingController } from 'controllers/qualification-training.controller';
import { TestUtils } from 'tests/utils/test-utils';
import {
    CreateQualificationTrainingDto,
    UpdateQualificationTrainingDto,
} from 'dtos/training.dto';
import { testDataSourceOptions } from 'config/test-database.config';

describe('QualificationTrainingController', () => {
    let dataSource: DataSource;
    let controller: QualificationTrainingController;

    beforeAll(async () => {
        dataSource = new DataSource(testDataSourceOptions);
        await dataSource.initialize();
        controller = new QualificationTrainingController(dataSource);
    });

    afterAll(async () => {
        await dataSource.destroy();
    });

    beforeEach(async () => {
        await TestUtils.clearDatabase(dataSource);
    });

    it('должен создать и получить квалификационную тренировку', async () => {
        const userRepo = dataSource.getRepository('users');
        const athleteRepo = dataSource.getRepository('athletes');
        
        const user = await userRepo.save({
            email: 'athlete_qual@test.com',
            username: 'athlete_qual',
            password_hash: 'hash',
            first_name: 'Test',
            last_name: 'Athlete'
        });
        
        const athlete = await athleteRepo.save({
            user_id: user.id
        });
        
        const exerciseRepo = dataSource.getRepository('exercises');
        const exercise = await exerciseRepo.save({
            name: 'Test Exercise',
            description: 'Test exercise description',
            shots_in_series: 10
        });
        
        const dto: CreateQualificationTrainingDto = {
            athleteId: athlete.id,
            exerciseId: exercise.id,
            startTimeStamp: new Date()
        };
        
        const created = await controller.create(dto);
        const createdEntity = Array.isArray(created) ? created[0] : created;
        expect(createdEntity).toHaveProperty('id');
        const fetched = await controller.getById(createdEntity.id);
        if (Array.isArray(fetched)) {
            expect(fetched[0].id).toBe(createdEntity.id);
        } else if ('id' in fetched) {
            expect(fetched.id).toBe(createdEntity.id);
        } else {
            throw new Error('Тренировка не найдена: ' + JSON.stringify(fetched));
        }
    });

    it('должен обновить квалификационную тренировку', async () => {
        const userRepo = dataSource.getRepository('users');
        const athleteRepo = dataSource.getRepository('athletes');
        
        const user1 = await userRepo.save({
            email: 'athlete_qual1@test.com',
            username: 'athlete_qual1',
            password_hash: 'hash',
            first_name: 'Test',
            last_name: 'Athlete1'
        });
        
        const user2 = await userRepo.save({
            email: 'athlete_qual2@test.com',
            username: 'athlete_qual2',
            password_hash: 'hash',
            first_name: 'Test',
            last_name: 'Athlete2'
        });
        
        const athlete1 = await athleteRepo.save({
            user_id: user1.id
        });
        
        const athlete2 = await athleteRepo.save({
            user_id: user2.id
        });
        
        const exerciseRepo = dataSource.getRepository('exercises');
        const exercise = await exerciseRepo.save({
            name: 'Test Exercise Update',
            description: 'Test exercise description',
            shots_in_series: 10
        });
        
        const dto: CreateQualificationTrainingDto = {
            athleteId: athlete1.id,
            exerciseId: exercise.id,
            startTimeStamp: new Date()
        };
        
        const created = await controller.create(dto);
        const createdEntity = Array.isArray(created) ? created[0] : created;
        const updated = await controller.update(createdEntity.id, {
            athleteId: athlete2.id,
            id: createdEntity.id,
        } as UpdateQualificationTrainingDto);
        
        if (Array.isArray(updated)) {
            expect(updated[0].athleteId).toBe(athlete2.id);
        } else if ('athleteId' in updated) {
            expect(updated.athleteId).toBe(athlete2.id);
        } else {
            throw new Error('Тренировка не найдена: ' + JSON.stringify(updated));
        }
    });

    it('должен удалить квалификационную тренировку', async () => {
        const userRepo = dataSource.getRepository('users');
        const athleteRepo = dataSource.getRepository('athletes');
        
        const user = await userRepo.save({
            email: 'athlete_qual_delete@test.com',
            username: 'athlete_qual_delete',
            password_hash: 'hash',
            first_name: 'Test',
            last_name: 'Athlete'
        });
        
        const athlete = await athleteRepo.save({
            user_id: user.id
        });
        
        const exerciseRepo = dataSource.getRepository('exercises');
        const exercise = await exerciseRepo.save({
            name: 'Test Exercise Delete',
            description: 'Test exercise description',
            shots_in_series: 10
        });
        
        const dto: CreateQualificationTrainingDto = {
            athleteId: athlete.id,
            exerciseId: exercise.id,
            startTimeStamp: new Date()
        };
        
        const created = await controller.create(dto);
        const createdEntity = Array.isArray(created) ? created[0] : created;
        await controller.delete(createdEntity.id);
        await expect(controller.getById(createdEntity.id)).resolves.toMatchObject({ message: expect.any(String) });
    });
});
