import express from 'express';
/**
 * Настройка Swagger для документации API
 * @param app Приложение Express
 * @param options Опции для routing-controllers
 * @returns Приложение Express с настроенным Swagger
 */
export declare function useSwagger(
  app: express.Application,
  options: Record<string, unknown>,
): express.Application;
