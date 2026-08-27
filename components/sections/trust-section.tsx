'use client'

import { useLanguage } from '@/context/language-context'

export function TrustSection() {
  const { t } = useLanguage()

  const values = [
    { title: t.values.v1Title, desc: t.values.v1Desc },
    { title: t.values.v2Title, desc: t.values.v2Desc },
    { title: t.values.v3Title, desc: t.values.v3Desc },
  ]

  return (
    <section style={{ backgroundColor: '#FFFEF8', paddingTop: '35px' }} className="pb-14 md:pb-16">
      <div className="container-pad">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v) => (
            <div key={v.title} className="rounded-xl p-6 bg-primary hover:border-primary/20 transition-colors">
              <h3 className="font-heading text-lg mb-2 text-center" style={{ color: '#FFCC5A' }}>{v.title}</h3>
              <p className="text-white/75 text-sm font-body leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
