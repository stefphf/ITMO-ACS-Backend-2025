import { Repository } from 'typeorm';
import { INoteService } from '../interfaces/notes.interface';
import { NoteEntity } from '../models/note.entity';
import { TrainingNoteEntity } from '../models/training-note.entity';
import { SeriesNoteEntity } from '../models/series-note.entity';
import {
  CreateNoteDto,
  NoteDto,
  UpdateNoteDto,
  CreateTrainingNoteDto,
  TrainingNoteDto,
  CreateSeriesNoteDto,
  SeriesNoteDto,
} from '../dtos/note.dto';

export class NoteService implements INoteService {
  constructor(
    private noteRepository: Repository<NoteEntity>,
    private trainingNoteRepository?: Repository<TrainingNoteEntity>,
    private seriesNoteRepository?: Repository<SeriesNoteEntity>,
  ) {}

  /**
   * Получить все заметки
   * @returns Массив заметок
   */
  async getAllNotes(): Promise<NoteDto[]> {
    try {
      const notes = await this.noteRepository.find();
      return notes.map(note => this.mapToNoteDto(note));
    } catch (error) {
      console.error('Ошибка при получении списка заметок:', error);
      throw error;
    }
  }

  /**
   * Получить заметку по ID
   * @param id ID заметки
   * @returns Данные заметки
   */
  async getNoteById(id: number): Promise<NoteDto> {
    try {
      const note = await this.noteRepository.findOne({ where: { id } });
      if (!note) {
        throw new Error('Заметка не найдена');
      }
      return this.mapToNoteDto(note);
    } catch (error) {
      console.error(`Ошибка при получении заметки с id ${id}:`, error);
      throw error;
    }
  }

  /**
   * Создать новую заметку
   * @param noteData Данные заметки
   * @returns Созданная заметка
   */
  async createNote(noteData: CreateNoteDto): Promise<NoteDto> {
    try {
      const note = new NoteEntity();
      note.user_id = noteData.userId;
      note.content = noteData.content;
      note.created_at = new Date();
      note.edited_at = null;

      const savedNote = await this.noteRepository.save(note);
      return this.mapToNoteDto(savedNote);
    } catch (error) {
      console.error('Ошибка при создании заметки:', error);
      throw error;
    }
  }

  /**
   * Обновить заметку
   * @param id ID заметки
   * @param noteData Новые данные заметки
   * @returns Обновленная заметка
   */
  async updateNote(id: number, noteData: UpdateNoteDto): Promise<NoteDto> {
    try {
      const note = await this.noteRepository.findOne({ where: { id } });
      if (!note) {
        throw new Error('Заметка не найдена');
      }

      if (noteData.content === undefined) {
        throw new Error('Содержимое заметки не может быть пустым');
      }
      note.content = noteData.content;
      note.edited_at = new Date();

      const updatedNote = await this.noteRepository.save(note);
      return this.mapToNoteDto(updatedNote);
    } catch (error) {
      console.error(`Ошибка при обновлении заметки ${id}:`, error);
      throw error;
    }
  }

  /**
   * Удалить заметку
   * @param id ID заметки
   */
  async deleteNote(id: number): Promise<void> {
    try {
      const result = await this.noteRepository.delete(id);
      if (!result.affected) {
        throw new Error('Заметка не найдена');
      }
    } catch (error) {
      console.error(`Ошибка при удалении заметки ${id}:`, error);
      throw error;
    }
  }

  /**
   * Получить все заметки к тренировкам
   * @returns Массив заметок к тренировкам
   */
  async getAllTrainingNotes(): Promise<TrainingNoteDto[]> {
    try {
      if (!this.trainingNoteRepository) {
        throw new Error('Репозиторий заметок к тренировкам не инициализирован');
      }

      const trainingNotes = await this.trainingNoteRepository
        .createQueryBuilder('tn')
        .innerJoinAndSelect('tn.note', 'n')
        .getMany();

      return trainingNotes.map(tn => this.mapToTrainingNoteDto(tn));
    } catch (error) {
      console.error('Ошибка при получении списка заметок к тренировкам:', error);
      throw error;
    }
  }

