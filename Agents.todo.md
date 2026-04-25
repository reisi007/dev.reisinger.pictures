# 📋 Projekt-Status & Task Queue (MVP)

Dieses Dokument trackt den Fortschritt des Blog-Projekts auf dev.reisinger.pictures.

## ✅ Abgeschlossene Aufgaben
- [x] **TODO:** Bugfix: ResponsiveImage generiert nun korrekte JPGs und reicht data-pagefind-meta weiter. SEO og:image wird nun über getImage() auf 1200px JPG optimiert.
- [x] **TODO:** Search: Layout-Optimierung für Ergebnisse ohne Bild (Full-Width) und verbessertes Bild-Indexing via Pagefind-Meta.
- [x] **TODO:** Search: Dev-Middleware in astro.config.mjs erweitert, um statisch gebaute Bilder (/_astro/) für Pagefind-Thumbnails bereitzustellen.
- [x] **TODO:** Search UX: Keyboard-Navigation (Arrow Keys & Enter) für Pagefind-Dropdown implementiert.
- [x] **TODO:** Refactoring: Pagefind-Integration von vorkonfiguriertem UI auf native JS API umgestellt (DaisyUI Integration).
- [x] **Setup:** Astro-Basisprojekt mit PNPM, Tailwind 4 (Vite) und DaisyUI initialisiert.
- [x] **Architektur:** Doc-as-Code-Struktur (`docs/`, `AGENTS.md`) und Standard-Astro-Komponentenstruktur etabliert.
- [x] **Tooling:** IntelliJ Run-Konfigurationen erstellt und Repomix (TS-Config) für KI-Kontext integriert.
- [x] **Content-Struktur:** Page-Bundles (Ordner pro Beitrag) und MDX-Support konfiguriert.
- [x] **Utility:** Skript zum Erstellen neuer Beiträge (`scripts/new-post.mjs`) implementiert.
- [x] **Features:** Logik und UI für "Verwandte Beiträge" (Related Posts) basierend auf Themen/Tags erstellt.

## 🚀 Offene MVP-Aufgaben
- [x] **TODO:** Refactoring: `getRelatedPosts.ts` optimieren (Map-basierte Indizierung statt $O(n^2)$ zur Build-Zeit).
- [x] **TODO:** Integration der KI-generierten Hero-Bilder im Frontmatter & UI. -> [Link](docs/domains/blog/02-hero-images.md)
- [x] **TODO:** UI-Komponenten (Header, Footer, Related Posts) auf i18n-Dictionary umstellen. -> [Link](docs/tech/architecture/01-i18n-routing.md)
- [x] **TODO:** Erstellung der Übersichtsseiten für "Themen" (Kategorien). -> [Link](docs/domains/blog/03-taxonomies.md)
- [x] **TODO:** Erstellung der Übersichtsseiten für "Tags" (Stichwörter). -> [Link](docs/domains/blog/03-taxonomies.md)
- [x] **TODO:** Implementierung des Archivs (Filterung nach Jahr/Monat/Tag). -> [Link](docs/domains/blog/04-archive.md)
- [x] **TODO:** Integration der Suche via Pagefind. -> [Link](docs/tech/search/01-pagefind-setup.md)
- [x] **TODO:** Finale SEO-Optimierung & Sitemap-Verifizierung für dev.reisinger.pictures. -> [Link](docs/tech/seo/01-final-checks.md)


- [ ] **TODO:** E2E Tests für Taxonomie-Routen (Themen/Tags) via Playwright implementieren.


- [ ] **TODO:** E2E Tests für Archiv-Routen (Jahr/Monat/Tag) via Playwright implementieren.


- [ ] **TODO:** E2E Tests für Pagefind Suche via Playwright implementieren (Mocking/Build-Prüfung).

## 📅 Archiv & Historie
*Die hier gelisteten Punkte wurden bereits vom Maker umgesetzt und warten auf den finalen Check nach dem MVP-Release.*