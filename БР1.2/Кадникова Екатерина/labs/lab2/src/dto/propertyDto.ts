import { IsString, IsNumber, IsEnum, IsNotEmpty, IsOptional, IsNumberString } from "class-validator";
import { RentalType } from "../models/enums/rentalType";
import { PropertyType } from "../models/enums/propertyType";

export class CreatePropertyDto {
    @IsString()
    @IsNotEmpty()
    title?: string;

    @IsString()
    @IsNotEmpty()
    description?: string;

    @IsEnum(RentalType)
    rental_type?: RentalType;

    @IsNumber()
    price?: number;

    @IsString()
    @IsNotEmpty()
    location?: string;

    @IsEnum(PropertyType)
    property_type?: PropertyType;
}

export class UpdatePropertyDto {
    @IsString()
    title?: string;

    @IsString()
    description?: string;

    @IsEnum(RentalType)
    rental_type?: RentalType;

    @IsNumber()
    price?: number;

    @IsString()
    location?: string;

    @IsEnum(PropertyType)
    property_type?: PropertyType;
}

export class SearchPropertyDto {
    @IsOptional()
    @IsString()
    location?: string;

    @IsOptional()
    @IsNumberString()
    minPrice?: string;

    @IsOptional()
    @IsNumberString()
    maxPrice?: string;

    @IsOptional()
    @IsEnum(PropertyType)
    propertyType?: PropertyType;

    @IsOptional()
    @IsEnum(RentalType)
    rentalType?: RentalType;
}