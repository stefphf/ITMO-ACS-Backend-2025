import { IsDate, IsNumber, IsOptional, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { OpenAPI } from 'routing-controllers-openapi';

@OpenAPI({
    description: 'DTO для свободной тренировки',
})
export class FreeTrainingDto {
    @IsNumber()
    @OpenAPI({ description: 'ID тренировки' })
    id: number;

    @IsNumber()
    @OpenAPI({ description: 'ID спортсмена' })
    athleteId: number;

    @IsNumber()
    @OpenAPI({ description: 'ID типа оружия' })
    weaponTypeId: number;

    @IsNumber()
    @OpenAPI({ description: 'ID мишени' })
    targetId: number;

    @IsDate()
    @Type(() => Date)
    @OpenAPI({ description: 'Время начала тренировки' })
    startTimeStamp: Date;

    @IsDate()
    @Type(() => Date)
    @OpenAPI({ description: 'Время окончания тренировки' })
    endTimeStamp: Date;

    @IsArray()
    @IsOptional()
    @OpenAPI({ description: 'Серии выстрелов' })
    series?: any[];

    @IsArray()
    @IsOptional()
    @OpenAPI({ description: 'Заметки' })
    notes?: any[];
}
