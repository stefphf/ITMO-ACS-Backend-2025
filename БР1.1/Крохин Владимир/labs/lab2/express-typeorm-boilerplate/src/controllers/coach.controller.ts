import { Get, Post, Patch, Param, Body, UseBefore } from 'routing-controllers';
import EntityController from '../common/entity-controller';
import { CoachEntity } from '../models/coach.entity';
import authMiddleware from '../middlewares/auth.middleware';

@EntityController({
    baseRoute: '/coaches',
    entity: CoachEntity,
})
export default class CoachController {
    repository;

    @Get('/')
    async getAll() {
        return this.repository.find();
    }

    @Post('/')
    async create(@Body() coach: Partial<CoachEntity>) {
        const created = this.repository.create(coach);
        return this.repository.save(created);
    }

    @Get('/:id')
    @UseBefore(authMiddleware)
    async getById(@Param('id') id: number) {
        return this.repository.findOneBy({ id });
    }

    @Patch('/:id')
    @UseBefore(authMiddleware)
    async update(@Param('id') id: number, @Body() coach: Partial<CoachEntity>) {
        const entity = await this.repository.findOneBy({ id });
        Object.assign(entity, coach);
        return this.repository.save(entity);
    }
}
