import { DataSource, Repository, DeepPartial } from 'typeorm';
import { TrainingEntity } from '../models/training.entity';
import { SeriesEntity } from '../models/series.entity';
import { NoteEntity } from '../models/note.entity';
import { ShotEntity } from '../models/shot.entity';
import { SeriesNotesEntity } from '../models/series-notes.entity';

export class TrainingEntityManager {
    private trainingRepo: Repository<TrainingEntity>;
    private seriesRepo: Repository<SeriesEntity>;
    private noteRepo: Repository<NoteEntity>;
    private shotRepo: Repository<ShotEntity>;
    private seriesNotesRepo: Repository<SeriesNotesEntity>;

    constructor(private dataSource: DataSource) {
        this.trainingRepo = this.dataSource.getRepository(TrainingEntity);
        this.seriesRepo = this.dataSource.getRepository(SeriesEntity);
        this.noteRepo = this.dataSource.getRepository(NoteEntity);
        this.shotRepo = this.dataSource.getRepository(ShotEntity);
        this.seriesNotesRepo = this.dataSource.getRepository(SeriesNotesEntity);
    }

    async getAll(relations: string[] = []): Promise<TrainingEntity[]> {
        return this.trainingRepo.find({ relations });
    }

    async getById(
        id: number,
        relations: string[] = [],
    ): Promise<TrainingEntity | null> {
        return this.trainingRepo.findOne({
            where: { id: id as any },
            relations,
        });
    }

    async create(data: DeepPartial<TrainingEntity>): Promise<TrainingEntity> {
        const training = this.trainingRepo.create(data);
        return this.trainingRepo.save(training);
    }

    async update(
        id: number,
        data: DeepPartial<TrainingEntity>,
    ): Promise<TrainingEntity | null> {
        await this.trainingRepo.update(id, data as any);
        return this.getById(id);
    }

    async delete(id: number): Promise<void> {
        await this.trainingRepo.delete(id);
    }

    async findTrainingById(
        id: number,
        relations: string[] = [],
    ): Promise<TrainingEntity | null> {
        return this.trainingRepo.findOne({
            where: { id: id as any },
            relations,
        });
    }

    async addSeries(
        trainingId: number,
        seriesData: Omit<SeriesEntity, 'id' | 'training'>,
    ) {
        const training = await this.findTrainingById(trainingId, ['series']);
        if (!training) return null;
        const series = this.seriesRepo.create({
            ...seriesData,
            training: { id: trainingId },
            training_id: trainingId,
        });
        await this.seriesRepo.save(series);
        return this.findTrainingById(trainingId, ['series']);
    }

    async addShot(
        trainingId: number,
        seriesId: number,
        shotData: Omit<ShotEntity, 'id' | 'series'>,
    ) {
        const training = await this.findTrainingById(trainingId, ['series']);
        if (!training) return null;
        const series = training.series.find((s) => Number(s.id) === seriesId);
        if (!series) return null;
        const shot = this.shotRepo.create({
            ...shotData,
            series: { id: series.id },
            series_id: Number(series.id),
        });
        await this.shotRepo.save(shot);
        return this.findTrainingById(trainingId, ['series', 'series.shots']);
    }

    async addNote(
        trainingId: number,
        noteData: Omit<NoteEntity, 'id' | 'training'>,
    ) {
        const training = await this.findTrainingById(trainingId, ['notes']);
        if (!training) return null;
        const note = this.noteRepo.create({
            ...noteData,
            training: { id: trainingId },
            training_id: trainingId,
        });
        await this.noteRepo.save(note);
        return this.findTrainingById(trainingId, ['notes']);
    }

    async addSeriesNote(
        trainingId: number,
        seriesId: number,
        noteData: Omit<NoteEntity, 'id' | 'series'>,
    ) {
        const training = await this.findTrainingById(trainingId, ['series']);
        if (!training) return null;
        const series = training.series.find((s) => Number(s.id) === seriesId);
        if (!series) return null;
        const note = this.noteRepo.create({ ...noteData });
        await this.noteRepo.save(note);
        const seriesNote = this.seriesNotesRepo.create({
            note_id: note.id,
            series_id: series.id,
        });
        await this.seriesNotesRepo.save(seriesNote);
        return this.findTrainingById(trainingId, ['series', 'series.notes']);
    }

    async removeSeries(trainingId: number, seriesId: number): Promise<void> {
        const training = await this.findTrainingById(trainingId, ['series']);
        if (!training) return;
        await this.seriesRepo.delete(seriesId);
    }

    async removeNote(trainingId: number, noteId: number): Promise<void> {
        const training = await this.findTrainingById(trainingId, ['notes']);
        if (!training) return;
        await this.noteRepo.delete(noteId);
    }
}
