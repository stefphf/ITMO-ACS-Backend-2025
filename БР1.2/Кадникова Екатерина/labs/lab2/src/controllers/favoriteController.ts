import { Request, Response } from "express";
import { CreateFavoriteDto, UpdateFavoriteDto } from "../dto/favoriteDto";
import { validateDto } from "../utils/validateDto";
import favoriteService from "../services/favoriteService";

export const getAllFavorites = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const favorites = await favoriteService.getAllFavorites(userId);
        res.json(favorites);
    } catch (error) {
        res.status(500).json({ message: "Error fetching favorites" });
    }
};

export const getFavoriteById = async (req: Request, res: Response) => {
    try {
        const favoriteId = Number(req.params.id);
        const userId = req.user?.id;

        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const favorite = await favoriteService.getFavoriteById(favoriteId, userId);
        if (!favorite) {
            res.status(404).json({ message: "Favorite not found" });
            return;
        }

        res.json(favorite);
    } catch (error) {
        res.status(500).json({ message: "Error fetching favorite" });
    }
};

export const addFavorite = async (req: Request, res: Response) => {
    const dto = await validateDto(CreateFavoriteDto, req.body, res);
    if (!dto) return;

    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    try {
        const newFavorite = await favoriteService.addFavorite(userId, dto);
        res.status(201).json(newFavorite);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const updateFavorite = async (req: Request, res: Response) => {
    const dto = await validateDto(UpdateFavoriteDto, req.body, res);
    if (!dto) return;

    const favoriteId = Number(req.params.id);
    const userId = req.user?.id;

    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    try {
        const updatedFavorite = await favoriteService.updateFavorite(userId, favoriteId, dto);
        res.json(updatedFavorite);
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Error updating favorite" });
    }
};

export const removeFavorite = async (req: Request, res: Response) => {
    const favoriteId = Number(req.params.id);
    const userId = req.user?.id;

    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    try {
        const result = await favoriteService.removeFavorite(userId, favoriteId);
        res.json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Error removing favorite" });
    }
};

export const getUserFavorites = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const favorites = await favoriteService.getUserFavorites(userId);
        res.json(favorites);
    } catch (error) {
        res.status(500).json({ message: "Error fetching favorites" });
    }
};