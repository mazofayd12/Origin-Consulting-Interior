import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    let s = await prisma.service.findUnique({ where: { slug: params.slug } });
    if (!s) s = await prisma.service.findUnique({ where: { id: params.slug } });

    if (!s) return NextResponse.json({ error: 'Service not found' }, { status: 404 });

    return NextResponse.json({
      ...s,
      benefitsEn: JSON.parse(s.benefitsEn || '[]'),
      benefitsAr: JSON.parse(s.benefitsAr || '[]'),
      processEn: JSON.parse(s.processEn || '[]'),
      processAr: JSON.parse(s.processAr || '[]'),
      faqEn: JSON.parse(s.faqEn || '[]'),
      faqAr: JSON.parse(s.faqAr || '[]'),
      gallery: JSON.parse(s.gallery || '[]'),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const data = await req.json();

    let s = await prisma.service.findUnique({ where: { slug: params.slug } });
    if (!s) s = await prisma.service.findUnique({ where: { id: params.slug } });

    if (!s) return NextResponse.json({ error: 'Service not found' }, { status: 404 });

    const updated = await prisma.service.update({
      where: { id: s.id },
      data: {
        slug: data.slug !== undefined ? data.slug : s.slug,
        titleEn: data.titleEn !== undefined ? data.titleEn : s.titleEn,
        titleAr: data.titleAr !== undefined ? data.titleAr : s.titleAr,
        subtitleEn: data.subtitleEn !== undefined ? data.subtitleEn : s.subtitleEn,
        subtitleAr: data.subtitleAr !== undefined ? data.subtitleAr : s.subtitleAr,
        descEn: data.descEn !== undefined ? data.descEn : s.descEn,
        descAr: data.descAr !== undefined ? data.descAr : s.descAr,
        heroImage: data.heroImage !== undefined ? data.heroImage : s.heroImage,
        benefitsEn: data.benefitsEn !== undefined ? JSON.stringify(data.benefitsEn) : s.benefitsEn,
        benefitsAr: data.benefitsAr !== undefined ? JSON.stringify(data.benefitsAr) : s.benefitsAr,
        processEn: data.processEn !== undefined ? JSON.stringify(data.processEn) : s.processEn,
        processAr: data.processAr !== undefined ? JSON.stringify(data.processAr) : s.processAr,
        faqEn: data.faqEn !== undefined ? JSON.stringify(data.faqEn) : s.faqEn,
        faqAr: data.faqAr !== undefined ? JSON.stringify(data.faqAr) : s.faqAr,
        gallery: data.gallery !== undefined ? JSON.stringify(data.gallery) : s.gallery,
      },
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    let s = await prisma.service.findUnique({ where: { slug: params.slug } });
    if (!s) s = await prisma.service.findUnique({ where: { id: params.slug } });

    if (!s) return NextResponse.json({ error: 'Service not found' }, { status: 404 });

    await prisma.service.delete({ where: { id: s.id } });
    return NextResponse.json({ message: 'Service deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
