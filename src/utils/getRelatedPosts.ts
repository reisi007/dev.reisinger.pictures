import type { CollectionEntry } from 'astro:content';

let invertedIndexCache: {
    thema: Map<string, Set<string>>;
    tags: Map<string, Set<string>>;
} | null = null;

function buildIndex(allPosts: CollectionEntry<'blog'>[]) {
    if (invertedIndexCache) return invertedIndexCache;

    const thema = new Map<string, Set<string>>();
    const tags = new Map<string, Set<string>>();

    for (const post of allPosts) {
        const t = post.data.thema?.id;
        if (t) {
            if (!thema.has(t)) thema.set(t, new Set());
            thema.get(t)!.add(post.id);
        }

        post.data.tags?.forEach(tagRef => {
            const tag = tagRef.id;
            if (!tags.has(tag)) tags.set(tag, new Set());
            tags.get(tag)!.add(post.id);
        });
    }

    invertedIndexCache = { thema, tags };
    return invertedIndexCache;
}

export function getRelatedPosts(
    currentPost: CollectionEntry<'blog'>,
    allPosts: CollectionEntry<'blog'>[],
    maxPosts: number = 3
): CollectionEntry<'blog'>[] {
    const index = buildIndex(allPosts);
    const scores = new Map<string, number>();

    const currentThema = currentPost.data.thema?.id;
    if (currentThema) {
        index.thema.get(currentThema)?.forEach(postId => {
            scores.set(postId, (scores.get(postId) || 0) + 2);
        });
    }

    currentPost.data.tags?.forEach(tagRef => {
        index.tags.get(tagRef.id)?.forEach(postId => {
            scores.set(postId, (scores.get(postId) || 0) + 1);
        });
    });

    // Bombensicherer Filter: Den aktuellen Post anhand seiner ID aus den Ergebnissen löschen
    scores.delete(currentPost.id);

    const related = Array.from(scores.entries())
        .map(([id, score]) => ({
            post: allPosts.find(p => p.id === id)!,
            score
        }))
        // HIER IST DER FIX: Fallback falls Post nicht gefunden UND zwingender Sprachfilter
        .filter(item => item.post !== undefined && item.post.data.lang === currentPost.data.lang)
        .sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            return b.post.data.pubDate.valueOf() - a.post.data.pubDate.valueOf();
        })
        .map(item => item.post);

    return related.slice(0, maxPosts);
}
