import { Get, Post, Patch, Param, Body, UseBefore } from 'routing-controllers';
import EntityController from '../common/entity-controller';
import { AthleteEntity } from '../models/athlete.entity';
import authMiddleware from '../middlewares/auth.middleware';

@EntityController({
    baseRoute: '/athletes',
    entity: AthleteEntity,
})
export default class AthleteController {
    repository;

    @Get('/')
    async getAll() {
        return this.repository.find();
    }

    @Post('/')
    async create(@Body() athlete: Partial<AthleteEntity>) {
        const created = this.repository.create(athlete);
        return this.repository.save(created);
    }

    @Get('/:id')
    @UseBefore(authMiddleware)
    async getById(@Param('id') id: number) {
        const entity = await this.repository.findOneBy({ id });
        if (!entity) {
            return { status: 404, message: 'Спортсмен не найден' };
        }
        return entity;
    }

    @Patch('/:id')
    @UseBefore(authMiddleware)
    async update(
        @Param('id') id: number,
        @Body() athlete: Partial<AthleteEntity>,
    ) {
        const entity = await this.repository.findOneBy({ id });
        if (!entity) {
            return { status: 404, message: 'Спортсмен не найден' };
        }
        Object.assign(entity, athlete);
        return this.repository.save(entity);
    }
}
