import { en } from '@/i18n/translations/en';
import { fr } from '@/i18n/translations/fr';
import { SITE_BASE_PATH } from '@/site-config.mjs';

export const SUPPORTED_LOCALES = ['fr', 'en'] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'fr';

const fallbackLocale: Locale = DEFAULT_LOCALE;
const configuredBasePath: string = SITE_BASE_PATH;
const baseUrl = configuredBasePath === '/' ? '' : configuredBasePath.replace(/\/$/, '');

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

export function stripBasePath(pathname: string): string {
  if (!baseUrl) {
    return pathname || '/';
  }

  if (pathname === baseUrl) {
    return '/';
  }

  if (pathname.startsWith(`${baseUrl}/`)) {
    return pathname.slice(baseUrl.length) || '/';
  }

  return pathname || '/';
}

export function withBasePath(pathname: string): string {
  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return baseUrl ? `${baseUrl}${normalizedPath === '/' ? '/' : normalizedPath}` : normalizedPath;
}

export function localeFromPathname(pathname: string): Locale | undefined {
  const segment = stripBasePath(pathname).split('/').filter(Boolean)[0];
  return isLocale(segment) ? segment : undefined;
}

export function pathWithoutLocale(pathname: string): string {
  const normalizedPath = stripBasePath(pathname);
  const parts = normalizedPath.split('/').filter(Boolean);

  if (parts.length === 0) {
    return '/';
  }

  if (isLocale(parts[0])) {
    const next = parts.slice(1).join('/');
    return next ? `/${next}` : '/';
  }

  return normalizedPath.startsWith('/') ? normalizedPath : `/${normalizedPath}`;
}

export function localizePath(pathname: string, locale: Locale): string {
  const basePath = pathWithoutLocale(pathname);
  return withBasePath(basePath === '/' ? `/${locale}/` : `/${locale}${basePath}`);
}

export const dictionary = {
  fr,
  en,
} as const;

export function t(locale: Locale) {
  return dictionary[locale];
}
