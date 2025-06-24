import { IsNumber, IsOptional } from 'class-validator';
import { OpenAPI } from 'routing-controllers-openapi';

@OpenAPI({ description: 'DTO для выстрела' })
export class ShotDto {
    @IsNumber()
    id: number;

    @IsNumber()
    seriesId: number;

    @IsNumber()
    x: number;

    @IsNumber()
    y: number;

    @IsNumber()
    score: number;

    @IsNumber()
    timeOffset: number;
}

@OpenAPI({ description: 'DTO для создания выстрела' })
export class CreateShotDto {
    @IsNumber()
    seriesId: number;

    @IsNumber()
    order: number;

    @IsNumber()
    x: number;

    @IsNumber()
    y: number;

    @IsNumber()
    score: number;

    @IsNumber()
    timeOffset: number;
}

@OpenAPI({ description: 'DTO для обновления выстрела' })
export class UpdateShotDto {
    @IsNumber()
    id: number;

    @IsNumber()
    @IsOptional()
    x?: number;

    @IsNumber()
    @IsOptional()
    y?: number;

    @IsNumber()
    @IsOptional()
    score?: number;

    @IsNumber()
    @IsOptional()
    timeOffset?: number;
}
