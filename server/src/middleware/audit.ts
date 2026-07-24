import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth';
import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger';

const prisma = new PrismaClient();

export const auditLogger = (actionName: string, resourceName: string) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    // Intercept original send function to capture audit log after successful response
    const originalSend = res.send;

    res.send = function (body: any): Response {
      if (res.statusCode >= 200 && res.statusCode < 300 && req.user) {
        prisma.auditLog.create({
          data: {
            userId: req.user.id,
            action: actionName,
            resource: resourceName,
            ipAddress: req.ip || req.socket.remoteAddress || '127.0.0.1',
            userAgent: req.get('user-agent') || 'Unknown',
            details: JSON.stringify({
              params: req.params,
              query: req.query,
              body: req.body ? { ...req.body, password: undefined } : {},
            }),
          },
        }).catch(err => logger.error(`Audit logging failed: ${err.message}`));
      }
      return originalSend.call(this, body);
    };

    next();
  };
};
