const { createServer } = require('http');
const { parse } = require('url');
const path = require('path');
const fs = require('fs');

// Check if standalone server exists
const standaloneServerPath = path.join(__dirname, '.next', 'standalone', 'server.js');

if (fs.existsSync(standaloneServerPath)) {
  console.log('Loading Next.js standalone server from:', standaloneServerPath);
  require(standaloneServerPath);
} else {
  const next = require('next');
  const port = parseInt(process.env.PORT, 10) || 3000;
  const dev = process.env.NODE_ENV !== 'production';
  const app = next({ dev });
  const handle = app.getRequestHandler();

  app.prepare().then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    }).listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  });
}
