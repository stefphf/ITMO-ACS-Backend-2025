import 'dotenv/config'

class Settings {
    DB_HOST = process.env.DB_HOST || 'localhost';
    DB_PORT = parseInt(process.env.DB_PORT ?? '') || 15432;
    DB_NAME = process.env.DB_NAME || 'maindb';
    DB_USER = process.env.DB_USER || 'maindb';
    DB_PASSWORD = process.env.DB_PASSWORD || 'maindb';
}

export const SETTINGS = new Settings();

