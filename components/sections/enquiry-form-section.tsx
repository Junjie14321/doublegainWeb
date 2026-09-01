'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/context/language-context'
import { SITE, WHATSAPP_BASE } from '@/lib/constants/site'

export function EnquiryFormSection() {
  const { t, locale } = useLanguage()
  const [name, setName] = useState('')
  const [businessType, setBusinessType] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const text =
      locale === 'zh'
        ? `您好，我是${name}（${businessType || '未指定'}）。\n\n${message}`
        : `Hi, I'm ${name}${businessType ? ` from a ${businessType}` : ''}.\n\n${message}`
    window.open(`${WHATSAPP_BASE}${SITE.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank')
  }

  const labelClass =
    'block text-[11px] font-subheading not-italic font-semibold uppercase tracking-widest text-primary mb-1.5'
  const inputClass =
    'w-full px-3 py-2.5 text-sm font-body bg-white border border-[#E5DDD5] rounded-lg focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-colors'

  return (
    <section className="container-pad py-10">
      <div
        className="rounded-2xl border border-[#E5DDD5] overflow-hidden"
        style={{ backgroundColor: '#FFFEF8' }}
      >
        <div className="flex flex-col lg:flex-row min-h-[420px]">
          {/* Left — product image with warm radial glow */}
          <div
            className="lg:w-[42%] shrink-0 relative flex items-end justify-center overflow-hidden"
            style={{
              background:
                'radial-gradient(ellipse 80% 70% at 45% 65%, #FFCC5A55 0%, #FFEDC4 45%, #FFFEF8 100%)',
              minHeight: '300px',
            }}
          >
            <div className="relative w-full h-full min-h-[280px] lg:min-h-[420px]">
              <Image
                src="/images/master2food-saucesnCondiments.jpg"
                alt="Master 2 product range"
                fill
                className="object-contain object-bottom"
                sizes="(max-width: 1023px) 100vw, 42vw"
              />
            </div>
          </div>

          {/* Right — form */}
          <div className="flex-1 px-8 py-10 lg:px-10 lg:py-12">
            <h2 className="font-heading text-primary leading-tight mb-2" style={{ fontSize: '30px' }}>
              {t.enquiry.title}
            </h2>
            <p className="font-body text-text-secondary text-sm leading-relaxed mb-7">
              {t.enquiry.subtitle}
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Name */}
              <div>
                <label className={labelClass}>{t.enquiry.nameLabel}</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className={inputClass}
                />
              </div>

              {/* Business Type */}
              <div>
                <label className={labelClass}>{t.enquiry.businessTypeLabel}</label>
                <select
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className={inputClass}
                >
                  <option value="">—</option>
                  {t.enquiry.businessTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label className={labelClass}>{t.enquiry.messageLabel}</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={4}
                  placeholder={t.enquiry.messagePlaceholder}
                  className={`${inputClass} resize-none placeholder:text-text-muted`}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3.5 bg-primary hover:bg-primary-dark text-white font-subheading not-italic font-semibold text-sm rounded-lg transition-colors mt-1"
              >
                {t.enquiry.sendButton}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
