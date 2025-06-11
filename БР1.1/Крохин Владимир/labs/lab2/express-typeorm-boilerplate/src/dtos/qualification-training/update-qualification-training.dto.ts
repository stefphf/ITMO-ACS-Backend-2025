import { IsDate, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { OpenAPI } from 'routing-controllers-openapi';

@OpenAPI({
    description: 'DTO для обновления квалификационной тренировки',
})
export class UpdateQualificationTrainingDto {
    @IsNumber()
    @IsOptional()
    athleteId?: number;

    @IsNumber()
    @IsOptional()
    exerciseId?: number;

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    startTimeStamp?: Date;

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    endTimeStamp?: Date;
}
