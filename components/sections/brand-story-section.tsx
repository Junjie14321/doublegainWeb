'use client'

import { useLanguage } from '@/context/language-context'

export function BrandStorySection() {
  const { t } = useLanguage()

  return (
    <section className="py-10 md:py-16" style={{ backgroundColor: '#FFFEF8', paddingBottom: '10px' }} aria-labelledby="brand-story-title">
      <div className="container-pad">
        <div className="mx-auto max-w-5xl">
          {/* Stats Cards */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16" style={{ marginTop: '18px', marginBottom: '17px' }}>
            {[
              { value: t.trust.stat1, label: t.trust.stat1Label },
              { value: t.trust.stat2, label: t.trust.stat2Label },
              { value: t.trust.stat3, label: t.trust.stat3Label },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl p-4 text-center"
                style={{ backgroundColor: 'var(--color-secondary)' }}
              >
                <p className="text-3xl font-heading" style={{ color: 'var(--color-primary)' }}>{stat.value}</p>
                <p className="text-xs font-subheading uppercase tracking-wide mt-1" style={{ color: 'var(--color-primary)' }}>{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Story Text */}
          <div className="text-center" style={{ marginRight: '10px' }}>
            <p className="mb-3 font-subheading text-xs uppercase tracking-widest text-primary">{t.brandStory.badge}</p>
            <h2 id="brand-story-title" className="mb-5 font-heading text-2xl text-primary md:text-3xl">
              {t.brandStory.title}
            </h2>
            <div className="font-body text-base leading-relaxed text-text-secondary md:text-lg" style={{ fontWeight: '500' }}>
              <p className="mb-4">{t.brandStory.p1}</p>
              <p className="mb-4">{t.brandStory.p2}</p>
              <p className="mb-4">{t.brandStory.p3}</p>
              <p style={{ fontStyle: 'italic' }}>{t.brandStory.p4}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
