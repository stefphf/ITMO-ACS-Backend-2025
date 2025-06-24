import {
    Get,
    Post,
    Patch,
    Param,
    Body,
    JsonController,
} from 'routing-controllers';
import { TargetEntity } from '../models/target.entity';
import { DataSource } from 'typeorm';
import dataSource from '../config/data-source';

@JsonController('/targets')
export class TargetController {
    private targetRepository = dataSource.getRepository(TargetEntity);

    @Get('/')
    async getAll() {
        return this.targetRepository.find();
    }

    @Post('/')
    async create(
        @Body() dto: import('../dtos/target/TargetDto').CreateTargetDto,
    ) {
        const created = this.targetRepository.create(dto as any);
        return this.targetRepository.save(created);
    }

    @Get('/:id')
    async getById(@Param('id') id: number) {
        const entity = await this.targetRepository.findOneBy({ id });
        if (!entity) throw new Error('Мишень не найдена');
        return entity;
    }

    @Patch('/:id')
    async update(
        @Param('id') id: number,
        @Body() dto: import('../dtos/target/TargetDto').UpdateTargetDto,
    ) {
        const entity = await this.targetRepository.findOneBy({ id });
        if (!entity) throw new Error('Мишень не найдена');
        Object.assign(entity, dto);
        return this.targetRepository.save(entity);
    }

    @Post('/:id/delete')
    async delete(@Param('id') id: number) {
        const result = await this.targetRepository.delete(id);
        if (!result.affected) throw new Error('Мишень не найдена');
        return { success: true };
    }
}
