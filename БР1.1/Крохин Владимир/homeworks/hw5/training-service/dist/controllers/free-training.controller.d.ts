import {
  CreateFreeTrainingDto,
  FreeTrainingDto,
  UpdateFreeTrainingDto,
} from '../dtos/training.dto';
import { RequestWithUser } from '../middlewares/auth.middleware';
export declare class FreeTrainingController {
  private trainingService;
  constructor();
  /**
   * Получить все свободные тренировки
   * @returns Список свободных тренировок
   */
  getAllFreeTrainings(): Promise<FreeTrainingDto[]>;
  /**
   * Получить свободную тренировку по ID
   * @param id ID тренировки
   * @returns Данные свободной тренировки
   */
  getFreeTrainingById(id: number): Promise<FreeTrainingDto>;
  /**
   * Создать свободную тренировку
   * @param dto Данные для создания свободной тренировки
   * @returns Созданная свободная тренировка
   */
  createFreeTraining(dto: CreateFreeTrainingDto): Promise<FreeTrainingDto>;
  /**
   * Обновить свободную тренировку
   * @param id ID тренировки
   * @param dto Новые данные свободной тренировки
   * @returns Обновленная свободная тренировка
   */
  updateFreeTraining(
    id: number,
    dto: UpdateFreeTrainingDto,
  ): Promise<FreeTrainingDto>;
  /**
   * Удалить свободную тренировку
   * @param id ID тренировки
   */
  deleteFreeTraining(id: number): Promise<void>;
  /**
   * Получить свободные тренировки по ID спортсмена
   * @param athleteId ID спортсмена
   * @returns Список свободных тренировок
   */
  getFreeTrainingsByAthleteId(athleteId: number): Promise<FreeTrainingDto[]>;
  /**
   * Получить свободные тренировки текущего пользователя
   * @returns Список свободных тренировок текущего пользователя
   */
  getCurrentUserFreeTrainings(
    request: RequestWithUser,
  ): Promise<FreeTrainingDto[]>;
}
