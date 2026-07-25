import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    let post = await prisma.blogPost.findUnique({ where: { slug: params.slug } });
    if (!post) post = await prisma.blogPost.findUnique({ where: { id: params.slug } });

    if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    return NextResponse.json({ ...post, tags: JSON.parse(post.tags || '[]') });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const data = await req.json();

    let post = await prisma.blogPost.findUnique({ where: { slug: params.slug } });
    if (!post) post = await prisma.blogPost.findUnique({ where: { id: params.slug } });

    if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });

    const updated = await prisma.blogPost.update({
      where: { id: post.id },
      data: {
        slug: data.slug !== undefined ? data.slug : post.slug,
        titleEn: data.titleEn !== undefined ? data.titleEn : post.titleEn,
        titleAr: data.titleAr !== undefined ? data.titleAr : post.titleAr,
        excerptEn: data.excerptEn !== undefined ? data.excerptEn : post.excerptEn,
        excerptAr: data.excerptAr !== undefined ? data.excerptAr : post.excerptAr,
        contentEn: data.contentEn !== undefined ? data.contentEn : post.contentEn,
        contentAr: data.contentAr !== undefined ? data.contentAr : post.contentAr,
        categoryEn: data.categoryEn !== undefined ? data.categoryEn : post.categoryEn,
        categoryAr: data.categoryAr !== undefined ? data.categoryAr : post.categoryAr,
        tags: data.tags !== undefined ? JSON.stringify(data.tags) : post.tags,
        coverImage: data.coverImage !== undefined ? data.coverImage : post.coverImage,
        author: data.author !== undefined ? data.author : post.author,
        readingTime: data.readingTime !== undefined ? data.readingTime : post.readingTime,
        isPublished: data.isPublished !== undefined ? data.isPublished : post.isPublished,
        seoTitleEn: data.seoTitleEn !== undefined ? data.seoTitleEn : post.seoTitleEn,
        seoDescEn: data.seoDescEn !== undefined ? data.seoDescEn : post.seoDescEn,
        seoTitleAr: data.seoTitleAr !== undefined ? data.seoTitleAr : post.seoTitleAr,
        seoDescAr: data.seoDescAr !== undefined ? data.seoDescAr : post.seoDescAr,
      },
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    let post = await prisma.blogPost.findUnique({ where: { slug: params.slug } });
    if (!post) post = await prisma.blogPost.findUnique({ where: { id: params.slug } });

    if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });

    await prisma.blogPost.delete({ where: { id: post.id } });
    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
