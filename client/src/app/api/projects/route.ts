import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');

    const where: any = {};
    if (category && category !== 'All') where.category = category;
    if (featured === 'true') where.isFeatured = true;

    const projects = await prisma.project.findMany({ where, orderBy: { createdAt: 'desc' } });

    const parsed = projects.map((p) => ({
      ...p,
      servicesEn: JSON.parse(p.servicesEn || '[]'),
      servicesAr: JSON.parse(p.servicesAr || '[]'),
      images: JSON.parse(p.images || '[]'),
    }));

    return NextResponse.json(parsed);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const project = await prisma.project.create({
      data: {
        ...data,
        servicesEn: JSON.stringify(data.servicesEn || []),
        servicesAr: JSON.stringify(data.servicesAr || []),
        images: JSON.stringify(data.images || []),
      },
    });
    return NextResponse.json(project, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
