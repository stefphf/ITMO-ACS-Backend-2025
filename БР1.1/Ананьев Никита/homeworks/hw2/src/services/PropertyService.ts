import { CreatePropertyDto } from "../dtos/PropertyDtos"
import { ResponsePropertyDto } from "../dtos/PropertyDtos"
import { Property } from "../models/PropertyModel"
import { PropertyMapper } from "../mappers/PropertyMapper"
import { FindManyOptions } from "typeorm"
import { NotFoundError } from "../errors/NotFoundError"
import { BaseService } from "./BaseService"
import { Repository } from "typeorm"


export interface IPropertyService {
    register(propertyData: CreatePropertyDto): Promise<void>
}


export class PropertyService extends BaseService<Property, ResponsePropertyDto> implements IPropertyService{
    constructor(protected readonly repository: Repository<Property>) {
        super(repository)
    }

    protected toDto(model: Property): ResponsePropertyDto {
        return PropertyMapper.toDto(model)
    }

    async register(propertyData: CreatePropertyDto): Promise<void> {
        const property: Property = PropertyMapper.toModel(propertyData)
        try {
            await this.repository.save(property)
        } catch (error: any) {
            console.log(error)
        }
    }

    async filter(filterData: Partial<CreatePropertyDto>): Promise<ResponsePropertyDto[]> {
        const findOptions: FindManyOptions<Property> = {where: filterData}
        const results: ResponsePropertyDto[] = await this.findAll(findOptions)
        if (results.length == 0) 
            throw new NotFoundError("Can't find properties with matched parameters")
        return results
    }
}
