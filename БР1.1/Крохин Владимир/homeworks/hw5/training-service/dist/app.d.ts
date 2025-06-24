import 'reflect-metadata';
export declare class App {
  port: number;
  host: string;
  protocol: string;
  private app;
  private rabbitMQService;
  constructor(port?: number, host?: string, protocol?: string);
  /**
   * Настраивает приложение Express
   * @returns Настроенное приложение Express
   */
  private configureApp;
  /**
   * Запускает сервер
   */
  start(): Promise<void>;
  getApp(): any;
}
export default App;
