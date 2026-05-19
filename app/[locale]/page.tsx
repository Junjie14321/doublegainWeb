import { HeroSection } from '@/components/sections/hero-section'
import { CategorySection } from '@/components/sections/category-section'
import { TrustSection } from '@/components/sections/trust-section'
import { FAQSection } from '@/components/sections/faq-section'
import { CTASection } from '@/components/sections/cta-section'
import { getCategoriesWithSubs } from '@/lib/sanity/products'

export const revalidate = 3600

export default async function HomePage() {
  const categories = await getCategoriesWithSubs()

  return (
    <>
      <HeroSection />
      <CategorySection categories={categories} />
      <TrustSection />
      <FAQSection />
      <CTASection />
    </>
  )
}
