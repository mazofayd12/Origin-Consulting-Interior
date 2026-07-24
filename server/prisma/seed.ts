import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding for Origin Consulting Interior...');

  // 1. Create Default Super Admin
  const adminPassword = await bcrypt.hash('Admin@Origin2026!', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@origin-consulting.com' },
    update: {},
    create: {
      email: 'admin@origin-consulting.com',
      passwordHash: adminPassword,
      fullName: 'Alexander Wright',
      role: 'ADMIN',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    },
  });
  console.log(`👤 Admin User created: ${admin.email}`);

  // 2. Create Core Architectural & Engineering Services
  const services = [
    {
      slug: 'interior-design',
      titleEn: 'Luxury Interior Design',
      titleAr: 'التصميم الداخلي الفاخر',
      subtitleEn: 'Bespeak interior concepts blending refined aesthetics with function.',
      subtitleAr: 'مفاهيم تصميم داخلي فاخرة تجمع بين الجماليات الرفيعة والوظيفة.',
      descEn: 'Our interior design atelier crafts ultra-luxury residential villas, high-end commercial headquarters, and hospitality landmarks. We curate every texture, custom furniture piece, and lighting element.',
      descAr: 'يصمم استوديو التصميم الداخلي لدينا الفلل السكنية الفاخرة، والمقرات التجارية الراقية، والمعالم الفندقية. نحن ننسق كل ملمس، وقطعة أثاث مخصصة، وعنصر إضاءة.',
      heroImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
      benefitsEn: JSON.stringify(['Custom Bespoke Millwork', 'Acoustic & Lighting Choreography', '3D Photorealistic Pre-visualization', 'Exclusive Material Sourcing']),
      benefitsAr: JSON.stringify(['أعمال خشبية مخصصة', 'تنسيق الصوت والإضاءة', 'معاينة ثلاثية الأبعاد فائقة الواقعية', 'توريد مواد حصرية']),
      processEn: JSON.stringify(['Spatial Discovery', 'Concept & Moodboarding', 'Detailed Joinery Specs', 'On-Site Execution']),
      processAr: JSON.stringify(['الاكتشاف المكاني', 'المفهوم وتحديد الطابع', 'مواصفات النجارة التفصيلية', 'التنفيذ في الموقع']),
      faqEn: JSON.stringify([
        { q: 'What is your interior design timeline?', a: 'Typical luxury villa concepts take 4-8 weeks, followed by tailored fabrication.' }
      ]),
      faqAr: JSON.stringify([
        { q: 'ما هي المدة الزمنية لتنفيذ التصميم الداخلي؟', a: 'تستغرق مفاهيم الفلل الفاخرة عادةً من 4 إلى 8 أسابيع، تليها مرحلة التصنيع المخصص.' }
      ]),
      gallery: JSON.stringify([
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80'
      ])
    },
    {
      slug: 'architecture',
      titleEn: 'Architectural Design',
      titleAr: 'التصميم المعماري',
      subtitleEn: 'Iconic architectural structures defined by contemporary innovation.',
      subtitleAr: 'منشآت معمارية أيقونية تتميز بالابتكار المعاصر.',
      descEn: 'We deliver visionary master planning, facade design, and architectural engineering for monumental developments across the GCC.',
      descAr: 'نقدم تخطيطًا رئيسيًا رؤيويًا، وتصميم الواجهات، والهندسة المعمارية للتطويرات الضخمة في جميع أنحاء دول مجلس التعاون الخليجي.',
      heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      benefitsEn: JSON.stringify(['Parametric Facade Engineering', 'Leed Gold Certification Design', 'BIM Level 2 Coordination']),
      benefitsAr: JSON.stringify(['هندسة الواجهات البارامترية', 'تصميم شهادة LEED الذهبية', 'تنسيق نمذجة معلومات المباني (BIM Level 2)']),
      processEn: JSON.stringify(['Feasibility Study', 'Schematic Architecture', 'Permit Documentation', 'Site Supervision']),
      processAr: JSON.stringify(['دراسة الجدوى', 'المخطط المعماري الأولي', 'وثائق التراخيص', 'الإشراف على الموقع']),
      faqEn: JSON.stringify([
        { q: 'Do you handle municipal approvals?', a: 'Yes, full architectural submittal and authority clearance is included.' }
      ]),
      faqAr: JSON.stringify([
        { q: 'هل تقومون بإجراءات الموافقات الحكومية؟', a: 'نعم، يتم تضمين جميع تقديمات الموافقة المعمارية والتراخيص.' }
      ]),
      gallery: JSON.stringify([
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'
      ])
    },
    {
      slug: 'mep-engineering',
      titleEn: 'MEP Engineering',
      titleAr: 'الهندسة الكهروميكانيكية (MEP)',
      subtitleEn: 'Precision Mechanical, Electrical, & Plumbing integrated engineering.',
      subtitleAr: 'هندسة متكاملة دقيقة للميكانيكا والكهرباء والسباكة.',
      descEn: 'High-performance MEP systems engineering ensuring maximum thermal comfort, energy efficiency, and compliance with international building codes.',
      descAr: 'هندسة أنظمة كهروميكانيكية عالية الأداء تضمن أقصى درجات الراحة الحرارية وكفاءة الطاقة والامتثال لقوانين البناء الدولية.',
      heroImage: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1600&q=80',
      benefitsEn: JSON.stringify(['Smart HVAC Load Management', 'Low-Voltage Automation', 'Fire Suppression Precision']),
      benefitsAr: JSON.stringify(['إدارة أحمال التكييف الذكية', 'أتمتة الجهد المنخفض', 'دقة أنظمة إطفاء الحريق']),
      processEn: JSON.stringify(['Load Calculation', 'System Schematic', 'Conflict BIM Detection', 'Testing & Commissioning']),
      processAr: JSON.stringify(['حساب الأحمال', 'المخطط التوضيحي للنظام', 'كشف التعارضات بـ BIM', 'الاختبار والتشغيل']),
      faqEn: JSON.stringify([
        { q: 'What codes do you comply with?', a: 'ASHRAE, NFPA, DEWA, and Saudi Building Codes.' }
      ]),
      faqAr: JSON.stringify([
        { q: 'ما هي المعايير التي تلتزمون بها؟', a: 'معايير ASHRAE و NFPA و DEWA وكود البناء السعودي.' }
      ]),
      gallery: JSON.stringify([
        'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80'
      ])
    }
  ];

  for (const s of services) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: s,
      create: s,
    });
  }
  console.log('✅ Core Services seeded');

  // 3. Create High-End Portfolio Projects
  const projects = [
    {
      slug: 'royal-palms-villa',
      titleEn: 'Royal Palms Luxury Villa',
      titleAr: 'فيلا رويال بالمس الفاخرة',
      category: 'Luxury Villas',
      locationEn: 'Emirates Hills, Dubai',
      locationAr: 'تلال الإمارات، دبي',
      areaSqm: 2400.0,
      year: 2025,
      servicesEn: JSON.stringify(['Interior Design', 'Architecture', 'MEP Engineering', 'Fit-Out']),
      servicesAr: JSON.stringify(['التصميم الداخلي', 'العمارة', 'الهندسة الكهروميكانيكية', 'التجهيزات']),
      coverImage: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=80',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80'
      ]),
      descEn: 'A breathtaking 2,400 sqm luxury estate featuring double-height marble foyers, custom Italian millwork, infinity pool reflections, and integrated smart home automation.',
      descAr: 'قصر فاخر بمساحة 2400 متر مربع يتميز ببهو رخامي مزدوج الارتفاع، وأعمال خشبية إيطالية مخصصة، ومسبح إنفينيتي، وأتمتة منازل ذكية متكاملة.',
      isFeatured: true
    },
    {
      slug: 'horizon-corporate-tower',
      titleEn: 'Horizon FinTech Headquarters',
      titleAr: 'المقر الرئيسي لشركة هورايزون المالية',
      category: 'Commercial',
      locationEn: 'KAFD, Riyadh',
      locationAr: 'مركز الملك عبد الله المالي، الرياض',
      areaSqm: 4500.0,
      year: 2025,
      servicesEn: JSON.stringify(['Architecture', 'Structural Engineering', 'Project Management']),
      servicesAr: JSON.stringify(['العمارة', 'الهندسة الإنشائية', 'إدارة المشاريع']),
      coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80'
      ]),
      descEn: 'A 4,500 sqm sustainable commercial corporate hub engineered with kinetic double-skin facade elements and biophilic indoor garden atriums.',
      descAr: 'مركز تجاري مستدام بمساحة 4500 متر مربع مجهز بواجهات حركية مزدوجة وفناءات حدائق داخلية محبة للطبيعة.',
      isFeatured: true
    },
    {
      slug: 'lumina-boutique-hotel',
      titleEn: 'Lumina Grand Resort & Spa',
      titleAr: 'منتجع وسبا لومينا جران',
      category: 'Hospitality',
      locationEn: 'Al Ula, Saudi Arabia',
      locationAr: 'العلا، المملكة العربية السعودية',
      areaSqm: 12000.0,
      year: 2026,
      servicesEn: JSON.stringify(['Interior Design', '3D Visualization', 'Fit-Out']),
      servicesAr: JSON.stringify(['التصميم الداخلي', 'الإظهار ثلاثي الأبعاد', 'التجهيزات الشاملة']),
      coverImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80'
      ]),
      descEn: 'An ultra-luxury desert sanctuary celebrating local heritage stone textures and minimalist luxury infinity terraces overlooking ancient canyon vistas.',
      descAr: 'ملاذ صحراوي شديد الفخامة يحتفي بتكوينات الحجر التراثية المحلية والتراسات الفاخرة المطلة على الأودية القديمة.',
      isFeatured: true
    }
  ];

  for (const p of projects) {
    await prisma.project.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }
  console.log('✅ Portfolio Projects seeded');

  // 4. Create SEO Blog Posts
  const blogPosts = [
    {
      slug: 'future-of-sustainable-architecture-gcc-2026',
      titleEn: 'The Future of Sustainable Architecture in the GCC',
      titleAr: 'مستقبل العمارة المستدامة في دول مجلس التعاون الخليجي',
      excerptEn: 'How biophilic design, net-zero energy codes, and smart glass facades are revolutionizing Middle Eastern architecture.',
      excerptAr: 'كيف تساهم التصاميم المستدامة والواجهات الذكية في إحداث ثورة في العمارة بالشرق الأوسط.',
      contentEn: '<p>The modern architectural landscape in the Gulf region is witnessing a historic paradigm shift towards net-zero carbon building performance and biophilic integration...</p>',
      contentAr: '<p>تشهد الساحة المعمارية الحديثة في منطقة الخليج تحولاً تاريخياً نحو أداء المباني الصفرية الانبعاثات والدمج البيئي...</p>',
      categoryEn: 'Architecture Trends',
      categoryAr: 'اتجاهات العمارة',
      tags: JSON.stringify(['Sustainability', 'GCC', 'Smart Buildings', 'LEED']),
      coverImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      author: 'Dr. Tariq Al-Mansoor',
      readingTime: '5 min read',
      isPublished: true,
      seoTitleEn: 'Future of Sustainable Architecture GCC 2026 | Origin Insights',
      seoDescEn: 'Explore how sustainable architectural engineering is shaping green luxury developments in Saudi Arabia and Dubai.',
      seoTitleAr: 'مستقبل العمارة المستدامة في الخليج | أوريجين للإستشارات',
      seoDescAr: 'اكتشف كيف تشكل الهندسة المعمارية المستدامة مشاريع التطوير الفاخرة في السعودية ودبي.'
    }
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }
  console.log('✅ Blog Posts seeded');

  // 5. Create Testimonials
  await prisma.testimonial.createMany({
    data: [
      {
        clientName: 'Sheikh Mansoor Al-Qasimi',
        companyEn: 'Al Qasimi Real Estate Holdings',
        companyAr: 'مجموعة القاسمي العقارية',
        positionEn: 'Chairman & Managing Director',
        positionAr: 'رئيس مجلس الإدارة والمناوب',
        contentEn: 'Origin Consulting Interior transformed our flagship luxury tower into an architectural masterpiece. Their MEP engineering accuracy and interior elegance exceeded all expectations.',
        contentAr: 'لقد حولت أوريجين للإستشارات برجنا الفاخر إلى تحفة معمارية. لقد تجاوزت دقة الهندسة الكهروميكانيكية وأناقة التصميم الداخلي كل التوقعات.',
        rating: 5,
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
      }
    ]
  });
  console.log('✅ Testimonials seeded');

  console.log('🎉 Database Seeding Completed Successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
