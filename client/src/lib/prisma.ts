import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

let dbUrl = process.env.DATABASE_URL || 'mysql://u571253792_cmsuser:Nuttertools1231231%24@localhost:3306/u571253792_cmsdb';

// Force replace unescaped $ in password for Hostinger production MySQL
if (dbUrl.includes('$@')) {
  dbUrl = dbUrl.replace('$@', '%24@');
}

if (!dbUrl || dbUrl.includes('root:root') || process.platform === 'linux') {
  dbUrl = 'mysql://u571253792_cmsuser:Nuttertools1231231%24@localhost:3306/u571253792_cmsdb';
}

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: dbUrl,
      },
    },
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
