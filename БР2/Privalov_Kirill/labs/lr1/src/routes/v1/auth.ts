import { Router } from "express";
import { changePassword, login, register } from "../../controllers/auth";
import { checkJwt } from "../../middleware/checkJwt";
import {
  validatorChangePassword,
  validatorLogin,
  validatorRegister
} from "../../middleware/validation/auth";

const router = Router();

/**
 * @openapi
 * /v1/auth/login:
 *   post:
 *     summary: User login
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token successfully created.
 */
router.post("/login", login);
router.post("/register", register);
router.post("/change-password", checkJwt, changePassword);

export default router;
