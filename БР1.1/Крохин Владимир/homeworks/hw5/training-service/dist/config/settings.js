'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const dotenv_1 = __importDefault(require('dotenv'));
const path_1 = __importDefault(require('path'));
// Загружаем переменные окружения из файла .env
dotenv_1.default.config({
  path: path_1.default.resolve(__dirname, '../../.env'),
});
/**
 * Класс с настройками приложения
 */
class Settings {
  constructor() {
    // Настройки приложения
    this.APP_HOST = process.env.APP_HOST || '0.0.0.0';
    this.APP_PORT = parseInt(process.env.APP_PORT || '8002');
    this.APP_PROTOCOL = process.env.APP_PROTOCOL || 'http';
    this.APP_CONTROLLERS_PATH =
      process.env.APP_CONTROLLERS_PATH || '/controllers/*.controller.js';
    this.APP_API_PREFIX = process.env.APP_API_PREFIX || '/api';
    // Настройки базы данных
    this.DB_HOST = process.env.DB_HOST || 'localhost';
    this.DB_PORT = parseInt(process.env.DB_PORT || '5432');
    this.DB_NAME = process.env.DB_NAME || 'maindb';
    this.DB_USER = process.env.DB_USER || 'maindb';
    this.DB_PASSWORD = process.env.DB_PASSWORD || 'maindb';
    this.DB_ENTITIES = process.env.DB_ENTITIES || 'dist/models/*.entity.js';
    this.DB_SUBSCRIBERS =
      process.env.DB_SUBSCRIBERS || 'dist/models/*.subscriber.js';
    // Настройки сервиса аутентификации
    this.AUTH_SERVICE_URL =
      process.env.AUTH_SERVICE_URL || 'http://auth-service:8001';
  }
}
const SETTINGS = new Settings();
exports.default = SETTINGS;
