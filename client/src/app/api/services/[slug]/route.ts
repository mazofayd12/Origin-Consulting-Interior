import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const raw = params.slug;
    const decoded = decodeURIComponent(raw);

    const safeParse = (val: any) => {
      if (!val) return [];
      try { return typeof val === 'string' ? JSON.parse(val) : val; }
      catch { return [val]; }
    };

    let s = await prisma.service.findFirst({
      where: {
        OR: [
          { id: raw },
          { id: decoded },
          { slug: raw },
          { slug: decoded },
          { titleEn: decoded },
          { titleAr: decoded },
        ],
      },
    });

    if (!s) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    return NextResponse.json({
      ...s,
      benefitsEn: safeParse(s.benefitsEn),
      benefitsAr: safeParse(s.benefitsAr),
      processEn: safeParse(s.processEn),
      processAr: safeParse(s.processAr),
      faqEn: safeParse(s.faqEn),
      faqAr: safeParse(s.faqAr),
      gallery: safeParse(s.gallery),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const data = await req.json();
    const raw = params.slug;
    const decoded = decodeURIComponent(raw);

    let s = await prisma.service.findFirst({
      where: {
        OR: [
          { id: raw },
          { id: decoded },
          { slug: raw },
          { slug: decoded },
        ],
      },
    });

    if (!s) return NextResponse.json({ error: 'Service not found' }, { status: 404 });

    const titleClean = (data.titleEn || data.titleAr || 'service').toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    const finalSlug = data.slug && data.slug.trim().length > 0 ? data.slug.trim() : (s.slug || titleClean || `service-${Date.now()}`);

    const updated = await prisma.service.update({
      where: { id: s.id },
      data: {
        slug: finalSlug,
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
    const raw = params.slug;
    const decoded = decodeURIComponent(raw);

    let s = await prisma.service.findFirst({
      where: {
        OR: [
          { id: raw },
          { id: decoded },
          { slug: raw },
          { slug: decoded },
        ],
      },
    });

    if (!s) return NextResponse.json({ error: 'Service not found' }, { status: 404 });

    await prisma.service.delete({ where: { id: s.id } });
    return NextResponse.json({ message: 'Service deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
