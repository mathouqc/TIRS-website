import { en } from '@/i18n/translations/en';
import { fr } from '@/i18n/translations/fr';

export const SUPPORTED_LOCALES = ['fr', 'en'] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'fr';

const fallbackLocale: Locale = DEFAULT_LOCALE;

export function isLocale(value: string | null | undefined): value is Locale {
  return typeof value === 'string' && (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

export function resolveLocale(...candidates: Array<string | null | undefined>): Locale {
  for (const candidate of candidates) {
    if (isLocale(candidate)) {
      return candidate;
    }
  }

  return fallbackLocale;
}

export function localeFromPathname(pathname: string): Locale | undefined {
  const segment = pathname.split('/').filter(Boolean)[0];
  return isLocale(segment) ? segment : undefined;
}

export function pathWithoutLocale(pathname: string): string {
  const parts = pathname.split('/').filter(Boolean);

  if (parts.length === 0) {
    return '/';
  }

  if (isLocale(parts[0])) {
    const next = parts.slice(1).join('/');
    return next ? `/${next}` : '/';
  }

  return pathname.startsWith('/') ? pathname : `/${pathname}`;
}

export function localizePath(pathname: string, locale: Locale): string {
  const basePath = pathWithoutLocale(pathname);
  return basePath === '/' ? `/${locale}/` : `/${locale}${basePath}`;
}

export const dictionary = {
  fr,
  en,
} as const;

export function t(locale: Locale) {
  return dictionary[locale];
}
