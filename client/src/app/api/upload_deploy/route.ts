import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';

const execAsync = promisify(exec);
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    if (authHeader !== 'Bearer origin-deploy-secret-2026') {
      return NextResponse.json({ error: 'Unauthorized deploy key' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;
    if (!file) {
      return NextResponse.json({ error: 'No deploy file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const tmpZip = '/tmp/http_deploy.tar.gz';
    fs.writeFileSync(tmpZip, buffer);

    const nodejsDir = '/home/u571253792/domains/origindesigneg.com/nodejs';
    const publicHtml = '/home/u571253792/domains/origindesigneg.com/public_html';

    const cmd = `
      # Preserve live DB
      if [ -f ${nodejsDir}/prisma/dev.db ]; then
        cp ${nodejsDir}/prisma/dev.db /tmp/dev_http.db.bak
      fi

      cd ${nodejsDir} && tar -xzf ${tmpZip}

      if [ -f /tmp/dev_http.db.bak ]; then
        cp /tmp/dev_http.db.bak ${nodejsDir}/prisma/dev.db
        rm -f /tmp/dev_http.db.bak
      fi

      mkdir -p ${nodejsDir}/public/uploads
      chmod -R 777 ${nodejsDir}/public/uploads
      chmod 666 ${nodejsDir}/prisma/dev.db
      touch ${nodejsDir}/tmp/restart.txt

      cd ${publicHtml} && tar -xzf ${tmpZip}
      mkdir -p ${publicHtml}/public/uploads
      chmod -R 777 ${publicHtml}/public/uploads
      chmod 666 ${publicHtml}/prisma/dev.db

      rm -f ${tmpZip}
    `;

    await execAsync(cmd);

    return NextResponse.json({ success: true, message: 'Extracted and deployed via HTTP upload!' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
