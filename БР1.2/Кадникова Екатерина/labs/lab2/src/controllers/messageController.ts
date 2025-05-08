import { Request, Response } from "express";
import messageService from "../services/messageService";
import { validateDto } from "../utils/validateDto";
import { SendMessageDto, UpdateMessageDto } from "../dto/messageDto";

export const getAllMessages = async (req: Request, res: Response) => {
    if (!req.user || req.user.role !== "admin") {
        res.status(403).json({ message: "Forbidden" });
        return;
    }

    try {
        const messages = await messageService.getAllMessages();
        res.json(messages);
    } catch {
        res.status(500).json({ message: "Error fetching messages" });
    }
};

export const getMessageById = async (req: Request, res: Response) => {
    if (!req.user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    try {
        const id = Number(req.params.id);
        const message = await messageService.getMessageById(id, req.user.id);
        if (!message) {
            res.status(404).json({ message: "Not found" });
            return;
        }
        res.json(message);
    } catch (err) {
        res.status(403).json({ message: err instanceof Error ? err.message : "Forbidden" });
    }
};

export const sendMessage = async (req: Request, res: Response) => {
    if (!req.user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    const dto = await validateDto(SendMessageDto, req.body, res);
    if (!dto) return;

    try {
        const message = await messageService.sendMessage(dto, req.user.id);
        res.status(201).json(message);
    } catch (err) {
        res.status(400).json({ message: err instanceof Error ? err.message : "Failed to send" });
    }
};

export const getUsersDiscussions = async (req: Request, res: Response) => {
    if (!req.user || isNaN(req.user.id)) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    try {
        const userId = req.user.id;
        const discussions = await messageService.getUserDiscussions(userId);
        res.json({ discussions, total: discussions.length });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error loading discussions" });
    }
};

export const getPropertyMessages = async (req: Request, res: Response) => {
    if (!req.user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    const propertyId = Number(req.params.propertyId);
    if (isNaN(propertyId)) {
        res.status(400).json({ message: "Invalid property ID" });
        return;
    }

    try {
        const messages = await messageService.getPropertyMessages(propertyId, req.user.id);
        res.json(messages);
    } catch (err) {
        res.status(403).json({ message: err instanceof Error ? err.message : "Forbidden" });
    }
};

export const updateMessage = async (req: Request, res: Response) => {
    if (!req.user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    const dto = await validateDto(UpdateMessageDto, req.body, res);
    if (!dto) return;

    try {
        const message = await messageService.updateMessage(Number(req.params.id), dto, req.user.id);
        res.json(message);
    } catch (err) {
        res.status(400).json({ message: err instanceof Error ? err.message : "Failed to update" });
    }
};

export const deleteMessage = async (req: Request, res: Response) => {
    if (!req.user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    try {
        await messageService.deleteMessage(Number(req.params.id), req.user.id);
        res.json({ message: "Message deleted successfully" });
    } catch (err) {
        res.status(403).json({ message: err instanceof Error ? err.message : "Forbidden" });
    }
};