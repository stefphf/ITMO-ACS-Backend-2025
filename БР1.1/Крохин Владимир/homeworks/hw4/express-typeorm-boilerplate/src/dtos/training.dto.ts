import { SeriesDto } from './series.dto';
import { NoteDto } from './note.dto';
import {
    IsDate,
    IsNumber,
    IsOptional,
    IsArray,
    isNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OpenAPI } from 'routing-controllers-openapi';
import { ExerciseDto } from './exercise.dto';
import { WeaponTypeDto } from './weapon-type.dto';
import { TargetDto } from './target.dto';

@OpenAPI({ description: 'DTO для свободной тренировки' })
export class FreeTrainingDto {
    @IsNumber()
    id: number;

    @IsNumber()
    athleteId: number;

    @IsOptional()
    @Type(() => WeaponTypeDto)
    weaponType?: WeaponTypeDto;

    @IsOptional()
    @Type(() => TargetDto)
    target?: TargetDto;

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    startTimeStamp?: Date | null;

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    endTimeStamp?: Date;

    @IsArray()
    @IsOptional()
    @Type(() => SeriesDto)
    series?: SeriesDto[];

    @IsArray()
    @IsOptional()
    @Type(() => NoteDto)
    notes?: NoteDto[];
}

@OpenAPI({ description: 'DTO для квалификационной тренировки' })
export class QualificationTrainingDto {
    @IsNumber()
    id: number;

    @IsNumber()
    athleteId: number;

    @IsOptional()
    @Type(() => ExerciseDto)
    exercise?: ExerciseDto;

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    startTimeStamp?: Date | null;

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    endTimeStamp?: Date;
}

@OpenAPI({ description: 'DTO для создания свободной тренировки' })
export class CreateFreeTrainingDto {
    @IsNumber()
    athleteId: number;

    @IsNumber()
    weaponTypeId: number;

    @IsNumber()
    targetId: number;

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    startTimeStamp?: Date | null;

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    endTimeStamp?: Date | null;
}

@OpenAPI({ description: 'DTO для создания квалификационной тренировки' })
export class CreateQualificationTrainingDto {
    @IsNumber()
    athleteId: number;

    @IsNumber()
    exerciseId: number;

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    startTimeStamp?: Date | null;

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    endTimeStamp?: Date | null;
}

@OpenAPI({ description: 'DTO для обновления свободной тренировки' })
export class UpdateFreeTrainingDto {
    @IsNumber()
    id: number;

    @IsNumber()
    @IsOptional()
    athleteId?: number;

    @IsNumber()
    @IsOptional()
    weaponTypeId?: number;

    @IsNumber()
    @IsOptional()
    targetId?: number;

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    startTimeStamp?: Date | null;

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    endTimeStamp?: Date | null;

    @IsArray()
    @IsOptional()
    @Type(() => SeriesDto)
    series?: SeriesDto[];

    @IsArray()
    @IsOptional()
    @Type(() => NoteDto)
    notes?: NoteDto[];
}

@OpenAPI({ description: 'DTO для обновления квалификационной тренировки' })
export class UpdateQualificationTrainingDto {
    @IsNumber()
    id: number;

    @IsNumber()
    @IsOptional()
    athleteId?: number;

    @IsNumber()
    @IsOptional()
    exerciseId?: number;

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    startTimeStamp?: Date | null;

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    endTimeStamp?: Date;
}

export class AddShotDto {
    @IsNumber()
    x: number;
    @IsNumber()
    y: number;
    @IsNumber()
    score: number;
    @IsNumber()
    time_offset: number;
    @IsNumber()
    series_id: number;
}