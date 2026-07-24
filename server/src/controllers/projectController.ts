import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProjects = async (req: Request, res: Response) => {
  try {
    const { category, featured, search } = req.query;

    const where: any = {};
    if (category && category !== 'All') {
      where.category = String(category);
    }
    if (featured === 'true') {
      where.isFeatured = true;
    }
    if (search) {
      where.OR = [
        { titleEn: { contains: String(search) } },
        { titleAr: { contains: String(search) } },
        { descEn: { contains: String(search) } },
      ];
    }

    const projects = await prisma.project.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    const parsed = projects.map(p => ({
      ...p,
      servicesEn: JSON.parse(p.servicesEn || '[]'),
      servicesAr: JSON.parse(p.servicesAr || '[]'),
      images: JSON.parse(p.images || '[]'),
    }));

    return res.json(parsed);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getProjectBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const project = await prisma.project.findUnique({ where: { slug } });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    return res.json({
      ...project,
      servicesEn: JSON.parse(project.servicesEn || '[]'),
      servicesAr: JSON.parse(project.servicesAr || '[]'),
      images: JSON.parse(project.images || '[]'),
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const project = await prisma.project.create({
      data: {
        ...data,
        servicesEn: JSON.stringify(data.servicesEn || []),
        servicesAr: JSON.stringify(data.servicesAr || []),
        images: JSON.stringify(data.images || []),
      },
    });
    return res.status(201).json(project);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const project = await prisma.project.update({
      where: { id },
      data: {
        ...data,
        servicesEn: data.servicesEn ? JSON.stringify(data.servicesEn) : undefined,
        servicesAr: data.servicesAr ? JSON.stringify(data.servicesAr) : undefined,
        images: data.images ? JSON.stringify(data.images) : undefined,
      },
    });
    return res.json(project);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.project.delete({ where: { id } });
    return res.json({ message: 'Project deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
