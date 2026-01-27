import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";

export const authRouter = Router();

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 */
authRouter.post("/auth/register", register); // Auth route for user registration

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Login
 *     tags: [Auth]
 */
authRouter.post("/auth/login", login); // Auth route for user login
