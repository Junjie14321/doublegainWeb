'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/context/language-context'
import { priceListLink } from '@/lib/whatsapp'

export function HeroSection() {
  const { locale, t } = useLanguage()

  return (
    <section className="relative overflow-hidden min-h-[360px] md:min-h-[420px] flex items-center pt-16">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-ingredients-background.jpg"
          alt="Premium food ingredients and sauces"
          fill
          priority
          quality={90}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-dark/50 md:bg-transparent" />
      </div>

      <div className="relative z-10 py-8 md:py-12 w-full">
        <div className="container-pad">
        <div className="max-w-md text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-secondary/20 border border-secondary/30 rounded-full px-4 py-1.5 mb-3 md:mb-4">
            <span className="w-2 h-2 rounded-full bg-secondary inline-block" />
            <span className="text-secondary text-xs font-subheading not-italic uppercase tracking-widest">
              {t.hero.badge}
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl lg:text-5xl text-white font-heading leading-tight mb-3 md:mb-4">
            Master 2 <span className="text-secondary">Foods</span>
          </h1>

          <p className="text-white/80 text-sm md:text-base font-body leading-relaxed mb-6 md:mb-8">
            {t.hero.tagline}
          </p>

          <div className="flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-3 md:gap-4">
            <a
              href={priceListLink(locale)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-dark text-dark font-subheading not-italic text-sm px-6 py-2.5 md:py-3 rounded-lg transition-colors uppercase tracking-wide"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.132.558 4.13 1.533 5.863L.057 23.57l5.861-1.508A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.91 0-3.695-.5-5.24-1.37l-.375-.22-3.478.895.93-3.373-.243-.389A9.943 9.943 0 012 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/>
              </svg>
              {t.hero.cta}
            </a>
            <Link
              href={`/${locale}/products`}
              className="inline-flex items-center justify-center gap-2 border border-white/30 text-white hover:border-secondary hover:text-secondary font-subheading not-italic text-sm px-6 py-2.5 md:py-3 rounded-lg transition-colors uppercase tracking-wide"
            >
              {t.hero.ctaSecondary}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
        </div>
      </div>
    </section>
  )
}
