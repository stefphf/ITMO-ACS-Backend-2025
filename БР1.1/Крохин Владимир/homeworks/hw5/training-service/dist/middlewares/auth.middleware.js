'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const axios_1 = __importDefault(require('axios'));
/**
 * Middleware для проверки аутентификации пользователя
 * @param request Запрос
 * @param response Ответ
 * @param next Функция для перехода к следующему middleware
 * @returns Ответ с ошибкой или переход к следующему middleware
 */
const authMiddleware = (request, response, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { headers } = request;
    const { authorization } = headers;
    if (!authorization) {
      return response
        .status(401)
        .send({ message: 'Не авторизован: токен не предоставлен' });
    }
    try {
      const [, accessToken] = authorization.split(' ');
      if (!accessToken) {
        return response
          .status(401)
          .send({ message: 'Не авторизован: токен не предоставлен' });
      }
      // Проверка токена через сервис аутентификации
      const authServiceUrl =
        process.env.AUTH_SERVICE_URL || 'http://auth-service:8001';
      const validateResponse = yield axios_1.default.post(
        `${authServiceUrl}/api/auth/validate-token`,
        {
          token: accessToken,
        },
      );
      if (!validateResponse.data.valid) {
        return response.status(403).send({
          message: 'Доступ запрещен: токен недействителен или истек',
        });
      }
      // Устанавливаем ID пользователя из ответа сервиса аутентификации
      request.user = { id: validateResponse.data.userId };
      next();
    } catch (error) {
      console.error('Ошибка проверки токена:', error);
      return response.status(403).send({
        message: 'Доступ запрещен: ошибка проверки токена',
      });
    }
  });
exports.default = authMiddleware;
