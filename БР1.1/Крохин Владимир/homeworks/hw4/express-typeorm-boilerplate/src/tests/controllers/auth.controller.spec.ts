import { Repository } from 'typeorm';
import { UserEntity } from 'models/user.entity';
import { TestUtils } from 'tests/utils/test-utils';
import { DataSource } from 'typeorm';
import { testDataSourceOptions } from 'config/test-database.config';
import { AuthController } from 'controllers/auth.controller';

describe('AuthController', () => {
    let dataSource: DataSource;
    let repository: Repository<UserEntity>;
    let controller: AuthController;
    let testUser: UserEntity;

    beforeAll(async () => {
        process.env.NODE_ENV = 'test';
        dataSource = new DataSource(testDataSourceOptions);
        await dataSource.initialize();
        repository = dataSource.getRepository(UserEntity);
        controller = new AuthController();
        Object.defineProperty(controller, 'userRepository', { value: repository });
        testUser = await TestUtils.createTestUser(repository);
    });

    afterAll(async () => {
        await dataSource.destroy();
    });

    beforeEach(async () => {
        await TestUtils.clearDatabase(dataSource);
        testUser = await TestUtils.createTestUser(repository);
    });

    describe('login', () => {
        it('должен вернуть токен доступа при правильных учетных данных', async () => {
            const result = await controller.login({
                email: 'test@example.com',
                password: 'password123',
            });
            expect(result).toHaveProperty('accessToken');
            expect(typeof (result as any).accessToken).toBe('string');
        });

        it('должен вернуть ошибку при неправильном пароле', async () => {
            const result = await controller.login({
                email: 'test@example.com',
                password: 'wrongpassword',
            });
            expect(result).toEqual({ message: 'Неверный пароль или email' });
        });

        it('должен вернуть ошибку при несуществующем email', async () => {
            const result = await controller.login({
                email: 'nonexistent@example.com',
                password: 'password123',
            });
            expect(result).toEqual({ message: 'Пользователь не найден' });
        });
    });
});
