import { Body, Delete, Get, HttpCode, JsonController, NotFoundError, OnUndefined, Param, Patch, Post } from 'routing-controllers';
import { DataSource } from 'typeorm';
import { AddShotDto, CreateFreeTrainingDto, FreeTrainingDto, UpdateFreeTrainingDto } from '../dtos/training.dto';
import { FreeTrainingEntity } from '../models/free-training.entity';
import { TrainingEntityManager } from '../utils/training-entity-manager';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { CreateNoteDto, NoteDto } from '../dtos/note.dto';
import { SeriesDto, CreateSeriesDto } from '../dtos/series.dto';
import { SeriesNoteDto, CreateSeriesNoteDto } from '../dtos/series-note.dto';

@JsonController('/free-trainings')
@OpenAPI({ description: 'Контроллер для свободных тренировок' })
export class FreeTrainingController {
    private trainingManager: TrainingEntityManager;
    private dataSource: DataSource;

    constructor() {
        this.dataSource = require('../config/data-source').default;
        this.trainingManager = new TrainingEntityManager(this.dataSource);
    }

    @Get('/')
    @OpenAPI({ summary: 'Получить все свободные тренировки' })
    @ResponseSchema(FreeTrainingDto, { isArray: true })
    async getAll() {
        const repo = this.dataSource.getRepository(FreeTrainingEntity);
        return repo.find({
            relations: ['training', 'target'],
        }).then(trainings => trainings.map(t => this.toDto(t)));
    }

    @Get('/:id')
    @OpenAPI({ summary: 'Получить свободную тренировку по id' })
    @ResponseSchema(FreeTrainingDto)
    @OnUndefined(404)
    async getById(@Param('id') id: number) {
        const repo = this.dataSource.getRepository(FreeTrainingEntity);
        const training = await repo.findOne({
            where: { id },
            relations: ['training', 'target'],
        });
        if (!training) throw new NotFoundError('Свободная тренировка не найдена');
        return this.toDto(training);
    }

    @Post('/')
    @OpenAPI({ summary: 'Создать свободную тренировку' })
    @ResponseSchema(FreeTrainingDto)
    @HttpCode(201)
    async create(@Body() dto: CreateFreeTrainingDto) {
        const trainingRepo = this.dataSource.getRepository('trainings');
        const baseTraining = await trainingRepo.save({
            athlete_id: dto.athleteId,
            weapon_type_id: dto.weaponTypeId,
            target_id: dto.targetId,
            start_ts: dto.startTimeStamp || new Date(),
            end_ts: dto.endTimeStamp
        });
        const repo = this.dataSource.getRepository(FreeTrainingEntity);
        const created = repo.create({
            training_id: baseTraining.id,
            target_id: dto.targetId,
        });
        const saved = await repo.save(created);
        
        const full = await repo.findOne({
            where: { id: saved.id },
            relations: ['training', 'target', 'training.weapon_type', 'training.series', 'training.notes', 'training.series.shots'],
        });
        return this.toDto(full!);
    }

    @Patch('/:id')
    @OpenAPI({ summary: 'Обновить свободную тренировку' })
    @ResponseSchema(FreeTrainingDto)
    async update(@Param('id') id: number, @Body() dto: UpdateFreeTrainingDto) {
        const repo = this.dataSource.getRepository(FreeTrainingEntity);
        const training = await repo.findOne({ where: { id } });
        if (!training) throw new NotFoundError('Свободная тренировка не найдена');
        Object.assign(training, dto);
        const updated = await repo.save(training);
        const full = await repo.findOne({
            where: { id: updated.id },
            relations: ['training', 'target', 'training.weapon_type', 'training.series', 'training.notes', 'training.series.shots'],
        });
        return this.toDto(full!);
    }

    @Delete('/:id')
    @OpenAPI({ summary: 'Удалить свободную тренировку' })
    @OnUndefined(204)
    async delete(@Param('id') id: number) {
        const repo = this.dataSource.getRepository(FreeTrainingEntity);
        const result = await repo.delete(id);
        if (!result.affected) throw new NotFoundError('Свободная тренировка не найдена');
        return;
    }

    @Post('/:id/series')
    @OpenAPI({ summary: 'Добавить серию к тренировке' })
    @ResponseSchema(SeriesDto)
    @HttpCode(201)
    async addSeries(@Param('id') id: number, @Body() dto: CreateSeriesDto) {
        const repo = this.dataSource.getRepository(FreeTrainingEntity);
        const training = await repo.findOne({ where: { id } });
        if (!training) throw new NotFoundError('Свободная тренировка не найдена');
        const baseTrainingId = Number(training.training_id);
        const entityData = {
            training_id: baseTrainingId,
            begin_time_offset: 0,
            end_time_offset: 0,
            max_shots: dto.maxShots,
            shots: [],
            notes: []
        };
        return this.trainingManager.addSeries(baseTrainingId, entityData);
    }

