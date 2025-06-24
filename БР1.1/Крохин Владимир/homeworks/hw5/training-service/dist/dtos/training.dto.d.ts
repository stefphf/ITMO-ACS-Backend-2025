import { SeriesDto } from './series.dto';
import {
  IBaseTrainingDto,
  ICreateTrainingDto,
  IUpdateTrainingDto,
  IFreeTrainingDto,
  ICreateFreeTrainingDto,
  IUpdateFreeTrainingDto,
  IQualificationTrainingDto,
  ICreateQualificationTrainingDto,
  IUpdateQualificationTrainingDto,
} from '@app/dto';
/**
 * Базовый DTO для тренировки
 */
export declare class TrainingDto implements IBaseTrainingDto {
  id: number;
  athleteId: number;
  startTs: Date;
  endTs?: Date;
  scheduledDate?: Date;
  totalScore?: number;
  series?: SeriesDto[];
  createdAt: Date;
  updatedAt: Date;
}
/**
 * DTO для создания тренировки
 */
export declare class CreateTrainingDto implements ICreateTrainingDto {
  athleteId: number;
  startTs: Date;
  endTs?: Date;
  scheduledDate?: Date;
  totalScore?: number;
}
/**
 * DTO для обновления тренировки
 */
export declare class UpdateTrainingDto implements IUpdateTrainingDto {
  startTs?: Date;
  endTs?: Date;
  scheduledDate?: Date;
  totalScore?: number;
}
export declare class UpdateFreeTrainingDto
  extends UpdateTrainingDto
  implements IUpdateFreeTrainingDto
{
  weaponTypeId?: number;
  targetId?: number;
}
/**
 * DTO для создания свободной тренировки
 */
export declare class CreateFreeTrainingDto
  extends CreateTrainingDto
  implements ICreateFreeTrainingDto
{
  weaponTypeId: number;
  targetId: number;
}
/**
 * DTO для ответа с данными свободной тренировки
 */
export declare class FreeTrainingDto
  extends TrainingDto
  implements IFreeTrainingDto
{
  weaponTypeId: number;
  targetId: number;
}
/**
 * DTO для создания квалификационной тренировки
 */
export declare class CreateQualificationTrainingDto
  extends CreateTrainingDto
  implements ICreateQualificationTrainingDto
{
  exerciseId: number;
}
/**
 * DTO для обновления квалификационной тренировки
 */
export declare class UpdateQualificationTrainingDto
  extends UpdateTrainingDto
  implements IUpdateQualificationTrainingDto
{
  exerciseId?: number;
}
/**
 * DTO для ответа с данными квалификационной тренировки
 */
export declare class QualificationTrainingDto
  extends TrainingDto
  implements IQualificationTrainingDto
{
  exerciseId: number;
}
