import { Router } from "express";
import v1 from "./v1/";

import page404 from "./pages/404";
import pageRoot from "./pages/root";

const router = Router();

router.use("/v1", v1);
router.use(pageRoot);
router.use(page404);

export default router;
