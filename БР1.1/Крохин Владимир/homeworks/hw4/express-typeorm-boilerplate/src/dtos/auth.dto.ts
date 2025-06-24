import { IsString, IsEmail, MinLength, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { OpenAPI } from 'routing-controllers-openapi';

@OpenAPI({ description: 'DTO для входа в систему' })
export class LoginDto {
    @IsEmail()
    @Type(() => String)
    email: string;

    @IsString()
    @Type(() => String)
    password: string;
}

@OpenAPI({ description: 'DTO для регистрации' })
export class RegisterDto {
    @IsString()
    @Type(() => String)
    username: string;

    @IsEmail()
    @Type(() => String)
    email: string;

    @IsString()
    @MinLength(6)
    @Type(() => String)
    password: string;

    @IsString()
    @IsOptional()
    @Type(() => String)
    firstName?: string;

    @IsString()
    @IsOptional()
    @Type(() => String)
    secondName?: string;
}

@OpenAPI({ description: 'DTO для смены пароля' })
export class ChangePasswordDto {
    @IsString()
    @Type(() => String)
    currentPassword: string;

    @IsString()
    @MinLength(6)
    @Type(() => String)
    newPassword: string;
}

@OpenAPI({ description: 'DTO для ответа при входе' })
export class LoginResponseDto {
    accessToken: string;
}

@OpenAPI({ description: 'DTO для ответа при регистрации' })
export class RegisterResponseDto {
    id: number;
    username: string;
    email: string;
    accessToken: string;
}

@OpenAPI({ description: 'DTO для ответа с ошибкой' })
export class ErrorResponseDto {
    message: string;
}

@OpenAPI({ description: 'DTO для успешного ответа' })
export class SuccessResponseDto {
    success: boolean;
    message: string;
}