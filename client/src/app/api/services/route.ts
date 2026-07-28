import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const services = await prisma.service.findMany({ orderBy: { createdAt: 'asc' } });
    const safeParse = (val: any) => {
      if (!val) return [];
      try { return typeof val === 'string' ? JSON.parse(val) : val; }
      catch { return [val]; }
    };

    const parsed = services.map((s) => ({
      ...s,
      benefitsEn: safeParse(s.benefitsEn),
      benefitsAr: safeParse(s.benefitsAr),
      processEn: safeParse(s.processEn),
      processAr: safeParse(s.processAr),
      faqEn: safeParse(s.faqEn),
      faqAr: safeParse(s.faqAr),
      gallery: safeParse(s.gallery),
    }));
    return NextResponse.json(parsed);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const titleClean = (data.titleEn || data.titleAr || 'service').toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    const finalSlug = data.slug && data.slug.trim().length > 0 ? data.slug.trim() : (titleClean || `service-${Date.now()}`);

    const service = await prisma.service.create({
      data: {
        slug: finalSlug,
        titleEn: data.titleEn || 'New Service',
        titleAr: data.titleAr || 'خدمة جديدة',
        subtitleEn: data.subtitleEn || '',
        subtitleAr: data.subtitleAr || '',
        descEn: data.descEn || '',
        descAr: data.descAr || '',
        heroImage: data.heroImage || 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
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
