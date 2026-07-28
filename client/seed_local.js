
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({ datasources: { db: { url: "mysql://root:root@127.0.0.1:3306/u571253792_cmsdb" } } });

async function main() {
  console.log('Seeding local MySQL database...');
  
  // 1. Role & Admin User
  const role = await prisma.role.upsert({
    where: { name: 'SUPER_ADMIN' },
    update: {},
    create: { name: 'SUPER_ADMIN', permissions: JSON.stringify(['*']) }
  });

  const admin = await prisma.user.upsert({
    where: { email: 'admin@origindesigneg.com' },
    update: { passwordHash: 'b', fullName: 'Super Admin' },
    create: {
      email: 'admin@origindesigneg.com',
      fullName: 'Super Admin',
      passwordHash: 'b',
      roleId: role.id
    }
  });
  console.log('✅ Admin user ready:', admin.email);

  // 2. Sample Category
  const cat = await prisma.projectCategory.upsert({
    where: { slug: 'interior-design' },
    update: {},
    create: {
      nameEn: 'Interior Design',
      nameAr: 'التصميم الداخلي',
      slug: 'interior-design'
    }
  });

  // 3. Sample Project
  await prisma.project.upsert({
    where: { slug: 'modern-villa-cairo' },
    update: {},
    create: {
      titleEn: 'Modern Villa Cairo',
      titleAr: 'فيلا مودرن بالقاهرة',
      slug: 'modern-villa-cairo',
      locationEn: 'New Cairo',
      locationAr: 'القاهرة الجديدة',
      servicesEn: JSON.stringify(['Interior Design', 'Turnkey Contracting']),
      servicesAr: JSON.stringify(['تصميم داخلي', 'مقاولات تسليم مفتاح']),
      coverImage: '/images/sample1.jpg',
      gallery: JSON.stringify(['/images/sample1.jpg']),
      descEn: 'Luxury interior design project in New Cairo',
      descAr: 'مشروع تصميم داخلي فاخر بالقاهرة الجديدة',
      categoryId: cat.id,
      status: 'PUBLISHED'
    }
  });

  // 4. Sample Service
  await prisma.service.upsert({
    where: { slug: 'residential-design' },
    update: {},
    create: {
      titleEn: 'Residential Interior Design',
      titleAr: 'التصميم الداخلي السكني',
      slug: 'residential-design',
      subtitleEn: 'Luxury villas & apartments',
      subtitleAr: 'فيلات وشقق فاخرة',
      descEn: 'Bespoke residential interior design solutions',
      descAr: 'حلول تصميم داخلي سكني مخصصة',
      heroImage: '/images/service1.jpg',
      benefitsEn: JSON.stringify(['Custom Design', 'Turnkey Execution']),
      benefitsAr: JSON.stringify(['تصميم مخصص', 'تنفيذ تسليم مفتاح']),
      processEn: JSON.stringify(['Concept', 'Execution']),
      processAr: JSON.stringify(['الفكرة', 'التنفيذ']),
      faqEn: JSON.stringify([{ q: 'Duration?', a: '2 months' }]),
      faqAr: JSON.stringify([{ q: 'المدة؟', a: 'شهرين' }]),
      gallery: JSON.stringify(['/images/service1.jpg'])
    }
  });

  console.log('✅ Local Database Seeded Successfully!');
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
