const path = require('path');
const fs = require('fs');

const standaloneServer = path.join(__dirname, '.next', 'standalone', 'server.js');

if (fs.existsSync(standaloneServer)) {
  console.log('> Loading Next.js Standalone Server from .next/standalone/server.js');
  require(standaloneServer);
} else {
  console.log('> Loading Next.js Standard Server');
  const { createServer } = require('http');
  const { parse } = require('url');
  const next = require('next');

  const port = process.env.PORT || 3000;
  const app = next({ dev: false, dir: __dirname });
  const handle = app.getRequestHandler();

  app.prepare().then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    }).listen(port);
  });
}
