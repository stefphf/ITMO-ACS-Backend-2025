import { AppDataSource } from "../data-source";
import { Rental } from "../models/rental";
import { Property } from "../models/property";
import { User } from "../models/user";
import { RentalStatus } from "../models/enums/rentalStatus";
import { CreateRentalDto, UpdateRentalDto } from "../dto/rentalDto";

const rentalRepository = AppDataSource.getRepository(Rental);
const propertyRepository = AppDataSource.getRepository(Property);
const userRepository = AppDataSource.getRepository(User);

class RentalService {
    async getAllRentals() {
        return rentalRepository.find({
            relations: ['property', 'tenant', 'property.owner'],
            order: { started_at: 'DESC' }
        });
    }

    async getRentalById(id: number) {
        return rentalRepository.findOne({
            where: { id },
            relations: ['property', 'tenant', 'property.owner']
        });
    }

    async getUserRentals(userId: number) {
        return rentalRepository.find({
            where: { tenant: { id: userId } },
            relations: ['property', 'tenant', 'property.owner'],
            order: { started_at: 'DESC' }
        });
    }

    async createRental(createRentalDto: CreateRentalDto, userId: number) {
        const { propertyId, started_at, ended_at } = createRentalDto;
        const startDate = new Date(started_at);
        const endDate = new Date(ended_at);

        if (startDate >= endDate) {
            throw new Error("End date must be after start date");
        }

        const [property, tenant] = await Promise.all([
            propertyRepository.findOneBy({ id: propertyId }),
            userRepository.findOneBy({ id: userId })
        ]);

        if (!property) {
            throw new Error("Property not found");
        }

        if (!tenant) {
            throw new Error("User not found");
        }

        const conflictingRental = await rentalRepository
            .createQueryBuilder('rental')
            .where('rental.propertyId = :propertyId', { propertyId })
            .andWhere('rental.status = :status', { status: RentalStatus.ACTIVE })
            .andWhere('(rental.started_at <= :ended AND rental.ended_at >= :started)', {
                started: startDate,
                ended: endDate
            })
            .getOne();

        if (conflictingRental) {
            throw new Error("Property is already rented for selected dates");
        }

        const rental = rentalRepository.create({
            property,
            tenant,
            started_at: startDate,
            ended_at: endDate,
            status: RentalStatus.ACTIVE
        });

        await rentalRepository.save(rental);
        return rental;
    }

    async updateRentalStatus(rentalId: number, status: RentalStatus, userId: number, isAdmin: boolean) {
        const rental = await rentalRepository.findOne({
            where: { id: rentalId },
            relations: ['tenant', 'property', 'property.owner']
        });

        if (!rental) {
            throw new Error("Rental not found");
        }

        const isTenant = rental.tenant.id === userId;
        const isOwner = rental.property.owner.id === userId;

        if (!isTenant && !isOwner && !isAdmin) {
            throw new Error("Forbidden");
        }

        rental.status = status;
        await rentalRepository.save(rental);

        return rental;
    }

    async updateRental(rentalId: number, updateRentalDto: UpdateRentalDto, userId: number, isAdmin: boolean) {
        const rental = await rentalRepository.findOne({
            where: { id: rentalId },
            relations: ['tenant', 'property', 'property.owner']
        });

        if (!rental) {
            throw new Error("Rental not found");
        }

        const isTenant = rental.tenant.id === userId;
        const isOwner = rental.property.owner.id === userId;

        if (!isTenant && !isOwner && !isAdmin) {
            throw new Error("Forbidden");
        }

        if (updateRentalDto.started_at) rental.started_at = new Date(updateRentalDto.started_at);
        if (updateRentalDto.ended_at) rental.ended_at = new Date(updateRentalDto.ended_at);
        if (updateRentalDto.status && Object.values(RentalStatus).includes(updateRentalDto.status)) {
            rental.status = updateRentalDto.status;
        }

        if (rental.started_at >= rental.ended_at) {
            throw new Error("End date must be after start date");
        }

        await rentalRepository.save(rental);

        return rental;
    }

    async deleteRental(rentalId: number) {
        const rental = await rentalRepository.findOneBy({ id: rentalId });

        if (!rental) {
            throw new Error("Rental not found");
        }

        await rentalRepository.remove(rental);
    }
}

export default new RentalService();