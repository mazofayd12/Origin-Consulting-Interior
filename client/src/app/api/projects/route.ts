import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');

    const where: any = {};
    if (category && category !== 'All') where.category = category;
    if (featured === 'true') where.isFeatured = true;

    const projects = await prisma.project.findMany({ where, orderBy: { createdAt: 'desc' } });

    const parsed = projects.map((p) => {
      const galleryList = JSON.parse(p.gallery || '[]');
      return {
        ...p,
        servicesEn: JSON.parse(p.servicesEn || '[]'),
        servicesAr: JSON.parse(p.servicesAr || '[]'),
        gallery: galleryList,
        images: galleryList, // backwards compatibility
      };
    });

    return NextResponse.json(parsed);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const galleryPayload = data.gallery || data.images || [];
    
    // Destructure out 'images' if provided to prevent unknown field error in Prisma
    const { images, ...restData } = data;

    const project = await prisma.project.create({
      data: {
        ...restData,
        servicesEn: JSON.stringify(data.servicesEn || []),
        servicesAr: JSON.stringify(data.servicesAr || []),
        gallery: JSON.stringify(galleryPayload),
      },
    });
    return NextResponse.json(project, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
