import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(testimonials);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const item = await prisma.testimonial.create({
      data: {
        clientName: data.clientName || 'Valued Client',
        companyEn: data.companyEn || data.company || '',
        companyAr: data.companyAr || data.company || '',
        positionEn: data.positionEn || 'Executive',
        positionAr: data.positionAr || 'تنفيذي',
        contentEn: data.contentEn || data.comment || '',
        contentAr: data.contentAr || data.comment || '',
        rating: Number(data.rating) || 5,
        avatarUrl: data.avatarUrl || data.image || null,
        clientLogo: data.clientLogo || null,
      },
    });
    return NextResponse.json(item, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
    await prisma.testimonial.delete({ where: { id } });
    return NextResponse.json({ message: 'Testimonial deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
