export class AddShotDto {
    x: number;
    y: number;
    score: number;
    time_offset: number;

    constructor(data: any) {
        this.x = data.x;
        this.y = data.y;
        this.score = data.score;
        this.time_offset = data.time_offset;
    }
}
