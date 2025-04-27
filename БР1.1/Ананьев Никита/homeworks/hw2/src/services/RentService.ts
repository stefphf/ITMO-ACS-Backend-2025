import { RentMapper } from "../mappers/RentMapper"
import { Rent } from "../models/RentModel"
import { CreateRentDto, ChangeRentStatusDto, ResponseRentDto } from "../dtos/RentDtos"
import { Repository } from "typeorm"
import { NotFoundError } from "../errors/NotFoundError"
import { BaseService } from "./BaseService";

export interface IRentService {
    startRent(rentData: CreateRentDto): Promise<void>
    endRent(statusData: ChangeRentStatusDto): Promise<void> 
}

export class RentService extends BaseService<Rent, ResponseRentDto> implements IRentService {
    constructor(protected readonly repository: Repository<Rent>) {
        super(repository)
    }

    protected toDto(model: Rent): ResponseRentDto {
        return RentMapper.toDto(model)
    }

    async startRent(rentData: CreateRentDto): Promise<void> {
        const rent: Rent = RentMapper.toModel(rentData)
        try {
            await this.repository.save(rent)
        } catch (error: any) {
            console.log(error)
        }
    }

    async endRent(statusData: ChangeRentStatusDto): Promise<void> {
        const rent: Rent | null = await this.repository.findOneBy({ id: statusData.id })
        if (!rent) 
            throw new NotFoundError("Can't find rent with this id")
        
        rent.endDate = new Date()
        rent.status = statusData.status

        try {
            await this.repository.save(rent)
        } catch (error: any) {
            console.log(error)
        }
    }
}
