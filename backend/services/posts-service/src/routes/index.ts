import { Router } from "express";
import { healthRouter } from "./health.routes.js";
import { protectedRouter } from "./protected.routes.js";
import { postsRouter } from "./posts.routes.js";

export function buildRoutes() {
  const router = Router();

  // public
  router.use(healthRouter);

  // protected sample route (already protected internally)
  router.use(protectedRouter);

  // posts (ping public, rest protected in router)
  router.use(postsRouter);

  return router;
}
