import { Repository } from 'typeorm';
import { AthleteEntity } from '../models/athlete.entity';
import { CreateAthleteDto, AthleteDto, UpdateAthleteDto } from '../dtos/athlete.dto';
import { CoachEntity } from '../models/coach.entity';
import { dataSource } from '../config/database';

export class AthleteService {
  private athleteRepository: Repository<AthleteEntity>;

  constructor() {
    this.athleteRepository = dataSource.getRepository(AthleteEntity);
  }

  /**
   * Получить всех спортсменов
   * @returns Массив спортсменов
   */
  async getAllAthletes(): Promise<AthleteDto[]> {
    try {
      const athletes = await this.athleteRepository.find({
        relations: ['coaches'],
      });
      return athletes.map(this.mapToAthleteDto);
    } catch (error) {
      console.error('Ошибка при получении списка спортсменов:', error);
      throw error;
    }
  }

  /**
   * Получить спортсмена по ID
   * @param id ID спортсмена
   * @returns Данные спортсмена
   */
  async getAthleteById(id: number): Promise<AthleteDto> {
    try {
      const athlete = await this.athleteRepository.findOne({
        where: { id },
        relations: ['coaches'],
      });
      if (!athlete) {
        throw new Error(`Спортсмен с ID ${id} не найден`);
      }
      return this.mapToAthleteDto(athlete);
    } catch (error) {
      console.error(`Ошибка при получении спортсмена ${id}:`, error);
      throw error;
    }
  }

  /**
   * Создать нового спортсмена
   * @param athleteData Данные спортсмена
   * @returns Созданный спортсмен
   */
  async createAthlete(createAthleteDto: CreateAthleteDto): Promise<AthleteDto> {
    try {
      const athlete = new AthleteEntity();
      athlete.userId = createAthleteDto.userId;
      if (createAthleteDto.coachIds) {
        const coachRepo = dataSource.getRepository(CoachEntity);
        athlete.coaches = await coachRepo.findByIds(createAthleteDto.coachIds);
      } else {
        athlete.coaches = [];
      }
      const savedAthlete = await this.athleteRepository.save({
        ...athlete,
      });
      return this.mapToAthleteDto(savedAthlete);
    } catch (error) {
      console.error('Ошибка при создании спортсмена:', error);
      throw error;
    }
  }

  /**
   * Обновить спортсмена
   * @param id ID спортсмена
   * @param athleteData Новые данные спортсмена
   * @returns Обновленный спортсмен
   */
  async updateAthlete(id: number, athleteData: UpdateAthleteDto): Promise<AthleteDto> {
    try {
      const athlete = await this.athleteRepository.findOne({
        where: { id },
        relations: ['coaches'],
      });
      if (!athlete) {
        throw new Error(`Спортсмен с ID ${id} не найден`);
      }
      if (athleteData.coachIds !== undefined) {
        const coachRepo = dataSource.getRepository(CoachEntity);
        athlete.coaches = await coachRepo.findByIds(athleteData.coachIds);
      }
      const updatedAthlete = await this.athleteRepository.save({
        ...athlete,
        ...athleteData,
      });
      return this.mapToAthleteDto(updatedAthlete);
    } catch (error) {
      console.error(`Ошибка при обновлении спортсмена ${id}:`, error);
      throw error;
    }
  }

  /**
   * Удалить спортсмена
   * @param id ID спортсмена
   */
  async deleteAthlete(id: number): Promise<void> {
    try {
      const result = await this.athleteRepository.delete(id);
      if (!result.affected) {
        throw new Error(`Спортсмен с ID ${id} не найден`);
      }
    } catch (error) {
      console.error(`Ошибка при удалении спортсмена ${id}:`, error);
      throw error;
    }
  }

  /**
   * Получить спортсмена по ID пользователя
   * @param userId ID пользователя
   * @returns Данные спортсмена
   */
  async getAthleteByUserId(userId: number): Promise<AthleteDto> {
    try {
      const athlete = await this.athleteRepository.findOne({
        where: { userId },
        relations: ['coaches'],
      });
      if (!athlete) {
        throw new Error(`Спортсмен для пользователя ${userId} не найден`);
      }
      return this.mapToAthleteDto(athlete);
    } catch (error) {
      console.error(`Ошибка при получении спортсмена для пользователя ${userId}:`, error);
      throw error;
    }
  }

  /**
   * Получить спортсменов по ID тренера
   * @param coachId ID тренера
   * @returns Массив спортсменов
   */
  async getAthletesByCoachId(coachId: number): Promise<AthleteDto[]> {
    try {
      const athletes = await this.athleteRepository.find({
        relations: ['coaches'],
      });
      const filteredAthletes = athletes.filter(athlete =>
        athlete.coaches.some(coach => coach.id === coachId),
      );
      return filteredAthletes.map(this.mapToAthleteDto);
    } catch (error) {
      console.error(`Ошибка при получении спортсменов для тренера ${coachId}:`, error);
      throw error;
    }
  }

  /**
   * Преобразовать сущность спортсмена в DTO
   * @param athlete Сущность спортсмена
   * @returns DTO спортсмена
   */
  private mapToAthleteDto(athlete: AthleteEntity): AthleteDto {
    return {
      id: athlete.id,
      userId: athlete.userId,
      coachIds: athlete.coaches?.map(coach => coach.id) || [],
      createdAt: athlete.created_at.toISOString(),
      updatedAt: athlete.updated_at.toISOString(),
    };
  }

  private async mapToAthleteEntity(athleteDto: AthleteDto): Promise<AthleteEntity> {
    const coachRepo = dataSource.getRepository(CoachEntity);
    const athlete = new AthleteEntity();
    athlete.id = athleteDto.id;
    athlete.userId = athleteDto.userId;
    athlete.coaches = await coachRepo.findByIds(athleteDto.coachIds);
    return athlete;
  }
}
