import fs from 'fs';
import path from 'path';

export interface IStorageProvider {
  uploadFile(file: Express.Multer.File, folder: string): Promise<string>;
  deleteFile(fileUrl: string): Promise<boolean>;
}

export class LocalStorageProvider implements IStorageProvider {
  private uploadDir: string;

  constructor() {
    this.uploadDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async uploadFile(file: Express.Multer.File, folder: string): Promise<string> {
    const targetFolder = path.join(this.uploadDir, folder);
    if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder, { recursive: true });
    }

    const filename = `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`;
    const filePath = path.join(targetFolder, filename);

    fs.writeFileSync(filePath, file.buffer);
    return `/uploads/${folder}/${filename}`;
  }

  async deleteFile(fileUrl: string): Promise<boolean> {
    try {
      const relativePath = fileUrl.replace('/uploads/', '');
      const fullPath = path.join(this.uploadDir, relativePath);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
      return true;
    } catch {
      return false;
    }
  }
}

export const storageService = new LocalStorageProvider();
