import { Request, Response, NextFunction } from 'express';
/**
 * Расширение интерфейса Request для включения данных пользователя
 */
interface RequestWithUser extends Request {
  user: any;
}
/**
 * Middleware для проверки аутентификации пользователя
 * @param request Запрос
 * @param response Ответ
 * @param next Функция для перехода к следующему middleware
 * @returns Ответ с ошибкой или переход к следующему middleware
 */
declare const authMiddleware: (
  request: RequestWithUser,
  response: Response,
  next: NextFunction,
) => Promise<Response<any, Record<string, any>> | undefined>;
export { RequestWithUser };
export default authMiddleware;
