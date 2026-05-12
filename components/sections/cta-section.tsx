'use client'

import { useLanguage } from '@/context/language-context'
import { priceListLink } from '@/lib/whatsapp'

export function CTASection() {
  const { locale, t } = useLanguage()

  return (
    <section style={{ backgroundColor: '#FFF7DE' }} className="py-14 md:py-20">
      <div className="container-pad text-center">
        <h2 className="text-3xl md:text-4xl font-heading text-primary mb-4 text-balance">
          {t.cta.title}
        </h2>
        <p className="text-text-muted text-base font-body max-w-xl mx-auto mb-8 leading-relaxed">
          {t.cta.subtitle}
        </p>
        <a
          href={priceListLink(locale)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-dark font-subheading text-sm px-8 py-4 rounded-lg transition-colors uppercase tracking-wide"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.132.558 4.13 1.533 5.863L.057 23.57l5.861-1.508A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.91 0-3.695-.5-5.24-1.37l-.375-.22-3.478.895.93-3.373-.243-.389A9.943 9.943 0 012 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/>
          </svg>
          {t.cta.button}
        </a>
      </div>
    </section>
  )
}
