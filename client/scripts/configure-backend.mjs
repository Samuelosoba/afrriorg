import { readFile, writeFile } from 'node:fs/promises';

const input = process.argv[2];
if (!input) throw new Error('Supply the public backend origin: npm run backend:configure -- https://YOUR-BACKEND-HOST');
const origin = new URL(input);
if (origin.protocol !== 'https:' || origin.username || origin.password || origin.search || origin.hash || origin.pathname !== '/' || ['localhost', '127.0.0.1', 'afriiorg.vercel.app'].includes(origin.hostname)) {
  throw new Error('Use your separate backend HTTPS origin, without credentials, a path or query.');
}
const response = await fetch(origin.origin + '/api/health', { signal: AbortSignal.timeout(60000) });
if (!response.ok || !response.headers.get('content-type')?.includes('application/json')) {
  throw new Error('Backend /api/health must return successful JSON before configuring the proxy.');
}
const path = new URL('../vercel.json', import.meta.url);
const config = JSON.parse(await readFile(path, 'utf8'));
config.rewrites = [
  { source: '/api/:path*', destination: origin.origin + '/api/:path*' },
  { source: '/((?!api/).*)', destination: '/index.html' },
];
await writeFile(path, JSON.stringify(config, null, 2) + '\n');
console.log('Backend checked and Vercel proxy configured. Commit the configuration and redeploy the frontend.');
