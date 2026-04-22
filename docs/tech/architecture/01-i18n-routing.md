---
domain: technical
topic: i18n
status: draft
---

# Technical Concept: i18n (Zweisprachigkeit DE / EN)

## 🛠 SOLL-Zustand (Target State)
Der Blog wird zweisprachig (Deutsch und Englisch) geführt. 
- **Framework-Feature:** Wir nutzen das native Astro i18n Routing.
- **Default Locale:** `de` (ohne Präfix, z.B. `/blog`).
- **Secondary Locale:** `en` (mit Präfix, z.B. `/en/blog`).
- **Content:** Da wir Page Bundles nutzen, legen wir im selben Ordner einfach eine `index.mdx` (Deutsch) und eine `index.en.mdx` (Englisch) ab, oder setzen im Frontmatter das Feld `lang: 'en'`.
- **UI:** Alle statischen UI-Strings (Header, Footer, "Verwandte Beiträge") müssen über ein Dictionary-System (`src/i18n/ui.ts`) übersetzt werden.
