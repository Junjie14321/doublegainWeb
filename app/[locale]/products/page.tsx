import { Suspense } from 'react'
import type { Metadata } from 'next'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { ProductsClientPage } from '@/components/products/products-client-page'
import { getProducts, getCategoriesWithSubs } from '@/lib/sanity/products'
import type { Locale } from '@/lib/i18n/config'

export const revalidate = 3600

interface PageProps {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const dict = getDictionary(locale)

  return {
    title: locale === 'en'
      ? 'Asian Sauces & Noodles for Commercial Kitchens | Master 2'
      : '商业厨房亚洲酱料与面条供应商 | Master 2',
    description: locale === 'en'
      ? 'Browse our complete range of specialty sauces, noodles, and pre-made ingredients for commercial kitchens.'
      : '浏览我们为商业厨房提供的全系列特色酱料、面条和预制食材。',
  }
}

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategoriesWithSubs(),
  ])

  return (
    <Suspense>
      <ProductsClientPage products={products} categories={categories} />
    </Suspense>
  )
}
