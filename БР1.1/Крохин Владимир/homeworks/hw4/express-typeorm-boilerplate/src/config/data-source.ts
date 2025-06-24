import { DataSource } from 'typeorm';
import SETTINGS from './settings';
import { UserEntity } from '../models/user.entity';
import { AthleteEntity } from '../models/athlete.entity';
import { CoachEntity } from '../models/coach.entity';
import { ExerciseEntity } from '../models/exercise.entity';
import { FreeTrainingEntity } from '../models/free-training.entity';
import { NoteEntity } from '../models/note.entity';
import { QualificationTrainingEntity } from '../models/qualification-training.entity';
import { SeriesEntity } from '../models/series.entity';
import { SeriesNotesEntity } from '../models/series-notes.entity';
import { ShotEntity } from '../models/shot.entity';
import { TargetEntity } from '../models/target.entity';
import { TrainingEntity } from '../models/training.entity';
import { TrainingNotesEntity } from '../models/training-notes.entity';
import { WeaponTypeEntity } from '../models/weapon-type.entity';

const dataSource = new DataSource({
    type: 'postgres',
    host: SETTINGS.DB_HOST,
    port: SETTINGS.DB_PORT,
    username: SETTINGS.DB_USER,
    password: SETTINGS.DB_PASSWORD,
    database: SETTINGS.DB_NAME,
    entities: [
        UserEntity,
        AthleteEntity,
        CoachEntity,
        ExerciseEntity,
        FreeTrainingEntity,
        NoteEntity,
        QualificationTrainingEntity,
        SeriesEntity,
        SeriesNotesEntity,
        ShotEntity,
        TargetEntity,
        TrainingEntity,
        TrainingNotesEntity,
        WeaponTypeEntity
    ],
    subscribers: [SETTINGS.DB_SUBSCRIBERS],
    logging: true,
    synchronize: true,
});

export default dataSource;
