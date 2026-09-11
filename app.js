/**
 * Production Entry Point for cPanel / Phusion Passenger
 * Loads environment variables and boots Next.js standalone server.js
 */
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

process.env.NODE_ENV = 'production';
process.chdir(__dirname);

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

// Locate Next.js standalone server.js
const serverFile = fs.existsSync(path.resolve(__dirname, 'server.js'))
  ? path.resolve(__dirname, 'server.js')
  : path.resolve(__dirname, '.next/standalone/server.js');

console.log(`[Passenger] Booting Next.js standalone from: ${serverFile}`);

// Boot the single Next.js standalone server (Passenger hooks its listen() call automatically)
await import(pathToFileURL(serverFile).href);
