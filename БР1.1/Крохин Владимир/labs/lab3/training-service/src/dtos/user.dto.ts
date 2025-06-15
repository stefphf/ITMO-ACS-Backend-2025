import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { OpenAPI } from 'routing-controllers-openapi';

/**
 * DTO для создания пользователя
 */
@OpenAPI({})
export class CreateUserDto {
  @IsString({ message: 'Имя пользователя должно быть строкой' })
  @IsNotEmpty({ message: 'Имя пользователя обязательно' })
  username: string;

  @IsEmail({}, { message: 'Некорректный формат email' })
  @IsNotEmpty({ message: 'Email обязателен' })
  email: string;

  @IsString({ message: 'Пароль должен быть строкой' })
  @IsNotEmpty({ message: 'Пароль обязателен' })
  @MinLength(6, { message: 'Пароль должен содержать минимум 6 символов' })
  password: string;

  @IsString({ message: 'Имя должно быть строкой' })
  @IsOptional()
  firstName?: string;

  @IsString({ message: 'Фамилия должна быть строкой' })
  @IsOptional()
  lastName?: string;
}

/**
 * DTO для обновления пользователя
 */
@OpenAPI({})
export class UpdateUserDto {
  @IsString({ message: 'Имя пользователя должно быть строкой' })
  @IsOptional()
  username?: string;

  @IsEmail({}, { message: 'Некорректный формат email' })
  @IsOptional()
  email?: string;

  @IsString({ message: 'Пароль должен быть строкой' })
  @IsOptional()
  @MinLength(6, { message: 'Пароль должен содержать минимум 6 символов' })
  password?: string;

  @IsString({ message: 'Имя должно быть строкой' })
  @IsOptional()
  firstName?: string;

  @IsString({ message: 'Фамилия должна быть строкой' })
  @IsOptional()
  lastName?: string;
}

/**
 * DTO для ответа с данными пользователя
 */
@OpenAPI({})
export class UserDto {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  created_at?: Date;
  updated_at?: Date;
}
