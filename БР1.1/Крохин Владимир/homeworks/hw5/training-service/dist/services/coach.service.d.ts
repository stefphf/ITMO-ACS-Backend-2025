import { CreateCoachDto, CoachDto } from '../dtos/coach.dto';
export declare class CoachService {
  private coachRepository;
  constructor();
  /**
   * Получить всех тренеров
   * @returns Массив тренеров
   */
  getAllCoaches(): Promise<CoachDto[]>;
  /**
   * Получить тренера по ID
   * @param id ID тренера
   * @returns Данные тренера
   */
  getCoachById(id: number): Promise<CoachDto>;
  /**
   * Создать нового тренера
   * @param createCoachDto Данные тренера
   * @returns Созданный тренер
   */
  createCoach(createCoachDto: CreateCoachDto): Promise<CoachDto>;
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
   * Преобразовать сущность тренера в DTO
   * @param coach Сущность тренера
   * @returns DTO тренера
   */
  private mapToCoachDto;
  updateCoach(id: number, updateCoachDto: Partial<CoachDto>): Promise<CoachDto>;
}
