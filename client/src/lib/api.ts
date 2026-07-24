/**
 * API Configuration
 * 
 * All API calls now go through Next.js API routes (/api/*)
 * which connect directly to the PostgreSQL database via Prisma.
 * 
 * This means admin dashboard changes on Vercel will immediately
 * reflect on the live public website.
 */

export function getApiUrl(): string {
  // In browser, use relative path — works on both localhost and Vercel
  if (typeof window !== 'undefined') {
    return '/api';
  }
  // Server-side: use full URL
  const base = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';
  return `${base}/api`;
}

export const API_URL = '/api';
