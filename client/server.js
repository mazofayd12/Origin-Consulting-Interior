process.env.NODE_ENV = 'production';
const port = process.env.PORT || 3000;

console.log('> Starting Next.js Production Server on port', port);

// Require Next.js server
const next = require('next');
const http = require('http');

const app = next({ dev: false, dir: __dirname });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  http.createServer((req, res) => {
    handle(req, res);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
}).catch((err) => {
  console.error('Error starting server:', err);
  process.exit(1);
});
