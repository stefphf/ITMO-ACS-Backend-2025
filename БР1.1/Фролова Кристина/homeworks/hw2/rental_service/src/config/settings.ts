import dotenv from 'dotenv';

dotenv.config();

class Settings {
    // application base settings
    APP_HOST: string = process.env.APP_HOST || 'localhost';
    APP_PORT: number = parseInt(process.env.APP_PORT) || 8000;
    APP_PROTOCOL: string = process.env.APP_PROTOCOL || 'http';
    APP_CONTROLLERS_PATH: string =
        process.env.APP_CONTROLLERS_PATH || '/controllers/*.controller.js';
    APP_API_PREFIX: string = process.env.APP_API_PREFIX || '/api';

    // db connection settings
    DB_HOST = process.env.DB_HOST || 'localhost';
    DB_PORT = parseInt(process.env.DB_PORT) || 15432;
    DB_NAME = process.env.DB_NAME || 'maindb';
    DB_USER = process.env.DB_USER || 'maindb';
    DB_PASSWORD = process.env.DB_PASSWORD || 'maindb';
    DB_ENTITIES = process.env.DB_ENTITIES || 'dist/models/*.entity.js';

    // jwt settings
    JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'secret';
    JWT_TOKEN_TYPE = process.env.JWT_SECRET_KEY || 'Bearer';
    JWT_ACCESS_TOKEN_LIFETIME: number =
        parseInt(process.env.JWT_ACCESS_TOKEN_LIFETIME) || 60 * 5;
}

const SETTINGS = new Settings();

export default SETTINGS;