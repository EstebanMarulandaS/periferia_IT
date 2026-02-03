import { prisma } from "../src/db/prisma.js";

async function main() {
  const users = [
    { username: "cristian", name: "Cristian Camilo", password: "secret12" },
    { username: "esteban", name: "Esteban Test", password: "secret123" }
  ];

  for (const u of users) {
    const existing = await prisma.user.findUnique({ where: { username: u.username } });
    if (existing) continue;

    await prisma.user.create({
      data: {
        username: u.username,
        name: u.name,
        password: u.password
      }
    });

    console.log(`[seed][auth] created user ${u.username}`);
  }

  console.log("[seed][auth] done");
}

main()
  .catch((e) => {
    console.error("[seed][auth] failed", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
