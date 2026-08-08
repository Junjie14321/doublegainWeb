'use client'

import { useLanguage } from '@/context/language-context'

export function IntroSection() {
  const { t } = useLanguage()

  return (
    <section style={{ backgroundColor: '#FFF7DE' }} className="py-12 md:py-16">
      <div className="container-pad">
        <div className="max-w-3xl">
          <p className="text-primary font-subheading text-xs uppercase tracking-widest mb-3">
            {t.intro.badge}
          </p>
          <h2 className="text-2xl md:text-3xl font-heading text-primary mb-6 text-balance">
            {t.intro.heading}
          </h2>
          <div className="space-y-4 text-text-secondary font-body text-sm md:text-base leading-relaxed">
            <p>{t.intro.p1}</p>
            <p>{t.intro.p2}</p>
            <p>{t.intro.p3}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