  /**
   * Получить заметку к тренировке по ID
   * @param id ID заметки к тренировке
   * @returns Данные заметки к тренировке
   */
  async getTrainingNoteById(id: number): Promise<TrainingNoteDto> {
    try {
      if (!this.trainingNoteRepository) {
        throw new Error('Репозиторий заметок к тренировкам не инициализирован');
      }

      const trainingNote = await this.trainingNoteRepository
        .createQueryBuilder('tn')
        .innerJoinAndSelect('tn.note', 'n')
        .where('tn.id = :id', { id })
        .getOne();

      if (!trainingNote) {
        throw new Error('Заметка к тренировке не найдена');
      }

      return this.mapToTrainingNoteDto(trainingNote);
    } catch (error) {
      console.error(`Ошибка при получении заметки к тренировке с id ${id}:`, error);
      throw error;
    }
  }

  /**
   * Создать новую заметку к тренировке
   * @param noteData Данные заметки к тренировке
   * @returns Созданная заметка к тренировке
   */
  async createTrainingNote(noteData: CreateTrainingNoteDto): Promise<TrainingNoteDto> {
    try {
      if (!this.trainingNoteRepository) {
        throw new Error('Репозиторий заметок к тренировкам не инициализирован');
      }

      // Создаем базовую заметку
      const note = new NoteEntity();
      note.user_id = noteData.userId;
      note.content = noteData.content;
      note.created_at = new Date();
      note.edited_at = null;

      const savedNote = await this.noteRepository.save(note);

      // Создаем связь с тренировкой
      const trainingNote = new TrainingNoteEntity();
      trainingNote.note_id = savedNote.id;
      trainingNote.training_id = noteData.trainingId;

      const savedTrainingNote = await this.trainingNoteRepository.save(trainingNote);

      return {
        id: savedTrainingNote.id,
        noteId: savedNote.id,
        trainingId: savedTrainingNote.training_id,
        note: this.mapToNoteDto(savedNote), // вложенный note
      };
    } catch (error) {
      console.error('Ошибка при создании заметки к тренировке:', error);
      throw error;
    }
  }

  /**
   * Удалить заметку к тренировке
   * @param id ID заметки к тренировке
   */
  async deleteTrainingNote(id: number): Promise<void> {
    try {
      if (!this.trainingNoteRepository) {
        throw new Error('Репозиторий заметок к тренировкам не инициализирован');
      }

      const trainingNote = await this.trainingNoteRepository.findOne({
        where: { id },
      });
      if (!trainingNote) {
        throw new Error('Заметка к тренировке не найдена');
      }

      // Удаляем связь с тренировкой
      await this.trainingNoteRepository.delete(id);

      // Удаляем базовую заметку
      await this.noteRepository.delete(trainingNote.note_id);
    } catch (error) {
      console.error(`Ошибка при удалении заметки к тренировке ${id}:`, error);
      throw error;
    }
  }

  /**
   * Получить все заметки к сериям
   * @returns Массив заметок к сериям
   */
  async getAllSeriesNotes(): Promise<SeriesNoteDto[]> {
    try {
      if (!this.seriesNoteRepository) {
        throw new Error('Репозиторий заметок к сериям не инициализирован');
      }

      const seriesNotes = await this.seriesNoteRepository
        .createQueryBuilder('sn')
        .innerJoinAndSelect('sn.note', 'n')
        .getMany();

      return seriesNotes.map(sn => this.mapToSeriesNoteDto(sn));
    } catch (error) {
      console.error('Ошибка при получении списка заметок к сериям:', error);
      throw error;
    }
  }

