import { Router } from 'express';
import { FreeTrainingController } from './controllers/free-training.controller';
import { QualificationTrainingController } from './controllers/qualification-training.controller';
import { AuthController } from './controllers/auth.controller';
import { TargetController } from './controllers/target.controller';
import { ExerciseController } from './controllers/exercise.controller';
import { UserController } from './controllers/user.controller';
import { DataSource } from 'typeorm';
import dataSource from './config/data-source';

const router = Router();

// Инициализация контроллеров
const freeTrainingController = new FreeTrainingController(dataSource);
const qualificationTrainingController = new QualificationTrainingController(
    dataSource,
);
const authController = new AuthController();
const targetController = new TargetController();
const exerciseController = new ExerciseController();
const userController = new UserController();

// Роуты для FreeTrainingController
router.get('/free-trainings', (req, res) =>
    freeTrainingController.getAll(req, res),
);
router.get('/free-trainings/:id', (req, res) =>
    freeTrainingController.getById(req, res),
);
router.post('/free-trainings', (req, res) =>
    freeTrainingController.create(req, res),
);
router.patch('/free-trainings/:id', (req, res) =>
    freeTrainingController.update(req, res),
);
router.delete('/free-trainings/:id', (req, res) =>
    freeTrainingController.delete(req, res),
);
router.post('/free-trainings/:id/series', (req, res) =>
    freeTrainingController.addSeries(req, res),
);
router.delete('/free-trainings/:id/series/:seriesId', (req, res) =>
    freeTrainingController.removeSeries(req, res),
);
router.post('/free-trainings/:id/series/:seriesId/shots', (req, res) =>
    freeTrainingController.addShot(req, res),
);
router.post('/free-trainings/:id/notes', (req, res) =>
    freeTrainingController.addNote(req, res),
);
router.delete('/free-trainings/:id/notes/:noteId', (req, res) =>
    freeTrainingController.removeNote(req, res),
);
router.post('/free-trainings/:id/series/:seriesId/notes', (req, res) =>
    freeTrainingController.addSeriesNote(req, res),
);

// Роуты для QualificationTrainingController
router.get('/qualification-trainings', (req, res) =>
    qualificationTrainingController.getAll(req, res),
);
router.get('/qualification-trainings/:id', (req, res) =>
    qualificationTrainingController.getById(req, res),
);
router.post('/qualification-trainings', (req, res) =>
    qualificationTrainingController.create(req, res),
);
router.patch('/qualification-trainings/:id', (req, res) =>
    qualificationTrainingController.update(req, res),
);
router.delete('/qualification-trainings/:id', (req, res) =>
    qualificationTrainingController.delete(req, res),
);
router.post('/qualification-trainings/:id/series', (req, res) =>
    qualificationTrainingController.addSeries(req, res),
);
router.delete('/qualification-trainings/:id/series/:seriesId', (req, res) =>
    qualificationTrainingController.removeSeries(req, res),
);
router.post('/qualification-trainings/:id/series/:seriesId/shots', (req, res) =>
    qualificationTrainingController.addShot(req, res),
);
router.post('/qualification-trainings/:id/notes', (req, res) =>
    qualificationTrainingController.addNote(req, res),
);
router.delete('/qualification-trainings/:id/notes/:noteId', (req, res) =>
    qualificationTrainingController.removeNote(req, res),
);
router.post('/qualification-trainings/:id/series/:seriesId/notes', (req, res) =>
    qualificationTrainingController.addSeriesNote(req, res),
);

// Роуты для AuthController
router.post('/auth/login', (req, res) => authController.login(req, res));

// Роуты для TargetController
router.get('/targets', (req, res) => targetController.getAll(req, res));
router.post('/targets', (req, res) => targetController.create(req, res));
router.get('/targets/:id', (req, res) => targetController.getById(req, res));
router.patch('/targets/:id', (req, res) => targetController.update(req, res));
router.post('/targets/:id/delete', (req, res) =>
    targetController.delete(req, res),
);

// Роуты для ExerciseController
router.get('/exercises', (req, res) => exerciseController.getAll(req, res));
router.post('/exercises', (req, res) => exerciseController.create(req, res));
router.get('/exercises/:id', (req, res) =>
    exerciseController.getById(req, res),
);
router.patch('/exercises/:id', (req, res) =>
    exerciseController.update(req, res),
);
router.post('/exercises/:id/delete', (req, res) =>
    exerciseController.delete(req, res),
);

// Роуты для UserController
router.get('/users', (req, res) => userController.getAll(req, res));
router.post('/users', (req, res) => userController.create(req, res));
router.get('/users/:id', (req, res) => userController.getById(req, res));
router.patch('/users/:id', (req, res) => userController.update(req, res));
router.post('/users/:id/delete', (req, res) => userController.delete(req, res));
router.get('/users/me', (req, res) => userController.me(req, res));

export default router;
