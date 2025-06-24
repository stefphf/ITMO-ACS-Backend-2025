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
  HttpCode,
  Put,
  Authorized,
  CurrentUser,
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { TrainingService } from '../services/training.service';
import { dataSource } from '../config/database';
import authMiddleware, {
  RequestWithUser,
} from '../middlewares/auth.middleware';
import { RabbitMQService } from '../services/rabbitmq.service';
import { Service } from 'typedi';
import { RoutingKey, RabbitMQMessage } from '@app/common';
import { TrainingEntity } from '../models/training.entity';
import {
  TrainingDto,
  CreateTrainingDto,
  UpdateTrainingDto,
  FreeTrainingDto,
  CreateFreeTrainingDto,
  UpdateFreeTrainingDto,
  QualificationTrainingDto,
  CreateQualificationTrainingDto,
  UpdateQualificationTrainingDto,
  TrainingType,
} from '@app/dto';
import { CreateSeriesDto, SeriesDto, UpdateSeriesDto } from '@app/dto';

@JsonController('/trainings')
@Service()
export class TrainingController {
  constructor(
    private trainingService: TrainingService,
    private rabbitMQService: RabbitMQService,
  ) {}

  /**
   * Получить все тренировки
   * @returns Список тренировок
   */
  @Get('/')
  @Authorized()
  @OpenAPI({
    summary: 'Получить все тренировки',
    responses: {
      '200': {
        description: 'Список тренировок',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                oneOf: [
                  { $ref: '#/components/schemas/FreeTrainingDto' },
                  { $ref: '#/components/schemas/QualificationTrainingDto' },
                ],
              },
            },
          },
        },
      },
    },
  })
  @ResponseSchema(TrainingDto, { isArray: true })
  async getAllTrainings(): Promise<TrainingDto[]> {
    return this.trainingService.getAllTrainings();
  }

  /**
   * Получить тренировку по ID
   * @param id ID тренировки
   * @returns Данные тренировки
   */
  @Get('/:id')
  @Authorized()
  @OpenAPI({
    summary: 'Получить тренировку по ID',
    responses: {
      '200': {
        description: 'Данные тренировки',
        content: {
          'application/json': {
            schema: {
              oneOf: [
                { $ref: '#/components/schemas/FreeTrainingDto' },
                { $ref: '#/components/schemas/QualificationTrainingDto' },
              ],
            },
          },
        },
      },
    },
  })
  @ResponseSchema(TrainingDto)
  async getTrainingById(@Param('id') id: number): Promise<TrainingDto> {
    return this.trainingService.getTrainingById(id);
  }

  /**
   * Создать тренировку
   * @param dto Данные для создания тренировки
   * @returns Созданная тренировка
   */
  @Post('/')
  @Authorized()
  @OpenAPI({ summary: 'Создать тренировку' })
  @ResponseSchema(TrainingDto)
  async createTraining(
    @Body() createTrainingDto: CreateTrainingDto,
  ): Promise<TrainingDto> {
    const result = await this.trainingService.createTraining(createTrainingDto);
    const message: RabbitMQMessage<{
      id: number;
      type: string;
      data: TrainingDto;
    }> = {
      type: RoutingKey.TRAINING_CREATED,
      data: {
        id: result.id,
        type: result.type,
        data: result,
      },
      timestamp: Date.now(),
    };
    await this.rabbitMQService.sendMessage(
      RoutingKey.TRAINING_CREATED,
      message.data,
    );
    return result;
  }

  @Post('/free')
  @HttpCode(201)
  @OpenAPI({
    summary: 'Создать свободную тренировку',
    responses: {
      '201': {
        description: 'Свободная тренировка создана',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/FreeTrainingDto' },
          },
        },
      },
    },
  })
  @ResponseSchema(FreeTrainingDto)
  async createFreeTraining(
    @Body() training: CreateFreeTrainingDto,
  ): Promise<FreeTrainingDto> {
    const result = await this.trainingService.createFreeTraining(training);
    const message: RabbitMQMessage<{
      id: number;
      type: string;
      data: FreeTrainingDto;
    }> = {
      type: RoutingKey.TRAINING_CREATED,
      data: {
        id: result.id,
        type: 'free',
        data: result,
      },
      timestamp: Date.now(),
    };
    await this.rabbitMQService.sendMessage(
      RoutingKey.TRAINING_CREATED,
      message.data,
    );
    return result;
  }

  @Post('/qualification')
  @HttpCode(201)
  @OpenAPI({
    summary: 'Создать квалификационную тренировку',
    responses: {
      '201': {
        description: 'Квалификационная тренировка создана',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/QualificationTrainingDto' },
          },
        },
      },
    },
  })
  @ResponseSchema(QualificationTrainingDto)
  async createQualificationTraining(
    @Body() training: CreateQualificationTrainingDto,
  ): Promise<QualificationTrainingDto> {
    const result =
      await this.trainingService.createQualificationTraining(training);
    const message: RabbitMQMessage<{
      id: number;
      type: string;
      data: QualificationTrainingDto;
    }> = {
      type: RoutingKey.TRAINING_CREATED,
      data: {
        id: result.id,
        type: 'qualification',
        data: result,
      },
      timestamp: Date.now(),
    };
    await this.rabbitMQService.sendMessage(
      RoutingKey.TRAINING_CREATED,
      message.data,
    );
    return result;
  }

  @Put('/free/:id')
  @OpenAPI({
    summary: 'Обновить свободную тренировку',
    responses: {
      '200': {
        description: 'Свободная тренировка обновлена',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/FreeTrainingDto' },
          },
        },
      },
    },
  })
  @ResponseSchema(FreeTrainingDto)
  async updateFreeTraining(
    @Param('id') id: number,
    @Body() training: UpdateFreeTrainingDto,
  ): Promise<FreeTrainingDto> {
    const result = await this.trainingService.updateFreeTraining(id, training);
    const message: RabbitMQMessage<{
      id: number;
      type: string;
      data: FreeTrainingDto;
    }> = {
      type: RoutingKey.TRAINING_UPDATED,
      data: {
        id: result.id,
        type: 'free',
        data: result,
      },
      timestamp: Date.now(),
    };
    await this.rabbitMQService.sendMessage(
      RoutingKey.TRAINING_UPDATED,
      message.data,
    );
    return result;
  }

  @Put('/qualification/:id')
  @OpenAPI({
    summary: 'Обновить квалификационную тренировку',
    responses: {
      '200': {
        description: 'Квалификационная тренировка обновлена',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/QualificationTrainingDto' },
          },
        },
      },
    },
  })
  @ResponseSchema(QualificationTrainingDto)
  async updateQualificationTraining(
    @Param('id') id: number,
    @Body() training: UpdateQualificationTrainingDto,
  ): Promise<QualificationTrainingDto> {
    const result = await this.trainingService.updateQualificationTraining(
      id,
      training,
    );
    const message: RabbitMQMessage<{
      id: number;
      type: string;
      data: QualificationTrainingDto;
    }> = {
      type: RoutingKey.TRAINING_UPDATED,
      data: {
        id: result.id,
        type: 'qualification',
        data: result,
      },
      timestamp: Date.now(),
    };
    await this.rabbitMQService.sendMessage(
      RoutingKey.TRAINING_UPDATED,
      message.data,
    );
    return result;
  }

  @Put('/:id')
  @OpenAPI({
    summary: 'Обновить тренировку',
    responses: {
      '200': {
        description: 'Тренировка обновлена',
        content: {
          'application/json': {
            schema: {
              oneOf: [
                { $ref: '#/components/schemas/FreeTrainingDto' },
                { $ref: '#/components/schemas/QualificationTrainingDto' },
              ],
            },
          },
        },
      },
    },
  })
  @ResponseSchema(TrainingDto)
  async updateTraining(
    @Param('id') id: number,
    @Body() updateTrainingDto: UpdateTrainingDto,
  ): Promise<TrainingDto> {
    return this.trainingService.updateTraining(id, updateTrainingDto);
  }

  @Delete('/:id')
  @OnUndefined(204)
  @OpenAPI({
    summary: 'Удалить тренировку',
    responses: {
      '204': {
        description: 'Тренировка удалена',
      },
    },
  })
  async deleteTraining(@Param('id') id: number): Promise<void> {
    await this.trainingService.deleteTraining(id);
  }
}
