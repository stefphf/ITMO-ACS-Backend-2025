import { Repository } from 'typeorm';
import { IUserService } from '../interfaces/auth.interface';
import { UserEntity } from '../models/user.entity';

export class UserService implements IUserService {
  constructor(private userRepository: Repository<UserEntity>) {}

  /**
   * Получить всех пользователей
   * @returns Массив пользователей
   */
  async getAll(): Promise<UserEntity[]> {
    try {
      return await this.userRepository.find({
        select: ['id', 'username', 'email', 'first_name', 'last_name', 'created_at', 'updated_at'],
      });
    } catch (error) {
      console.error('Ошибка при получении списка пользователей:', error);
      throw new Error('Ошибка при получении списка пользователей');
    }
  }

  /**
   * Получить пользователя по ID
   * @param id ID пользователя
   * @returns Данные пользователя
   */
  async getById(id: number): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        select: ['id', 'username', 'email', 'first_name', 'last_name', 'created_at', 'updated_at'],
      });

      if (!user) {
        throw new Error('Пользователь не найден');
      }

      return user;
    } catch (error) {
      console.error(`Ошибка при получении пользователя с id ${id}:`, error);
      throw new Error('Ошибка при получении пользователя');
    }
  }

  /**
   * Создать нового пользователя
   * @param userData Данные пользователя
   * @returns Созданный пользователь
   */
  async create(userData: any): Promise<UserEntity> {
    try {
      // Проверяем, существует ли пользователь с таким email
      const existingEmail = await this.userRepository.findOne({
        where: { email: userData.email },
      });
      if (existingEmail) {
        throw new Error('Пользователь с таким email уже существует');
      }

      // Проверяем, существует ли пользователь с таким username
      const existingUsername = await this.userRepository.findOne({
        where: { username: userData.username },
      });
      if (existingUsername) {
        throw new Error('Пользователь с таким именем уже существует');
      }

      const user = new UserEntity();
      user.username = userData.username;
      user.email = userData.email;
      user.password_hash = userData.password; // Будет хешировано подписчиком
      if (userData.firstName) user.first_name = userData.firstName;
      if (userData.secondName) user.last_name = userData.secondName;

      const created = this.userRepository.create(user);
      const savedUser = await this.userRepository.save(created);

      // Удаляем пароль из ответа
      const { password_hash, ...userWithoutPassword } = savedUser;
      return userWithoutPassword as UserEntity;
    } catch (error) {
      console.error('Ошибка при создании пользователя:', error);
      throw new Error(error instanceof Error ? error.message : 'Ошибка при создании пользователя');
    }
  }

  /**
   * Обновить данные пользователя
   * @param id ID пользователя
   * @param userData Новые данные пользователя
   * @returns Обновленный пользователь
   */
  async update(id: number, userData: any): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new Error('Пользователь не найден');
      }

      // Проверяем, меняется ли email и не занят ли он уже
      if (userData.email && userData.email !== user.email) {
        const existingEmail = await this.userRepository.findOne({
          where: { email: userData.email },
        });
        if (existingEmail) {
          throw new Error('Пользователь с таким email уже существует');
        }
      }

      // Проверяем, меняется ли имя пользователя и не занято ли оно уже
      if (userData.username && userData.username !== user.username) {
        const existingUsername = await this.userRepository.findOne({
          where: { username: userData.username },
        });
        if (existingUsername) {
          throw new Error('Пользователь с таким именем уже существует');
        }
      }

      if (userData.username !== undefined) user.username = userData.username;
      if (userData.email !== undefined) user.email = userData.email;
      if (userData.password !== undefined) user.password_hash = userData.password; // Будет хешировано подписчиком
      if (userData.firstName !== undefined) user.first_name = userData.firstName;
      if (userData.secondName !== undefined) user.last_name = userData.secondName;

      const savedUser = await this.userRepository.save(user);

      // Удаляем пароль из ответа
      const { password_hash, ...userWithoutPassword } = savedUser;
      return userWithoutPassword as UserEntity;
    } catch (error) {
      console.error(`Ошибка при обновлении пользователя ${id}:`, error);
      throw new Error(
        error instanceof Error ? error.message : 'Ошибка при обновлении пользователя',
      );
    }
  }

  /**
   * Удалить пользователя
   * @param id ID пользователя
   * @returns Результат операции
   */
  async delete(id: number): Promise<{ success: boolean }> {
    try {
      const result = await this.userRepository.delete(id);
      if (!result.affected) {
        throw new Error('Пользователь не найден');
      }
      return { success: true };
    } catch (error) {
      console.error(`Ошибка при удалении пользователя ${id}:`, error);
      throw new Error('Ошибка при удалении пользователя');
    }
  }

  /**
   * Получить данные текущего пользователя
   * @param userId ID пользователя
   * @returns Данные пользователя
   */
  async getMe(userId: number): Promise<UserEntity> {
    return this.getById(userId);
  }
}
