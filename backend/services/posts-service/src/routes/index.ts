import { Router } from "express";
import { healthRouter } from "./health.routes.js";
import { protectedRouter } from "./protected.routes.js";
import { postsRouter } from "./posts.routes.js";

export function buildRoutes() {
  const router = Router();

  // public
  router.use(healthRouter);

  // protected route to test.
  router.use(protectedRouter);

  // posts routes.
  router.use(postsRouter);

  return router;
}
