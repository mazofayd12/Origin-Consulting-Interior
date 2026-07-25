import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
    }
    const inquiry = await prisma.contactInquiry.create({
      data: { name, email, phone: phone || '', subject: subject || 'General Inquiry', message },
    });
    return NextResponse.json({ message: 'Inquiry received successfully', inquiry }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const inquiries = await prisma.contactInquiry.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(inquiries);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
