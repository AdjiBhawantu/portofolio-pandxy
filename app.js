/**
 * Production Entry Point for cPanel / CloudLinux Phusion Passenger / PM2
 * Connects Phusion Passenger to Next.js Standalone server
 */
const http = require('http');
const path = require('path');
const fs = require('fs');

process.env.NODE_ENV = 'production';

// Load environment variables from .env or .env.production if present
const envFiles = ['.env.production', '.env.local', '.env'];
for (const envFile of envFiles) {
  const envPath = path.resolve(__dirname, envFile);
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
        const [key, ...vals] = trimmed.split('=');
        const k = key.trim();
        const v = vals.join('=').trim().replace(/^["']|["']$/g, '');
        if (!process.env[k]) {
          process.env[k] = v;
        }
      }
    }
    break;
  }
}

const rawPort = process.env.PORT;

// If PORT is standard numeric port or undefined, start Next.js standalone directly
if (!rawPort || !isNaN(Number(rawPort))) {
  console.log(`[Passenger] Starting Next.js standalone on port ${rawPort || 3000}...`);
  require('./server.js');
} else {
  // Passenger passed a Unix domain socket path (common on CloudLinux cPanel)
  console.log(`[Passenger] Detected Unix domain socket: ${rawPort}`);

  const internalPort = 3000;
  process.env.PORT = String(internalPort);
  process.env.HOSTNAME = '127.0.0.1';

  require('./server.js');

  // Create reverse proxy bridge on the Unix domain socket for Passenger
  const server = http.createServer((req, res) => {
    const options = {
      hostname: '127.0.0.1',
      port: internalPort,
      path: req.url,
      method: req.method,
      headers: req.headers,
    };

    const proxyReq = http.request(options, (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res, { end: true });
    });

    req.pipe(proxyReq, { end: true });

    proxyReq.on('error', (err) => {
      console.error('[Passenger Proxy Error]:', err.message);
      res.writeHead(502, { 'Content-Type': 'text/plain' });
      res.end('502 Bad Gateway - Application is starting up, please refresh in a moment.');
    });
  });

  server.listen(rawPort, () => {
    console.log(`[Passenger] Bridge listening on Unix socket: ${rawPort}`);
  });
}
