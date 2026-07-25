import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const project = await prisma.project.findUnique({ where: { slug: params.slug } });
    if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 });

    const galleryList = JSON.parse(project.gallery || '[]');
    return NextResponse.json({
      ...project,
      servicesEn: JSON.parse(project.servicesEn || '[]'),
      servicesAr: JSON.parse(project.servicesAr || '[]'),
      gallery: galleryList,
      images: galleryList,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const data = await req.json();
    let project = await prisma.project.findUnique({ where: { slug: params.slug } });
    if (!project) project = await prisma.project.findUnique({ where: { id: params.slug } });
    if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const { images, ...restData } = data;
    const galleryPayload = data.gallery || data.images;

    const updated = await prisma.project.update({
      where: { id: project.id },
      data: {
        ...restData,
        servicesEn: data.servicesEn ? JSON.stringify(data.servicesEn) : undefined,
        servicesAr: data.servicesAr ? JSON.stringify(data.servicesAr) : undefined,
        gallery: galleryPayload ? JSON.stringify(galleryPayload) : undefined,
      },
    });
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    let project = await prisma.project.findUnique({ where: { slug: params.slug } });
    if (!project) project = await prisma.project.findUnique({ where: { id: params.slug } });
    if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    await prisma.project.delete({ where: { id: project.id } });
    return NextResponse.json({ message: 'Project deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
