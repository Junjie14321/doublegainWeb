import { getDictionary } from '@/lib/i18n/get-dictionary'
import { HeroSection } from '@/components/sections/hero-section'
import { TrustSection } from '@/components/sections/trust-section'
import { ValueSection } from '@/components/sections/value-section'
import { CategorySection } from '@/components/sections/category-section'
import { FeaturedSection } from '@/components/sections/featured-section'
import { BenefitsSection } from '@/components/sections/benefits-section'
import { FAQSection } from '@/components/sections/faq-section'
import { CTASection } from '@/components/sections/cta-section'
import { OrganizationSchema, FAQSchema } from '@/components/structured-data'
import type { Locale } from '@/lib/i18n/config'

export const revalidate = 3600 // ISR: revalidate every hour

interface PageProps {
  params: Promise<{ locale: Locale }>
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params
  const dict = getDictionary(locale)

  return (
    <>
      <OrganizationSchema />
      <FAQSchema dict={dict} />
      <HeroSection locale={locale} dict={dict} />
      <TrustSection dict={dict} />
      <ValueSection dict={dict} />
      <CategorySection locale={locale} dict={dict} />
      <FeaturedSection locale={locale} dict={dict} />
      <BenefitsSection dict={dict} />
      <FAQSection dict={dict} />
      <CTASection locale={locale} dict={dict} />
    </>
  )
}
