'use client'

import { useLanguage } from '@/context/language-context'
import { priceListLink } from '@/lib/whatsapp'

const VALUE_ICONS = [
  (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  ),
  (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
]

export function TrustSection() {
  const { locale, t } = useLanguage()

  const valuesData = [
    { icon: VALUE_ICONS[0], title: t.values.v1Title, desc: t.values.v1Desc },
    { icon: VALUE_ICONS[1], title: t.values.v2Title, desc: t.values.v2Desc },
    { icon: VALUE_ICONS[2], title: t.values.v3Title, desc: t.values.v3Desc },
  ]

  return (
    <>
      {/* Since / Stats section */}
      <section className="py-14 md:py-16 bg-primary text-white">
        <div className="container-pad">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <div className="md:w-1/2">
              <p className="text-secondary font-subheading text-xs uppercase tracking-widest mb-3">
                {t.trust.since}
              </p>
              <h2 className="text-3xl md:text-4xl font-heading text-white mb-4 text-balance">
                {t.trust.description}
              </h2>
              <a
                href={priceListLink(locale)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-dark font-subheading text-sm px-6 py-3 rounded-lg transition-colors uppercase tracking-wide mt-4"
              >
                {t.cta.button}
              </a>
            </div>
            <div className="md:w-1/2 grid grid-cols-3 gap-4">
              {[
                { value: t.trust.stat1, label: t.trust.stat1Label },
                { value: t.trust.stat2, label: t.trust.stat2Label },
                { value: t.trust.stat3, label: t.trust.stat3Label },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                  <p className="text-secondary text-3xl font-heading">{stat.value}</p>
                  <p className="text-white/60 text-xs font-subheading uppercase tracking-wide mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values section */}
      <section style={{ backgroundColor: '#FFF7DE' }} className="py-14 md:py-16">
        <div className="container-pad">
          <div className="text-left mb-8">
            <h2 className="text-xl md:text-2xl font-heading text-primary text-balance">
              {t.values.title}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {valuesData.map((v, i) => (
              <div key={i} className="rounded-xl p-6 border border-border-color hover:border-primary/20 transition-colors bg-primary">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-white mb-4">
                  {v.icon}
                </div>
                <h3 className="font-heading text-lg mb-2" style={{ color: '#FFCC5A' }}>{v.title}</h3>
                <p className="text-white/75 text-sm font-body leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
