import {
  Body,
  Delete,
  Get,
  JsonController,
  OnUndefined,
  Param,
  Patch,
  Post,
  UseBefore,
  NotFoundError,
  BadRequestError,
  Req,
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { TrainingService } from '../services/training.service';
import {
  CreateTrainingDto,
  UpdateTrainingDto,
  BaseTrainingDto,
  CreateFreeTrainingDto,
  FreeTrainingDto,
  UpdateFreeTrainingDto,
  CreateQualificationTrainingDto,
  QualificationTrainingDto,
  UpdateQualificationTrainingDto,
} from '../dtos/training.dto';
import { dataSource } from '../config/database';
import { AthleteEntity } from '../models/athlete.entity';
import authMiddleware, { RequestWithUser } from '../middlewares/auth.middleware';

@JsonController()
export class TrainingController {
  private trainingService: TrainingService;

  constructor() {
    this.trainingService = new TrainingService();
  }

  /**
   * Получить все тренировки
   * @returns Список тренировок
   */
  @Get('/')
  @UseBefore(authMiddleware)
  @OpenAPI({ summary: 'Получить все тренировки' })
  @ResponseSchema(BaseTrainingDto, { isArray: true })
  async getAllTrainings(): Promise<BaseTrainingDto[]> {
    try {
      return await this.trainingService.getAllTrainings();
    } catch (error) {
      console.error('Ошибка при получении списка тренировок:', error);
      throw new BadRequestError('Не удалось получить список тренировок');
    }
  }

  /**
   * Получить тренировку по ID
   * @param id ID тренировки
   * @returns Данные тренировки
   */
  @Get('/:id')
  @UseBefore(authMiddleware)
  @OpenAPI({ summary: 'Получить тренировку по id' })
  @ResponseSchema(BaseTrainingDto)
  async getTrainingById(@Param('id') id: number): Promise<BaseTrainingDto> {
    try {
      return await this.trainingService.getTrainingById(id);
    } catch (error) {
      console.error(`Ошибка при получении тренировки с id ${id}:`, error);
      throw new NotFoundError('Тренировка не найдена');
    }
  }

  /**
   * Создать тренировку
   * @param dto Данные для создания тренировки
   * @returns Созданная тренировка
   */
  @Post('/')
  @UseBefore(authMiddleware)
  @OpenAPI({ summary: 'Создать тренировку' })
  @ResponseSchema(BaseTrainingDto)
  async createTraining(@Body() dto: CreateTrainingDto): Promise<BaseTrainingDto> {
    try {
      return await this.trainingService.createTraining(dto);
    } catch (error) {
      console.error('Ошибка при создании тренировки:', error);
      throw new BadRequestError('Не удалось создать тренировку');
    }
  }

  /**
   * Обновить тренировку
   * @param id ID тренировки
   * @param dto Новые данные тренировки
   * @returns Обновленная тренировка
   */
  @Patch('/:id')
  @UseBefore(authMiddleware)
  @OpenAPI({ summary: 'Обновить тренировку' })
  @ResponseSchema(BaseTrainingDto)
  async updateTraining(
    @Param('id') id: number,
    @Body() dto: UpdateTrainingDto,
  ): Promise<BaseTrainingDto> {
    try {
      return await this.trainingService.updateTraining(id, dto);
    } catch (error) {
      console.error(`Ошибка при обновлении тренировки ${id}:`, error);
      throw new NotFoundError('Тренировка не найдена');
    }
  }

  /**
   * Удалить тренировку
   * @param id ID тренировки
   */
  @Delete('/:id')
  @UseBefore(authMiddleware)
  @OpenAPI({ summary: 'Удалить тренировку' })
  @OnUndefined(204)
  async deleteTraining(@Param('id') id: number): Promise<void> {
    try {
      await this.trainingService.deleteTraining(id);
    } catch (error) {
      console.error(`Ошибка при удалении тренировки ${id}:`, error);
      throw new NotFoundError('Тренировка не найдена');
    }
  }

  /**
   * Получить тренировки по ID спортсмена
   * @param athleteId ID спортсмена
   * @returns Список тренировок
   */
  @Get('/athlete/:athleteId')
  @UseBefore(authMiddleware)
  @OpenAPI({ summary: 'Получить тренировки по id спортсмена' })
  @ResponseSchema(BaseTrainingDto, { isArray: true })
  async getTrainingsByAthleteId(@Param('athleteId') athleteId: number): Promise<BaseTrainingDto[]> {
    try {
      return await this.trainingService.getTrainingsByAthleteId(athleteId);
    } catch (error) {
      console.error(`Ошибка при получении тренировок для спортсмена ${athleteId}:`, error);
      throw new BadRequestError('Не удалось получить тренировки для спортсмена');
    }
  }

  /**
   * Получить тренировки текущего пользователя
   * @returns Список тренировок текущего пользователя
   */
  @Get('/current-user')
  @UseBefore(authMiddleware)
  @OpenAPI({ summary: 'Получить тренировки текущего пользователя' })
  @ResponseSchema(BaseTrainingDto, { isArray: true })
  async getCurrentUserTrainings(@Req() request: RequestWithUser): Promise<BaseTrainingDto[]> {
    try {
      const userId = request.user.id;
      // Получаем спортсмена по userId
      const athlete = await dataSource.getRepository(AthleteEntity).findOne({
        where: { userId },
      });
      if (!athlete) {
        throw new BadRequestError('Пользователь не является спортсменом');
      }
      return await this.trainingService.getTrainingsByAthleteId(athlete.id);
    } catch (error) {
      console.error('Ошибка при получении тренировок текущего пользователя:', error);
      throw new BadRequestError('Не удалось получить тренировки текущего пользователя');
    }
  }
}
