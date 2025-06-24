import { IsNumber, IsOptional, IsArray } from 'class-validator';
import { OpenAPI } from 'routing-controllers-openapi';
import { FreeTrainingDto, QualificationTrainingDto } from './training.dto';

@OpenAPI({ description: 'DTO для спортсмена' })
export class AthleteDto {
    @IsNumber()
    id: number;

    user_id: number;

    @IsArray()
    coaches_ids: number[];

    @IsArray()
    trainings?: (FreeTrainingDto | QualificationTrainingDto)[];
}

@OpenAPI({ description: 'DTO для создания спортсмена' })
export class CreateAthleteDto {
    @IsNumber()
    userId: number;
}
