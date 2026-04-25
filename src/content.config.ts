import { defineCollection, reference } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const taxonomySchema = z.object({
  de: z.object({ name: z.string(), slug: z.string() }),
  en: z.object({ name: z.string(), slug: z.string() }),
});

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) => z.object({
    slug: z.string().optional(),
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: image().optional(),
    thema: reference('themen'),
    tags: z.array(reference('tags')).default([]),
    lang: z.enum(['de', 'en']).default('de'),
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

const themen = defineCollection({
  loader: glob({ base: './src/content/themen', pattern: '**/*.json' }),
  schema: taxonomySchema
});

const tags = defineCollection({
  loader: glob({ base: './src/content/tags', pattern: '**/*.json' }),
  schema: taxonomySchema
});

export const collections = { blog, simple, themen, tags };