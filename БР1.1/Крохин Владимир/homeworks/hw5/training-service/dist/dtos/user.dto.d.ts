/**
 * DTO для создания пользователя
 */
export declare class CreateUserDto {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}
/**
 * DTO для обновления пользователя
 */
export declare class UpdateUserDto {
  username?: string;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
}
/**
 * DTO для ответа с данными пользователя
 */
export declare class UserDto {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  created_at?: Date;
  updated_at?: Date;
}
