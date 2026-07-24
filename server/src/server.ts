import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { config } from './config';
import routes from './routes';
import { apiLimiter } from './middleware/rateLimiter';
import { errorHandler } from './middleware/errorHandler';
import { logger } from './utils/logger';

const app = express();

// Security Middlewares
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(cors({
  origin: '*', // Allow all origins for dev/production integration
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Static file uploads serving
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Rate Limiting & API routes
app.use('/api', apiLimiter, routes);

// Central Error Handler
app.use(errorHandler);

app.listen(config.port, () => {
  logger.info(`🚀 Origin Consulting Interior API Server running on port ${config.port}`);
});
