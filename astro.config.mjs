import { defineConfig } from 'astro/config';
import tailwindv4 from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs';
import path from 'node:path';

// Custom Vite Plugin, um den dist/pagefind und dist/_astro Ordner im Dev-Modus bereitzustellen
function pagefindDevMiddleware() {
  return {
    name: 'pagefind-dev-serve',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const requestPath = req.url.split('?')[0];

        // Nur eingreifen, wenn es um pagefind oder statisch gebaute Astro-Assets (wie optimierte Bilder aus dem Index) geht
        if (requestPath.startsWith('/pagefind/') || requestPath.startsWith('/_astro/')) {
          const distDir = path.join(process.cwd(), 'dist');
          const filePath = path.normalize(path.join(distDir, requestPath));

          // Path Traversal Check
          if (!filePath.startsWith(distDir)) {
            res.statusCode = 403;
            res.end('Forbidden');
            return;
          }

          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            // Setze grundlegende MIME-Types, damit der Browser die Dateien korrekt interpretiert
            if (filePath.endsWith('.js')) res.setHeader('Content-Type', 'application/javascript');
            else if (filePath.endsWith('.css')) res.setHeader('Content-Type', 'text/css');
            else if (filePath.endsWith('.wasm')) res.setHeader('Content-Type', 'application/wasm');
            else if (filePath.endsWith('.webp')) res.setHeader('Content-Type', 'image/webp');
            else if (filePath.endsWith('.png')) res.setHeader('Content-Type', 'image/png');
            else if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) res.setHeader('Content-Type', 'image/jpeg');
            else if (filePath.endsWith('.svg')) res.setHeader('Content-Type', 'image/svg+xml');

            fs.createReadStream(filePath).pipe(res);
            return;
          }
        }
        next();
      });
    }
  };
}

export default defineConfig({
  site: 'https://dev.reisinger.pictures',
  cacheDir: './.cache',
  devToolbar: {
    enabled: false
  },
  i18n: {
    defaultLocale: 'de',
    locales: ['de', 'en'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false
    }
  },
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindv4(), pagefindDevMiddleware()],
  },
});
