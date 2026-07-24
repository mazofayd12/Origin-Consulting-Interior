import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Origin Consulting Interior database...');

  // Admin User
  const passwordHash = await bcrypt.hash('Admin@Origin2026!', 10);
  await prisma.user.upsert({
    where: { email: 'admin@origin-consulting.com' },
    update: {},
    create: {
      email: 'admin@origin-consulting.com',
      passwordHash,
      fullName: 'Alexander Wright',
      role: 'ADMIN',
    },
  });
  console.log('✅ Admin user created');

  // Services
  const services = [
    {
      slug: 'interior-design',
      titleEn: 'Interior Design', titleAr: 'التصميم الداخلي',
      subtitleEn: 'Bespoke luxury interiors', subtitleAr: 'تصاميم داخلية فاخرة مخصصة',
      descEn: 'We create bespoke residential villas, luxury penthouses, and high-end commercial spaces with European finesse and local heritage integration.',
      descAr: 'نصمم فلل سكنية فاخرة وبنتهاوس راقي ومساحات تجارية بلمسات أوروبية مع دمج التراث المحلي.',
      heroImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
      benefitsEn: JSON.stringify(['Custom furniture procurement', 'Material sourcing from Italy & Germany', '3D visualization']),
      benefitsAr: JSON.stringify(['توريد أثاث مخصص', 'مصادر مواد من إيطاليا وألمانيا', 'تصور ثلاثي الأبعاد']),
      processEn: JSON.stringify(['Concept Development', 'Design Development', 'Documentation', 'Execution']),
      processAr: JSON.stringify(['تطوير المفهوم', 'تطوير التصميم', 'التوثيق', 'التنفيذ']),
      faqEn: JSON.stringify([{ q: 'What is your design timeline?', a: 'Typical luxury villa concepts take 4-8 weeks.' }]),
      faqAr: JSON.stringify([{ q: 'ما هو الجدول الزمني للتصميم؟', a: 'تستغرق مفاهيم الفلل الفاخرة عادة 4-8 أسابيع.' }]),
      gallery: JSON.stringify(['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80']),
    },
    {
      slug: 'architecture',
      titleEn: 'Architecture', titleAr: 'العمارة والتخطيط',
      subtitleEn: 'Iconic structures & master planning', subtitleAr: 'منشآت أيقونية وتخطيط رئيسي',
      descEn: 'Iconic master planning, parametric facade design, and sustainable structures that define skylines across the GCC.',
      descAr: 'تخطيط رئيسي أيقوني وتصميم واجهات بارامترية ومنشآت مستدامة.',
      heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      benefitsEn: JSON.stringify(['Authority approval handling', 'BIM coordination', 'LEED consulting']),
      benefitsAr: JSON.stringify(['إدارة الاعتمادات الحكومية', 'تنسيق BIM', 'استشارات LEED']),
      processEn: JSON.stringify(['Site Analysis', 'Concept Design', 'Schematic Design', 'Construction Documents']),
      processAr: JSON.stringify(['تحليل الموقع', 'التصميم المفاهيمي', 'التصميم التخطيطي', 'وثائق البناء']),
      faqEn: JSON.stringify([{ q: 'Do you handle municipal approvals?', a: 'Yes, full architectural submittal is included.' }]),
      faqAr: JSON.stringify([{ q: 'هل تتعاملون مع الاعتمادات البلدية؟', a: 'نعم، يشمل ذلك التقديم المعماري الكامل.' }]),
      gallery: JSON.stringify(['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80']),
    },
    {
      slug: 'mep-engineering',
      titleEn: 'MEP Engineering', titleAr: 'الهندسة الكهروميكانيكية',
      subtitleEn: 'Precision mechanical, electrical & plumbing', subtitleAr: 'أنظمة ميكانيكية وكهربائية وسباكة عالية الدقة',
      descEn: 'Precision mechanical, electrical, and plumbing engineering systems for maximum efficiency and comfort.',
      descAr: 'أنظمة ميكانيكية وكهربائية وسباكة عالية الدقة لأقصى كفاءة وراحة.',
      heroImage: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1600&q=80',
      benefitsEn: JSON.stringify(['Energy modeling', 'Smart building systems', 'Fire protection design']),
      benefitsAr: JSON.stringify(['نمذجة الطاقة', 'أنظمة المباني الذكية', 'تصميم الحماية من الحريق']),
      processEn: JSON.stringify(['Load Calculation', 'System Design', 'Shop Drawings', 'Commissioning']),
      processAr: JSON.stringify(['حساب الأحمال', 'تصميم النظام', 'الرسومات التنفيذية', 'التشغيل']),
      faqEn: JSON.stringify([{ q: 'What MEP standards do you follow?', a: 'ASHRAE, IEC, and local authority standards.' }]),
      faqAr: JSON.stringify([{ q: 'ما هي معايير MEP التي تتبعونها؟', a: 'معايير ASHRAE وIEC والمعايير المحلية.' }]),
      gallery: JSON.stringify(['https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80']),
    },
  ];

  for (const s of services) {
    await prisma.service.upsert({ where: { slug: s.slug }, update: s, create: s });
  }
  console.log('✅ Services seeded');

  // Projects
  const projects = [
    {
      slug: 'royal-palms-villa',
      titleEn: 'Royal Palms Luxury Villa', titleAr: 'فيلا رويال بالمس الفاخرة',
      category: 'Luxury Villas',
      locationEn: 'Emirates Hills, Dubai', locationAr: 'إمارات هيلز، دبي',
      areaSqm: 2400, year: 2024,
      servicesEn: JSON.stringify(['Interior Design', 'Architecture', 'Landscape']),
      servicesAr: JSON.stringify(['التصميم الداخلي', 'العمارة', 'تصميم الحدائق']),
      coverImage: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=80',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
      ]),
      descEn: 'A 2,400 SQM architectural masterpiece featuring Italian marble, German automation, and panoramic landscape design.',
      descAr: 'تحفة معمارية بمساحة 2,400 متر مربع مع رخام إيطالي وأتمتة ألمانية وتصميم حدائق بانورامي.',
      isFeatured: true,
    },
    {
      slug: 'horizon-corporate-tower',
      titleEn: 'Horizon FinTech HQ', titleAr: 'المقر الرئيسي لشركة هورايزون',
      category: 'Commercial',
      locationEn: 'KAFD, Riyadh', locationAr: 'كافد، الرياض',
      areaSqm: 45000, year: 2025,
      servicesEn: JSON.stringify(['Architecture', 'MEP Engineering', 'Project Management']),
      servicesAr: JSON.stringify(['العمارة', 'الهندسة الكهروميكانيكية', 'إدارة المشاريع']),
      coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      ]),
      descEn: 'A 45-floor smart tower with parametric glass facades, LEED Platinum certified, home to 3,000+ executives.',
      descAr: 'برج ذكي من 45 طابقاً بواجهات زجاجية بارامترية ومعتمد LEED Platinum.',
      isFeatured: true,
    },
    {
      slug: 'azure-waterfront-residences',
      titleEn: 'Azure Waterfront Residences', titleAr: 'مساكن أزور الواجهة المائية',
      category: 'Residential',
      locationEn: 'Palm Jumeirah, Dubai', locationAr: 'نخلة جميرا، دبي',
      areaSqm: 12000, year: 2024,
      servicesEn: JSON.stringify(['Interior Design', 'Architecture']),
      servicesAr: JSON.stringify(['التصميم الداخلي', 'العمارة']),
      coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      ]),
      descEn: 'Ultra-luxury waterfront living with private marina berths, infinity pools, and biophilic interior design.',
      descAr: 'معيشة فاخرة على الواجهة المائية مع مراسي خاصة ومسابح لا نهائية.',
      isFeatured: true,
    },
  ];

  for (const p of projects) {
    await prisma.project.upsert({ where: { slug: p.slug }, update: p, create: p });
  }
  console.log('✅ Projects seeded');

  // Testimonials
  const testimonials = [
    {
      clientName: 'Sheikh Mohammed Al Qasimi',
      companyEn: 'Al Qasimi Holdings', companyAr: 'القاسمي القابضة',
      positionEn: 'Chairman', positionAr: 'رئيس مجلس الإدارة',
      contentEn: 'Origin transformed our 4,000 SQM villa into an architectural icon. Their attention to detail is unmatched.',
      contentAr: 'حوّلت أوريجين فيلتنا البالغة 4,000 متر مربع إلى أيقونة معمارية. اهتمامهم بالتفاصيل لا مثيل له.',
      rating: 5,
    },
    {
      clientName: 'Dr. Tariq Al-Mansoor',
      companyEn: 'Horizon FinTech Corp', companyAr: 'هورايزون فينتك',
      positionEn: 'CEO', positionAr: 'الرئيس التنفيذي',
      contentEn: 'The MEP engineering precision for our 45-floor tower was extraordinary. Delivered ahead of schedule.',
      contentAr: 'دقة الهندسة الكهروميكانيكية لبرجنا من 45 طابقاً كانت استثنائية. تم التسليم قبل الموعد.',
      rating: 5,
    },
    {
      clientName: 'Elena Rostova',
      companyEn: 'Rostova Hospitality', companyAr: 'روستوفا للضيافة',
      positionEn: 'Founder', positionAr: 'المؤسسة',
      contentEn: 'Their landscape design elevated our resort experience. Every guest mentions the architecture first.',
      contentAr: 'ارتقى تصميم الحدائق لديهم بتجربة منتجعنا. كل ضيف يذكر العمارة أولاً.',
      rating: 5,
    },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }
  console.log('✅ Testimonials seeded');

  // Blog Posts
  await prisma.blogPost.upsert({
    where: { slug: 'luxury-villa-design-trends-2026' },
    update: {},
    create: {
      slug: 'luxury-villa-design-trends-2026',
      titleEn: 'Luxury Villa Design Trends 2026', titleAr: 'اتجاهات تصميم الفلل الفاخرة 2026',
      excerptEn: 'Discover the latest trends shaping luxury residential design.', excerptAr: 'اكتشف أحدث الاتجاهات.',
      contentEn: 'Full article content here...', contentAr: 'محتوى المقال الكامل هنا...',
      categoryEn: 'Design Trends', categoryAr: 'اتجاهات التصميم',
      tags: JSON.stringify(['Design', 'Luxury', 'Villas']),
      coverImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
      author: 'Alexander Wright', readingTime: '6 min read',
      isPublished: true,
    },
  });
  console.log('✅ Blog posts seeded');

  console.log('🎉 Database seeding completed!');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
