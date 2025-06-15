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
import { CreateShotDto, ShotDto, UpdateShotDto } from '../dtos/shot.dto';
import authMiddleware from '../middlewares/auth.middleware';

@JsonController('/shots')
export class ShotController {
  private trainingService: TrainingService;

  constructor() {
    this.trainingService = new TrainingService();
  }

  /**
   * Получить выстрел по ID
   * @param id ID выстрела
   * @returns Данные выстрела
   */
  @Get('/:id')
  @OpenAPI({ summary: 'Получить выстрел по id' })
  @ResponseSchema(ShotDto)
  async getShotById(@Param('id') id: number): Promise<ShotDto> {
    try {
      return await this.trainingService.getShotById(id);
    } catch (error) {
      console.error(`Ошибка при получении выстрела с id ${id}:`, error);
      throw new NotFoundError('Выстрел не найден');
    }
  }

  /**
   * Создать выстрел
   * @param dto Данные для создания выстрела
   * @returns Созданный выстрел
   */
  @Post('/')
  @UseBefore(authMiddleware)
  @OpenAPI({ summary: 'Создать выстрел' })
  @ResponseSchema(ShotDto)
  async createShot(@Body() dto: CreateShotDto): Promise<ShotDto> {
    try {
      return await this.trainingService.createShot(dto);
    } catch (error) {
      console.error('Ошибка при создании выстрела:', error);
      throw new BadRequestError('Не удалось создать выстрел');
    }
  }

  /**
   * Обновить выстрел
   * @param id ID выстрела
   * @param dto Новые данные выстрела
   * @returns Обновленный выстрел
   */
  @Patch('/:id')
  @UseBefore(authMiddleware)
  @OpenAPI({ summary: 'Обновить выстрел' })
  @ResponseSchema(ShotDto)
  async updateShot(@Param('id') id: number, @Body() dto: UpdateShotDto): Promise<ShotDto> {
    try {
      return await this.trainingService.updateShot(id, dto);
    } catch (error) {
      console.error(`Ошибка при обновлении выстрела ${id}:`, error);
      throw new NotFoundError('Выстрел не найден');
    }
  }

  /**
   * Удалить выстрел
   * @param id ID выстрела
   */
  @Delete('/:id')
  @UseBefore(authMiddleware)
  @OpenAPI({ summary: 'Удалить выстрел' })
  @OnUndefined(204)
  async deleteShot(@Param('id') id: number): Promise<void> {
    try {
      await this.trainingService.deleteShot(id);
    } catch (error) {
      console.error(`Ошибка при удалении выстрела ${id}:`, error);
      throw new NotFoundError('Выстрел не найден');
    }
  }

  /**
   * Получить выстрелы по ID серии
   * @param seriesId ID серии
   * @returns Список выстрелов
   */
  @Get('/series/:seriesId')
  @OpenAPI({ summary: 'Получить выстрелы по id серии' })
  @ResponseSchema(ShotDto, { isArray: true })
  async getShotsBySeriesId(@Param('seriesId') seriesId: number): Promise<ShotDto[]> {
    try {
      return await this.trainingService.getShotsBySeriesId(seriesId);
    } catch (error) {
      console.error(`Ошибка при получении выстрелов для серии ${seriesId}:`, error);
      throw new BadRequestError('Не удалось получить выстрелы для серии');
    }
  }
}