    @Delete('/:id/series/:seriesId')
    @OpenAPI({ summary: 'Удалить серию из тренировки' })
    @OnUndefined(204)
    async removeSeries(@Param('id') id: number, @Param('seriesId') seriesId: number) {
        const repo = this.dataSource.getRepository(FreeTrainingEntity);
        const training = await repo.findOne({ where: { id } });
        if (!training) throw new NotFoundError('Свободная тренировка не найдена');
        const baseTrainingId = training.training_id;
        await this.trainingManager.removeSeries(baseTrainingId, seriesId);
        return;
    }

    @Post('/:id/series/:seriesId/shots')
    @OpenAPI({ summary: 'Добавить выстрел в серию' })
    @HttpCode(201)
    async addShot(
        @Param('id') id: number,
        @Param('seriesId') seriesId: number,
        @Body() dto: AddShotDto
    ) {
        const repo = this.dataSource.getRepository(FreeTrainingEntity);
        const training = await repo.findOne({ where: { id } });
        if (!training) throw new NotFoundError('Свободная тренировка не найдена');
        const baseTrainingId = training.training_id;
        return this.trainingManager.addShot(baseTrainingId, seriesId, dto);
    }

    @Post('/:id/notes')
    @OpenAPI({ summary: 'Добавить заметку к тренировке' })
    @ResponseSchema(NoteDto)
    @HttpCode(201)
    async addNote(@Param('id') id: number, @Body() dto: CreateNoteDto) {
        const repo = this.dataSource.getRepository(FreeTrainingEntity);
        const userRepo = this.dataSource.getRepository('users');
        const training = await repo.findOne({ where: { id } });
        if (!training) throw new NotFoundError('Свободная тренировка не найдена');
        const user = await userRepo.findOne({ where: { id: dto.userId } });
        if (!user) throw new NotFoundError('Пользователь не найден');
        const baseTrainingId = training.training_id;

        const entityData = {
            training_id: baseTrainingId,
            user_id: dto.userId,
            user: user as import('../models/user.entity').UserEntity,
            content: dto.content,
            created_at: new Date(),
            edited_at: null
        };
        return this.trainingManager.addNote(baseTrainingId, entityData);
    }

    @Delete('/:id/notes/:noteId')
    @OpenAPI({ summary: 'Удалить заметку из тренировки' })
    @OnUndefined(204)
    async removeNote(@Param('id') id: number, @Param('noteId') noteId: number) {
        const repo = this.dataSource.getRepository(FreeTrainingEntity);
        const training = await repo.findOne({ where: { id } });
        if (!training) throw new NotFoundError('Свободная тренировка не найдена');
        const baseTrainingId = training.training_id;
        await this.trainingManager.removeNote(baseTrainingId, noteId);
        return;
    }

    @Post('/:id/series/:seriesId/notes')
    @OpenAPI({ summary: 'Добавить заметку к серии' })
    @ResponseSchema(SeriesNoteDto)
    @HttpCode(201)
    async addSeriesNote(
        @Param('id') id: number,
        @Param('seriesId') seriesId: number,
        @Body() dto: CreateSeriesNoteDto
    ) {
        const repo = this.dataSource.getRepository(FreeTrainingEntity);
        const training = await repo.findOne({ where: { id } });
        if (!training) throw new NotFoundError('Свободная тренировка не найдена');
        const baseTrainingId = training.training_id;
        return this.trainingManager.addSeriesNote(baseTrainingId, seriesId, dto);
    }

    toDto(entity: FreeTrainingEntity): FreeTrainingDto {
        const training = entity.training;
        return {
            id: entity.id,
            athleteId: training?.athlete_id,
            weaponType: training?.weapon_type ? {
                id: Number(training.weapon_type.id),
                name: training.weapon_type.name,
                description: training.weapon_type.description,
            } : undefined,
            target: entity.target ? {
                id: Number(entity.target.id),
                name: entity.target.name,
                description: entity.target.description,
                image: entity.target.image ? entity.target.image.toString('base64') : undefined,
            } : undefined,
            startTimeStamp: training?.start_ts,
            endTimeStamp: training?.end_ts,
            series: Array.isArray(training?.series) ? training.series.map((s) => ({
                id: Number(s.id),
                shots: Array.isArray(s.shots) ? s.shots.map((shot) => ({
                    id: Number(shot.id),
                    seriesId: Number(shot.series_id),
                    x: Number(shot.x),
                    y: Number(shot.y),
                    score: Number(shot.score),
                    timeOffset: Number(shot.time_offset),
                })) : [],
                timeOffset: s.begin_time_offset,
            })) : [],
            notes: Array.isArray(training?.notes) ? training.notes.map((n) => ({
                id: Number(n.id),
                userId: Number(n.user_id),
                createdAt: n.created_at,
                editedAt: n.edited_at,
                content: n.content,
            })) : [],
        };
    }
}
