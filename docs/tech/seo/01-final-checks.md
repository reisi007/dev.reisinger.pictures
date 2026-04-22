---
domain: technical
topic: seo
status: done
---

# Technical Concept: SEO & Sitemap

## 🛠 SOLL-Zustand (Target State)
Das Astro-Projekt ist vollständig für Suchmaschinen optimiert.

### 1. Sitemap & Robots
- Das Astro-Plugin `@astrojs/sitemap` generiert beim Build automatisch die `sitemap-index.xml` basierend auf dem `site`-Parameter in der `astro.config.mjs` (`https://dev.reisinger.pictures`).
- Die `robots.txt` liegt im `public/`-Ordner und verweist explizit auf die Sitemap, um Crawlern den Weg zu weisen.

### 2. Dynamisches HTML Lang-Attribut (i18n)
- Die `BaseLayout.astro` liest `Astro.currentLocale` aus und setzt das `<html lang="...">`-Attribut dynamisch (entweder `de` oder `en`). Dies verhindert Abstrafungen durch Google bei gemischtsprachigem Content.

### 3. Meta-Tags & OpenGraph
- Alle Seiten inkludieren die `BaseHead.astro`.
- **Canonical URLs:** Jede Route generiert exakt einen Canonical Tag (`<link rel="canonical" href="...">`), um Duplicate Content bei Trailingslash-Variationen abzufangen.
- **OpenGraph/Twitter Cards:** Sind für alle Routen definiert, inklusive standardisiertem Fallback-Bild (`/android-chrome-512x512.png`), falls kein spezifisches Hero-Bild hinterlegt ist.
