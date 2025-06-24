import {
  CreateAthleteDto,
  AthleteDto,
  UpdateAthleteDto,
} from '../dtos/athlete.dto';
import { RequestWithUser } from '../middlewares/auth.middleware';
export declare class AthleteController {
  private athleteService;
  constructor();
  /**
   * Получить всех спортсменов
   * @returns Список спортсменов
   */
  getAllAthletes(): Promise<AthleteDto[]>;
  /**
   * Получить спортсмена по ID
   * @param id ID спортсмена
   * @returns Данные спортсмена
   */
  getAthleteById(id: number): Promise<AthleteDto>;
  /**
   * Создать спортсмена
   * @param dto Данные для создания спортсмена
   * @returns Созданный спортсмен
   */
  createAthlete(dto: CreateAthleteDto): Promise<AthleteDto>;
  /**
   * Обновить спортсмена
   * @param id ID спортсмена
   * @param dto Новые данные спортсмена
   * @returns Обновленный спортсмен
   */
  updateAthlete(id: number, dto: UpdateAthleteDto): Promise<AthleteDto>;
  /**
   * Удалить спортсмена
   * @param id ID спортсмена
   */
  deleteAthlete(id: number): Promise<void>;
  /**
   * Получить спортсмена по ID пользователя
   * @param userId ID пользователя
   * @returns Данные спортсмена
   */
  getAthleteByUserId(userId: number): Promise<AthleteDto>;
  /**
   * Получить данные текущего спортсмена
   * @returns Данные текущего спортсмена
   */
  getCurrentAthlete(request: RequestWithUser): Promise<AthleteDto>;
  /**
   * Получить спортсменов по ID тренера
   * @param coachId ID тренера
   * @returns Список спортсменов
   */
  getAthletesByCoachId(coachId: number): Promise<AthleteDto[]>;
}
