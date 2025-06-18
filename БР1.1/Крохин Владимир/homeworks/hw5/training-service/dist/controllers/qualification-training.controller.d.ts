import {
  CreateQualificationTrainingDto,
  QualificationTrainingDto,
  UpdateQualificationTrainingDto,
} from '../dtos/training.dto';
import { RequestWithUser } from '../middlewares/auth.middleware';
export declare class QualificationTrainingController {
  private trainingService;
  constructor();
  /**
   * Получить все квалификационные тренировки
   * @returns Список квалификационных тренировок
   */
  getAllQualificationTrainings(): Promise<QualificationTrainingDto[]>;
  /**
   * Получить квалификационную тренировку по ID
   * @param id ID тренировки
   * @returns Данные квалификационной тренировки
   */
  getQualificationTrainingById(id: number): Promise<QualificationTrainingDto>;
  /**
   * Создать квалификационную тренировку
   * @param dto Данные для создания квалификационной тренировки
   * @returns Созданная квалификационная тренировка
   */
  createQualificationTraining(
    dto: CreateQualificationTrainingDto,
  ): Promise<QualificationTrainingDto>;
  /**
   * Обновить квалификационную тренировку
   * @param id ID тренировки
   * @param dto Новые данные квалификационной тренировки
   * @returns Обновленная квалификационная тренировка
   */
  updateQualificationTraining(
    id: number,
    dto: UpdateQualificationTrainingDto,
  ): Promise<QualificationTrainingDto>;
  /**
   * Удалить квалификационную тренировку
   * @param id ID тренировки
   */
  deleteQualificationTraining(id: number): Promise<void>;
  /**
   * Получить квалификационные тренировки по ID спортсмена
   * @param athleteId ID спортсмена
   * @returns Список квалификационных тренировок
   */
  getQualificationTrainingsByAthleteId(
    athleteId: number,
  ): Promise<QualificationTrainingDto[]>;
  /**
   * Получить квалификационные тренировки текущего пользователя
   * @returns Список квалификационных тренировок текущего пользователя
   */
  getCurrentUserQualificationTrainings(
    request: RequestWithUser,
  ): Promise<QualificationTrainingDto[]>;
}
