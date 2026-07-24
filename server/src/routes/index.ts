import { Router } from 'express';
import multer from 'multer';
import { login, getProfile } from '../controllers/authController';
import { getProjects, getProjectBySlug, createProject, updateProject, deleteProject } from '../controllers/projectController';
import { getServices, getServiceBySlug } from '../controllers/serviceController';
import { getBlogPosts, getBlogPostBySlug } from '../controllers/blogController';
import { submitInquiry, getInquiries, updateInquiryStatus } from '../controllers/contactController';
import { getAuditLogs } from '../controllers/auditController';
import { getSettings, updateSettings } from '../controllers/settingsController';
import { authenticateJWT, authorizeRoles } from '../middleware/auth';
import { auditLogger } from '../middleware/audit';
import { authLimiter } from '../middleware/rateLimiter';
import { storageService } from '../services/storage';

const upload = multer({ storage: multer.memoryStorage() });
const router = Router();

// Public Routes
router.post('/auth/login', authLimiter, login);

router.get('/services', getServices);
router.get('/services/:slug', getServiceBySlug);

router.get('/projects', getProjects);
router.get('/projects/:slug', getProjectBySlug);

router.get('/blog', getBlogPosts);
router.get('/blog/:slug', getBlogPostBySlug);

router.post('/contact', submitInquiry);
router.get('/settings', getSettings);

// Authenticated Admin Routes
router.get('/auth/profile', authenticateJWT, getProfile);

router.post('/projects', authenticateJWT, authorizeRoles('ADMIN', 'EDITOR'), auditLogger('PROJECT_CREATE', 'projects'), createProject);
router.put('/projects/:id', authenticateJWT, authorizeRoles('ADMIN', 'EDITOR'), auditLogger('PROJECT_UPDATE', 'projects'), updateProject);
router.delete('/projects/:id', authenticateJWT, authorizeRoles('ADMIN'), auditLogger('PROJECT_DELETE', 'projects'), deleteProject);

router.get('/inquiries', authenticateJWT, getInquiries);
router.put('/inquiries/:id/status', authenticateJWT, auditLogger('INQUIRY_STATUS_UPDATE', 'inquiries'), updateInquiryStatus);

router.get('/audit-logs', authenticateJWT, authorizeRoles('ADMIN'), getAuditLogs);
router.put('/settings', authenticateJWT, authorizeRoles('ADMIN'), auditLogger('SETTINGS_UPDATE', 'settings'), updateSettings);

// File Upload Route
router.post('/upload', authenticateJWT, upload.array('files', 10), async (req: any, res) => {
  try {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No files provided' });
    }

    const folder = req.body.folder || 'general';
    const urls = await Promise.all(files.map(f => storageService.uploadFile(f, folder)));
    return res.json({ urls });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

export default router;
