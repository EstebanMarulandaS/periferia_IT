import type { NextFunction, Request, Response } from "express";
import { toAuthContext, verifyJwt } from "./jwt.js";

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface Request {
      auth?: {
        userId: string;
        username?: string;
        name?: string;
      };
    }
  }
}

function unauthorized(res: Response, requestId: string | undefined, message = "Unauthorized") {
  return res.status(401).json({ error: message, requestId });
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const requestId = (req as any).requestId as string | undefined;

  const header = req.header("authorization") || "";
  const [type, token] = header.split(" ");

  if (type !== "Bearer" || !token) return unauthorized(res, requestId, "Missing Bearer token");

  try {
    const decoded = verifyJwt(token);
    const ctx = toAuthContext(decoded);

    if (!ctx.userId) return unauthorized(res, requestId, "Invalid token (missing sub)");

    req.auth = ctx;
    next();
  } catch (err: any) {
    return unauthorized(res, requestId, "Invalid or expired token");
  }
}
