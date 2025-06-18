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
  Authorized,
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { Service } from 'typedi';
import { ShotService } from '../services/shot.service';
import { CreateShotDto, ShotDto, UpdateShotDto } from '@app/dto';
import authMiddleware from '../middlewares/auth.middleware';
import { getRepository } from 'typeorm';
import { ShotEntity } from '../models/shot.entity';
import { dataSource } from '../config/database';

@JsonController('/shot')
@Service()
export class ShotController {
  private shotService: ShotService;

  constructor() {
    const shotRepository = dataSource.getRepository(ShotEntity);
    this.shotService = new ShotService(shotRepository);
  }

  /**
   * Получить выстрел по ID
   * @param id ID выстрела
   * @returns Данные выстрела
   */
  @Get('/:id')
  @Authorized()
  @OpenAPI({
    summary: 'Получить выстрел по id',
    description: 'Выстрел',
    responses: {
      '200': {
        description: 'Shot',
        type: 'object',
        $ref: '#/components/schemas/ShotDto',
      },
    },
  })
  async getShotById(@Param('id') id: number): Promise<ShotDto> {
    return await this.shotService.getShotById(id);
  }

  /**
   * Создать выстрел
   * @param dto Данные для создания выстрела
   * @returns Созданный выстрел
   */
  @Post()
  @Authorized()
  @OpenAPI({
    summary: 'Создать выстрел',
    description: 'Выстрел создан',
    responses: {
      '200': {
        description: 'Выстрел создан',
        type: 'object',
        $ref: '#/components/schemas/ShotDto',
      },
    },
  })
  async createShot(@Body() dto: CreateShotDto): Promise<ShotDto> {
    return await this.shotService.createShot(dto);
  }

  /**
   * Обновить выстрел
   * @param id ID выстрела
   * @param dto Новые данные выстрела
   * @returns Обновленный выстрел
   */
  @Patch('/:id')
  @UseBefore(authMiddleware)
  @OpenAPI({
    summary: 'Обновить выстрел',
    description: 'Выстрел обновлён',
    responses: {
      '200': {
        description: 'Выстрел обновлён',
        type: 'object',
        $ref: '#/components/schemas/ShotDto',
      },
    },
  })
  async updateShot(
    @Param('id') id: number,
    @Body() dto: UpdateShotDto,
  ): Promise<ShotDto> {
    return await this.shotService.updateShot(id, dto);
  }

  /**
   * Удалить выстрел
   * @param id ID выстрела
   */
  @Delete('/:id')
  @Authorized()
  @OpenAPI({
    summary: 'Удалить выстрел',
    description: 'Успешно',
    responses: {
      '200': {
        description: 'Успешно',
      },
    },
  })
  async deleteShot(@Param('id') id: number): Promise<void> {
    await this.shotService.deleteShot(id);
  }

  /**
   * Получить выстрелы по ID серии
   * @param seriesId ID серии
   * @returns Список выстрелов
   */
  @Get('/series/:seriesId')
  @Authorized()
  @OpenAPI({
    summary: 'Получить выстрелы по id серии',
    description: 'Список выстрелов',
    responses: {
      '200': {
        description: 'Список выстрелов',
        type: 'array',
        items: { $ref: '#/components/schemas/ShotDto' },
      },
    },
  })
  async getShotsBySeriesId(
    @Param('seriesId') seriesId: number,
  ): Promise<ShotDto[]> {
    return await this.shotService.getShotsBySeriesId(seriesId);
  }
}
