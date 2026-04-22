---
domain: blog
topic: taxonomies
status: done
---

# Feature: Taxonomien (Themen & Tags)

## 🛠 SOLL-Zustand (Target State)
The blog supports two levels of taxonomies defined in the MDX frontmatter of each post:
1. `themen` (Broad categories)
2. `tags` (Specific keywords)

### Routing & Views
For each taxonomy, two types of static routes are generated during build (SSG):
- **Index View (`/themen/` & `/tags/`)**: Displays all globally available terms and the count of associated posts.
- **Detail View (`/themen/[term]/` & `/tags/[term]/`)**: Displays a chronological list of all posts associated with the specific term.

## 💻 Technical Decisions (Maker Notes)
- Utilizing Astro's `getStaticPaths()` to dynamically generate routes based on the `blog` content collection.
- The UI uses Tailwind & DaisyUI components (`btn`, `badge`, `card`) and relies on the `BaseLayout.astro`.
- Sorting of posts in the detail view is strictly descending by `pubDate`.
