import {
    Get,
    Post,
    Patch,
    Param,
    Body,
    JsonController,
} from 'routing-controllers';
import { ExerciseEntity } from '../models/exercise.entity';
import { DataSource } from 'typeorm';
import dataSource from '../config/data-source';

@JsonController('/exercises')
export class ExerciseController {
    private exerciseRepository = dataSource.getRepository(ExerciseEntity);

    @Get('/')
    async getAll() {
        return this.exerciseRepository.find();
    }

    @Post('/')
    async create(@Body() dto: Partial<ExerciseEntity>) {
        const created = this.exerciseRepository.create(dto as any);
        return this.exerciseRepository.save(created);
    }

    @Get('/:id')
    async getById(@Param('id') id: number) {
        const entity = await this.exerciseRepository.findOneBy({ id });
        if (!entity) throw new Error('Exercise not found');
        return entity;
    }

    @Patch('/:id')
    async update(
        @Param('id') id: number,
        @Body() dto: Partial<ExerciseEntity>,
    ) {
        const entity = await this.exerciseRepository.findOneBy({ id });
        if (!entity) throw new Error('Exercise not found');
        Object.assign(entity, dto);
        return this.exerciseRepository.save(entity);
    }

    @Post('/:id/delete')
    async delete(@Param('id') id: number) {
        const result = await this.exerciseRepository.delete(id);
        if (!result.affected) throw new Error('Упражнение не найдено');
        return { success: true };
    }
}
