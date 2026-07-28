import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

const getMimeType = (filename: string) => {
  const ext = path.extname(filename).toLowerCase();
  switch (ext) {
    case '.png': return 'image/png';
    case '.jpg':
    case '.jpeg': return 'image/jpeg';
    case '.webp': return 'image/webp';
    case '.gif': return 'image/gif';
    case '.svg': return 'image/svg+xml';
    case '.pdf': return 'application/pdf';
    default: return 'application/octet-stream';
  }
};

export async function GET(req: NextRequest, { params }: { params: { filename: string } }) {
  try {
    const filename = params.filename;
    if (!filename || filename.includes('..')) {
      return new NextResponse('Invalid filename', { status: 400 });
    }

    const possiblePaths = [
      path.join(process.cwd(), 'public', 'uploads', filename),
      path.join(process.cwd(), '.next', 'standalone', 'public', 'uploads', filename),
      path.join('/Users/mazofayd/Documents/antigravity/Origin-Consulting-Interior/client/public/uploads', filename),
    ];

    for (const filePath of possiblePaths) {
      try {
        const fileBuffer = await readFile(filePath);
        return new NextResponse(fileBuffer, {
          status: 200,
          headers: {
            'Content-Type': getMimeType(filename),
            'Cache-Control': 'public, max-age=31536000, immutable',
          },
        });
      } catch {
        // try next path
      }
    }

    return new NextResponse('File not found', { status: 404 });
  } catch (error: any) {
    return new NextResponse(error.message || 'Internal error', { status: 500 });
  }
}
