import { Request, Response } from 'express';
import { DataSource } from 'typeorm';
import { FreeTrainingEntity } from '../models/free-training.entity';
import { TrainingEntityManager } from '../utils/training-entity-manager';
import { TrainingEntity } from '../models/training.entity';
import { CreateFreeTrainingDto } from '../dtos/free-training/create-free-training.dto';
import { UpdateFreeTrainingDto } from '../dtos/free-training/update-free-training.dto';
import { FreeTrainingDto } from '../dtos/free-training/free-training.dto';
import { AddShotDto } from '../dtos/free-training/add-shot.dto';
import { Delete, Param, JsonController } from 'routing-controllers';

@JsonController('/free-trainings')
export class FreeTrainingController {
    private trainingManager: TrainingEntityManager;

    constructor(private dataSource: DataSource) {
        this.trainingManager = new TrainingEntityManager(dataSource);
    }

    async getAll(req: Request, res: Response) {
        const repo = this.dataSource.getRepository(FreeTrainingEntity);
        const trainings = await repo.find();
        return res.json(trainings);
    }

    async getById(req: Request, res: Response) {
        const repo = this.dataSource.getRepository(FreeTrainingEntity);
        const training = await repo.findOne({
            where: { id: Number(req.params.id) },
        });
        if (!training)
            return res
                .status(404)
                .json({ message: 'Свободная тренировка не найдена' });
        return res.json(training);
    }

    async create(req: Request, res: Response) {
        const repo = this.dataSource.getRepository(FreeTrainingEntity);
        const dto = req.body as CreateFreeTrainingDto;
        const created = repo.create(dto as any);
        const saved = await repo.save(created);
        return res.status(201).json(saved);
    }

    async update(req: Request, res: Response) {
        const repo = this.dataSource.getRepository(FreeTrainingEntity);
        const training = await repo.findOne({
            where: { id: Number(req.params.id) },
        });
        if (!training)
            return res
                .status(404)
                .json({ message: 'Свободная тренировка не найдена' });
        const dto = req.body as UpdateFreeTrainingDto;
        Object.assign(training, dto);
        const updated = await repo.save(training);
        return res.json(updated);
    }

    async delete(req: Request, res: Response) {
        const repo = this.dataSource.getRepository(FreeTrainingEntity);
        const result = await repo.delete(Number(req.params.id));
        if (!result.affected)
            return res
                .status(404)
                .json({ message: 'Свободная тренировка не найдена' });
        return res.status(204).send();
    }

    // --- Работа с сериями, выстрелами, заметками через TrainingEntityManager ---

    async addSeries(req: Request, res: Response) {
        const repo = this.dataSource.getRepository(FreeTrainingEntity);
        const training = await repo.findOne({
            where: { id: Number(req.params.id) },
        });
        if (!training)
            return res
                .status(404)
                .json({ message: 'Свободная тренировка не найдена' });
        const baseTrainingId = training.training_id;
        const series = await this.trainingManager.addSeries(
            baseTrainingId,
            req.body,
        );
        return res.status(201).json(series);
    }

    async removeSeries(req: Request, res: Response) {
        const repo = this.dataSource.getRepository(FreeTrainingEntity);
        const training = await repo.findOne({
            where: { id: Number(req.params.id) },
        });
        if (!training)
            return res
                .status(404)
                .json({ message: 'Свободная тренировка не найдена' });
        const baseTrainingId = training.training_id;
        await this.trainingManager.removeSeries(
            baseTrainingId,
            Number(req.params.seriesId),
        );
        return res.status(204).send();
    }

    async addShot(req: Request, res: Response) {
        const repo = this.dataSource.getRepository(FreeTrainingEntity);
        const training = await repo.findOne({
            where: { id: Number(req.params.id) },
        });
        if (!training)
            return res
                .status(404)
                .json({ message: 'Свободная тренировка не найдена' });
        const baseTrainingId = training.training_id;
        const shotDto = {
            ...req.body,
            series_id: Number(req.params.seriesId),
        } as AddShotDto;
        const shot = await this.trainingManager.addShot(
            baseTrainingId,
            Number(req.params.seriesId),
            shotDto,
        );
        return res.status(201).json(shot);
    }

    async addNote(req: Request, res: Response) {
        const repo = this.dataSource.getRepository(FreeTrainingEntity);
        const training = await repo.findOne({
            where: { id: Number(req.params.id) },
        });
        if (!training)
            return res
                .status(404)
                .json({ message: 'Свободная тренировка не найдена' });
        const baseTrainingId = training.training_id;
        const note = await this.trainingManager.addNote(
            baseTrainingId,
            req.body,
        );
        return res.status(201).json(note);
    }

    async removeNote(req: Request, res: Response) {
        const repo = this.dataSource.getRepository(FreeTrainingEntity);
        const training = await repo.findOne({
            where: { id: Number(req.params.id) },
        });
        if (!training)
            return res
                .status(404)
                .json({ message: 'Свободная тренировка не найдена' });
        const baseTrainingId = training.training_id;
        await this.trainingManager.removeNote(
            baseTrainingId,
            Number(req.params.noteId),
        );
        return res.status(204).send();
    }

    async addSeriesNote(req: Request, res: Response) {
        const repo = this.dataSource.getRepository(FreeTrainingEntity);
        const training = await repo.findOne({
            where: { id: Number(req.params.id) },
        });
        if (!training)
            return res
                .status(404)
                .json({ message: 'Свободная тренировка не найдена' });
        const baseTrainingId = training.training_id;
        const note = await this.trainingManager.addSeriesNote(
            baseTrainingId,
            Number(req.params.seriesId),
            req.body,
        );
        return res.status(201).json(note);
    }
}
