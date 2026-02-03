import { z } from "zod";
import type { Request, Response } from "express";
import { loginUser, registerUser } from "../services/auth.service.js";

// Schema to register a new user.
const registerSchema = z.object({
  username: z.string().min(3).max(30),
  name: z.string().min(2).max(80),
  password: z.string().min(6).max(100),
});

// Schema to process the login of an user.
const loginSchema = z.object({
  username: z.string().min(3).max(30),
  password: z.string().min(6).max(100),
});

// Callback function to reponse with a bad request message.
function badRequest(res: Response, requestId: string | undefined, details: unknown) {
  return res.status(400).json({ error: "Bad Request", details, requestId });
}

// Callback function to response a different message based on the error.
function fail(res: Response, err: any, requestId: string | undefined) {
  const status = typeof err?.statusCode === "number" ? err.statusCode : 500;
  const message = status === 500 ? "Internal Server Error" : (err?.message ?? "Error");
  return res.status(status).json({ error: message, requestId });
}

export async function register(req: Request, res: Response) {
  const requestId = (req as any).requestId;

  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) return badRequest(res, requestId, parsed.error.flatten());

  try {
    const result = await registerUser(parsed.data);
    return res.status(201).json({ ...result, requestId });
  } catch (err: any) {
    return fail(res, err, requestId);
  }
}

export async function login(req: Request, res: Response) {
  const requestId = (req as any).requestId;

  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return badRequest(res, requestId, parsed.error.flatten());

  try {
    const result = await loginUser(parsed.data);
    return res.status(200).json({ ...result, requestId });
  } catch (err: any) {
    return fail(res, err, requestId);
  }
}
