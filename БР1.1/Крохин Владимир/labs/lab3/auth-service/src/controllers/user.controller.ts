import {
  Param,
  Body,
  Get,
  Post,
  Patch,
  UseBefore,
  Req,
  JsonController,
  HttpCode,
  NotFoundError,
  BadRequestError,
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { Request, Response } from 'express';

import { UserService } from '../services/user.service';
import { authMiddleware } from '../middlewares/auth.middleware';
import { CreateUserDto, UpdateUserDto, UserDto } from '../dtos/user.dto';
import { AppDataSource } from '../config/database';
import { UserEntity } from '../models/user.entity';
import { AuthService } from '../services/auth.service';
import { ChangePasswordDto } from '../dtos/auth.dto';
import { RequestWithUser } from '../interfaces/request.interface';

@JsonController()
export class UserController {
  private userService: UserService;
  private authService: AuthService;

  constructor() {
    const userRepository = AppDataSource.getRepository(UserEntity);
    this.userService = new UserService(userRepository);
    this.authService = new AuthService();
  }

  /**
   * Получить всех пользователей
   * @returns Список пользователей
   */
  @Get('/')
  @UseBefore(authMiddleware)
  @OpenAPI({ summary: 'Получить всех пользователей' })
  @ResponseSchema(UserDto, { isArray: true })
  async getAll() {
    try {
      return await this.userService.getAll();
    } catch (error) {
      console.error('Ошибка при получении списка пользователей:', error);
      throw new BadRequestError('Ошибка при получении списка пользователей');
    }
  }

  /**
   * Создать пользователя
   * @param dto Данные для создания пользователя
   * @returns Созданный пользователь
   */
  @Post('/')
  @HttpCode(201)
  @OpenAPI({
    summary: 'Создать пользователя',
    security: [], // Отключаем требование авторизации для регистрации
  })
  @ResponseSchema(UserDto)
  async create(@Body({ validate: true }) dto: CreateUserDto) {
    try {
      return await this.userService.create(dto);
    } catch (error) {
      console.error('Ошибка при создании пользователя:', error);
      throw new BadRequestError(
        error instanceof Error ? error.message : 'Ошибка при создании пользователя',
      );
    }
  }

  /**
   * Получить пользователя по ID
   * @param id ID пользователя
   * @returns Данные пользователя
   */
  @Get('/:id')
  @UseBefore(authMiddleware)
  @OpenAPI({ summary: 'Получить пользователя по id' })
  @ResponseSchema(UserDto)
  async getById(@Param('id') id: number) {
    try {
      const user = await this.userService.getById(id);
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      return user;
    } catch (error) {
      console.error(`Ошибка при получении пользователя с id ${id}:`, error);
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new BadRequestError('Ошибка при получении пользователя');
    }
  }

  /**
   * Обновить пользователя
   * @param id ID пользователя
   * @param dto Новые данные пользователя
   * @returns Обновленный пользователь
   */
  @Patch('/:id')
  @UseBefore(authMiddleware)
  @OpenAPI({ summary: 'Обновить пользователя' })
  @ResponseSchema(UserDto)
  async update(@Param('id') id: number, @Body({ validate: true }) dto: UpdateUserDto) {
    try {
      return await this.userService.update(id, dto);
    } catch (error) {
      console.error(`Ошибка при обновлении пользователя ${id}:`, error);
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new BadRequestError(
        error instanceof Error ? error.message : 'Ошибка при обновлении пользователя',
      );
    }
  }

  /**
   * Удалить пользователя
   * @param id ID пользователя
   * @returns Результат операции
   */
  @Post('/:id/delete')
  @UseBefore(authMiddleware)
  @OpenAPI({ summary: 'Удалить пользователя' })
  async delete(@Param('id') id: number) {
    try {
      return await this.userService.delete(id);
    } catch (error) {
      console.error(`Ошибка при удалении пользователя ${id}:`, error);
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new BadRequestError('Ошибка при удалении пользователя');
    }
  }

  /**
   * Получить информацию о текущем пользователе
   * @param request Запрос с данными пользователя
   * @returns Данные текущего пользователя
   */
  @Get('/me')
  @UseBefore(authMiddleware)
  @OpenAPI({
    summary: 'Текущий пользователь',
    description: 'Получение информации о текущем пользователе по JWT токену',
  })
  @ResponseSchema(UserDto)
  async me(@Req() request: RequestWithUser) {
    try {
      const { user } = request;
      return await this.userService.getMe(user.id);
    } catch (error) {
      console.error('Ошибка при получении информации о текущем пользователе:', error);
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new BadRequestError('Ошибка при получении информации о текущем пользователе');
    }
  }

  changePassword = async (req: RequestWithUser, res: Response) => {
    try {
      const { currentPassword, newPassword }: ChangePasswordDto = req.body;
      const userId = req.user.id;

      const result = await this.authService.changePassword(userId, currentPassword, newPassword);

      if ('message' in result) {
        return res.status(400).json(result);
      }

      res.json(result);
    } catch (error) {
      console.error('Ошибка при смене пароля:', error);
      res.status(500).json({ message: 'Ошибка при смене пароля' });
    }
  };
}
