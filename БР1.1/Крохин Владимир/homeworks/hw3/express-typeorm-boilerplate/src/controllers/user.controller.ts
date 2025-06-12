import {
    Param,
    Body,
    Get,
    Post,
    Patch,
    UseBefore,
    Req,
    Res,
    JsonController,
} from 'routing-controllers';
import { ObjectLiteral } from 'typeorm';
import { DataSource } from 'typeorm';
import dataSource from '../config/data-source';

import EntityController from '../common/entity-controller';
import BaseController from '../common/base-controller';

import { UserEntity } from '../models/user.entity';

import authMiddleware, {
    RequestWithUser,
} from '../middlewares/auth.middleware';
import { CreateUserDto, UpdateUserDto, UserDto } from '../dtos/user.dto';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

@JsonController('/users')
export class UserController extends BaseController {
    private userRepository = dataSource.getRepository(UserEntity);

    @Get('/')
    @OpenAPI({ summary: 'Получить всех пользователей' })
    @ResponseSchema(UserDto, { isArray: true })
    async getAll() {
        return this.userRepository.find();
    }

    @Post('/')
    @OpenAPI({ 
        summary: 'Создать пользователя',
        security: [] // Отключаем требование авторизации для регистрации
    })
    @ResponseSchema(UserDto)
    async create(@Body() dto: CreateUserDto) {
        const user = new UserEntity();
        user.username = dto.username;
        user.email = dto.email;
        user.password_hash = dto.password; 
        const created = this.userRepository.create(user);
        return this.userRepository.save(created);
    }

    @Get('/:id')
    @OpenAPI({ summary: 'Получить пользователя по id' })
    @ResponseSchema(UserDto)    async getById(@Param('id') id: number) {
        const entity = await this.userRepository.findOneBy({ id });
        if (!entity) throw new Error('Пользователь не найден');
        return entity;
    }

    @Patch('/:id')
    @OpenAPI({ summary: 'Обновить пользователя' })
    @ResponseSchema(UserDto)    async update(@Param('id') id: number, @Body() dto: UpdateUserDto) {
        const entity = await this.userRepository.findOneBy({ id });
        if (!entity) throw new Error('Пользователь не найден');
        if (dto.username !== undefined) entity.username = dto.username;
        if (dto.email !== undefined) entity.email = dto.email;
        if (dto.password !== undefined) entity.password_hash = dto.password; // предполагается, что пароль будет захеширован отдельно
        if (dto.firstName !== undefined) entity.first_name = dto.firstName;
        if (dto.secondName !== undefined) entity.second_name = dto.secondName;
        return this.userRepository.save(entity);
    }

    @Post('/:id/delete')
    @OpenAPI({ summary: 'Удалить пользователя' })
    async delete(@Param('id') id: number) {
        const result = await this.userRepository.delete(id);
        if (!result.affected) throw new Error('Пользователь не найден');
        return { success: true };
    }

    @Get('/me')
    @UseBefore(authMiddleware)
    @OpenAPI({ 
        summary: 'Текущий пользователь',
        description: 'Получение информации о текущем пользователе по JWT токену'
    })
    @ResponseSchema(UserDto)
    async me(@Req() request: RequestWithUser) {
        const { user } = request;
        const results = await this.userRepository.findOneBy({ id: user.id });

        return results;
    }
}
