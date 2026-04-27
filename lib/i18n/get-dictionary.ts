import type { Locale } from './config'
import { en, type Dictionary } from './dictionaries/en'
import { zh } from './dictionaries/zh'

const dictionaries: Record<Locale, Dictionary> = {
  en,
  zh,
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en
}
