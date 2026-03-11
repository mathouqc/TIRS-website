import Negotiator from 'negotiator';
import { match } from '@formatjs/intl-localematcher';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type Locale } from '@/lib/i18n';

function canonicalizeLocaleCandidates(candidates: string[]): string[] {
  const canonicalLocales = new Set<string>();

  for (const candidate of candidates) {
    if (!candidate || candidate === '*') {
      continue;
    }

    try {
      for (const locale of Intl.getCanonicalLocales(candidate)) {
        canonicalLocales.add(locale);
      }
    } catch {
      continue;
    }
  }

  return [...canonicalLocales];
}

export function localeFromRequestHeaders(headers: Headers): Locale {
  const negotiator = new Negotiator({
    headers: {
      'accept-language': headers.get('accept-language') ?? undefined,
    },
  });

  const requested = canonicalizeLocaleCandidates(negotiator.languages());

  if (requested.length === 0) {
    return DEFAULT_LOCALE;
  }

  return match(requested, [...SUPPORTED_LOCALES], DEFAULT_LOCALE) as Locale;
}
