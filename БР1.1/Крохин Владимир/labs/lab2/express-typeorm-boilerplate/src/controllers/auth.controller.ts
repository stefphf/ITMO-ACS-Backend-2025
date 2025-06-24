import { Body, Post, JsonController } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { IsString, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';
import jwt from 'jsonwebtoken';
import { DataSource } from 'typeorm';

import SETTINGS from '../config/settings';
import { UserEntity } from '../models/user.entity';
import checkPassword from '../utils/check-password';
import dataSource from '../config/data-source';

class LoginDto {
    @IsEmail()
    @Type(() => String)
    email: string;

    @IsString()
    @Type(() => String)
    password: string;
}

class LoginResponseDto {
    accessToken: string;
}

class ErrorResponseDto {
    message: string;
}

@JsonController('/auth')
export class AuthController {
    private userRepository = dataSource.getRepository(UserEntity);

    @Post('/login')
    @OpenAPI({ summary: 'Login' })
    @ResponseSchema(LoginResponseDto, { statusCode: 200 })
    @ResponseSchema(ErrorResponseDto, { statusCode: 400 })
    async login(
        @Body({ type: LoginDto }) loginData: LoginDto,
    ): Promise<LoginResponseDto | ErrorResponseDto> {
        const { email, password } = loginData;
        const user = await this.userRepository.findOne({ where: { email } });

        if (!user) {
            return { message: 'Пользователь не найден' };
        }

        const userPassword = user.password_hash;
        const isPasswordCorrect = checkPassword(userPassword, password);

        if (!isPasswordCorrect) {
            return { message: 'Неверный пароль или email' };
        }

        const accessToken = jwt.sign(
            { user: { id: user.id } },
            SETTINGS.JWT_SECRET_KEY,
            {
                expiresIn: SETTINGS.JWT_ACCESS_TOKEN_LIFETIME,
            },
        );

        return { accessToken };
    }
}
