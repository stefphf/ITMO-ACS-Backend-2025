import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '../../models/user.entity';
import { NoteEntity } from '../../models/note.entity';
import { TrainingNotesEntity } from '../../models/training-notes.entity';
import bcrypt from 'bcryptjs';

export class TestUtils {
    static async createTestUser(
        userRepository: Repository<UserEntity>,
        overrides: Partial<UserEntity> = {},
    ): Promise<UserEntity> {
        const defaultUser = {
            email: 'test@example.com',
            username: 'testuser',
            password_hash: await bcrypt.hash('password123', 10),
            first_name: 'Test',
            last_name: 'User',
        };

        const user = userRepository.create({
            ...defaultUser,
            ...overrides,
        });

        return userRepository.save(user);
    }

    static async createTestAdmin(
        userRepository: Repository<UserEntity>,
    ): Promise<UserEntity> {
        return this.createTestUser(userRepository, {
            email: 'admin@example.com',
        });
    }

    static async createTestAthlete(
        userRepository: Repository<UserEntity>,
    ): Promise<UserEntity> {
        return this.createTestUser(userRepository, {
            email: 'athlete@example.com',
        });
    }

    static async createTestCoach(
        userRepository: Repository<UserEntity>,
    ): Promise<UserEntity> {
        return this.createTestUser(userRepository, {
            email: 'coach@example.com',
        });
    }

    static async createTestNote(
        noteRepository: Repository<NoteEntity>,
        userId: number,
        trainingId: number,
        content: string = 'Test note content',
    ): Promise<NoteEntity> {
        const note = noteRepository.create({
            user_id: userId,
            training_id: trainingId,
            content,
            created_at: new Date(),
        });

        return noteRepository.save(note);
    }

    static async createTestTrainingNote(
        trainingNotesRepository: Repository<TrainingNotesEntity>,
        noteId: string,
        trainingId: number,
    ): Promise<TrainingNotesEntity> {
        const trainingNote = trainingNotesRepository.create({
            note_id: noteId,
            training_id: trainingId,
        });

        return trainingNotesRepository.save(trainingNote);
    }

    static async clearDatabase(dataSource: DataSource): Promise<void> {
        const entities = dataSource.entityMetadatas;

        // Disable foreign key checks
        await dataSource.query('SET session_replication_role = replica;');

        // Clear tables in reverse order of dependencies
        for (const entity of entities.reverse()) {
            const repository = dataSource.getRepository(entity.name);
            await repository.query(
                `TRUNCATE TABLE "${entity.tableName}" CASCADE;`,
            );
        }

        // Re-enable foreign key checks
        await dataSource.query('SET session_replication_role = DEFAULT;');
    }
}
