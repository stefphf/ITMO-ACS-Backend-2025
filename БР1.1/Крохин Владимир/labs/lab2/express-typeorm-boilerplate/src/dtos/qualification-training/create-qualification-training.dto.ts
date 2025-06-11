import { IsDate, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { OpenAPI } from 'routing-controllers-openapi';

@OpenAPI({
    description: 'DTO для создания квалификационной тренировки',
})
export class CreateQualificationTrainingDto {
    @IsNumber()
    athleteId: number;

    @IsNumber()
    exerciseId: number;

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    startTimeStamp?: Date;

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    endTimeStamp?: Date;
}
