import { Get, Post, Patch, Param, Body, UseBefore } from 'routing-controllers';
import EntityController from '../common/entity-controller';
import { WeaponTypeEntity } from '../models/weapon-type.entity';
import authMiddleware from '../middlewares/auth.middleware';

@EntityController({
    baseRoute: '/weapon-types',
    entity: WeaponTypeEntity,
})
export default class WeaponTypeController {
    repository;

    @Get('/')
    async getAll() {
        return this.repository.find();
    }

    @Post('/')
    async create(@Body() weaponType: Partial<WeaponTypeEntity>) {
        const created = this.repository.create(weaponType);
        return this.repository.save(created);
    }

    @Get('/:id')
    @UseBefore(authMiddleware)
    async getById(@Param('id') id: number) {
        return this.repository.findOneBy({ id });
    }

    @Patch('/:id')
    @UseBefore(authMiddleware)
    async update(
        @Param('id') id: number,
        @Body() weaponType: Partial<WeaponTypeEntity>,
    ) {
        const entity = await this.repository.findOneBy({ id });
        Object.assign(entity, weaponType);
        return this.repository.save(entity);
    }
}