  /**
   * Получить заметку к серии по ID
   * @param id ID заметки к серии
   * @returns Данные заметки к серии
   */
  async getSeriesNoteById(id: number): Promise<SeriesNoteDto> {
    try {
      if (!this.seriesNoteRepository) {
        throw new Error('Репозиторий заметок к сериям не инициализирован');
      }

      const seriesNote = await this.seriesNoteRepository
        .createQueryBuilder('sn')
        .innerJoinAndSelect('sn.note', 'n')
        .where('sn.id = :id', { id })
        .getOne();

      if (!seriesNote) {
        throw new Error('Заметка к серии не найдена');
      }

      return this.mapToSeriesNoteDto(seriesNote);
    } catch (error) {
      console.error(`Ошибка при получении заметки к серии с id ${id}:`, error);
      throw error;
    }
  }

  /**
   * Создать новую заметку к серии
   * @param noteData Данные заметки к серии
   * @returns Созданная заметка к серии
   */
  async createSeriesNote(noteData: CreateSeriesNoteDto): Promise<SeriesNoteDto> {
    try {
      if (!this.seriesNoteRepository) {
        throw new Error('Репозиторий заметок к сериям не инициализирован');
      }

      // Создаем базовую заметку
      const note = new NoteEntity();
      note.user_id = noteData.userId;
      note.content = noteData.content;
      note.created_at = new Date();
      note.edited_at = null;

      const savedNote = await this.noteRepository.save(note);

      // Создаем связь с серией
      const seriesNote = new SeriesNoteEntity();
      seriesNote.note_id = savedNote.id;
      seriesNote.series_id = noteData.seriesId;

      const savedSeriesNote = await this.seriesNoteRepository.save(seriesNote);

      return {
        id: savedSeriesNote.id,
        noteId: savedNote.id,
        seriesId: savedSeriesNote.series_id,
        note: this.mapToNoteDto(savedNote), // вложенный note
      };
    } catch (error) {
      console.error('Ошибка при создании заметки к серии:', error);
      throw error;
    }
  }

  /**
   * Удалить заметку к серии
   * @param id ID заметки к серии
   */
  async deleteSeriesNote(id: number): Promise<void> {
    try {
      if (!this.seriesNoteRepository) {
        throw new Error('Репозиторий заметок к сериям не инициализирован');
      }

      const seriesNote = await this.seriesNoteRepository.findOne({
        where: { id },
      });
      if (!seriesNote) {
        throw new Error('Заметка к серии не найдена');
      }

      // Удаляем связь с серией
      await this.seriesNoteRepository.delete(id);

      // Удаляем базовую заметку
      await this.noteRepository.delete(seriesNote.note_id);
    } catch (error) {
      console.error(`Ошибка при удалении заметки к серии ${id}:`, error);
      throw error;
    }
  }

  /**
   * Получить заметки по ID тренировки
   * @param trainingId ID тренировки
   * @returns Массив заметок к тренировке
   */
  async getNotesByTrainingId(trainingId: number): Promise<TrainingNoteDto[]> {
    try {
      if (!this.trainingNoteRepository) {
        throw new Error('Репозиторий заметок к тренировкам не инициализирован');
      }

      const trainingNotes = await this.trainingNoteRepository
        .createQueryBuilder('tn')
        .innerJoinAndSelect('tn.note', 'n')
        .where('tn.training_id = :trainingId', { trainingId })
        .getMany();

      return trainingNotes.map(tn => this.mapToTrainingNoteDto(tn));
    } catch (error) {
      console.error(`Ошибка при получении заметок для тренировки ${trainingId}:`, error);
      throw error;
    }
  }

