import { Param, Body, JsonController, HttpCode, OnUndefined, Get, Post, Patch, Delete } from 'routing-controllers';
import { DataSource } from 'typeorm';
import { QualificationTrainingEntity } from '../models/qualification-training.entity';
import { TrainingEntityManager } from '../utils/training-entity-manager';
import { CreateQualificationTrainingDto, QualificationTrainingDto, UpdateQualificationTrainingDto } from '../dtos/training.dto';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { SeriesDto } from '../dtos/series.dto';
import { ShotDto } from '../dtos/shot.dto';
import { NoteDto } from '../dtos/note.dto';
import { SeriesNoteDto } from '../dtos/series-note.dto';

@JsonController('/qualification-trainings')
export class QualificationTrainingController {
    private trainingManager: TrainingEntityManager;

    constructor(private dataSource: DataSource) {
        this.trainingManager = new TrainingEntityManager(dataSource);
    }

    @Get('/')
    @OpenAPI({ summary: 'Получить все квалификационные тренировки' })
    @ResponseSchema(QualificationTrainingDto, { isArray: true })
    async getAll() {
        const repo = this.dataSource.getRepository(QualificationTrainingEntity);
        return repo.find();
    }

    @Get('/:id')
    @OpenAPI({ summary: 'Получить квалификационную тренировку по id' })
    @ResponseSchema(QualificationTrainingDto)
    @OnUndefined(404)
    async getById(@Param('id') id: number) {
        const repo = this.dataSource.getRepository(QualificationTrainingEntity);
        const training = await repo.findOne({ where: { id } });
        if (!training) return { message: 'Квалификационная тренировка не найдена' };
        return training;
    }

    @Post('/')
    @OpenAPI({ summary: 'Создать квалификационную тренировку' })
    @ResponseSchema(QualificationTrainingDto)
    @HttpCode(201)
    async create(@Body() dto: CreateQualificationTrainingDto) {
        const trainingRepo = this.dataSource.getRepository('trainings');
        const baseTraining = await trainingRepo.save({
            athlete_id: dto.athleteId,
            start_ts: dto.startTimeStamp,
            end_ts: dto.endTimeStamp
        });
        const repo = this.dataSource.getRepository(QualificationTrainingEntity);
        const created = repo.create({
            ...dto as any,
            training_id: baseTraining.id
        });
        return repo.save(created);
    }

    @Patch('/:id')
    @OpenAPI({ summary: 'Обновить квалификационную тренировку' })
    @ResponseSchema(QualificationTrainingDto)
    async update(@Param('id') id: number, @Body() dto: UpdateQualificationTrainingDto) {
        const repo = this.dataSource.getRepository(QualificationTrainingEntity);
        const training = await repo.findOne({ where: { id } });
        if (!training) return { message: 'Квалификационная тренировка не найдена' };
        Object.assign(training, dto);
        return repo.save(training);
    }

    @Delete('/:id')
    @OpenAPI({ summary: 'Удалить квалификационную тренировку' })
    @OnUndefined(204)
    async delete(@Param('id') id: number) {
        const repo = this.dataSource.getRepository(QualificationTrainingEntity);
        const result = await repo.delete(id);
        if (!result.affected) return { message: 'Квалификационная тренировка не найдена' };
        return;
    }

    @Post('/:id/series')
    @OpenAPI({ summary: 'Добавить серию к тренировке' })
    @ResponseSchema(SeriesDto)
    @HttpCode(201)
    async addSeries(@Param('id') id: number, @Body() dto: any) {
        const repo = this.dataSource.getRepository(QualificationTrainingEntity);
        const training = await repo.findOne({ where: { id } });
        if (!training) return { message: 'Квалификационная тренировка не найдена' };
        const baseTrainingId = training.training_id;
        return this.trainingManager.addSeries(baseTrainingId, dto);
    }

    @Delete('/:id/series/:seriesId')
    @OpenAPI({ summary: 'Удалить серию из тренировки' })
    @OnUndefined(204)
    async removeSeries(@Param('id') id: number, @Param('seriesId') seriesId: number) {
        const repo = this.dataSource.getRepository(QualificationTrainingEntity);
        const training = await repo.findOne({ where: { id } });
        if (!training) return { message: 'Квалификационная тренировка не найдена' };
        const baseTrainingId = training.training_id;
        await this.trainingManager.removeSeries(baseTrainingId, seriesId);
        return;
    }

    @Post('/:id/series/:seriesId/shots')
    @OpenAPI({ summary: 'Добавить выстрел в серию' })
    @ResponseSchema(ShotDto)
    @HttpCode(201)
    async addShot(@Param('id') id: number, @Param('seriesId') seriesId: number, @Body() dto: any) {
        const repo = this.dataSource.getRepository(QualificationTrainingEntity);
        const training = await repo.findOne({ where: { id } });
        if (!training) return { message: 'Квалификационная тренировка не найдена' };
        const baseTrainingId = training.training_id;
        const shotDto = { ...dto, series_id: seriesId };
        return this.trainingManager.addShot(baseTrainingId, seriesId, shotDto);
    }

    @Post('/:id/notes')
    @OpenAPI({ summary: 'Добавить заметку к тренировке' })
    @ResponseSchema(NoteDto)
    @HttpCode(201)
    async addNote(@Param('id') id: number, @Body() dto: any) {
        const repo = this.dataSource.getRepository(QualificationTrainingEntity);
        const training = await repo.findOne({ where: { id } });
        if (!training) return { message: 'Квалификационная тренировка не найдена' };
        const baseTrainingId = training.training_id;
        return this.trainingManager.addNote(baseTrainingId, dto);
    }

    @Delete('/:id/notes/:noteId')
    @OpenAPI({ summary: 'Удалить заметку из тренировки' })
    @OnUndefined(204)
    async removeNote(@Param('id') id: number, @Param('noteId') noteId: number) {
        const repo = this.dataSource.getRepository(QualificationTrainingEntity);
        const training = await repo.findOne({ where: { id } });
        if (!training) return { message: 'Квалификационная тренировка не найдена' };
        const baseTrainingId = training.training_id;
        await this.trainingManager.removeNote(baseTrainingId, noteId);
        return;
    }

    @Post('/:id/series/:seriesId/notes')
    @OpenAPI({ summary: 'Добавить заметку к серии' })
    @ResponseSchema(SeriesNoteDto)
    @HttpCode(201)
    async addSeriesNote(@Param('id') id: number, @Param('seriesId') seriesId: number, @Body() dto: any) {
        const repo = this.dataSource.getRepository(QualificationTrainingEntity);
        const training = await repo.findOne({ where: { id } });
        if (!training) return { message: 'Квалификационная тренировка не найдена' };
        const baseTrainingId = training.training_id;
        return this.trainingManager.addSeriesNote(baseTrainingId, seriesId, dto);
    }
}
