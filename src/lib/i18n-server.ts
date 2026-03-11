import Negotiator from 'negotiator';
import { match } from '@formatjs/intl-localematcher';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type Locale } from '@/lib/i18n';

export function localeFromRequestHeaders(headers: Headers): Locale {
  const negotiator = new Negotiator({
    headers: {
      'accept-language': headers.get('accept-language') ?? undefined,
    },
  });

  const requested = negotiator.languages();

  return match(requested, [...SUPPORTED_LOCALES], DEFAULT_LOCALE) as Locale;
}
