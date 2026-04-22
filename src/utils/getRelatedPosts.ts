import type { CollectionEntry } from 'astro:content';

// Cache for inverted index to ensure O(N) index building and O(1) lookups per tag/thema
let invertedIndexCache: {
    themen: Map<string, Set<string>>;
    tags: Map<string, Set<string>>;
} | null = null;

function buildIndex(allPosts: CollectionEntry<'blog'>[]) {
    if (invertedIndexCache) return invertedIndexCache;

    const themen = new Map<string, Set<string>>();
    const tags = new Map<string, Set<string>>();

    for (const post of allPosts) {
        post.data.themen?.forEach(t => {
            if (!themen.has(t)) themen.set(t, new Set());
            themen.get(t)!.add(post.id);
        });
        post.data.tags?.forEach(t => {
            if (!tags.has(t)) tags.set(t, new Set());
            tags.get(t)!.add(post.id);
        });
    }

    invertedIndexCache = { themen, tags };
    return invertedIndexCache;
}

/**
 * Calculates and returns a list of related posts based on shared 'themen' and 'tags'.
 * 'Themen' have a higher weight (2 points) than 'tags' (1 point).
 * * Uses a memoized inverted index for performance optimization during SSG builds.
 * * @param currentPost The post currently being viewed.
 * @param allPosts Array of all available blog posts.
 * @param maxPosts Maximum number of related posts to return (default: 3).
 * @returns Array of sorted, related CollectionEntries.
 */
export function getRelatedPosts(
    currentPost: CollectionEntry<'blog'>,
    allPosts: CollectionEntry<'blog'>[],
    maxPosts: number = 3
): CollectionEntry<'blog'>[] {
    const index = buildIndex(allPosts);
    const scores = new Map<string, number>();

    // Calculate scores using the inverted index (O(1) lookups)
    currentPost.data.themen?.forEach(thema => {
        index.themen.get(thema)?.forEach(postId => {
            if (postId !== currentPost.id) {
                scores.set(postId, (scores.get(postId) || 0) + 2);
            }
        });
    });

    currentPost.data.tags?.forEach(tag => {
        index.tags.get(tag)?.forEach(postId => {
            if (postId !== currentPost.id) {
                scores.set(postId, (scores.get(postId) || 0) + 1);
            }
        });
    });

    // Map scores back to posts, filter > 0, and sort
    const related = Array.from(scores.entries())
        .map(([id, score]) => ({
            post: allPosts.find(p => p.id === id)!,
            score
        }))
        .sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            return b.post.data.pubDate.valueOf() - a.post.data.pubDate.valueOf();
        })
        .map(item => item.post);

    return related.slice(0, maxPosts);
}