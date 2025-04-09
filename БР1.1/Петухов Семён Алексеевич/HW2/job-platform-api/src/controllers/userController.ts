import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Получить всех пользователей
export const getUsers = async (req: Request, res: Response) => {
    const users = await prisma.user.findMany();
    res.json(users);
};

// Получить пользователя по ID
export const getUserById = async (req: Request, res: Response) => {
    const user = await prisma.user.findUnique({
        where: { id: Number(req.params.id) }
    });
    res.json(user);
};

// Создать нового пользователя
export const createUser = async (req: Request, res: Response) => {
    const { username, email, password, role, company_id } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: { username, email, password: hashedPassword, role, company_id }
    });

    res.json(newUser);
};

// Удалить пользователя
export const deleteUser = async (req: Request, res: Response) => {
    await prisma.user.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: "Пользователь удален" });
};
