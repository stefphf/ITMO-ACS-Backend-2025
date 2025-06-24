import { DataSource } from 'typeorm';
import { FreeTrainingController } from 'controllers/free-training.controller';
import { TestUtils } from 'tests/utils/test-utils';
import { CreateFreeTrainingDto, UpdateFreeTrainingDto } from 'dtos/training.dto';
import { testDataSourceOptions } from 'config/test-database.config';

describe('FreeTrainingController', () => {
    let dataSource: DataSource;
    let controller: FreeTrainingController;

    beforeAll(async () => {
        dataSource = new DataSource(testDataSourceOptions);
        await dataSource.initialize();
        controller = new FreeTrainingController(dataSource);
    });

    afterAll(async () => {
        await dataSource.destroy();
    });

    beforeEach(async () => {
        await TestUtils.clearDatabase(dataSource);
    });

    it('должен создать и получить свободную тренировку', async () => {
        const userRepo = dataSource.getRepository('users');
        const athleteRepo = dataSource.getRepository('athletes');
        
        const user = await userRepo.save({
            email: 'athlete@test.com',
            username: 'athlete',
            password_hash: 'hash',
            first_name: 'Test',
            last_name: 'Athlete'
        });
        
        const athlete = await athleteRepo.save({
            user_id: user.id
        });
        
        const weaponTypeRepo = dataSource.getRepository('weapon_types');
        const targetRepo = dataSource.getRepository('targets');
        
        const weaponType = await weaponTypeRepo.save({
            name: 'Test Weapon',
            description: 'Test weapon description'
        });
        
        const target = await targetRepo.save({
            name: 'Test Target',
            description: 'Test target description'
        });
        
        const dto: CreateFreeTrainingDto = {
            athleteId: athlete.id,
            weaponTypeId: weaponType.id,
            targetId: target.id,
            startTimeStamp: new Date()
        };
        
        const created = await controller.create(dto);
        expect(created).toHaveProperty('id');
        const fetched = await controller.getById(created.id);
        expect(fetched.id).toBe(created.id);
    });

    it('должен обновить свободную тренировку', async () => {
        const userRepo = dataSource.getRepository('users');
        const athleteRepo = dataSource.getRepository('athletes');
        
        const user1 = await userRepo.save({
            email: 'athlete1@test.com',
            username: 'athlete1',
            password_hash: 'hash',
            first_name: 'Test',
            last_name: 'Athlete1'
        });
        
        const user2 = await userRepo.save({
            email: 'athlete2@test.com',
            username: 'athlete2',
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
        
        const weaponTypeRepo = dataSource.getRepository('weapon_types');
        const targetRepo = dataSource.getRepository('targets');
        
        const weaponType = await weaponTypeRepo.save({
            name: 'Test Weapon',
            description: 'Test weapon description'
        });
        
        const target = await targetRepo.save({
            name: 'Test Target',
            description: 'Test target description'
        });
        
        const dto: CreateFreeTrainingDto = {
            athleteId: athlete1.id,
            weaponTypeId: weaponType.id,
            targetId: target.id,
            startTimeStamp: new Date()
        };
        
        const created = await controller.create(dto);
        const updateDto: UpdateFreeTrainingDto = { id: created.id, athleteId: athlete2.id };
        const updated = await controller.update(created.id, updateDto);
        expect(updated.athleteId).toBe(2);
    });

    it('должен удалить свободную тренировку', async () => {
        const userRepo = dataSource.getRepository('users');
        const athleteRepo = dataSource.getRepository('athletes');
        
        const user = await userRepo.save({
            email: 'athlete3@test.com',
            username: 'athlete3',
            password_hash: 'hash',
            first_name: 'Test',
            last_name: 'Athlete3'
        });
        
        const athlete = await athleteRepo.save({
            user_id: user.id
        });
        
        const weaponTypeRepo = dataSource.getRepository('weapon_types');
        const targetRepo = dataSource.getRepository('targets');
        
        const weaponType = await weaponTypeRepo.save({
            name: 'Test Weapon Delete',
            description: 'Test weapon description'
        });
        
        const target = await targetRepo.save({
            name: 'Test Target Delete',
            description: 'Test target description'
        });
        
        const dto: CreateFreeTrainingDto = {
            athleteId: athlete.id,
            weaponTypeId: weaponType.id,
            targetId: target.id,
            startTimeStamp: new Date()
        };
        
        const created = await controller.create(dto);
        await controller.delete(created.id);
        await expect(controller.getById(created.id)).rejects.toThrow();
    });
});
