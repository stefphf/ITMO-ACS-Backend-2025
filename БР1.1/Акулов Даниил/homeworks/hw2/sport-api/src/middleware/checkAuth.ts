import jwt from 'jsonwebtoken'
import 'dotenv/config'
import {ApiError} from "../error/ApiError";
import { NextFunction, Request, Response } from 'express';

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) {
            return next(ApiError.forbidden('Вы не авторизованы.'))
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY ?? '123')
        req.user = Object(decoded)
        next()
    } catch (e) {
        next(ApiError.forbidden('Вы не авторизованы.'))
    }
};

