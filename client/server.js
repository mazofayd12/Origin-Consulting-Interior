const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

// Support Phusion Passenger, process.env.PORT socket, or fallback port 3000
const port = typeof(PhusionPassenger) !== 'undefined' ? 'passenger' : (process.env.PORT || 3000);
const dev = false;
const app = next({ dev, dir: __dirname });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Next.js Server listening on ${port}`);
  });
}).catch((err) => {
  console.error('Failed to start Next.js server:', err);
  process.exit(1);
});
