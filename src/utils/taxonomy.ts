import type { CollectionEntry } from 'astro:content';
import type { SupportedLanguage } from '../i18n/ui';

export interface TaxonomyConfig {
    type: 'themen' | 'tags';
    lang: SupportedLanguage;
    urlLang: string | undefined;
    taxonomySegment: string;
    altLang: SupportedLanguage;
    altTaxonomySegment: string;
}

export const taxonomyConfigs: TaxonomyConfig[] = [
    { type: 'themen', lang: 'de', urlLang: undefined, taxonomySegment: 'themen', altLang: 'en', altTaxonomySegment: 'topics' },
    { type: 'themen', lang: 'en', urlLang: 'en', taxonomySegment: 'topics', altLang: 'de', altTaxonomySegment: 'themen' },
    { type: 'tags', lang: 'de', urlLang: undefined, taxonomySegment: 'tags', altLang: 'en', altTaxonomySegment: 'tags' },
    { type: 'tags', lang: 'en', urlLang: 'en', taxonomySegment: 'tags', altLang: 'de', altTaxonomySegment: 'tags' },
];

/**
 * Baut einen Index auf, um Posts via Map in O(1) abzufragen, statt für jede Route
 * das gesamte Post-Array iterieren zu müssen.
 */
export function getPostsByTaxonomy(
    posts: CollectionEntry<'blog'>[],
    taxonomyType: 'themen' | 'tags',
    lang: SupportedLanguage
): Map<string, CollectionEntry<'blog'>[]> {
    const map = new Map<string, CollectionEntry<'blog'>[]>();
    
    for (const post of posts) {
        // Nur Posts der gewünschten Sprache indexieren
        if (post.data.lang !== lang) continue;
        
        if (taxonomyType === 'themen' && post.data.thema) {
            const id = post.data.thema.id;
            if (!map.has(id)) map.set(id, []);
            map.get(id)!.push(post);
        } else if (taxonomyType === 'tags' && post.data.tags) {
            for (const tag of post.data.tags) {
                const id = tag.id;
                if (!map.has(id)) map.set(id, []);
                map.get(id)!.push(post);
            }
        }
    }
    return map;
}
