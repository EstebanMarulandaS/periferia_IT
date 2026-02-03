import { Router } from "express";
import { requireAuth } from "@shared/auth";
import * as postsController from "../controllers/posts.controller.js";

export const postsRouter = Router();

/**
 * @openapi
 * /posts/_ping:
 *   get:
 *     summary: Ping route for posts module
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: OK
 */
postsRouter.get("/posts/_ping", (req, res) => {
  res.json({ ok: true, route: "/posts/_ping", requestId: (req as any).requestId });
});

/**
 * @openapi
 * /posts:
 *   get:
 *     summary: List posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: OK
 */
postsRouter.get("/posts", postsController.list);

/**
 * @openapi
 * /posts/{id}:
 *   get:
 *     summary: Get a post by id
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not Found
 */
postsRouter.get("/posts/:id", postsController.get);

/**
 * @openapi
 * /posts:
 *   post:
 *     summary: Create a post (requires JWT)
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, content]
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 *       401:
 *         description: Unauthorized
 */
postsRouter.post("/posts", requireAuth, postsController.create);

/**
 * @openapi
 * /posts/{id}:
 *   delete:
 *     summary: Delete a post (requires JWT)
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not Found
 */
postsRouter.delete("/posts/:id", requireAuth, postsController.remove);

/**
 * @openapi
 * /posts:
 *   /posts/:id:
 *     summary: Update an specific post (requires JWT)
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, content]
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated
 *       401:
 *         description: Unauthorized
 */
postsRouter.put("/posts/:id", requireAuth, postsController.update);