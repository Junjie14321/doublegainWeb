import type { Metadata } from 'next'
import { HeroSection } from '@/components/sections/hero-section'
import { CategorySection } from '@/components/sections/category-section'
import { BrandTonalitySection } from '@/components/sections/brand-tonality-section'
import { BrandStorySection } from '@/components/sections/brand-story-section'
import { TrustSection } from '@/components/sections/trust-section'
import { FAQSection } from '@/components/sections/faq-section'
import { CTASection } from '@/components/sections/cta-section'
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

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params
  return (
    <>
      {/* Preload hero banner so browser fetches it immediately on HTML parse, not after JS hydration */}
      <link rel="preload" as="image" href="/images/master2food-hero-banner-new.webp" fetchPriority="high" />
      {/* H1 for SEO — visually hidden, the hero image carries the visual headline */}
      <h1 className="sr-only">
        {locale === 'zh'
          ? 'Master 2 — 新加坡亚洲酱料、面条及食材批发供应商'
          : 'Master 2 — Wholesale Asian Sauces, Noodles & Ingredients Supplier Singapore'}
      </h1>
      <HeroSection />
      <CategorySection />
      <BrandTonalitySection />
      <BrandStorySection />
      <TrustSection />
      <FAQSection />
      <CTASection />
    </>
  )
}
