import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const filename = `${timestamp}_${sanitizedName}`;

    // Save file to both process.cwd()/public/uploads and any standalone/parent public/uploads
    const possibleDirs = [
      path.join(process.cwd(), 'public', 'uploads'),
      path.join(process.cwd(), '.next', 'standalone', 'public', 'uploads'),
      path.join(process.cwd(), '..', 'public', 'uploads'),
    ];

    for (const dir of possibleDirs) {
      try {
        await mkdir(dir, { recursive: true });
        await writeFile(path.join(dir, filename), buffer);
      } catch (err) {
        // ignore fallback dir write error if directory path outside root
      }
    }

    const publicUrl = `/uploads/${filename}`;
    return NextResponse.json({ url: publicUrl, filename, success: true }, { status: 201 });
  } catch (error: any) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to upload file' }, { status: 500 });
  }
}
