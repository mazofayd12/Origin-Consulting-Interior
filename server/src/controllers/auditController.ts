import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAuditLogs = async (req: Request, res: Response) => {
  try {
    const logs = await prisma.auditLog.findMany({
      include: { user: { select: { fullName: true, email: true, role: true } } },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
    return res.json(logs);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
