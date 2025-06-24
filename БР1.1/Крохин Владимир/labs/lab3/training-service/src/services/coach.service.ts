import { Repository } from 'typeorm';
import { CoachEntity } from '../models/coach.entity';
import { CreateCoachDto, CoachDto } from '../dtos/coach.dto';
import { dataSource } from '../config/database';

export class CoachService {
  private coachRepository: Repository<CoachEntity>;

  constructor() {
    this.coachRepository = dataSource.getRepository(CoachEntity);
  }

  /**
   * Получить всех тренеров
   * @returns Массив тренеров
   */
  async getAllCoaches(): Promise<CoachDto[]> {
    try {
      const coaches = await this.coachRepository.find({
        relations: ['athletes'],
      });
      return coaches.map(this.mapToCoachDto);
    } catch (error) {
      console.error('Ошибка при получении списка тренеров:', error);
      throw error;
    }
  }

  /**
   * Получить тренера по ID
   * @param id ID тренера
   * @returns Данные тренера
   */
  async getCoachById(id: number): Promise<CoachDto> {
    try {
      const coach = await this.coachRepository.findOne({
        where: { id },
        relations: ['athletes'],
      });
      if (!coach) {
        throw new Error(`Тренер с ID ${id} не найден`);
      }
      return this.mapToCoachDto(coach);
    } catch (error) {
      console.error(`Ошибка при получении тренера ${id}:`, error);
      throw error;
    }
  }

  /**
   * Создать нового тренера
   * @param createCoachDto Данные тренера
   * @returns Созданный тренер
   */
  async createCoach(createCoachDto: CreateCoachDto): Promise<CoachDto> {
    try {
      const coach = new CoachEntity();
      coach.userId = createCoachDto.userId;
      const savedCoach = await this.coachRepository.save({
        ...coach,
      });
      return this.mapToCoachDto(savedCoach);
    } catch (error) {
      console.error('Ошибка при создании тренера:', error);
      throw error;
    }
  }

  /**
   * Удалить тренера
   * @param id ID тренера
   */
  async deleteCoach(id: number): Promise<void> {
    try {
      const result = await this.coachRepository.delete(id);
      if (!result.affected) {
        throw new Error(`Тренер с ID ${id} не найден`);
      }
    } catch (error) {
      console.error(`Ошибка при удалении тренера ${id}:`, error);
      throw error;
    }
  }

  /**
   * Получить тренера по ID пользователя
   * @param userId ID пользователя
   * @returns Данные тренера
   */
  async getCoachByUserId(userId: number): Promise<CoachDto> {
    try {
      const coach = await this.coachRepository.findOne({
        where: { userId },
        relations: ['athletes'],
      });
      if (!coach) {
        throw new Error(`Тренер для пользователя ${userId} не найден`);
      }
      return this.mapToCoachDto(coach);
    } catch (error) {
      console.error(`Ошибка при получении тренера для пользователя ${userId}:`, error);
      throw error;
    }
  }

  /**
   * Преобразовать сущность тренера в DTO
   * @param coach Сущность тренера
   * @returns DTO тренера
   */
  private mapToCoachDto(coach: CoachEntity): CoachDto {
    return {
      id: coach.id,
      userId: coach.userId,
      athletesIds: coach.athletes?.map(athlete => athlete.id) || [],
      createdAt: coach.created_at.toISOString(),
      updatedAt: coach.updated_at.toISOString(),
    };
  }

  async updateCoach(id: number, updateCoachDto: Partial<CoachDto>): Promise<CoachDto> {
    try {
      const coach = await this.coachRepository.findOne({
        where: { id },
        relations: ['athletes'],
      });
      if (!coach) {
        throw new Error(`Тренер с ID ${id} не найден`);
      }

      const updatedCoach = await this.coachRepository.save({
        ...coach,
        ...updateCoachDto,
        updated_at: new Date().toISOString(),
      });
      return this.mapToCoachDto(updatedCoach);
    } catch (error) {
      console.error(`Ошибка при обновлении тренера ${id}:`, error);
      throw error;
    }
  }
}
