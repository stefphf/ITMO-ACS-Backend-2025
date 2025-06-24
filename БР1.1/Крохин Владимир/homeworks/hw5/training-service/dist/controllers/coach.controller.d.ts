import { CreateCoachDto, CoachDto } from '../dtos/coach.dto';
import { RequestWithUser } from '../middlewares/auth.middleware';
export declare class CoachController {
  private coachService;
  constructor();
  /**
   * Получить всех тренеров
   * @returns Список тренеров
   */
  getAllCoaches(): Promise<CoachDto[]>;
  /**
   * Получить тренера по ID
   * @param id ID тренера
   * @returns Данные тренера
   */
  getCoachById(id: number): Promise<CoachDto>;
  /**
   * Создать тренера
   * @param dto Данные для создания тренера
   * @returns Созданный тренер
   */
  createCoach(dto: CreateCoachDto): Promise<CoachDto>;
  /**
   * Удалить тренера
   * @param id ID тренера
   */
  deleteCoach(id: number): Promise<void>;
  /**
   * Получить тренера по ID пользователя
   * @param userId ID пользователя
   * @returns Данные тренера
   */
  getCoachByUserId(userId: number): Promise<CoachDto>;
  /**
   * Получить данные текущего тренера
   * @returns Данные текущего тренера
   */
  getCurrentCoach(request: RequestWithUser): Promise<CoachDto>;
}
