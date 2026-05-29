'use client'

import Image from 'next/image'
import { useLanguage } from '@/context/language-context'
import { priceListLink } from '@/lib/whatsapp'

export function AboutClient() {
  const { t, locale } = useLanguage()

  const values = [
    { title: t.about.v1, desc: t.about.v1Desc },
    { title: t.about.v2, desc: t.about.v2Desc },
    { title: t.about.v3, desc: t.about.v3Desc },
  ]

  return (
    <main className="bg-white pt-16">
      {/* Hero */}
      <section className="border-b border-border-color" style={{ backgroundColor: '#FFF7DE' }}>
        <div className="container-pad py-16 md:py-20 flex flex-col md:flex-row gap-10 items-center">
          <div className="flex-1 max-w-xl">
            <p className="text-xs font-subheading not-italic font-semibold uppercase tracking-widest text-primary mb-3">
              {t.trust.since}
            </p>
            <h1 className="text-4xl md:text-5xl font-heading text-text-primary mb-5 leading-tight">
              {t.about.title}
            </h1>
            <p className="font-body text-text-secondary text-base leading-relaxed">
              {t.about.subtitle}
            </p>
          </div>
          <div className="shrink-0">
            <Image
              src="/images/v2 red logo.png"
              alt="Master 2 Foods logo"
              width={480}
              height={480}
              className="object-contain w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96"
            />
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="container-pad py-14">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-heading text-text-primary mb-6">{t.about.mission}</h2>
          <p className="font-body text-text-secondary text-base leading-relaxed">
            {t.about.story}
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary py-14">
        <div className="container-pad">
          <div className="grid grid-cols-3 gap-6 text-center">
            {[
              { stat: t.trust.stat1, label: t.trust.stat1Label },
              { stat: t.trust.stat2, label: t.trust.stat2Label },
              { stat: t.trust.stat3, label: t.trust.stat3Label },
            ].map((item, i) => (
              <div key={i}>
                <p className="text-4xl md:text-5xl font-heading text-white">{item.stat}</p>
                <p className="text-white/70 text-sm mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="container-pad py-14 border-b border-border-color">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-heading text-text-primary mb-4">{t.about.values}</h2>
          <p className="font-body text-text-secondary text-base leading-relaxed">
            {t.about.missionText}
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="container-pad py-14" style={{ backgroundColor: '#FFF7DE' }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <div key={i} className="bg-white rounded-xl border border-border-color p-6">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-primary font-heading text-lg font-bold">{i + 1}</span>
              </div>
              <h3 className="font-ui font-semibold text-text-primary mb-2">{v.title}</h3>
              <p className="font-body text-text-muted text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface py-14">
        <div className="container-pad text-center">
          <h2 className="text-2xl md:text-3xl font-heading text-text-primary mb-4">
            {t.cta.title}
          </h2>
          <p className="font-body text-text-muted text-sm max-w-md mx-auto mb-6">
            {t.cta.subtitle}
          </p>
          <a
            href={priceListLink(locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-white font-heading text-sm uppercase tracking-wide px-8 py-4 rounded-lg hover:bg-primary-dark transition-colors"
          >
            {t.cta.button}
          </a>
        </div>
      </section>
    </main>
  )
}
