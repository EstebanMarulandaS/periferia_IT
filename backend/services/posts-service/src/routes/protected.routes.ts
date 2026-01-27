import { Router } from "express";
import { requireAuth } from "@shared/auth";

export const protectedRouter = Router();

/**
 * @openapi
 * /protected/ping:
 *   get:
 *     summary: Protected ping (requires JWT)
 *     tags: [Protected]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 */
protectedRouter.get("/protected/ping", requireAuth, (req, res) => {
  res.json({
    ok: true,
    message: "You are authenticated ✅",
    auth: (req as any).auth,
    requestId: (req as any).requestId
  });
});
