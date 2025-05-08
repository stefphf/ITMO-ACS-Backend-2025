import { Request, Response } from "express";
import rentalService from "../services/rentalService";
import { CreateRentalDto, UpdateRentalDto } from "../dto/rentalDto";
import { validateDto } from "../utils/validateDto";
import { RentalStatus } from "../models/enums/rentalStatus";
import { Role } from "../models/enums/role";

export const getAllRentals = async (req: Request, res: Response) => {
    try {
        const rentals = await rentalService.getAllRentals();
        res.json(rentals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching all rentals" });
    }
};

export const getRentalById = async (req: Request, res: Response) => {
    const rentalId = Number(req.params.id);
    try {
        const rental = await rentalService.getRentalById(rentalId);
        if (!rental) {
            res.status(404).json({ message: "Rental not found" });
            return;
        }
        res.json(rental);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching rental" });
    }
};

export const getUserRentals = async (req: Request, res: Response) => {
    if (!req.user?.id) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    try {
        const rentals = await rentalService.getUserRentals(req.user.id);
        res.json(rentals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching user rentals" });
    }
};

export const createRental = async (req: Request, res: Response) => {
    if (!req.user?.id) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    const dto = await validateDto(CreateRentalDto, req.body, res);
    if (!dto) return;

    try {
        const rental = await rentalService.createRental(dto, req.user.id);
        res.status(201).json(rental);
    } catch (error) {
        if (error instanceof Error) {
            console.error(error);
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: "An unexpected error occurred" });
        }
    }
};

export const updateRentalStatus = async (req: Request, res: Response) => {
    if (!req.user?.id) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    const rentalId = Number(req.params.id);
    const { status }: { status: RentalStatus } = req.body;

    if (!Object.values(RentalStatus).includes(status)) {
        res.status(400).json({ message: "Invalid status value" });
        return;
    }

    try {
        const updatedRental = await rentalService.updateRentalStatus(
            rentalId,
            status,
            req.user.id,
            req.user.role === Role.ADMIN
        );
        res.json(updatedRental);
    } catch (error) {
        if (error instanceof Error) {
            console.error(error);
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: "An unexpected error occurred" });
        }
    }
};

export const updateRental = async (req: Request, res: Response) => {
    if (!req.user?.id) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    const dto = await validateDto(UpdateRentalDto, req.body, res);
    if (!dto) return;

    try {
        const rental = await rentalService.updateRental(
            Number(req.params.id),
            dto,
            req.user.id,
            req.user.role === Role.ADMIN
        );
        res.json(rental);
    } catch (error) {
        if (error instanceof Error) {
            console.error(error);
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: "An unexpected error occurred" });
        }
    }
};

export const deleteRental = async (req: Request, res: Response) => {
    if (!req.user?.id || req.user.role !== Role.ADMIN) {
        res.status(403).json({ message: "Forbidden: Admin only" });
        return;
    }

    const rentalId = Number(req.params.id);

    try {
        await rentalService.deleteRental(rentalId);
        res.json({ message: "Rental deleted successfully" });
    } catch (error) {
        if (error instanceof Error) {
            console.error(error);
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: "An unexpected error occurred" });
        }
    }
};