import { HeroSection } from '@/components/sections/hero-section'
import { ExploreProductsSection } from '@/components/sections/explore-products-section'
import { CategorySection } from '@/components/sections/category-section'
import { TrustSection } from '@/components/sections/trust-section'
import { FAQSection } from '@/components/sections/faq-section'
import { CTASection } from '@/components/sections/cta-section'
import { getCategoriesWithSubs, getProducts } from '@/lib/sanity/products'

export const revalidate = 3600

export default async function HomePage() {
  const [categories, products] = await Promise.all([getCategoriesWithSubs(), getProducts()])

  return (
    <>
      <HeroSection />
      <ExploreProductsSection products={products} />
      <CategorySection categories={categories} />
      <TrustSection />
      <FAQSection />
      <CTASection />
    </>
  )
}
