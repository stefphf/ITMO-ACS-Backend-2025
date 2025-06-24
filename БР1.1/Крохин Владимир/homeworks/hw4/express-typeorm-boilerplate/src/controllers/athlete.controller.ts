import { Get, Post, Patch, Param, Body, UseBefore, Delete, OnUndefined } from 'routing-controllers';
import EntityController from '../common/entity-controller';
import { AthleteEntity } from '../models/athlete.entity';
import authMiddleware from '../middlewares/auth.middleware';
import { AthleteDto, CreateAthleteDto } from '../dtos/athlete.dto';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

@EntityController({
    baseRoute: '/athletes',
    entity: AthleteEntity,
})
export default class AthleteController {
    repository;

    @Get('/')
    @OpenAPI({ summary: 'Получить всех спортсменов' })
    @ResponseSchema(AthleteDto, { isArray: true })
    async getAll() {
        return this.repository.find();
    }

    @Post('/')
    @OpenAPI({ summary: 'Создать спортсмена' })
    @ResponseSchema(AthleteDto)
    async create(@Body() dto: CreateAthleteDto) {
        const created = this.repository.create({
            user_id: dto.userId
        });
        return this.repository.save(created);
    }

    @Get('/:id')
    @UseBefore(authMiddleware)
    @OpenAPI({ summary: 'Получить спортсмена по id' })
    @ResponseSchema(AthleteDto)
    async getById(@Param('id') id: number) {
        const entity = await this.repository.findOneBy({ id });
        if (!entity) {
            return { status: 404, message: 'Спортсмен не найден' };
        }
        return entity;
    }

    @Delete('/:id')
    @UseBefore(authMiddleware)
    @OpenAPI({ summary: 'Удалить спортсмена по id' })
    @OnUndefined(204)
    async delete(@Param('id') id: number): Promise<void> {
        const entity = await this.repository.findOneBy({ id });
        if (!entity) return;
        await this.repository.remove(entity);
    }
}
