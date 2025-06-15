import { Repository } from 'typeorm';
import { AppDataSource } from '../config/database';
import { UserEntity } from '../models/user.entity';
import { hash, compare } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { IAuthService } from '../interfaces/auth.interface';
import SETTINGS from '../config/settings';
import {
  LoginResponseDto,
  RegisterDto,
  RegisterResponseDto,
  SuccessResponseDto,
} from '../dtos/auth.dto';

export class AuthService implements IAuthService {
  private userRepository: Repository<UserEntity>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(UserEntity);
  }

  /**
   * Аутентификация пользователя
   * @param email Email пользователя
   * @param password Пароль пользователя
   * @returns Объект с токеном доступа или сообщение об ошибке
   */
  async login(email: string, password: string): Promise<LoginResponseDto | { message: string }> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });

      if (!user) {
        return { message: 'Пользователь не найден' };
      }

      const isPasswordValid = await compare(password, user.password_hash);
      if (!isPasswordValid) {
        return { message: 'Неверный пароль или email' };
      }

      const accessToken = this.generateToken(user);

      return { accessToken };
    } catch (error) {
      console.error('Ошибка при входе в систему:', error);
      return { message: 'Ошибка при входе в систему' };
    }
  }

  /**
   * Регистрация нового пользователя
   * @param userData Данные пользователя для регистрации
   * @returns Объект с данными созданного пользователя и токеном или сообщение об ошибке
   */
  async register(userData: RegisterDto): Promise<RegisterResponseDto | { message: string }> {
    try {
      const { email, password, firstName, lastName, username } = userData;

      // Проверяем, существует ли пользователь с таким email
      const existingUser = await this.userRepository.findOne({
        where: { email },
      });
      if (existingUser) {
        return { message: 'Пользователь с таким email уже существует' };
      }

      // Проверяем, существует ли пользователь с таким username
      const existingUsername = await this.userRepository.findOne({
        where: { username },
      });
      if (existingUsername) {
        return { message: 'Пользователь с таким именем уже существует' };
      }

      // Создаем нового пользователя
      const password_hash = await hash(password, 10);
      const user = this.userRepository.create({
        email,
        username,
        password_hash,
        first_name: firstName,
        last_name: lastName,
      });

      // Сохраняем пользователя в базе данных
      const savedUser = await this.userRepository.save(user);

      // Генерируем JWT токен
      const accessToken = this.generateToken(savedUser);

      return {
        id: savedUser.id,
        username: savedUser.username,
        email: savedUser.email,
        accessToken,
      };
    } catch (error) {
      console.error('Ошибка при регистрации пользователя:', error);
      return { message: 'Ошибка при регистрации пользователя' };
    }
  }

  /**
   * Изменение пароля пользователя
   * @param userId ID пользователя
   * @param currentPassword Текущий пароль
   * @param newPassword Новый пароль
   * @returns Объект с результатом операции
   */
  async changePassword(
    userId: number,
    currentPassword: string,
    newPassword: string,
  ): Promise<SuccessResponseDto | { message: string }> {
    try {
      // Получаем пользователя из базы данных
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        return { message: 'Пользователь не найден' };
      }

      // Проверяем текущий пароль
      const isPasswordValid = await this.validatePassword(currentPassword, user.password_hash);
      if (!isPasswordValid) {
        return { message: 'Текущий пароль неверен' };
      }

      // Обновляем пароль
      const password_hash = await hash(newPassword, 10);
      user.password_hash = password_hash;
      await this.userRepository.save(user);

      return {
        success: true,
        message: 'Пароль успешно изменен',
      };
    } catch (error) {
      console.error('Ошибка при изменении пароля:', error);
      return { message: 'Ошибка при изменении пароля' };
    }
  }

  /**
   * Проверка валидности JWT токена
   * @param token JWT токен для проверки
   * @returns Объект с ID пользователя или null, если токен недействителен
   */
  async validateToken(token: string): Promise<{ userId: number } | null> {
    try {
      const decoded = verify(token, SETTINGS.JWT_SECRET_KEY) as {
        user: { id: number };
      };

      // Проверяем, существует ли пользователь
      const user = await this.userRepository.findOne({
        where: { id: decoded.user.id },
      });
      if (!user) {
        return null;
      }

      return { userId: decoded.user.id };
    } catch (error) {
      console.error('Ошибка проверки токена:', error);
      return null;
    }
  }

  async validatePassword(password: string, hash: string): Promise<boolean> {
    return compare(password, hash);
  }

  private generateToken(user: UserEntity): string {
    return sign(
      {
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          first_name: user.first_name,
          last_name: user.last_name,
        },
      },
      SETTINGS.JWT_SECRET_KEY,
      {
        expiresIn: SETTINGS.JWT_ACCESS_TOKEN_LIFETIME,
      },
    );
  }
}
