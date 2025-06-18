import {
  LoginResponseDto,
  RegisterDto,
  RegisterResponseDto,
  SuccessResponseDto,
} from '../auth.dto';
export interface IAuthService {
  login(
    email: string,
    password: string,
  ): Promise<
    | LoginResponseDto
    | {
        message: string;
      }
  >;
  register(userData: RegisterDto): Promise<
    | RegisterResponseDto
    | {
        message: string;
      }
  >;
  changePassword(
    userId: number,
    oldPassword: string,
    newPassword: string,
  ): Promise<
    | SuccessResponseDto
    | {
        message: string;
      }
  >;
  validateToken(token: string): Promise<{
    userId: number;
  } | null>;
}
