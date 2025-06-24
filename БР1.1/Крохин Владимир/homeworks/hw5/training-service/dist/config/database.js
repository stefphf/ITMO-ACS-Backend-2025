'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.dataSource = void 0;
const typeorm_1 = require('typeorm');
const settings_1 = __importDefault(require('./settings'));
const training_entity_1 = require('../models/training.entity');
const free_training_entity_1 = require('../models/free-training.entity');
const qualification_training_entity_1 = require('../models/qualification-training.entity');
const series_entity_1 = require('../models/series.entity');
const shot_entity_1 = require('../models/shot.entity');
const athlete_entity_1 = require('../models/athlete.entity');
const coach_entity_1 = require('../models/coach.entity');
exports.dataSource = new typeorm_1.DataSource({
  type: 'postgres',
  host: settings_1.default.DB_HOST,
  port: settings_1.default.DB_PORT,
  username: settings_1.default.DB_USER,
  password: settings_1.default.DB_PASSWORD,
  database: settings_1.default.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [
    training_entity_1.TrainingEntity,
    free_training_entity_1.FreeTrainingEntity,
    qualification_training_entity_1.QualificationTrainingEntity,
    series_entity_1.SeriesEntity,
    shot_entity_1.ShotEntity,
    athlete_entity_1.AthleteEntity,
    coach_entity_1.CoachEntity,
  ],
  subscribers: [],
  migrations: [],
});
