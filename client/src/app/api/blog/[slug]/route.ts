import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const post = await prisma.blogPost.findUnique({ where: { slug: params.slug } });
    if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    return NextResponse.json({ ...post, tags: JSON.parse(post.tags || '[]') });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
