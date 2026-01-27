import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.$queryRaw<Array<{ id: string; username: string }>>`
    SELECT id, username FROM auth."User" WHERE username IN ('cristian', 'esteban')
  `;

  const byUsername = new Map(users.map((u: { username: any; id: any; }) => [u.username, u.id]));

  const seedPosts = [
    {
      title: "Hola mundo",
      content: "Mi primer post",
      authorUsername: "cristian"
    },
    {
      title: "Segundo post",
      content: "Probando el sistema",
      authorUsername: "esteban"
    }
  ];

  for (const p of seedPosts) {
    const authorId = byUsername.get(p.authorUsername);
    if (!authorId) {
      console.log(`[seed][posts] skip: author ${p.authorUsername} not found`);
      continue;
    }

    const existing = await prisma.post.findFirst({
      where: { title: p.title, authorId }
    });

    if (existing) continue;

    await prisma.post.create({
      data: {
        title: p.title,
        content: p.content,
        authorId
      }
    });

    console.log(`[seed][posts] created post "${p.title}" for ${p.authorUsername}`);
  }

  console.log("[seed][posts] done");
}

main()
  .catch((e) => {
    console.error("[seed][posts] failed", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
