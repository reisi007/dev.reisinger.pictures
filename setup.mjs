import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const PROJECT_NAME = 'dev-reisinger-pictures';

console.log('🚀 Starte das Setup für dev.reisinger.pictures...');

try {
  // 1. Astro mit PNPM initialisieren (Template: Blog für grundlegendes Routing)
  console.log('\n📦 Initialisiere Astro...');
  execSync(`pnpm create astro@latest ${PROJECT_NAME} --template blog --install --no-git --typescript strict`, { stdio: 'inherit' });

  process.chdir(PROJECT_NAME);

  // 2. Wichtige Abhängigkeiten installieren
  console.log('\n🛠 Installiere Tailwind, MDX, Sitemap und DaisyUI...');
  execSync('pnpm astro add tailwind mdx sitemap --yes', { stdio: 'inherit' });
  execSync('pnpm add -D daisyui@latest pagefind', { stdio: 'inherit' });

  // 3. Ordnerstruktur für das Archiv und Taxonomien anlegen
  console.log('\n📂 Erstelle Ordnerstruktur für Themen, Tags und Archiv...');
  const dirs = [
    'src/pages/themen',
    'src/pages/tags',
    'src/pages/archiv',
    'src/components/ui',
    'src/content/blog'
  ];

  dirs.forEach(dir => {
    fs.mkdirSync(path.join(process.cwd(), dir), { recursive: true });
    console.log(`  -> Erstellt: ${dir}`);
  });

  // 4. Tailwind Config für DaisyUI anpassen
  console.log('\n🎨 Konfiguriere Tailwind + DaisyUI...');
  const tailwindConfig = `
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"], // Passe deine Themes hier an
  },
}
`;
  fs.writeFileSync('tailwind.config.mjs', tailwindConfig.trim());

  // 5. Astro Config für SEO / Site URL anpassen
  console.log('\n⚙️ Passe astro.config.mjs an...');
  const astroConfig = `
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://dev.reisinger.pictures',
  integrations: [mdx(), sitemap(), tailwind()],
});
`;
  fs.writeFileSync('astro.config.mjs', astroConfig.trim());

  console.log('\n✅ Setup erfolgreich abgeschlossen!');
  console.log('Nächste Schritte:');
  console.log(`  cd ${PROJECT_NAME}`);
  console.log('  pnpm run dev');

} catch (error) {
  console.error('\n❌ Fehler beim Setup:', error.message);
}