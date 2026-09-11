/**
 * CommonJS Loader for cPanel Phusion Passenger & LiteSpeed Web Server
 * Solves ERR_REQUIRE_ESM when running Next.js standalone with "type": "module".
 */
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

process.env.NODE_ENV = 'production';
process.chdir(__dirname);

// Load environment variables (.env.production, .env.local, .env)
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

// Locate Next.js standalone server.js
const serverFile = fs.existsSync(path.resolve(__dirname, 'server.js'))
  ? path.resolve(__dirname, 'server.js')
  : path.resolve(__dirname, '.next/standalone/server.js');

console.log(`[Passenger] Loading Next.js standalone via loader.cjs from: ${serverFile}`);

// Dynamically import the ES module server
import(pathToFileURL(serverFile).href).catch((err) => {
  console.error('[Passenger Crash] Failed to boot Next.js server:', err);
  process.exit(1);
});
