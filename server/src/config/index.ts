import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'super_secret_jwt_origin_2026_key_auth',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'super_secret_jwt_origin_refresh_2026',
  storageProvider: process.env.STORAGE_PROVIDER || 'local', // 'local' | 's3' | 'cloudinary'
  uploadDir: process.env.UPLOAD_DIR || 'uploads',
};
