export declare class LoginDto {
  email: string;
  password: string;
}
export declare class RegisterDto {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
export declare class ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}
export declare class LoginResponseDto {
  token: string;
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  };
}
export declare class RegisterResponseDto {
  token: string;
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  };
}
export declare class SuccessResponseDto {
  success: boolean;
  message?: string;
}
