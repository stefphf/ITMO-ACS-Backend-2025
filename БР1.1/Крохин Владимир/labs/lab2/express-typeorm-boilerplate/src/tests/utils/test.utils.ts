import { Repository, DataSource } from 'typeorm';
import { UserEntity } from '../../models/user.entity';
import { WeaponTypeEntity } from '../../models/weapon-type.entity';
import { TargetEntity } from '../../models/target.entity';
import { ExerciseEntity } from '../../models/exercise.entity';
import bcrypt from 'bcrypt';

export class TestUtils {
    static async createTestUser(
        repository: Repository<UserEntity>,
    ): Promise<UserEntity> {
        const hashedPassword = bcrypt.hashSync('password123', 10);
        const userEntity = repository.create({
            username: 'testuser',
            email: 'test@example.com',
            password_hash: hashedPassword,
            first_name: 'Test',
            second_name: 'User',
        });
        return await repository.save(userEntity);
    }

    static async createTestWeaponType(
        repository: Repository<WeaponTypeEntity>,
    ): Promise<WeaponTypeEntity> {
        const weaponType = repository.create({
            name: 'Test Weapon Type',
            description: 'Test Description',
        });
        return await repository.save(weaponType);
    }

    static async createTestTarget(
        repository: Repository<TargetEntity>,
    ): Promise<TargetEntity> {
        const target = repository.create({
            name: 'Test Target',
            description: 'Test Description',
        });
        return await repository.save(target);
    }

    static async createTestExercise(
        repository: Repository<ExerciseEntity>,
    ): Promise<ExerciseEntity> {
        const exercise = repository.create({
            name: 'Test Exercise',
            description: 'Test Description',
            shots_in_series: 10,
        });
        return await repository.save(exercise);
    }

    static async clearDatabase(dataSource: DataSource) {
        // Disable foreign key checks
        await dataSource.query('SET session_replication_role = replica;');
        // Get all entity metadata
        const entities = dataSource.entityMetadatas;
        // Truncate all tables
        for (const entity of entities) {
            const repository = dataSource.getRepository(entity.name);
            await repository.query(
                `TRUNCATE TABLE "${entity.tableName}" RESTART IDENTITY CASCADE;`,
            );
        }
        // Enable foreign key checks
        await dataSource.query('SET session_replication_role = DEFAULT;');
    }
}
