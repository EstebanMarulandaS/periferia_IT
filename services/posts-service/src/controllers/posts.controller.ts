import type { Request, Response } from "express";
import { z } from "zod";
import {
  createPost,
  deletePostOwned,
  getPostById,
  listPosts
} from "../services/posts.service.js";

const createSchema = z.object({
  title: z.string().min(1).max(120),
  content: z.string().min(1).max(10_000)
});

function authUserId(req: Request) {
  return (req as any).auth?.userId as string | undefined;
}

export async function create(req: Request, res: Response) {
  const requestId = (req as any).requestId;
  const userId = authUserId(req);
  if (!userId) return res.status(401).json({ error: "Unauthorized", requestId });

  const parsed = createSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Bad Request", details: parsed.error.flatten(), requestId });

  const post = await createPost(userId, parsed.data);
  return res.status(201).json({ ok: true, post, requestId });
}

export async function list(_req: Request, res: Response) {
  const requestId = (res.req as any)?.requestId;
  const posts = await listPosts();
  return res.status(200).json({ ok: true, posts, requestId });
}

export async function get(req: Request, res: Response) {
  const requestId = (req as any).requestId;
  const id = req.params.id;

  const post = await getPostById(id);
  if (!post) return res.status(404).json({ error: "Post not found", requestId });

  return res.status(200).json({ ok: true, post, requestId });
}

export async function remove(req: Request, res: Response) {
  const requestId = (req as any).requestId;
  const userId = authUserId(req);
  if (!userId) return res.status(401).json({ error: "Unauthorized", requestId });

  const ok = await deletePostOwned(req.params.id, userId);
  if (!ok) return res.status(404).json({ error: "Post not found or not owned", requestId });

  return res.status(200).json({ ok: true, requestId });
}
