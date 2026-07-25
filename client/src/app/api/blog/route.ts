import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const isPublic = searchParams.get('public') === 'true';

    const where = isPublic ? { isPublished: true } : {};

    const posts = await prisma.blogPost.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
    });

    const parsed = posts.map((p) => ({
      ...p,
      tags: JSON.parse(p.tags || '[]'),
    }));

    return NextResponse.json(parsed);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const post = await prisma.blogPost.create({
      data: {
        slug: data.slug,
        titleEn: data.titleEn,
        titleAr: data.titleAr,
        excerptEn: data.excerptEn || '',
        excerptAr: data.excerptAr || '',
        contentEn: data.contentEn || '',
        contentAr: data.contentAr || '',
        categoryEn: data.categoryEn || 'General',
        categoryAr: data.categoryAr || 'عام',
        tags: JSON.stringify(data.tags || []),
        coverImage: data.coverImage || '',
        author: data.author || 'Origin Team',
        readingTime: data.readingTime || '5 min read',
        isPublished: data.isPublished !== undefined ? data.isPublished : true,
        seoTitleEn: data.seoTitleEn || '',
        seoDescEn: data.seoDescEn || '',
        seoTitleAr: data.seoTitleAr || '',
        seoDescAr: data.seoDescAr || '',
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
