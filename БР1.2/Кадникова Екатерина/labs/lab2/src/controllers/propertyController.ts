import { Request, Response } from "express";
import propertyService from "../services/propertyService";
import { CreatePropertyDto, UpdatePropertyDto, SearchPropertyDto } from "../dto/propertyDto";
import { validateDto } from "../utils/validateDto";
import { Role } from "../models/enums/role";

export const getAllProperties = async (req: Request, res: Response) => {
    try {
        const properties = await propertyService.getAllProperties();
        res.json(properties);
    } catch {
        res.status(500).json({ message: "Error fetching properties" });
    }
};

export const getPropertyById = async (req: Request, res: Response) => {
    const propertyId = Number(req.params.id);

    try {
        const property = await propertyService.getPropertyById(propertyId);
        if (!property) {
            res.status(404).json({ message: "Property not found" });
            return;
        }
        res.json(property);
    } catch {
        res.status(500).json({ message: "Error fetching property" });
    }
};

export const createProperty = async (req: Request, res: Response) => {
    const dto = await validateDto(CreatePropertyDto, req.body, res);
    if (!dto) return;

    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    try {
        const property = await propertyService.createProperty(dto, userId);
        res.status(201).json(property);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const updateProperty = async (req: Request, res: Response) => {
    const dto = await validateDto(UpdatePropertyDto, req.body, res);
    if (!dto) return;

    const userId = req.user?.id;
    const roleRaw = req.user?.role;

    if (!userId || !roleRaw || !Object.values(Role).includes(roleRaw as Role)) {
        res.status(401).json({ message: "Unauthorized or invalid role" });
        return;
    }

    const role = roleRaw as Role;
    const propertyId = Number(req.params.id);

    try {
        const property = await propertyService.updateProperty(propertyId, dto, userId, role);
        res.json(property);
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Error updating property" });
    }
};

export const deleteProperty = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const roleRaw = req.user?.role;

    if (!userId || !roleRaw || !Object.values(Role).includes(roleRaw as Role)) {
        res.status(401).json({ message: "Unauthorized or invalid role" });
        return;
    }

    const role = roleRaw as Role;
    const propertyId = Number(req.params.id);

    try {
        const result = await propertyService.deleteProperty(propertyId, userId, role);
        res.json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Error deleting property" });
    }
};

export const searchProperties = async (req: Request, res: Response) => {
    const dto = await validateDto(SearchPropertyDto, req.query, res);
    if (!dto) return;

    try {
        const properties = await propertyService.searchProperties(dto);
        res.json(properties);
    } catch {
        res.status(500).json({ message: "Error searching properties" });
    }
};