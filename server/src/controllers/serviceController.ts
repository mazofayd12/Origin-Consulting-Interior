import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getServices = async (req: Request, res: Response) => {
  try {
    const services = await prisma.service.findMany({ orderBy: { createdAt: 'asc' } });
    const parsed = services.map(s => ({
      ...s,
      benefitsEn: JSON.parse(s.benefitsEn || '[]'),
      benefitsAr: JSON.parse(s.benefitsAr || '[]'),
      processEn: JSON.parse(s.processEn || '[]'),
      processAr: JSON.parse(s.processAr || '[]'),
      faqEn: JSON.parse(s.faqEn || '[]'),
      faqAr: JSON.parse(s.faqAr || '[]'),
      gallery: JSON.parse(s.gallery || '[]'),
    }));
    return res.json(parsed);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getServiceBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const s = await prisma.service.findUnique({ where: { slug } });
    if (!s) return res.status(404).json({ error: 'Service not found' });

    return res.json({
      ...s,
      benefitsEn: JSON.parse(s.benefitsEn || '[]'),
      benefitsAr: JSON.parse(s.benefitsAr || '[]'),
      processEn: JSON.parse(s.processEn || '[]'),
      processAr: JSON.parse(s.processAr || '[]'),
      faqEn: JSON.parse(s.faqEn || '[]'),
      faqAr: JSON.parse(s.faqAr || '[]'),
      gallery: JSON.parse(s.gallery || '[]'),
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
