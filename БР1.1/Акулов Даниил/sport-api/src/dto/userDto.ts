import { IsEmail, IsString } from "class-validator";
import { Type } from "class-transformer";

export class RegistrationDto {
    @IsEmail()
    @Type(() => String)
    email: string;

    @IsString()
    @Type(() => String)
    name: string;

    @IsString()
    @Type(() => String)
    password: string;
}

export class LoginDto {
    @IsEmail()
    @Type(() => String)
    email: string;

    @IsString()
    @Type(() => String)
    password: string;
}