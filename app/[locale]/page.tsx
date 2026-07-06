import { HeroSection } from '@/components/sections/hero-section'
import { ExploreProductsSection } from '@/components/sections/explore-products-section'
import { CategorySection } from '@/components/sections/category-section'
import { ArticlesSection } from '@/components/sections/articles-section'
import { TrustSection } from '@/components/sections/trust-section'
import { FAQSection } from '@/components/sections/faq-section'
import { CTASection } from '@/components/sections/cta-section'
import { getCategoriesWithSubs, getProducts } from '@/lib/sanity/products'
import { getArticles } from '@/lib/sanity/articles'

export const revalidate = 3600

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
