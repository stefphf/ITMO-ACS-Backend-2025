import { IsNumber, IsString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { OpenAPI } from 'routing-controllers-openapi';
import { TargetDto } from './target.dto';
import { WeaponTypeDto } from './weapon-type.dto';

@OpenAPI({ description: 'DTO для упражнения' })
export class ExerciseDto {
    @IsNumber()
    id: number;

    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @IsOptional()
    shots_in_series?: number;

    @IsOptional()
    @Type(() => TargetDto)
    target: TargetDto;

    @IsOptional()
    @Type(() => WeaponTypeDto)
    weapon_type: WeaponTypeDto;
}

@OpenAPI({ description: 'DTO для создания упражнения' })
export class CreateExerciseDto {
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    targetId: number;

    @IsNumber()
    weaponTypeId: number;

    @IsNumber()
    shots_in_series: number;
}

@OpenAPI({ description: 'DTO для обновления упражнения' })
export class UpdateExerciseDto {
    @IsNumber()
    id: number;

    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @IsOptional()
    shotsInSeries?: number;

    @IsNumber()
    @IsOptional()
    targetId?: number;
}