  /**
   * Получить заметки по ID серии
   * @param seriesId ID серии
   * @returns Массив заметок к серии
   */
  async getNotesBySeriesId(seriesId: number): Promise<SeriesNoteDto[]> {
    try {
      if (!this.seriesNoteRepository) {
        throw new Error('Репозиторий заметок к сериям не инициализирован');
      }

      const seriesNotes = await this.seriesNoteRepository
        .createQueryBuilder('sn')
        .innerJoinAndSelect('sn.note', 'n')
        .where('sn.series_id = :seriesId', { seriesId })
        .getMany();

      return seriesNotes.map(sn => this.mapToSeriesNoteDto(sn));
    } catch (error) {
      console.error(`Ошибка при получении заметок для серии ${seriesId}:`, error);
      throw error;
    }
  }

  /**
   * Получить заметки по ID пользователя
   * @param userId ID пользователя
   * @returns Массив заметок
   */
  async getNotesByUserId(userId: number): Promise<NoteDto[]> {
    try {
      const notes = await this.noteRepository.find({
        where: { user_id: userId },
      });
      return notes.map(note => this.mapToNoteDto(note));
    } catch (error) {
      console.error(`Ошибка при получении заметок для пользователя ${userId}:`, error);
      throw error;
    }
  }

  /**
   * Получить заметки к тренировкам по ID пользователя
   * @param userId ID пользователя
   * @returns Массив заметок к тренировкам
   */
  async getTrainingNotesByUserId(userId: number): Promise<TrainingNoteDto[]> {
    try {
      if (!this.trainingNoteRepository) {
        throw new Error('Репозиторий заметок к тренировкам не инициализирован');
      }

      const trainingNotes = await this.trainingNoteRepository
        .createQueryBuilder('tn')
        .innerJoinAndSelect('tn.note', 'n')
        .where('n.user_id = :userId', { userId })
        .getMany();

      return trainingNotes.map(tn => this.mapToTrainingNoteDto(tn));
    } catch (error) {
      console.error(
        `Ошибка при получении заметок к тренировкам для пользователя ${userId}:`,
        error,
      );
      throw error;
    }
  }

  /**
   * Получить заметки к сериям по ID пользователя
   * @param userId ID пользователя
   * @returns Массив заметок к сериям
   */
  async getSeriesNotesByUserId(userId: number): Promise<SeriesNoteDto[]> {
    try {
      if (!this.seriesNoteRepository) {
        throw new Error('Репозиторий заметок к сериям не инициализирован');
      }

      const seriesNotes = await this.seriesNoteRepository
        .createQueryBuilder('sn')
        .innerJoinAndSelect('sn.note', 'n')
        .where('n.user_id = :userId', { userId })
        .getMany();

      return seriesNotes.map(sn => this.mapToSeriesNoteDto(sn));
    } catch (error) {
      console.error(`Ошибка при получении заметок к сериям для пользователя ${userId}:`, error);
      throw error;
    }
  }

  /**
   * Преобразовать сущность заметки в DTO
   * @param note Сущность заметки
   * @returns DTO заметки
   */
  private mapToNoteDto(note: NoteEntity): NoteDto {
    return {
      id: note.id,
      userId: note.user_id,
      content: note.content,
      createdAt: note.created_at,
      editedAt: note.edited_at,
    };
  }

  /**
   * Преобразовать сущность заметки к тренировке в DTO
   * @param trainingNote Сущность заметки к тренировке
   * @returns DTO заметки к тренировке
   */
  private mapToTrainingNoteDto(trainingNote: any): TrainingNoteDto {
    return {
      id: trainingNote.id,
      noteId: trainingNote.note_id,
      trainingId: trainingNote.training_id,
      note: this.mapToNoteDto(trainingNote.note),
    };
  }

  /**
   * Преобразовать сущность заметки к серии в DTO
   * @param seriesNote Сущность заметки к серии
   * @returns DTO заметки к серии
   */
  private mapToSeriesNoteDto(seriesNote: any): SeriesNoteDto {
    return {
      id: seriesNote.id,
      noteId: seriesNote.note_id,
      seriesId: seriesNote.series_id,
      note: this.mapToNoteDto(seriesNote.note),
    };
  }
}
