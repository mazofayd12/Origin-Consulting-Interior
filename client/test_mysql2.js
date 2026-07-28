
const mysql = require('mysql2/promise');

async function test() {
  try {
    const conn = await mysql.createConnection({
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: 'root',
      database: 'u571253792_cmsdb'
    });
    console.log('✅ MYSQL2 CONNECTED SUCCESSFULLY!');
    const [rows] = await conn.execute('SHOW TABLES');
    console.log('TABLES:', rows);
    await conn.end();
  } catch(e) {
    console.log('❌ MYSQL2 ERROR:', e.message);
  }
}
test();
