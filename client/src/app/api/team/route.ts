import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const team = await prisma.teamMember.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(team);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const member = await prisma.teamMember.create({
      data: {
        nameEn: data.nameEn || data.name || '',
        nameAr: data.nameAr || data.name || '',
        roleEn: data.roleEn || data.role || '',
        roleAr: data.roleAr || data.role || '',
        bioEn: data.bioEn || '',
        bioAr: data.bioAr || '',
        imageUrl: data.imageUrl || data.image || '/images/sample1.jpg',
        socialLinks: typeof data.socialLinks === 'string' ? data.socialLinks : JSON.stringify(data.socialLinks || {}),
        order: data.order || 0,
      },
    });
    return NextResponse.json(member, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    await prisma.teamMember.delete({ where: { id } });
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
