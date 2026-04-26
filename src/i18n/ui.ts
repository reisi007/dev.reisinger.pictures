export const languages = {
  de: 'Deutsch',
  en: 'English',
};

export const defaultLang = 'de';

export const ui = {
  de: {
    'nav.home': 'Startseite',
    'nav.about': 'Über mich',
    'blog.recent': 'Neueste Beiträge',
    'blog.related': 'Verwandte Beiträge',
    'blog.no_posts': 'Noch keine Beiträge vorhanden',
    'blog.create_first': 'Nutze pnpm run new, um deinen ersten Beitrag zu erstellen.',
    'footer.rights': 'Alle Rechte vorbehalten.',
    'site.title': 'dev.reisinger.pictures',
    'site.description': 'Mein persönlicher Blog über Webentwicklung, Architektur und Technologie.',
    'route.themen': 'themen',
    'route.tags': 'tags',
    'route.archiv': 'archiv',
    
    // Archive
    'archive.title': 'Archiv',
    'archive.subtitle': 'Alle Beiträge chronologisch sortiert.',
    'archive.back': 'Zurück zum Archiv',
    'archive.back_to': 'Zurück zu',
    
    // Taxonomies
    'taxonomy.tags.title': 'Alle Tags',
    'taxonomy.tags.subtitle': 'Alle Stichwörter auf einen Blick.',
    'taxonomy.tags.back': 'Alle Tags',
    'taxonomy.tags.prefix': 'Tag:',
    'taxonomy.topics.title': 'Alle Themen',
    'taxonomy.topics.subtitle': 'Alle Kategorien auf einen Blick.',
    'taxonomy.topics.back': 'Zurück zur Übersicht',
    'taxonomy.topics.prefix': 'Beiträge zum Thema:',
    
    // General
    'general.post_found': '1 Beitrag gefunden',
    'general.posts_found': '{count} Beiträge gefunden',
    
    // Search
    'search.placeholder': 'Suchen...',
    'search.clear': 'Suche leeren',
    'search.empty': 'Keine Ergebnisse gefunden.',
    'search.dev_mode': 'Suche im Dev-Modus erst nach dem ersten Build verfügbar.',
    'search.no_title': 'Ohne Titel',
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About me',
    'blog.recent': 'Latest Posts',
    'blog.related': 'Related Posts',
    'blog.no_posts': 'No posts available yet',
    'blog.create_first': 'Use pnpm run new to create your first post.',
    'footer.rights': 'All rights reserved.',
    'site.title': 'dev.reisinger.pictures',
    'site.description': 'My personal blog about web development, architecture, and technology.',
    'route.themen': 'topics',
    'route.tags': 'tags',
    'route.archiv': 'archive',
    
    // Archive
    'archive.title': 'Archive',
    'archive.subtitle': 'All posts sorted chronologically.',
    'archive.back': 'Back to Archive',
    'archive.back_to': 'Back to',
    
    // Taxonomies
    'taxonomy.tags.title': 'All Tags',
    'taxonomy.tags.subtitle': 'All tags at a glance.',
    'taxonomy.tags.back': 'All tags',
    'taxonomy.tags.prefix': 'Tag:',
    'taxonomy.topics.title': 'All Topics',
    'taxonomy.topics.subtitle': 'All categories at a glance.',
    'taxonomy.topics.back': 'Back to overview',
    'taxonomy.topics.prefix': 'Posts about:',
    
    // General
    'general.post_found': '1 post found',
    'general.posts_found': '{count} posts found',
    
    // Search
    'search.placeholder': 'Search...',
    'search.clear': 'Clear search',
    'search.empty': 'No results found.',
    'search.dev_mode': 'Search in dev mode only available after the first build.',
    'search.no_title': 'No title',
  },
} as const;

export type SupportedLanguage = keyof typeof ui;

export function useTranslations(lang: SupportedLanguage) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}
