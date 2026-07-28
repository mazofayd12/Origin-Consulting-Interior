
const { PrismaClient } = require('@prisma/client');

async function test(url) {
  const prisma = new PrismaClient({ datasources: { db: { url } } });
  try {
    const res = await prisma.user.findMany();
    console.log('✅ SUCCESS for ' + url + ':', res.length);
  } catch (err) {
    console.log('❌ FAIL for ' + url + ':', err.message);
  } finally {
    await prisma.$disconnect();
  }
}

async function run() {
  await test('mysql://root:root@localhost:3306/u571253792_cmsdb');
  await test('mysql://u571253792_cmsuser:Nuttertools1231231%24@localhost:3306/u571253792_cmsdb');
}
run();
