import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const submitInquiry = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required fields.' });
    }

    const inquiry = await prisma.contactInquiry.create({
      data: { name, email, phone: phone || '', subject: subject || 'General Inquiry', message },
    });

    return res.status(201).json({ message: 'Inquiry received successfully', inquiry });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getInquiries = async (req: Request, res: Response) => {
  try {
    const inquiries = await prisma.contactInquiry.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return res.json(inquiries);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateInquiryStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const inquiry = await prisma.contactInquiry.update({
      where: { id },
      data: { status },
    });
    return res.json(inquiry);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
