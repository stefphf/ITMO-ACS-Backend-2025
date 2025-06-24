import {
  Body,
  Post,
  JsonController,
  UseBefore,
  Req,
  HttpError,
  HttpCode,
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { Service } from 'typedi';
import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { UserEntity } from '../models/user.entity';
import { AuthService } from '../services/auth.service';
import { authMiddleware } from '../middlewares/auth.middleware';
import {
  LoginDto,
  RegisterDto,
  ChangePasswordDto,
  LoginResponseDto,
  RegisterResponseDto,
  ErrorResponseDto,
  SuccessResponseDto,
} from '../dtos/auth.dto';
import { RequestWithUser } from '../interfaces/request.interface';

interface RegisterData {
  email: string;
  password: string;
  firstName?: string;
  secondName?: string;
  username: string;
}

@JsonController()
@Service()
export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  /**
   * Вход в систему
   * @param loginData Данные для входа
   * @returns Токен доступа или сообщение об ошибке
   */
  @Post('/login')
  @HttpCode(200)
  @OpenAPI({
    summary: 'Вход в систему',
    description: 'Аутентификация пользователя и получение JWT токена',
    security: [], // Отключаем требование авторизации для этого эндпоинта
  })
  @ResponseSchema(LoginResponseDto, { statusCode: 200 })
  @ResponseSchema(ErrorResponseDto, { statusCode: 400 })
  async login(
    @Body({ validate: true }) loginData: LoginDto,
  ): Promise<LoginResponseDto | ErrorResponseDto> {
    try {
      const result = await this.authService.login(loginData.email, loginData.password);

      if ('message' in result) {
        return result;
      }

      return result;
    } catch (error) {
      console.error('Ошибка при входе в систему:', error);
      return { message: 'Ошибка при входе в систему' };
    }
  }

  /**
   * Регистрация нового пользователя
   * @param registerData Данные для регистрации
   * @returns Данные созданного пользователя и токен или сообщение об ошибке
   */
  @Post('/register')
  @HttpCode(201)
  @OpenAPI({
    summary: 'Регистрация нового пользователя',
    description: 'Создание нового аккаунта и получение JWT токена',
    security: [], // Отключаем требование авторизации для этого эндпоинта
  })
  @ResponseSchema(RegisterResponseDto, { statusCode: 201 })
  @ResponseSchema(ErrorResponseDto, { statusCode: 400 })
  async register(
    @Body({ validate: true }) registerData: RegisterDto,
  ): Promise<RegisterResponseDto | ErrorResponseDto> {
    try {
      const result = await this.authService.register(registerData);

      if ('message' in result) {
        return result;
      }

      return result;
    } catch (error) {
      console.error('Ошибка при регистрации пользователя:', error);
      return { message: 'Ошибка при регистрации пользователя' };
    }
  }

  /**
   * Изменение пароля
   * @param request Запрос с данными пользователя
   * @param changePasswordData Данные для изменения пароля
   * @returns Результат операции или сообщение об ошибке
   */
  @Post('/change-password')
  @UseBefore(authMiddleware)
  @HttpCode(200)
  @OpenAPI({
    summary: 'Изменение пароля',
    description: 'Изменение пароля текущего пользователя',
  })
  @ResponseSchema(SuccessResponseDto, { statusCode: 200 })
  @ResponseSchema(ErrorResponseDto, { statusCode: 400 })
  async changePassword(
    @Req() request: RequestWithUser,
    @Body({ validate: true }) changePasswordData: ChangePasswordDto,
  ): Promise<SuccessResponseDto | ErrorResponseDto> {
    try {
      const { currentPassword, newPassword } = changePasswordData;
      const userId = request.user.id;

      const result = await this.authService.changePassword(userId, currentPassword, newPassword);

      if ('message' in result) {
        return result as ErrorResponseDto;
      }

      return result as SuccessResponseDto;
    } catch (error) {
      console.error('Ошибка при изменении пароля:', error);
      return { message: 'Ошибка при изменении пароля' };
    }
  }

  /**
   * Проверка валидности токена
   * @param body Тело запроса с токеном
   * @returns Результат проверки токена
   */
  @Post('/validate-token')
  @HttpCode(200)
  @OpenAPI({
    summary: 'Проверка токена',
    description: 'Проверка валидности JWT токена',
    security: [], // Отключаем требование авторизации для этого эндпоинта
  })
  async validateToken(
    @Body() body: { token: string },
  ): Promise<{ valid: boolean; userId?: number }> {
    try {
      if (!body.token) {
        return { valid: false };
      }

      const result = await this.authService.validateToken(body.token);
      if (result) {
        return { valid: true, userId: result.userId };
      }
      return { valid: false };
    } catch (error) {
      console.error('Ошибка проверки токена:', error);
      return { valid: false };
    }
  }

  public validateTokenHandler = async (req: Request, res: Response) => {
    try {
      const { token } = req.body;
      const result = await this.authService.validateToken(token);
      res.json({ valid: result !== null });
    } catch (error) {
      console.error('Ошибка проверки токена:', error);
      res.status(500).json({ message: 'Ошибка проверки токена' });
    }
  };
}
