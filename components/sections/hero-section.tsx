import Link from 'next/link'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { generateWhatsAppLink } from '@/lib/whatsapp'
import type { Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/dictionaries/en'

interface HeroSectionProps {
  locale: Locale
  dict: Dictionary
}

export function HeroSection({ locale, dict }: HeroSectionProps) {
  const whatsappLink = generateWhatsAppLink({
    intent: 'price-list',
    locale,
  })

  return (
    <section className="relative bg-[#451919] text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,204,90,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(174,34,10,0.3),transparent_50%)]" />
      </div>

      <div className="container mx-auto px-4 py-20 md:py-28 lg:py-32 relative">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-sm">
            <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
            <span className="text-white/90">
              {locale === 'en' ? 'Since 1996' : '始于1996年'}
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight text-balance">
            Master 2
          </h1>

          {/* Tagline */}
          <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto text-pretty">
            {dict.hero.tagline}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2 min-w-[200px]"
              >
                <MessageCircle className="h-5 w-5" />
                {dict.hero.cta}
              </Button>
            </a>
            <Link href={`/${locale}/products`}>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 gap-2 min-w-[200px]"
              >
                {dict.hero.secondaryCta}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" className="w-full h-auto" preserveAspectRatio="none">
          <path
            fill="var(--background)"
            d="M0,100 L0,60 Q360,0 720,60 Q1080,120 1440,60 L1440,100 Z"
          />
        </svg>
      </div>
    </section>
  )
}
