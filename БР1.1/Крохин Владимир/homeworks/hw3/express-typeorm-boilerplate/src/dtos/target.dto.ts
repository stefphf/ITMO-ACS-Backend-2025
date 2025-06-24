import { IsNumber, IsString, IsOptional } from 'class-validator';
import { OpenAPI } from 'routing-controllers-openapi';

@OpenAPI({ description: 'DTO для мишени' })
export class TargetDto {
    @IsNumber()
    id: number;

    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    image?: string; // base64 string or url
}

@OpenAPI({ description: 'DTO для создания мишени' })
export class CreateTargetDto {
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    image?: string; // base64 string or url
}

@OpenAPI({ description: 'DTO для обновления мишени' })
export class UpdateTargetDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    image?: string; // base64 string or url
}
