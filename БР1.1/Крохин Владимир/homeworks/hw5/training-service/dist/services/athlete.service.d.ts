import {
  CreateAthleteDto,
  AthleteDto,
  UpdateAthleteDto,
} from '../dtos/athlete.dto';
export declare class AthleteService {
  private athleteRepository;
  constructor();
  /**
   * Получить всех спортсменов
   * @returns Массив спортсменов
   */
  getAllAthletes(): Promise<AthleteDto[]>;
  /**
   * Получить спортсмена по ID
   * @param id ID спортсмена
   * @returns Данные спортсмена
   */
  getAthleteById(id: number): Promise<AthleteDto>;
  /**
   * Создать нового спортсмена
   * @param athleteData Данные спортсмена
   * @returns Созданный спортсмен
   */
  createAthlete(createAthleteDto: CreateAthleteDto): Promise<AthleteDto>;
  /**
   * Обновить спортсмена
   * @param id ID спортсмена
   * @param athleteData Новые данные спортсмена
   * @returns Обновленный спортсмен
   */
  updateAthlete(id: number, athleteData: UpdateAthleteDto): Promise<AthleteDto>;
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
   * Получить спортсменов по ID тренера
   * @param coachId ID тренера
   * @returns Массив спортсменов
   */
  getAthletesByCoachId(coachId: number): Promise<AthleteDto[]>;
  /**
   * Преобразовать сущность спортсмена в DTO
   * @param athlete Сущность спортсмена
   * @returns DTO спортсмена
   */
  private mapToAthleteDto;
  private mapToAthleteEntity;
}
