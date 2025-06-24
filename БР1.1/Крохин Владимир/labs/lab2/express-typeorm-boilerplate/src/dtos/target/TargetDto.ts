export class TargetDto {
    id?: number;
    name!: string;
    description?: string;
    image?: string; // base64 string or url
}

export class CreateTargetDto {
    name!: string;
    description?: string;
    image?: string; // base64 string or url
}

export class UpdateTargetDto {
    name?: string;
    description?: string;
    image?: string; // base64 string or url
}
