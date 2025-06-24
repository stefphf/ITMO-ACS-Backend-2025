import { TrainingService } from '../services/training.service';
import {
  UpdateFreeTrainingDto,
  CreateQualificationTrainingDto,
  UpdateQualificationTrainingDto,
} from '../dtos/training.dto';
import { RabbitMQService } from '../services/rabbitmq.service';
import {
  TrainingDtoClass,
  CreateTrainingDtoClass,
  UpdateTrainingDtoClass,
} from '@app/dto';
export declare class TrainingController {
  private trainingService;
  private rabbitMQService;
  constructor(
    trainingService: TrainingService,
    rabbitMQService: RabbitMQService,
  );
  /**
   * Получить все тренировки
   * @returns Список тренировок
   */
  getAllTrainings(): Promise<TrainingDtoClass[]>;
  /**
   * Получить тренировку по ID
   * @param id ID тренировки
   * @returns Данные тренировки
   */
  getTrainingById(id: number): Promise<TrainingDtoClass>;
  /**
   * Создать тренировку
   * @param dto Данные для создания тренировки
   * @returns Созданная тренировка
   */
  createTraining(
    createTrainingDto: CreateTrainingDtoClass,
  ): Promise<TrainingDtoClass>;
  createQualificationTraining(
    training: CreateQualificationTrainingDto,
  ): Promise<import('@app/dto').QualificationTrainingDto>;
  updateFreeTraining(
    id: number,
    training: UpdateFreeTrainingDto,
  ): Promise<import('@app/dto').FreeTrainingDto>;
  updateQualificationTraining(
    id: number,
    training: UpdateQualificationTrainingDto,
  ): Promise<import('@app/dto').QualificationTrainingDto>;
  updateTrainingProgress(
    id: number,
    data: {
      progress: number;
    },
  ): Promise<any>;
  updateTraining(
    id: number,
    updateTrainingDto: UpdateTrainingDtoClass,
  ): Promise<TrainingDtoClass>;
  deleteTraining(id: number): Promise<void>;
}
