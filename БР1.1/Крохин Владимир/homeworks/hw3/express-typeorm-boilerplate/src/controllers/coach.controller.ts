import { Get, Post, Patch, Param, Body, UseBefore, Delete, OnUndefined } from 'routing-controllers';
import EntityController from '../common/entity-controller';
import { CoachEntity } from '../models/coach.entity';
import authMiddleware from '../middlewares/auth.middleware';
import { CoachDto, CreateCoachDto } from '../dtos/coach.dto';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

@EntityController({
    baseRoute: '/coaches',
    entity: CoachEntity,
})
export default class CoachController {
    repository;

    @Get('/')
    @OpenAPI({ summary: 'Получить всех тренеров' })
    @ResponseSchema(CoachDto, { isArray: true })
    async getAll() {
        return this.repository.find();
    }

    @Post('/')
    @OpenAPI({ summary: 'Создать тренера' })
    @ResponseSchema(CoachDto)
    async create(@Body() dto: CreateCoachDto) {
        const coach = new CoachEntity();
        coach.user_id = dto.user_id;
        // Добавьте другие поля, если появятся в DTO
        const created = this.repository.create(coach);
        return this.repository.save(created);
    }

    @Get('/:id')
    @UseBefore(authMiddleware)
    @OpenAPI({ summary: 'Получить тренера по id' })
    @ResponseSchema(CoachDto)
    async getById(@Param('id') id: number) {
        return this.repository.findOneBy({ id });
    }

    @Delete('/:id')
    @UseBefore(authMiddleware)
    @OpenAPI({ summary: 'Удалить тренера по id' })
    @OnUndefined(204)
    async delete(
        @Param('id') id: number
    ): Promise<void> {
        const entity = await this.repository.findOneBy({ id });
        if (!entity) return;
        await this.repository.remove(entity);
    }
}
