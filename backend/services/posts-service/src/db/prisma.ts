import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var __prismaPosts: PrismaClient | undefined;
}

export const prisma =
  global.__prismaPosts ??
  new PrismaClient({
    log: ["error", "warn"]
  });

if (process.env.NODE_ENV !== "production") global.__prismaPosts = prisma;
