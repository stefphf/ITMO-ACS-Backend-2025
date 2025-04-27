import { RentStatus } from "../models/RentModel"


export class ResponseRentDto {
    id!: number
    terms: string = ""
    price!: number
    paymentFrequency: number = 1
    status!: RentStatus
    startDate!: Date
    endDate?: Date
    rentingId!: number
    propertyId!: number
}

export class CreateRentDto {
    terms: string = ""
    price!: number
    paymentFrequency: number = 1
    status: RentStatus = RentStatus.FUTURE
    startDate!: Date
    endDate?: Date
    rentingId!: number
    propertyId!: number
}

export class ChangeRentStatusDto {
    id!: number
    status!: RentStatus
}
