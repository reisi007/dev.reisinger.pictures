import type {CollectionEntry} from 'astro:content';
import type {SupportedLanguage} from "../i18n/ui.ts";
import path from "path";
import 'core-js/actual/map/get-or-insert';

function getCleanSlug(currentEntry: string) {
    return currentEntry.replace(/\/?index(en)?$/, '/')
}

export function getBlogSlug(entry: CollectionEntry<"blog">) {
    return entry.data.slug ?? getCleanSlug(entry.id);
}

/**
 * Generiert die URL für einen Blog-Beitrag.
 */
export function getBlogUrl(entry: CollectionEntry<'blog'>) {
    return getFullUrl(getBlogSlug(entry), entry.data.lang)
}

export function getSimplePageSlug(entry: CollectionEntry<"simple">) {
    return getCleanSlug(entry.id);
}

function getFullUrl(slug: string, lang: "de" | "en") {
    const langPrefix = lang === 'de' ? '' : '/en';
    const finalPath = slug === '' ? '/' : `/${slug}/`;
    return `${langPrefix}${finalPath}`.replace(/\/\/+/g, '/');
}

/**
 * Generiert die URL für eine einfache Seite (Simple Collection).
 * Berücksichtigt die Startseite (leerer Slug).
 */
export function getSimplePageUrl(entry: CollectionEntry<'simple'>): string {
    let lang = entry.data.lang;
    const slug = getSimplePageSlug(entry);
    return getFullUrl(slug, lang);
}

export function computeAllSimpleUrls(entry: CollectionEntry<"simple">[]): Map<string, Map<SupportedLanguage, string>> {
    const records = new Map<string, Map<SupportedLanguage, string>>();
    for (let e of entry) {
        records.getOrInsert(getFolder(e), new Map()).set(e.data.lang, getSimplePageUrl(e))
    }
    return records;
}

export function computeAllBlogUrls(entry: CollectionEntry<"blog">[]): Map<string, Map<SupportedLanguage, string>> {
    const records = new Map<string, Map<SupportedLanguage, string>>();
    for (let e of entry) {
        records.getOrInsert(getFolder(e), new Map()).set(e.data.lang, getBlogUrl(e))
    }
    return records;
}

export function getFolder(entry: CollectionEntry<"simple" | "blog">) {
    const filePath = entry.filePath;
    if (!filePath) {
        throw Error("No file path provided");
    }
    return path.dirname(filePath);
}

/**
 * Wandelt einen String in eine URL-freundliche Version (Clean URL / Slug) um.
 * Ersetzt Umlaute, konvertiert zu Kleinbuchstaben und ersetzt Leerzeichen durch Bindestriche.
 */
export function slugify(text: string): string {
    const charMap: Record<string, string> = {
        'ä': 'ae', 'ö': 'oe', 'ü': 'ue', 'ß': 'ss',
        'Ä': 'ae', 'Ö': 'oe', 'Ü': 'ue'
    };
    
    return text
        // Umlaute ersetzen
        .replace(/[äöüßÄÖÜ]/g, match => charMap[match] || match)
        // In Kleinbuchstaben umwandeln
        .toLowerCase()
        // Sonderzeichen und Whitespace durch Bindestriche ersetzen
        .replace(/[^a-z0-9]+/g, '-')
        // Führende und abschließende Bindestriche entfernen
        .replace(/^-+|-+$/g, '');
}
