'use client'

import { useState } from 'react'
import { useLanguage } from '@/context/language-context'

export function FAQSection() {
  const { t } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section style={{ backgroundColor: '#FFCC5A', paddingTop: '26px', paddingBottom: '64px' }}>
      <div className="container-pad">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-16">
          {/* Left header */}
          <div className="md:col-span-2">
            <p className="text-primary font-subheading text-xs uppercase tracking-widest mb-2">{t.faq.title}</p>
            <h2 className="text-xl md:text-2xl font-heading text-primary text-balance text-left">
              {t.faq.subtitle}
            </h2>
            <div className="w-10 h-0.5 bg-primary mt-4" />
          </div>

          {/* Right FAQs */}
          <div className="md:col-span-3 flex flex-col gap-2">
            {t.faq.items.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-border-color overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={openIndex === i}
                >
                  <span className="font-subheading text-sm text-text-primary">{faq.question}</span>
                  <span className={`flex-shrink-0 w-5 h-5 rounded-full border border-border-color flex items-center justify-center transition-colors ${openIndex === i ? 'bg-primary border-primary' : ''}`}>
                    <svg
                      className={`w-3 h-3 transition-transform ${openIndex === i ? 'rotate-180 text-white' : 'text-text-muted'}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                {openIndex === i && (
                  <div className="px-5 pb-4 border-t border-border-color">
                    <p className="text-text-secondary text-sm font-body leading-relaxed pt-3">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
