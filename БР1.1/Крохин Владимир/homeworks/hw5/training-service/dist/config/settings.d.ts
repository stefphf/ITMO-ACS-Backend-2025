/**
 * Класс с настройками приложения
 */
declare class Settings {
  APP_HOST: string;
  APP_PORT: number;
  APP_PROTOCOL: string;
  APP_CONTROLLERS_PATH: string;
  APP_API_PREFIX: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_NAME: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_ENTITIES: string;
  DB_SUBSCRIBERS: string;
  AUTH_SERVICE_URL: string;
}
declare const SETTINGS: Settings;
export default SETTINGS;
