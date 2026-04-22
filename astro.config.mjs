import { defineConfig } from 'astro/config';
import tailwindv4 from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

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
      prefixDefaultLocale: false, // DE bleibt auf /, EN geht auf /en/
      redirectToDefaultLocale: false
    }
  },
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindv4()],
  },
});