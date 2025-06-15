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
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { TrainingService } from '../services/training.service';
import { CreateSeriesDto, SeriesDto, UpdateSeriesDto } from '../dtos/series.dto';
import authMiddleware from '../middlewares/auth.middleware';

@JsonController('/series')
export class SeriesController {
  private trainingService: TrainingService;

  constructor() {
    this.trainingService = new TrainingService();
  }

  /**
   * Получить серию по ID
   * @param id ID серии
   * @returns Данные серии
   */
  @Get('/:id')
  @OpenAPI({ summary: 'Получить серию по id' })
  @ResponseSchema(SeriesDto)
  async getSeriesById(@Param('id') id: number): Promise<SeriesDto> {
    try {
      return await this.trainingService.getSeriesById(id);
    } catch (error) {
      console.error(`Ошибка при получении серии с id ${id}:`, error);
      throw new NotFoundError('Серия не найдена');
    }
  }

  /**
   * Создать серию
   * @param dto Данные для создания серии
   * @returns Созданная серия
   */
  @Post('/')
  @UseBefore(authMiddleware)
  @OpenAPI({ summary: 'Создать серию' })
  @ResponseSchema(SeriesDto)
  async createSeries(@Body() dto: CreateSeriesDto): Promise<SeriesDto> {
    try {
      // Предполагаем, что dto.trainingType: "free" | "qualification"
      if (dto.trainingType === 'free') {
        return await this.trainingService.addSeriesToFreeTraining(dto.trainingId, dto);
      } else if (dto.trainingType === 'qualification') {
        return await this.trainingService.addSeriesToQualificationTraining(dto);
      } else {
        throw new BadRequestError('Некорректный тип тренировки');
      }
    } catch (error) {
      console.error('Ошибка при создании серии:', error);
      throw new BadRequestError('Не удалось создать серию');
    }
  }

  /**
   * Создать серию для свободной тренировки
   * @param trainingId ID свободной тренировки
   * @param dto Данные для создания серии
   * @returns Созданная серия
   */
  @Post('/free/:trainingId')
  @UseBefore(authMiddleware)
  @OpenAPI({ summary: 'Создать серию для свободной тренировки' })
  @ResponseSchema(SeriesDto)
  async createSeriesForFreeTraining(
    @Param('trainingId') trainingId: number,
    @Body() dto: CreateSeriesDto,
  ): Promise<SeriesDto> {
    try {
      return await this.trainingService.addSeriesToFreeTraining(trainingId, dto);
    } catch (error) {
      console.error('Ошибка при создании серии для свободной тренировки:', error);
      throw new BadRequestError('Не удалось создать серию для свободной тренировки');
    }
  }

  /**
   * Создать серию для квалификационной тренировки
   * @param dto Данные для создания серии (должен содержать trainingId)
   * @returns Созданная серия
   */
  @Post('/qualification')
  @UseBefore(authMiddleware)
  @OpenAPI({ summary: 'Создать серию для квалификационной тренировки' })
  @ResponseSchema(SeriesDto)
  async createSeriesForQualificationTraining(@Body() dto: CreateSeriesDto): Promise<SeriesDto> {
    try {
      return await this.trainingService.addSeriesToQualificationTraining(dto);
    } catch (error) {
      console.error('Ошибка при создании серии для квалификационной тренировки:', error);
      throw new BadRequestError('Не удалось создать серию для квалификационной тренировки');
    }
  }

  /**
   * Обновить серию
   * @param id ID серии
   * @param dto Новые данные серии
   * @returns Обновленная серия
   */
  @Patch('/:id')
  @UseBefore(authMiddleware)
  @OpenAPI({ summary: 'Обновить серию' })
  @ResponseSchema(SeriesDto)
  async updateSeries(@Param('id') id: number, @Body() dto: UpdateSeriesDto): Promise<SeriesDto> {
    try {
      return await this.trainingService.updateSeries(id, dto);
    } catch (error) {
      console.error(`Ошибка при обновлении серии ${id}:`, error);
      throw new NotFoundError('Серия не найдена');
    }
  }

  /**
   * Удалить серию
   * @param id ID серии
   */
  @Delete('/:id')
  @UseBefore(authMiddleware)
  @OpenAPI({ summary: 'Удалить серию' })
  @OnUndefined(204)
  async deleteSeries(@Param('id') id: number): Promise<void> {
    try {
      await this.trainingService.deleteSeries(id);
    } catch (error) {
      console.error(`Ошибка при удалении серии ${id}:`, error);
      throw new NotFoundError('Серия не найдена');
    }
  }

  /**
   * Получить серии по ID тренировки
   * @param trainingId ID тренировки
   * @returns Список серий
   */
  @Get('/training/:trainingId')
  @OpenAPI({ summary: 'Получить серии по id тренировки' })
  @ResponseSchema(SeriesDto, { isArray: true })
  async getSeriesByTrainingId(
    @Param('trainingId') trainingId: number,
    @Param('trainingType') trainingType: 'free' | 'qualification',
  ): Promise<SeriesDto[]> {
    try {
      return await this.trainingService.getSeriesByTrainingId(trainingId, trainingType);
    } catch (error) {
      console.error(`Ошибка при получении серий для тренировки ${trainingId}:`, error);
      throw new BadRequestError('Не удалось получить серии для тренировки');
    }
  }
}
