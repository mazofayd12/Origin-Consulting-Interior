import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const settings = await prisma.siteSetting.findMany();
    const obj: Record<string, any> = {};
    settings.forEach((s) => { obj[s.key] = JSON.parse(s.value); });
    return NextResponse.json(obj);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const results = await Promise.all(
      Object.entries(data).map(([key, value]) =>
        prisma.siteSetting.upsert({
          where: { key },
          update: { value: JSON.stringify(value) },
          create: { key, value: JSON.stringify(value) },
        })
      )
    );
    return NextResponse.json({ message: 'Settings updated', count: results.length });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
