import { NextFunction, Router, Response, Request } from "express";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res
    .status(200)
    .header("Content-Type", "text/html")
    .send(`<h4>RESTful API boilerplate</h4>`);
});

export default router;
