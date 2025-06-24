import { UserDto } from './user';
export interface LoginDto {
  username: string;
  password: string;
}
export interface RegisterDto {
  username: string;
  email: string;
  password: string;
}
export interface ChangePasswordDto {
  oldPassword: string;
  newPassword: string;
}
export interface LoginResponseDto {
  user: UserDto;
  accessToken: string;
}
export interface RegisterResponseDto {
  id: number;
  username: string;
  email: string;
  accessToken: string;
}
export interface ErrorResponseDto {
  message: string;
  statusCode: number;
}
export interface SuccessResponseDto {
  message: string;
}
