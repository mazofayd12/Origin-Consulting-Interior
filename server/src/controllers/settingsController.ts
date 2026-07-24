import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getSettings = async (req: Request, res: Response) => {
  try {
    const settings = await prisma.siteSetting.findMany();
    const result: Record<string, any> = {};
    settings.forEach(s => {
      try {
        result[s.key] = JSON.parse(s.value);
      } catch {
        result[s.key] = s.value;
      }
    });
    return res.json(result);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateSettings = async (req: Request, res: Response) => {
  try {
    const { key, value } = req.body;
    if (!key) return res.status(400).json({ error: 'Setting key required' });

    const updated = await prisma.siteSetting.upsert({
      where: { key },
      update: { value: JSON.stringify(value) },
      create: { key, value: JSON.stringify(value) },
    });

    return res.json(updated);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
