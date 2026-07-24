import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const s = await prisma.service.findUnique({ where: { slug: params.slug } });
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
