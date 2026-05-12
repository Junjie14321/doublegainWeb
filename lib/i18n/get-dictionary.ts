import { translations, type Dictionary } from '@/lib/i18n/translations'
import type { Locale } from '@/lib/i18n/config'

export function getDictionary(locale: Locale): Dictionary {
  return (translations[locale] ?? translations.en) as Dictionary
}
