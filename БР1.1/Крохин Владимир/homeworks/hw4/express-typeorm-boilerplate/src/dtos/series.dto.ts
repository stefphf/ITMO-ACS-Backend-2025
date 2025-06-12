import { IsNumber, IsOptional, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { OpenAPI } from 'routing-controllers-openapi';
import { ShotDto } from './shot.dto';

@OpenAPI({ description: 'DTO для серии' })
export class SeriesDto {
    @IsNumber()
    id: number;

    @IsArray()
    @IsOptional()
    @Type(() => ShotDto)
    shots?: ShotDto[];

    @IsNumber()
    @IsOptional()
    timeOffset?: number;
}

@OpenAPI({ description: 'DTO для создания серии' })
export class CreateSeriesDto {
    @IsNumber()
    trainingId: number;
    
    @IsNumber()
    @IsOptional()
    maxShots?: number;
}

@OpenAPI({ description: 'DTO для обновления серии' })
export class UpdateSeriesDto {
    @IsNumber()
    @IsOptional()
    trainingId?: number;
}