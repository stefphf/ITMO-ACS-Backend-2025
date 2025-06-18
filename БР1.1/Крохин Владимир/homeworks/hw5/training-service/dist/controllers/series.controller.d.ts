import { SeriesDto, CreateSeriesDto, UpdateSeriesDto } from '@app/dto';
export declare class SeriesController {
  private trainingService;
  private seriesService;
  constructor();
  /**
   * Получить все серии
   * @returns Список всех серий
   */
  getAllSeries(): Promise<SeriesDto[]>;
  /**
   * Получить серию по ID
   * @param id ID серии
   * @returns Данные серии
   */
  getSeriesById(id: number): Promise<SeriesDto>;
  /**
   * Создать серию
   * @param dto Данные для создания серии
   * @returns Созданная серия
   */
  createSeries(dto: CreateSeriesDto): Promise<SeriesDto>;
  /**
   * Создать серию для свободной тренировки
   * @param trainingId ID свободной тренировки
   * @param dto Данные для создания серии
   * @returns Созданная серия
   */
  createSeriesForFreeTraining(
    trainingId: number,
    dto: CreateSeriesDto,
  ): Promise<SeriesDto>;
  /**
   * Создать серию для квалификационной тренировки
   * @param dto Данные для создания серии (должен содержать trainingId)
   * @returns Созданная серия
   */
  createSeriesForQualificationTraining(
    dto: CreateSeriesDto,
  ): Promise<SeriesDto>;
  /**
   * Обновить серию
   * @param id ID серии
   * @param dto Новые данные серии
   * @returns Обновленная серия
   */
  updateSeries(id: number, dto: UpdateSeriesDto): Promise<SeriesDto>;
  /**
   * Удалить серию
   * @param id ID серии
   */
  deleteSeries(id: number): Promise<void>;
  /**
   * Получить серии по ID тренировки
   * @param trainingId ID тренировки
   * @returns Список серий
   */
  getSeriesByTrainingId(
    trainingId: number,
    trainingType: 'qualification' | 'free',
  ): Promise<SeriesDto[]>;
}
