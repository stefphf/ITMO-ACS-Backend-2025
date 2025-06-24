import {
    Get,
    Post,
    Patch,
    Param,
    Body,
    JsonController,
    HttpCode,
} from 'routing-controllers';
import { TargetEntity } from '../models/target.entity';
import { DataSource } from 'typeorm';
import dataSource from '../config/data-source';
import { CreateTargetDto, TargetDto, UpdateTargetDto } from '../dtos/target.dto';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

@JsonController('/targets')
export class TargetController {
    private targetRepository = dataSource.getRepository(TargetEntity);


    @Get('/')
    @OpenAPI({ summary: 'Получить все мишени' })
    @ResponseSchema(TargetDto, { isArray: true })    async getAll() {
        return this.targetRepository.find();
    }

    @Post('/')
    @OpenAPI({ summary: 'Создать мишень' })
    @ResponseSchema(TargetDto)
    @HttpCode(201)
    async create(@Body() dto: CreateTargetDto) {
        const target = new TargetEntity();
        target.name = dto.name;
        target.description = dto.description;
        target.image = dto.image ? Buffer.from(dto.image, 'base64') : undefined;
        const created = this.targetRepository.create(target);
        return this.targetRepository.save(created);
    }

    @Get('/:id')
    @OpenAPI({ summary: 'Получить мишень по id' })
    @ResponseSchema(TargetDto)
    async getById(@Param('id') id: number) {
        const entity = await this.targetRepository.findOneBy({ id });
        if (!entity) throw new Error('Мишень не найдена');
        return entity;
    }

    @Patch('/:id')
    @OpenAPI({ summary: 'Обновить мишень' })
    @ResponseSchema(TargetDto)
    async update(@Param('id') id: number, @Body() dto: UpdateTargetDto) {
        const entity = await this.targetRepository.findOneBy({ id });
        if (!entity) throw new Error('Мишень не найдена');
        if (dto.name !== undefined) entity.name = dto.name;
        if (dto.description !== undefined) entity.description = dto.description;
        if (dto.image !== undefined)
            entity.image = Buffer.from(dto.image, 'base64');
        return this.targetRepository.save(entity);
    }

    @Post('/:id/delete')
    @OpenAPI({ summary: 'Удалить мишень' })
    async delete(@Param('id') id: number) {
        const result = await this.targetRepository.delete(id);
        if (!result.affected) throw new Error('Мишень не найдена');
        return { success: true };
    }
}
