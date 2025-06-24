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

@JsonController('/users')
export class UserController extends BaseController {
    private userRepository = dataSource.getRepository(UserEntity);

    @Get('/')
    async getAll() {
        return this.userRepository.find();
    }

    @Post('/')
    async create(@Body() dto: Partial<UserEntity>) {
        const created = this.userRepository.create(dto as any);
        return this.userRepository.save(created);
    }

    @Get('/:id')
    async getById(@Param('id') id: number) {
        const entity = await this.userRepository.findOneBy({ id });
        if (!entity) throw new Error('Пользователь не найден');
        return entity;
    }

    @Patch('/:id')
    async update(@Param('id') id: number, @Body() dto: Partial<UserEntity>) {
        const entity = await this.userRepository.findOneBy({ id });
        if (!entity) throw new Error('Пользователь не найден');
        Object.assign(entity, dto);
        return this.userRepository.save(entity);
    }

    @Post('/:id/delete')
    async delete(@Param('id') id: number) {
        const result = await this.userRepository.delete(id);
        if (!result.affected) throw new Error('Пользователь не найден');
        return { success: true };
    }

    @Get('/me')
    @UseBefore(authMiddleware)
    async me(@Req() request: RequestWithUser) {
        const { user } = request;
        const results = await this.userRepository.findOneBy({ id: user.id });

        return results;
    }
}
