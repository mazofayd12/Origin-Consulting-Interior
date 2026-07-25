import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding MySQL enterprise database...');

  const pass = process.env.ADMIN_INITIAL_PASSWORD || 'Nuttertools1231231$';
  const passwordHash = await bcrypt.hash(pass, 10);

  // Admin User
  await prisma.user.upsert({
    where: { email: 'admin@origin-consulting.com' },
    update: { passwordHash, role: 'ADMIN' },
    create: {
      email: 'admin@origin-consulting.com',
      passwordHash,
      fullName: 'Origin Enterprise Admin',
      role: 'ADMIN',
    },
  });

  // Default Categories Setting
  const categories = [
    { id: '1', nameEn: 'Luxury Villas', nameAr: 'الفلل الفاخرة', slug: 'luxury-villas' },
    { id: '2', nameEn: 'Residential', nameAr: 'المباني السكنية', slug: 'residential' },
    { id: '3', nameEn: 'Commercial', nameAr: 'المشاريع التجارية', slug: 'commercial' },
    { id: '4', nameEn: 'Office', nameAr: 'المقرات الإدارية', slug: 'office' },
    { id: '5', nameEn: 'Hospitality', nameAr: 'الضيافة والمنتجعات', slug: 'hospitality' },
    { id: '6', nameEn: 'Industrial', nameAr: 'المشاريع الصناعية', slug: 'industrial' },
  ];

  await prisma.siteSetting.upsert({
    where: { key: 'project_categories' },
    update: { value: JSON.stringify(categories) },
    create: { key: 'project_categories', value: JSON.stringify(categories) },
  });

  // Default General Settings
  const generalSettings = {
    companyNameEn: 'Origin Consulting Interior',
    companyNameAr: 'أوريجين للإستشارات والديكور',
    phoneHotline: '+20 100 000 0000',
    emailContact: 'info@origindesigneg.com',
    addressEn: 'New Cairo, Cairo, Egypt',
    addressAr: 'القاهرة الجديدة، القاهرة، مصر',
    logoUrl: '/logo.png',
    faviconUrl: '/favicon.ico',
    googleAnalyticsId: 'G-XXXXXXXXXX',
    smtpHost: 'smtp.hostinger.com',
    smtpPort: '465',
    smtpUser: 'info@origindesigneg.com',
  };

  await prisma.siteSetting.upsert({
    where: { key: 'general_settings' },
    update: { value: JSON.stringify(generalSettings) },
    create: { key: 'general_settings', value: JSON.stringify(generalSettings) },
  });

  console.log('✅ Enterprise MySQL database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
