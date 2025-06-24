import { Router, Request, Response } from 'express';
import { UserController } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { RequestWithUser } from '../interfaces/request.interface';

const router = Router();
const userController = new UserController();

router.post('/change-password', authMiddleware, (req: Request, res: Response) =>
  userController.changePassword(req as RequestWithUser, res),
);

export const userRouter = router;
