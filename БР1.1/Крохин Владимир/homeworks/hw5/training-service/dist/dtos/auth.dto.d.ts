/**
 * DTO для входа в систему
 */
export declare class LoginDto {
  email: string;
  password: string;
  constructor(email?: string, password?: string);
}
/**
 * DTO для регистрации
 */
export declare class RegisterDto {
  email: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  constructor(
    email?: string,
    username?: string,
    password?: string,
    firstName?: string,
    lastName?: string,
  );
}
/**
 * DTO для изменения пароля
 */
export declare class ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
  constructor(currentPassword?: string, newPassword?: string);
}
/**
 * DTO для ответа при входе
 */
export declare class LoginResponseDto {
  accessToken: string;
  constructor(accessToken?: string);
}
/**
 * DTO для ответа при регистрации
 */
export declare class RegisterResponseDto {
  id: number;
  username: string;
  email: string;
  accessToken: string;
}
/**
 * DTO для ответа с ошибкой
 */
export declare class ErrorResponseDto {
  message: string;
}
/**
 * DTO для успешного ответа
 */
export declare class SuccessResponseDto {
  success: boolean;
  message: string;
}
