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
  },
} as const;

export type SupportedLanguage = keyof typeof ui;

export function useTranslations(lang: SupportedLanguage) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}