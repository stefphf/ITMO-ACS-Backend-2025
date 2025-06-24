import {
    Get,
    Post,
    Patch,
    Param,
    Body,
    JsonController,
    UseBefore,
} from 'routing-controllers';
import { ExerciseEntity } from '../models/exercise.entity';
import { DataSource } from 'typeorm';
import dataSource from '../config/data-source';
import { CreateExerciseDto, ExerciseDto, UpdateExerciseDto } from '../dtos/exercise.dto';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import authMiddleware from '../middlewares/auth.middleware';

@JsonController('/exercises')
export class ExerciseController {
    private exerciseRepository = dataSource.getRepository(ExerciseEntity);

    @Get('/')
    @UseBefore(authMiddleware)
    @OpenAPI({ summary: 'Получить все упражнения' })
    @ResponseSchema(ExerciseDto, { isArray: true })
    async getAll() {
        return this.exerciseRepository.find();
    }

    @Post('/')
    @UseBefore(authMiddleware)
    @OpenAPI({ summary: 'Создать упражнение' })
    @ResponseSchema(ExerciseDto)
    async create(@Body() dto: CreateExerciseDto) {
        const exercise = new ExerciseEntity();
        exercise.name = dto.name;
        exercise.description = dto.description;
        exercise.target_id = dto.targetId;
        exercise.weapon_type_id = dto.weaponTypeId;
        exercise.shots_in_series = dto.shots_in_series;
        const created = this.exerciseRepository.create(exercise);
        return this.exerciseRepository.save(created);
    }

    @Get('/:id')
    @UseBefore(authMiddleware)
    @OpenAPI({ summary: 'Получить упражнение по id' })
    @ResponseSchema(ExerciseDto)
    async getById(@Param('id') id: number) {
        const entity = await this.exerciseRepository.findOneBy({ id });
        if (!entity) throw new Error('Exercise not found');
        return entity;
    }

    @Patch('/:id')
    @UseBefore(authMiddleware)
    @OpenAPI({ summary: 'Обновить упражнение' })
    @ResponseSchema(ExerciseDto)
    async update(@Param('id') id: number, @Body() dto: UpdateExerciseDto) {
        const entity = await this.exerciseRepository.findOneBy({ id });
        if (!entity) throw new Error('Exercise not found');
        if (dto.name !== undefined) entity.name = dto.name;
        if (dto.description !== undefined) entity.description = dto.description;
        if (dto.targetId !== undefined) entity.target_id = dto.targetId;
        if (dto.shotsInSeries !== undefined)
            entity.shots_in_series = dto.shotsInSeries;
        return this.exerciseRepository.save(entity);
    }

    @Post('/:id/delete')
    @UseBefore(authMiddleware)
    @OpenAPI({ summary: 'Удалить упражнение по id' })
    async delete(@Param('id') id: number) {
        const result = await this.exerciseRepository.delete(id);
        if (!result.affected) throw new Error('Упражнение не найдено');
        return { success: true };
    }
}
