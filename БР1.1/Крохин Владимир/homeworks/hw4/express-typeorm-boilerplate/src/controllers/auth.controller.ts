import { Body, Post, JsonController, UseBefore, Req } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import jwt from 'jsonwebtoken';

import SETTINGS from '../config/settings';
import { UserEntity } from '../models/user.entity';
import checkPassword from '../utils/check-password';
import hashPassword from '../utils/hash-password';
import dataSource from '../config/data-source';
import authMiddleware, { RequestWithUser } from '../middlewares/auth.middleware';
import { 
    LoginDto, 
    RegisterDto, 
    ChangePasswordDto, 
    LoginResponseDto, 
    RegisterResponseDto, 
    ErrorResponseDto, 
    SuccessResponseDto 
} from '../dtos/auth.dto';

@JsonController('/auth')
export class AuthController {
    private userRepository = dataSource.getRepository(UserEntity);

    @Post('/login')
    @OpenAPI({ 
        summary: 'Вход в систему',
        description: 'Аутентификация пользователя и получение JWT токена',
        security: [] // Отключаем требование авторизации для этого эндпоинта
    })
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

    @Post('/register')
    @OpenAPI({ 
        summary: 'Регистрация нового пользователя',
        description: 'Создание нового аккаунта и получение JWT токена',
        security: [] // Отключаем требование авторизации для этого эндпоинта
    })
    @ResponseSchema(RegisterResponseDto, { statusCode: 201 })
    @ResponseSchema(ErrorResponseDto, { statusCode: 400 })
    async register(
        @Body({ type: RegisterDto }) registerData: RegisterDto,
    ): Promise<RegisterResponseDto | ErrorResponseDto> {
        const { email, username, password, firstName, secondName } = registerData;
        
        // Проверяем, существует ли пользователь с таким email
        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
            return { message: 'Пользователь с таким email уже существует' };
        }

        // Проверяем, существует ли пользователь с таким username
        const existingUsername = await this.userRepository.findOne({ where: { username } });
        if (existingUsername) {
            return { message: 'Пользователь с таким именем уже существует' };
        }

        // Создаем нового пользователя
        const user = new UserEntity();
        user.username = username;
        user.email = email;
        user.password_hash = hashPassword(password);
        if (firstName) user.first_name = firstName;
        if (secondName) user.second_name = secondName;

        // Сохраняем пользователя в базе данных
        const savedUser = await this.userRepository.save(user);

        // Генерируем JWT токен
        const accessToken = jwt.sign(
            { user: { id: savedUser.id } },
            SETTINGS.JWT_SECRET_KEY,
            {
                expiresIn: SETTINGS.JWT_ACCESS_TOKEN_LIFETIME,
            },
        );

        return {
            id: savedUser.id,
            username: savedUser.username,
            email: savedUser.email,
            accessToken
        };
    }

    @Post('/change-password')
    @UseBefore(authMiddleware)
    @OpenAPI({ 
        summary: 'Изменение пароля',
        description: 'Изменение пароля текущего пользователя'
    })
    @ResponseSchema(SuccessResponseDto, { statusCode: 200 })
    @ResponseSchema(ErrorResponseDto, { statusCode: 400 })
    async changePassword(
        @Req() request: RequestWithUser,
        @Body({ type: ChangePasswordDto }) changePasswordData: ChangePasswordDto,
    ): Promise<SuccessResponseDto | ErrorResponseDto> {
        const { currentPassword, newPassword } = changePasswordData;
        const userId = request.user.id;

        // Получаем пользователя из базы данных
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            return { message: 'Пользователь не найден' };
        }

        // Проверяем текущий пароль
        const isPasswordCorrect = checkPassword(user.password_hash, currentPassword);
        if (!isPasswordCorrect) {
            return { message: 'Текущий пароль неверен' };
        }

        // Обновляем пароль
        user.password_hash = hashPassword(newPassword);
        await this.userRepository.save(user);

        return { 
            success: true,
            message: 'Пароль успешно изменен'
        };
    }
}