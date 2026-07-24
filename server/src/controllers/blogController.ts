import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getBlogPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: 'desc' },
    });
    const parsed = posts.map(p => ({
      ...p,
      tags: JSON.parse(p.tags || '[]'),
    }));
    return res.json(parsed);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getBlogPostBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const post = await prisma.blogPost.findUnique({ where: { slug } });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    return res.json({
      ...post,
      tags: JSON.parse(post.tags || '[]'),
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
