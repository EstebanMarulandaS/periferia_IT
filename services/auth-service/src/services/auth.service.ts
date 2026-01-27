import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { Secret, SignOptions } from "jsonwebtoken";
import { prisma } from "../db/prisma.js";

const JWT_SECRET: Secret = process.env.JWT_SECRET ?? "dev_secret_change_me";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? "1h";
const JWT_SIGN_OPTIONS: SignOptions = { expiresIn: JWT_EXPIRES_IN as any };
const BCRYPT_ROUNDS = Number(process.env.BCRYPT_ROUNDS ?? "10");

export type PublicUser = {
  id: string;
  username: string;
  name: string;
};

export type AuthResponse = {
  token: string;
  user: PublicUser;
};

function toPublicUser(u: any): PublicUser {
  return { id: u.id, username: u.username, name: u.name };
}

export async function registerUser(input: { username: string; name: string; password: string }): Promise<AuthResponse> {
  const existing = await prisma.user.findUnique({ where: { username: input.username } });
  if (existing) {
    const err: any = new Error("Username already exists");
    err.statusCode = 409;
    throw err;
  }

  const hashed = await bcrypt.hash(input.password, BCRYPT_ROUNDS);

  const user = await prisma.user.create({
    data: {
      username: input.username,
      name: input.name,
      password: hashed
    }
  });

  const token = jwt.sign({ username: user.username, name: user.name }, JWT_SECRET, { ...JWT_SIGN_OPTIONS, subject: user.id });

  return { token, user: toPublicUser(user) };
}

export async function loginUser(input: { username: string; password: string }): Promise<AuthResponse> {
  const user = await prisma.user.findUnique({ where: { username: input.username } });
  if (!user) {
    const err: any = new Error("Invalid credentials");
    err.statusCode = 401;
    throw err;
  }

  const ok = await bcrypt.compare(input.password, user.password);
  if (!ok) {
    const err: any = new Error("Invalid credentials");
    err.statusCode = 401;
    throw err;
  }

  const token = jwt.sign({ username: user.username, name: user.name }, JWT_SECRET, { ...JWT_SIGN_OPTIONS, subject: user.id });

  return { token, user: toPublicUser(user) };
}
