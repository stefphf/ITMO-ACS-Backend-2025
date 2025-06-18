import { ShotDto, CreateShotDto, UpdateShotDto } from '@app/dto';
export declare class ShotController {
  private shotService;
  constructor();
  /**
   * Получить выстрел по ID
   * @param id ID выстрела
   * @returns Данные выстрела
   */
  getShotById(id: number): Promise<ShotDto>;
  /**
   * Создать выстрел
   * @param dto Данные для создания выстрела
   * @returns Созданный выстрел
   */
  createShot(dto: CreateShotDto): Promise<ShotDto>;
  /**
   * Обновить выстрел
   * @param id ID выстрела
   * @param dto Новые данные выстрела
   * @returns Обновленный выстрел
   */
  updateShot(id: number, dto: UpdateShotDto): Promise<ShotDto>;
  /**
   * Удалить выстрел
   * @param id ID выстрела
   */
  deleteShot(id: number): Promise<void>;
  /**
   * Получить выстрелы по ID серии
   * @param seriesId ID серии
   * @returns Список выстрелов
   */
  getShotsBySeriesId(seriesId: number): Promise<ShotDto[]>;
}
