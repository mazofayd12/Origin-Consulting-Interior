import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const activeDbUrl = 'mysql://u571253792_cmsuser:MoazOrigin2026!@127.0.0.1:3306/u571253792_cmsdb';

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasourceUrl: process.platform === 'linux' ? activeDbUrl : (process.env.DATABASE_URL || activeDbUrl),
    datasources: {
      db: {
        url: process.platform === 'linux' ? activeDbUrl : (process.env.DATABASE_URL || activeDbUrl),
      },
    },
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
