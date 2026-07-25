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
