'use client'

import Link from 'next/link'
import { ImageCarousel } from '@/components/ui/image-carousel'
import { useLanguage } from '@/context/language-context'

export function HeroSection() {
  const { locale, t } = useLanguage()

  return (
    <section className="relative flex items-end justify-start overflow-hidden bg-background min-h-[41vw] sm:min-h-0" style={{ aspectRatio: '2445.7 / 1000' }}>
      <div className="absolute inset-0 z-0">
        <ImageCarousel
          className="h-full"
          priority
          quality={85}
          slides={[
            {
              src: '/images/master2food-hero-banner-new.webp',
              alt: 'Master 2 Foods — specialty sauces and pre-made ingredients for commercial kitchens',
            },
          ]}
        />
      </div>

      <div className="absolute z-10 hidden lg:flex bottom-[22%] left-[91px]">
        <div className="flex flex-col items-stretch gap-5 sm:flex-row sm:items-center">
          <Link
            href={`/${locale}/products`}
            className="inline-flex items-center justify-center gap-1 rounded-lg border border-white/30 text-sm font-subheading uppercase tracking-wide transition-all duration-300 hover:scale-105 hover:border-secondary hover:shadow-lg"
            style={{ backgroundColor: 'rgba(255, 204, 90, 0.96)', color: 'var(--color-dark)', paddingTop: '12px', paddingBottom: '13px', paddingLeft: '16px', paddingRight: '10px' }}
          >
            {t.hero.ctaSecondary}
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
