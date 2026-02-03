import { prisma } from "../db/prisma.js";

export type CreatePostInput = { title: string; content: string };
export type UpdatePostInput = { postId: string; userId: string; data: { title?: string; content?: string } };

export async function createPost(authorId: string, input: CreatePostInput) {
  return prisma.post.create({
    data: {
      title: input.title,
      content: input.content,
      authorId
    },
    select: {
      id: true,
      title: true,
      content: true,
      authorId: true,
      createdAt: true,
      updatedAt: true
    }
  });
}

export async function listPosts() {
  return prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      content: true,
      authorId: true,
      createdAt: true,
      updatedAt: true
    }
  });
}

export async function getPostById(id: string) {
  return prisma.post.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      content: true,
      authorId: true,
      createdAt: true,
      updatedAt: true
    }
  });
}

export async function updatePost(input: UpdatePostInput) {
  return prisma.post.update({
    where: { id: input.postId },
    data: input.data
  });
}

export async function deletePostOwned(id: string, authorId: string) {
  const deleted = await prisma.post.deleteMany({
    where: { id, authorId }
  });

  return deleted.count > 0;
}
