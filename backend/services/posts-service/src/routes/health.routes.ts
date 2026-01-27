import { Router } from "express";

export const healthRouter = Router();

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Health check
 *     description: Returns service status and a requestId for traceability.
 *     responses:
 *       200:
 *         description: OK
 *         headers:
 *           x-request-id:
 *             description: Request correlation id
 *             schema:
 *               type: string
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 service:
 *                   type: string
 *                 requestId:
 *                   type: string
 */
healthRouter.get("/health", (req, res) => {
  res.json({
    ok: true,
    service: process.env.SERVICE_NAME ?? "service",
    requestId: (req as any).requestId
  });
});
