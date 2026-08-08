import type { Metadata } from 'next'

/**
 * Generates canonical + hreflang alternates for a given locale-prefixed path.
 * Requires metadataBase to be set in the root layout to produce absolute URLs.
 *
 * @param localePath  e.g. '/en/products' or '/zh/blog/guides/my-article'
 */
export function seoAlternates(localePath: string): NonNullable<Metadata['alternates']> {
  const enPath = localePath.replace(/^\/(en|zh)/, '/en')
  const zhPath = localePath.replace(/^\/(en|zh)/, '/zh')
  return {
    canonical: localePath,
    languages: {
      'en': enPath,
      'zh': zhPath,
      'x-default': enPath,
    },
  }
}
