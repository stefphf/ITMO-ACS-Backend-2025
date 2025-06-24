import { IsNumber, IsString, IsOptional } from 'class-validator';
import { OpenAPI } from 'routing-controllers-openapi';

@OpenAPI({ description: 'DTO для пользователя' })
export class UserDto {
    @IsNumber()
    id: number;

    @IsString()
    username: string;

    @IsString()
    email: string;

    @IsString()
    @IsOptional()
    firstName?: string;

    @IsString()
    @IsOptional()
    secondName?: string;
}

@OpenAPI({ description: 'DTO для создания пользователя' })
export class CreateUserDto {
    @IsString()
    username: string;

    @IsString()
    email: string;

    @IsString()
    password: string;
}

@OpenAPI({ description: 'DTO для обновления пользователя' })
export class UpdateUserDto {
    @IsNumber()
    id: number;

    @IsString()
    @IsOptional()
    username?: string;

    @IsString()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    password?: string;

    @IsString()
    @IsOptional()
    firstName?: string;

    @IsString()
    @IsOptional()
    secondName?: string;
}
