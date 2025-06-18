export declare class UserDto {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
}
export declare class CreateUserDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
export declare class UpdateUserDto {
  email?: string;
  firstName?: string;
  lastName?: string;
}
