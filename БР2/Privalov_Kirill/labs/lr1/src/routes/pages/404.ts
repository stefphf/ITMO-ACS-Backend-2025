import { NextFunction, Router, Response, Request } from "express";

const router = Router();

router.get("*", (req: Request, res: Response, next: NextFunction): void => {
  res.status(404).json("404 Not Found");
});

export default router;
