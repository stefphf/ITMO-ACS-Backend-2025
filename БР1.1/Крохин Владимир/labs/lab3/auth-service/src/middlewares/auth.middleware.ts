import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { AppDataSource } from '../config/database';
import { UserEntity } from '../models/user.entity';
import SETTINGS from '../config/settings';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Токен не предоставлен' });
    }

    const decoded = verify(token, SETTINGS.JWT_SECRET_KEY) as {
      user: { id: number };
    };

    const userRepository = AppDataSource.getRepository(UserEntity);
    const user = await userRepository.findOne({ where: { id: decoded.user.id } });

    if (!user) {
      return res.status(401).json({ message: 'Пользователь не найден' });
    }

    (req as any).user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Недействительный токен' });
  }
};
