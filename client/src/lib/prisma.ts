import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const rawUrl = process.env.DATABASE_URL || 'mysql://u571253792_cmsuser:Nuttertools1231231%24@localhost:3306/u571253792_cmsdb';
let dbUrl = rawUrl.includes('$@') ? rawUrl.replace('$@', '%24@') : rawUrl;
dbUrl = dbUrl.replace('@localhost:', '@127.0.0.1:');

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

