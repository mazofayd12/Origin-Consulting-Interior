import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    const services = await prisma.service.findMany({ orderBy: { createdAt: 'asc' } });
    const parsed = services.map((s) => ({
      ...s,
      benefitsEn: JSON.parse(s.benefitsEn || '[]'),
      benefitsAr: JSON.parse(s.benefitsAr || '[]'),
      processEn: JSON.parse(s.processEn || '[]'),
      processAr: JSON.parse(s.processAr || '[]'),
      faqEn: JSON.parse(s.faqEn || '[]'),
      faqAr: JSON.parse(s.faqAr || '[]'),
      gallery: JSON.parse(s.gallery || '[]'),
    }));
    return NextResponse.json(parsed);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const service = await prisma.service.create({
      data: {
        slug: data.slug,
        titleEn: data.titleEn,
        titleAr: data.titleAr,
        subtitleEn: data.subtitleEn || '',
        subtitleAr: data.subtitleAr || '',
        descEn: data.descEn || '',
        descAr: data.descAr || '',
        heroImage: data.heroImage || '',
        benefitsEn: JSON.stringify(data.benefitsEn || []),
        benefitsAr: JSON.stringify(data.benefitsAr || []),
        processEn: JSON.stringify(data.processEn || []),
        processAr: JSON.stringify(data.processAr || []),
        faqEn: JSON.stringify(data.faqEn || []),
        faqAr: JSON.stringify(data.faqAr || []),
        gallery: JSON.stringify(data.gallery || []),
      },
    });

    return NextResponse.json(service, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
