import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const activeDbUrl = process.platform === 'linux'
  ? 'mysql://u571253792_cmsuser:MoazOrigin2026!@localhost:3306/u571253792_cmsdb'
  : (process.env.DATABASE_URL || 'mysql://root:root@127.0.0.1:3306/u571253792_cmsdb');

// Explicitly set process.env.DATABASE_URL before PrismaClient initialization
process.env.DATABASE_URL = activeDbUrl;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasourceUrl: activeDbUrl,
    datasources: {
      db: {
        url: activeDbUrl,
      },
    },
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
