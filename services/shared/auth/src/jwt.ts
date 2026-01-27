import jwt from "jsonwebtoken";
import type { Secret } from "jsonwebtoken";

export type AuthContext = {
  userId: string;
  username?: string;
  name?: string;
};

export function verifyJwt(token: string) {
  const secret: Secret = process.env.JWT_SECRET ?? "dev_secret_change_me";
  return jwt.verify(token, secret) as any;
}

export function toAuthContext(decoded: any): AuthContext {
  return {
    userId: String(decoded?.sub ?? ""),
    username: decoded?.username,
    name: decoded?.name
  };
}
