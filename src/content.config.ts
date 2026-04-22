import { defineCollection} from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  // Erlaubt das Finden von Dateien in Unterordnern (z.B. blog/mein-post/index.md)
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: image().optional(),
    themen: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
  }),
});


const simple = defineCollection({
  loader: glob({ base: './src/content/simple', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string().optional(),
    heroImage: image().optional(),
    lang: z.enum(['de', 'en']).default('de'),
  }),
});


export const collections = { blog, simple };
