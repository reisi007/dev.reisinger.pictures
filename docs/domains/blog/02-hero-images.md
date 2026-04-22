---
domain: blog
topic: hero-images
status: done
---

# Feature: Hero Bilder & SEO Fallbacks

## 🛠 SOLL-Zustand (Target State)
1. **Blog-Beiträge:** Jeder Beitrag in `src/content/blog/` kann ein `heroImage` im Frontmatter definieren. Da wir Page-Bundles nutzen, liegt das Bild lokal im selben Ordner (z.B. `./hero.jpg`).
2. **SEO Fallback:** Wenn kein spezifisches Bild definiert ist, nutzt die `<BaseHead />`-Komponente standardmäßig das `/android-chrome-512x512.png` aus dem `public/`-Ordner für Open Graph und Twitter Cards.

## 💻 Technical Decisions (Maker Notes)
- Removed hardcoded `astro:assets` imports for placeholder images that broke the build.
- Updated `BaseHead.astro` to accept a string URL and default to the existing site logo.
- The `BlogPost.astro` layout already natively supports rendering the `heroImage` from the content schema using Astro's highly optimized `<Image />` component.
