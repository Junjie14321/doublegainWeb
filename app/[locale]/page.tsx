import type { Metadata } from 'next'
import { HeroSection } from '@/components/sections/hero-section'
import { ExploreProductsSection } from '@/components/sections/explore-products-section'
import { CategorySection } from '@/components/sections/category-section'
import { ArticlesSection } from '@/components/sections/articles-section'
import { TrustSection } from '@/components/sections/trust-section'
import { FAQSection } from '@/components/sections/faq-section'
import { CTASection } from '@/components/sections/cta-section'
import { getCategoriesWithSubs, getProducts } from '@/lib/sanity/products'
import { getArticles } from '@/lib/sanity/articles'
import { seoAlternates } from '@/lib/seo'
import type { Locale } from '@/lib/i18n/config'

export const revalidate = 3600

interface PageProps {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === 'en'
      ? 'Master 2 | Asian Sauces & Noodles Supplier'
      : 'Master 2 | 亚洲酱料与面条供应商',
    description: locale === 'en'
      ? 'Specialty sauces, noodles and pre-made ingredients for commercial kitchens in Singapore since 1996.'
      : '自1996年起为新加坡商业厨房提供特色酱料、面条及预制食材。',
    alternates: seoAlternates(`/${locale}`),
  }
}

export default async function HomePage() {
  const [categories, products, articles] = await Promise.all([
    getCategoriesWithSubs(),
    getProducts(),
    getArticles(),
  ])

  return (
    <>
      <HeroSection />
      <ExploreProductsSection products={products} />
      <CategorySection categories={categories} />
      <ArticlesSection articles={articles.slice(0, 3)} />
      <TrustSection />
      <FAQSection />
      <CTASection />
    </>
  )
}
