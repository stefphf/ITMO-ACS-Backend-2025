import { IsNumber, IsString, IsOptional } from 'class-validator';
import { OpenAPI } from 'routing-controllers-openapi';

@OpenAPI({ description: 'DTO для типа оружия' })
export class WeaponTypeDto {
    @IsNumber()
    id: number;

    @IsString()
    name: string;

    @IsString()
    description: string;
}

@OpenAPI({ description: 'DTO для создания типа оружия' })
export class CreateWeaponTypeDto {
    @IsString()
    name: string;

    @IsString()
    description: string;
}

@OpenAPI({ description: 'DTO для обновления типа оружия' })
export class UpdateWeaponTypeDto {
    @IsNumber()
    id: number;

    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;
}
