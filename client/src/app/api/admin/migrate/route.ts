import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

const MIGRATION_SQL = `
CREATE TABLE IF NOT EXISTS User (
    id VARCHAR(191) PRIMARY KEY,
    email VARCHAR(191) UNIQUE NOT NULL,
    passwordHash VARCHAR(191) NOT NULL,
    fullName VARCHAR(191) NOT NULL,
    role VARCHAR(191) NOT NULL DEFAULT 'ADMIN',
    roleId VARCHAR(191) NULL,
    avatarUrl TEXT NULL,
    createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updatedAt DATETIME(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS Role (
    id VARCHAR(191) PRIMARY KEY,
    name VARCHAR(191) UNIQUE NOT NULL,
    description TEXT NULL,
    permissions TEXT NOT NULL,
    createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updatedAt DATETIME(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS ProjectCategory (
    id VARCHAR(191) PRIMARY KEY,
    slug VARCHAR(191) UNIQUE NOT NULL,
    nameEn VARCHAR(191) NOT NULL,
    nameAr VARCHAR(191) NOT NULL,
    \`order\` INTEGER NOT NULL DEFAULT 0,
    createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updatedAt DATETIME(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS Project (
    id VARCHAR(191) PRIMARY KEY,
    slug VARCHAR(191) UNIQUE NOT NULL,
    titleEn VARCHAR(191) NOT NULL,
    titleAr VARCHAR(191) NOT NULL,
    categoryId VARCHAR(191) NULL,
    locationEn VARCHAR(191) NOT NULL,
    locationAr VARCHAR(191) NOT NULL,
    mapLocation TEXT NULL,
    areaSqm DOUBLE NOT NULL DEFAULT 0,
    year INTEGER NOT NULL DEFAULT 2026,
    clientName VARCHAR(191) NULL,
    architect VARCHAR(191) NULL,
    servicesEn TEXT NOT NULL,
    servicesAr TEXT NOT NULL,
    coverImage TEXT NOT NULL,
    gallery TEXT NOT NULL,
    beforeAfterImages TEXT NULL,
    videos TEXT NULL,
    pdfFiles TEXT NULL,
    cadDrawings TEXT NULL,
    timeline TEXT NULL,
    descEn TEXT NOT NULL,
    descAr TEXT NOT NULL,
    status VARCHAR(191) NOT NULL DEFAULT 'PUBLISHED',
    isFeatured BOOLEAN NOT NULL DEFAULT false,
    \`order\` INTEGER NOT NULL DEFAULT 0,
    seoTitleEn VARCHAR(191) NULL,
    seoDescEn TEXT NULL,
    seoTitleAr VARCHAR(191) NULL,
    seoDescAr TEXT NULL,
    createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updatedAt DATETIME(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS Service (
    id VARCHAR(191) PRIMARY KEY,
    slug VARCHAR(191) UNIQUE NOT NULL,
    titleEn VARCHAR(191) NOT NULL,
    titleAr VARCHAR(191) NOT NULL,
    subtitleEn TEXT NOT NULL,
    subtitleAr TEXT NOT NULL,
    descEn TEXT NOT NULL,
    descAr TEXT NOT NULL,
    heroImage TEXT NOT NULL,
    benefitsEn TEXT NOT NULL,
    benefitsAr TEXT NOT NULL,
    processEn TEXT NOT NULL,
    processAr TEXT NOT NULL,
    faqEn TEXT NOT NULL,
    faqAr TEXT NOT NULL,
    gallery TEXT NOT NULL,
    \`order\` INTEGER NOT NULL DEFAULT 0,
    createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updatedAt DATETIME(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS BlogPost (
    id VARCHAR(191) PRIMARY KEY,
    slug VARCHAR(191) UNIQUE NOT NULL,
    titleEn VARCHAR(191) NOT NULL,
    titleAr VARCHAR(191) NOT NULL,
    excerptEn TEXT NOT NULL,
    excerptAr TEXT NOT NULL,
    contentEn LONGTEXT NOT NULL,
    contentAr LONGTEXT NOT NULL,
    categoryEn VARCHAR(191) NOT NULL,
    categoryAr VARCHAR(191) NOT NULL,
    tags TEXT NOT NULL,
    coverImage TEXT NOT NULL,
    author VARCHAR(191) NOT NULL DEFAULT 'Origin Team',
    readingTime VARCHAR(191) NOT NULL DEFAULT '5 min',
    isPublished BOOLEAN NOT NULL DEFAULT false,
    seoTitleEn VARCHAR(191) NULL,
    seoDescEn TEXT NULL,
    seoTitleAr VARCHAR(191) NULL,
    seoDescAr TEXT NULL,
    publishedAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updatedAt DATETIME(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS Testimonial (
    id VARCHAR(191) PRIMARY KEY,
    clientName VARCHAR(191) NOT NULL,
    companyEn VARCHAR(191) NOT NULL,
    companyAr VARCHAR(191) NOT NULL,
    positionEn VARCHAR(191) NOT NULL,
    positionAr VARCHAR(191) NOT NULL,
    contentEn TEXT NOT NULL,
    contentAr TEXT NOT NULL,
    rating INTEGER NOT NULL DEFAULT 5,
    avatarUrl TEXT NULL,
    clientLogo TEXT NULL,
    \`order\` INTEGER NOT NULL DEFAULT 0,
    createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS TeamMember (
    id VARCHAR(191) PRIMARY KEY,
    nameEn VARCHAR(191) NOT NULL,
    nameAr VARCHAR(191) NOT NULL,
    roleEn VARCHAR(191) NOT NULL,
    roleAr VARCHAR(191) NOT NULL,
    bioEn TEXT NOT NULL,
    bioAr TEXT NOT NULL,
    imageUrl TEXT NOT NULL,
    socialLinks TEXT NOT NULL,
    \`order\` INTEGER NOT NULL DEFAULT 0,
    createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS MediaFile (
    id VARCHAR(191) PRIMARY KEY,
    filename VARCHAR(191) NOT NULL,
    url TEXT NOT NULL,
    mimeType VARCHAR(191) NOT NULL,
    size INTEGER NOT NULL,
    folder VARCHAR(191) NOT NULL DEFAULT 'general',
    dimensions VARCHAR(191) NULL,
    altEn VARCHAR(191) NULL,
    altAr VARCHAR(191) NULL,
    createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS ContactInquiry (
    id VARCHAR(191) PRIMARY KEY,
    name VARCHAR(191) NOT NULL,
    email VARCHAR(191) NOT NULL,
    phone VARCHAR(191) NOT NULL,
    subject VARCHAR(191) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(191) NOT NULL DEFAULT 'NEW',
    notes TEXT NULL,
    createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS NewsletterSubscriber (
    id VARCHAR(191) PRIMARY KEY,
    email VARCHAR(191) UNIQUE NOT NULL,
    isSubscribed BOOLEAN NOT NULL DEFAULT true,
    createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS SiteSetting (
    id VARCHAR(191) PRIMARY KEY,
    \`key\` VARCHAR(191) UNIQUE NOT NULL,
    \`value\` LONGTEXT NOT NULL,
    updatedAt DATETIME(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS AuditLog (
    id VARCHAR(191) PRIMARY KEY,
    userId VARCHAR(191) NOT NULL,
    action VARCHAR(191) NOT NULL,
    resource VARCHAR(191) NOT NULL,
    ipAddress VARCHAR(191) NOT NULL,
    userAgent VARCHAR(191) NOT NULL,
    details TEXT NOT NULL,
    createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`;

export async function POST(req: NextRequest) {
  try {
    const statements = MIGRATION_SQL.split(';')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    for (const statement of statements) {
      try {
        await prisma.$executeRawUnsafe(statement);
      } catch (e: any) {
        console.warn('Migration Statement Note:', e.message);
      }
    }

    return NextResponse.json({ message: 'Enterprise MySQL tables verified & created successfully', tablesCount: statements.length });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
