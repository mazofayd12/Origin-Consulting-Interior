import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const categories = await prisma.projectCategory.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(categories);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const category = await prisma.projectCategory.create({
      data: {
        nameEn: data.nameEn,
        nameAr: data.nameAr,
        slug: data.slug || data.nameEn.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        order: data.order || 0,
      },
    });
    return NextResponse.json(category, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
