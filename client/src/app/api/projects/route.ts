import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryParam = searchParams.get('category');
    const featured = searchParams.get('featured');

    const where: any = {};
    if (featured === 'true') where.isFeatured = true;

    if (categoryParam && categoryParam !== 'All' && categoryParam !== 'all') {
      where.OR = [
        { categoryId: categoryParam },
        { category: { is: { id: categoryParam } } },
        { category: { is: { slug: categoryParam } } },
        { category: { is: { nameEn: categoryParam } } },
        { category: { is: { nameAr: categoryParam } } },
      ];
    }

    const projects = await prisma.project.findMany({
      where,
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    });

    const safeParse = (val: any) => {
      if (!val) return [];
      try { return typeof val === 'string' ? JSON.parse(val) : val; }
      catch { return [val]; }
    };

    const parsed = projects.map((p) => {
      const galleryList = safeParse(p.gallery);
      return {
        ...p,
        categoryNameEn: p.category?.nameEn || p.category?.slug || '',
        categoryNameAr: p.category?.nameAr || p.category?.slug || '',
        categorySlug: p.category?.slug || '',
        category: p.category?.nameEn || p.category?.slug || '',
        servicesEn: safeParse(p.servicesEn),
        servicesAr: safeParse(p.servicesAr),
        gallery: galleryList,
        images: galleryList,
      };
    });

    return NextResponse.json(parsed);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const galleryPayload = data.gallery || data.images || [];
    
    // Destructure out 'images' and 'category' if provided to prevent unknown field / relation error
    const { images, category, categoryId, slug, titleEn, titleAr, ...restData } = data;

    // Generate unique slug if slug is empty or missing
    const generatedSlug = (slug && slug.trim() !== '')
      ? slug
      : `${(titleEn || titleAr || 'project').toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now()}`;

    // Resolve categoryId if category string is passed
    let validCategoryId = categoryId || null;
    if (!validCategoryId && category && typeof category === 'string') {
      const existingCat = await prisma.projectCategory.findFirst({
        where: { OR: [{ id: category }, { slug: category }, { nameEn: category }] }
      });
      if (existingCat) {
        validCategoryId = existingCat.id;
      } else {
        const newCat = await prisma.projectCategory.create({
          data: {
            nameEn: category,
            nameAr: category,
            slug: category.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now()
          }
        });
        validCategoryId = newCat.id;
      }
    }

    const project = await prisma.project.create({
      data: {
        ...restData,
        titleEn: titleEn || '',
        titleAr: titleAr || '',
        slug: generatedSlug,
        categoryId: validCategoryId,
        servicesEn: typeof data.servicesEn === 'string' ? data.servicesEn : JSON.stringify(data.servicesEn || []),
        servicesAr: typeof data.servicesAr === 'string' ? data.servicesAr : JSON.stringify(data.servicesAr || []),
        gallery: typeof galleryPayload === 'string' ? galleryPayload : JSON.stringify(galleryPayload || []),
      },
    });
    return NextResponse.json(project, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
