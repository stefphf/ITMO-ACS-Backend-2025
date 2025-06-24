import { IsNumber, Min, Max } from 'class-validator';

export class CreateShotDto {
    @IsNumber()
    @Min(0)
    @Max(10)
    x: number;

    @IsNumber()
    @Min(0)
    @Max(10)
    y: number;

    @IsNumber()
    @Min(0)
    @Max(10.9)
    score: number;

    @IsNumber()
    @Min(0)
    time_offset: number;
}
