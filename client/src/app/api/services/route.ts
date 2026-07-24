import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

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
