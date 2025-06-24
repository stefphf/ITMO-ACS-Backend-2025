import { IsDate, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { OpenAPI } from 'routing-controllers-openapi';

@OpenAPI({
    description: 'DTO для создания свободной тренировки',
})
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
    startTimeStamp?: Date;

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    endTimeStamp?: Date;
}
