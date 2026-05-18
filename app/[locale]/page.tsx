import { HeroSection } from '@/components/sections/hero-section'
import { CategorySection } from '@/components/sections/category-section'
import { TrustSection } from '@/components/sections/trust-section'
import { FAQSection } from '@/components/sections/faq-section'
import { CTASection } from '@/components/sections/cta-section'

export const revalidate = 3600

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <TrustSection />
      <FAQSection />
      <CTASection />
    </>
  )
}
