
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient({ datasources: { db: { url: "mysql://root:root@127.0.0.1:3306/u571253792_cmsdb" } } });

async function main() {
  const hash = await bcrypt.hash('admin123', 10);
  console.log('Generated bcrypt hash for admin123:', hash);

  const role = await prisma.role.upsert({
    where: { name: 'SUPER_ADMIN' },
    update: {},
    create: { name: 'SUPER_ADMIN', permissions: JSON.stringify(['*']) }
  });

  // User 1: admin@origindesigneg.com
  await prisma.user.upsert({
    where: { email: 'admin@origindesigneg.com' },
    update: { passwordHash: hash, fullName: 'Super Admin' },
    create: { email: 'admin@origindesigneg.com', fullName: 'Super Admin', passwordHash: hash, roleId: role.id }
  });

  // User 2: admin@origin-consulting.com
  await prisma.user.upsert({
    where: { email: 'admin@origin-consulting.com' },
    update: { passwordHash: hash, fullName: 'Super Admin' },
    create: { email: 'admin@origin-consulting.com', fullName: 'Super Admin', passwordHash: hash, roleId: role.id }
  });

  console.log('✅ Both admin users created/updated with password admin123!');
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
