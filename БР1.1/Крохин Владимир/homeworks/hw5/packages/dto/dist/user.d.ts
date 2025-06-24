export interface UserDto {
  id: number;
  username: string;
  email: string;
}
export interface CreateUserDto {
  username: string;
  email: string;
}
export interface UpdateUserDto {
  username?: string;
  email?: string;
}
