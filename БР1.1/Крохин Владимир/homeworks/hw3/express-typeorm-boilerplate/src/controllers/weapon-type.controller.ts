import { Get, Post, Patch, Param, Body, UseBefore } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import EntityController from '../common/entity-controller';
import { WeaponTypeEntity } from '../models/weapon-type.entity';
import authMiddleware from '../middlewares/auth.middleware';
import { WeaponTypeDto, CreateWeaponTypeDto, UpdateWeaponTypeDto } from '../dtos/weapon-type.dto';

@EntityController({
    baseRoute: '/weapon-types',
    entity: WeaponTypeEntity,
})
export default class WeaponTypeController {
    repository;

    @Get('/')
    @OpenAPI({ summary: 'Получить все типы оружия' })
    @ResponseSchema(WeaponTypeDto, { isArray: true })
    async getAll(): Promise<WeaponTypeDto[]> {
        return this.repository.find();
    }

    @Post('/')
    @OpenAPI({ summary: 'Создать тип оружия' })
    @ResponseSchema(WeaponTypeDto)
    async create(@Body() dto: CreateWeaponTypeDto): Promise<WeaponTypeDto> {
        const created = this.repository.create({
            name: dto.name,
            description: dto.description,
        });
        return this.repository.save(created);
    }

    @Get('/:id')
    @UseBefore(authMiddleware)
    @OpenAPI({ summary: 'Получить тип оружия по id' })
    @ResponseSchema(WeaponTypeDto)
    async getById(@Param('id') id: number): Promise<WeaponTypeDto | null> {
        return this.repository.findOneBy({ id });
    }

    @Patch('/:id')
    @UseBefore(authMiddleware)
    @OpenAPI({ summary: 'Обновить тип оружия' })
    @ResponseSchema(WeaponTypeDto)
    async update(
        @Param('id') id: number,
        @Body() dto: UpdateWeaponTypeDto,
    ): Promise<WeaponTypeDto | null> {
        const entity = await this.repository.findOneBy({ id });
        if (!entity) return null;
        if (dto.name !== undefined) entity.name = dto.name;
        if (dto.description !== undefined) entity.description = dto.description;
        return this.repository.save(entity);
    }
}
