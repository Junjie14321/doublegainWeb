import { Suspense } from 'react'
import type { Metadata } from 'next'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { ProductsClientPage } from '@/components/products/products-client-page'
import type { Locale } from '@/lib/i18n/config'

export const revalidate = 3600

interface PageProps {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const dict = getDictionary(locale)

  return {
    title: dict.nav.products,
    description: locale === 'en'
      ? 'Browse our complete range of specialty sauces, noodles, and pre-made ingredients for commercial kitchens.'
      : '浏览我们为商业厨房提供的全系列特色酱料、面条和预制食材。',
  }
}

export default function ProductsPage() {
  return (
    <Suspense>
      <ProductsClientPage />
    </Suspense>
  )
}
