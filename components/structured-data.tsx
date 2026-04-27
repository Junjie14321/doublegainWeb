import type { Product } from '@/lib/data/products'
import type { Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/dictionaries/en'

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Master 2',
    description: 'Premium supplier of specialty sauces, noodles, and pre-made ingredients for commercial Asian kitchens.',
    foundingDate: '1996',
    url: 'https://master2.com',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+60-12-345-6789',
      contactType: 'sales',
      availableLanguage: ['English', 'Chinese'],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface FAQSchemaProps {
  dict: Dictionary
}

export function FAQSchema({ dict }: FAQSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: dict.faq.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface ProductSchemaProps {
  product: Product
  locale: Locale
}

export function ProductSchema({ product, locale }: ProductSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name[locale],
    description: product.description[locale],
    image: `https://master2.com${product.image}`,
    brand: {
      '@type': 'Brand',
      name: 'Master 2',
    },
    category: product.category,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'MYR',
      seller: {
        '@type': 'Organization',
        name: 'Master 2',
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
