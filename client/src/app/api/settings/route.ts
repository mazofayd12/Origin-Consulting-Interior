import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const settings = await prisma.siteSetting.findMany();
    const obj: Record<string, any> = {};
    settings.forEach((s) => {
      try {
        obj[s.key] = JSON.parse(s.value);
      } catch {
        obj[s.key] = s.value;
      }
    });
    return NextResponse.json(obj);
  } catch (error: any) {
    return NextResponse.json({});
  }
}

async function handleSave(req: NextRequest) {
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

export async function POST(req: NextRequest) {
  return handleSave(req);
}

export async function PUT(req: NextRequest) {
  return handleSave(req);
}
