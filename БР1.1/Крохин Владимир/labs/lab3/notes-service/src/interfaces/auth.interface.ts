import {
  ChangePasswordDto,
  LoginResponseDto,
  RegisterDto,
  RegisterResponseDto,
  SuccessResponseDto,
} from '../dtos/auth.dto';
import { UpdateUserDto, CreateUserDto, UserDto } from '../dtos/user.dto';

/**
 * Интерфейс сервиса аутентификации
 */
export interface IAuthService {
  /**
   * Вход в систему
   * @param email Email пользователя
   * @param password Пароль пользователя
   */
  login(email: string, password: string): Promise<LoginResponseDto | { message: string }>;

  /**
   * Регистрация нового пользователя
   * @param userData Данные пользователя для регистрации
   */
  register(userData: RegisterDto): Promise<RegisterResponseDto | { message: string }>;

  /**
   * Изменение пароля пользователя
   * @param userId ID пользователя
   * @param currentPassword Текущий пароль
   * @param newPassword Новый пароль
   */
  changePassword(
    userId: number,
    currentPassword: string,
    newPassword: string,
  ): Promise<SuccessResponseDto | { message: string }>;

  /**
   * Проверка валидности JWT токена
   * @param token JWT токен для проверки
   */
  validateToken(token: string): Promise<{ userId: number } | null>;
}

/**
 * Интерфейс сервиса пользователей
 */
export interface IUserService {
  /**
   * Получить всех пользователей
   */
  getAll(): Promise<UserDto[]>;

  /**
   * Получить пользователя по ID
   * @param id ID пользователя
   */
  getById(id: number): Promise<UserDto>;

  /**
   * Создать нового пользователя
   * @param userData Данные пользователя
   */
  create(userData: CreateUserDto): Promise<UserDto>;

  /**
   * Обновить данные пользователя
   * @param id ID пользователя
   * @param userData Новые данные пользователя
   */
  update(id: number, userData: UpdateUserDto): Promise<UserDto>;

  /**
   * Удалить пользователя
   * @param id ID пользователя
   */
  delete(id: number): Promise<{ success: boolean }>;

  /**
   * Получить данные текущего пользователя
   * @param userId ID пользователя
   */
  getMe(userId: number): Promise<UserDto>;
}
