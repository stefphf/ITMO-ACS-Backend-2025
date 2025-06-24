import { IsNumber, IsOptional, IsArray } from 'class-validator';
import { OpenAPI } from 'routing-controllers-openapi';

@OpenAPI({ description: 'DTO для тренера' })
export class CoachDto {
    @IsNumber()
    id: number;

    user_id: number;

    @IsArray()
    athletes_ids: number[];
}

@OpenAPI({ description: 'DTO для создания тренера' })
export class CreateCoachDto {
    @IsNumber()
    user_id: number;
}
