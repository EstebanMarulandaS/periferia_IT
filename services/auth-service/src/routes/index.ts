import { Router } from "express";
import { healthRouter } from "./health.routes.js";
import { authRouter } from "./auth.routes.js";

export function buildRoutes() {
  const router = Router();

  router.use(healthRouter);
  router.use(authRouter);

  return router;
}
