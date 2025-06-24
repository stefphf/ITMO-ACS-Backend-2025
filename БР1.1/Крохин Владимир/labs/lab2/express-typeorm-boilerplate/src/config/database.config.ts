import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import path from 'path';

// Load environment variables
config({ path: path.join(__dirname, '../../.env') });

const isTestEnvironment = process.env.NODE_ENV === 'test';

// Import all entities
import { UserEntity } from '../models/user.entity';
import { AthleteEntity } from '../models/athlete.entity';
import { CoachEntity } from '../models/coach.entity';
import { TrainingEntity } from '../models/training.entity';
import { WeaponTypeEntity } from '../models/weapon-type.entity';
import { TargetEntity } from '../models/target.entity';
import { ExerciseEntity } from '../models/exercise.entity';
import { SeriesEntity } from '../models/series.entity';
import { NoteEntity } from '../models/note.entity';
import { ShotEntity } from '../models/shot.entity';
import { SeriesNotesEntity } from '../models/series-notes.entity';
import { TrainingNotesEntity } from '../models/training-notes.entity';
import { FreeTrainingEntity } from '../models/free-training.entity';
import { QualificationTrainingEntity } from '../models/qualification-training.entity';

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: isTestEnvironment
        ? 'test_db'
        : process.env.DB_DATABASE || 'development_db',
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
    migrations: [path.join(__dirname, '../migrations/*{.ts,.js}')],
    synchronize: isTestEnvironment, // Работает только в тестовой среде
    logging: !isTestEnvironment,
    dropSchema: isTestEnvironment, // Сбрасывает схему базы данных в тестовой среде
};

export const AppDataSource = new DataSource(dataSourceOptions);
