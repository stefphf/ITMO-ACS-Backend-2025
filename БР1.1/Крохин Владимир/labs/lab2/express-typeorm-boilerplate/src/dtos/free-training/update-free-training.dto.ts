import { IsDate, IsNumber, IsOptional, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { OpenAPI } from 'routing-controllers-openapi';

@OpenAPI({
    description: 'DTO для обновления свободной тренировки',
})
export class UpdateFreeTrainingDto {
    @IsNumber()
    @IsOptional()
    @OpenAPI({ description: 'ID спортсмена' })
    athleteId?: number;

    @IsNumber()
    @IsOptional()
    @OpenAPI({ description: 'ID типа оружия' })
    weaponTypeId?: number;

    @IsNumber()
    @IsOptional()
    @OpenAPI({ description: 'ID мишени' })
    targetId?: number;

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    @OpenAPI({ description: 'Время начала тренировки' })
    startTimeStamp?: Date;

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    @OpenAPI({ description: 'Время окончания тренировки' })
    endTimeStamp?: Date;

    @IsArray()
    @IsOptional()
    @OpenAPI({ description: 'Серии выстрелов' })
    series?: any[];

    @IsArray()
    @IsOptional()
    @OpenAPI({ description: 'Заметки' })
    notes?: any[];
}
