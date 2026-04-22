---
domain: blog
topic: related-posts
status: draft
---

# Feature: Verwandte Beiträge (Related Posts)

## 🛠 SOLL-Zustand (Target State)
Jeder Blogbeitrag soll automatisch 3-4 verwandte Beiträge am Ende der Seite anzeigen.
Die Ermittlung der Verwandtschaft basiert auf den Metadaten im MDX-Frontmatter:
1. Übereinstimmung der `themen` (Höchste Priorität).
2. Übereinstimmung der `tags` (Zweithöchste Priorität).

Das Skript/Utility muss zur Build-Zeit laufen (da SSG) und keinen Client-Side Request verursachen.

## 💻 Technical Decisions (Maker Notes)
- **Utility Function:** Implemented `src/utils/getRelatedPosts.ts`. Calculates a score by assigning 2 points per matching 'themen' and 1 point per matching 'tag'. It sorts descending by score, then by `pubDate`. Posts with 0 points are filtered out.
- **UI Component:** Created `src/components/RelatedPosts.astro` using DaisyUI Cards (`card`, `bg-base-200`). Uses Astro's `<Image />` component for optimized hero images.
- **Integration:** Directly appended the `<RelatedPosts currentPost={post} />` component inside the `<BlogPost>` layout slot in `src/pages/blog/[...slug].astro` for seamless rendering below the MDX content.
