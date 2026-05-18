'use client'

import { useState } from 'react'
import { useLanguage } from '@/context/language-context'
import { priceListLink } from '@/lib/whatsapp'
import { SITE, WHATSAPP_BASE } from '@/lib/constants/site'

function buildWhatsAppLink(message: string): string {
  return `${WHATSAPP_BASE}${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export default function ContactPage() {
  const { t, locale } = useLanguage()
  const [form, setForm] = useState({ name: '', businessType: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleWhatsAppSend = () => {
    const parts = [
      form.name ? `Hi, my name is ${form.name}.` : 'Hi,',
      form.businessType ? `I'm reaching out from a ${form.businessType} business.` : null,
      `I'm interested in your products and would like to enquire about:`,
      form.message || null,
      `Please feel free to contact me via WhatsApp or call. Thank you!`,
    ].filter(Boolean)
    const msg = parts.join('\n\n')
    const link = buildWhatsAppLink(msg)
    window.open(link, '_blank')
    setSubmitted(true)
  }

  return (
    <main className="bg-white min-h-screen pt-16">
      {/* Header */}
      <div className="bg-white border-b border-border-color">
        <div className="container-pad py-12">
          <h1 className="text-3xl md:text-4xl font-heading text-text-primary mb-2">
            {t.contact.title}
          </h1>
          <p className="text-text-muted font-body text-sm max-w-md">{t.contact.subtitle}</p>
        </div>
      </div>

      <div className="container-pad py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl">
          {/* Form */}
          <div className="bg-white rounded-xl border border-border-color p-6">
            {!submitted ? (
              <form onSubmit={(e) => { e.preventDefault(); handleWhatsAppSend() }} noValidate>
                <div className="flex flex-col gap-4">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="text-xs font-heading not-italic font-semibold uppercase tracking-wide text-text-muted block mb-1.5">
                      {t.contact.name}
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-3 py-2.5 text-sm font-body bg-surface border border-border-color rounded-lg focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-colors"
                    />
                  </div>

                  {/* Business Type */}
                  <div>
                    <label htmlFor="businessType" className="text-xs font-heading not-italic font-semibold uppercase tracking-wide text-text-muted block mb-1.5">
                      {t.contact.businessType}
                    </label>
                    <select
                      id="businessType"
                      value={form.businessType}
                      onChange={(e) => setForm({ ...form, businessType: e.target.value })}
                      className="w-full px-3 py-2.5 text-sm font-body bg-surface border border-border-color rounded-lg focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-colors appearance-none"
                    >
                      <option value="">Select...</option>
                      {t.contact.businessTypes.map((bt: string) => (
                        <option key={bt} value={bt}>{bt}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="text-xs font-heading not-italic font-semibold uppercase tracking-wide text-text-muted block mb-1.5">
                      {t.contact.message}
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder={t.contact.messagePlaceholder}
                      className="w-full px-3 py-2.5 text-sm font-body bg-surface border border-border-color rounded-lg focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-colors resize-none placeholder:text-text-muted"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-primary text-white font-ui font-semibold text-sm py-3 rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.132.558 4.13 1.533 5.863L.057 23.57l5.861-1.508A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.91 0-3.695-.5-5.24-1.37l-.375-.22-3.478.895.93-3.373-.243-.389A9.943 9.943 0 012 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/>
                    </svg>
                    {t.contact.submit}
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-text-primary font-ui font-semibold">Message sent via WhatsApp</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-primary underline font-ui"
                >
                  Send another
                </button>
              </div>
            )}
          </div>

          {/* Contact info */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-xs font-heading not-italic font-semibold uppercase tracking-widest text-text-muted mb-1">{t.contact.hours}</p>
              <p className="text-text-primary font-body text-sm leading-relaxed whitespace-pre-line">{t.contact.hoursValue}</p>
            </div>
            <div>
              <p className="text-xs font-heading not-italic font-semibold uppercase tracking-widest text-text-muted mb-1">{t.contact.address}</p>
              <p className="text-text-primary font-body text-sm leading-relaxed">{SITE.address}</p>
            </div>
            <div>
              <p className="text-xs font-heading not-italic font-semibold uppercase tracking-widest text-text-muted mb-1">{t.contact.email}</p>
              <a href={`mailto:${SITE.email}`} className="text-primary font-body text-sm hover:underline">{SITE.email}</a>
            </div>
            <div className="border-t border-border-color pt-6">
              <p className="text-xs font-heading not-italic font-semibold uppercase tracking-widest text-text-muted mb-3">{t.contact.whatsappDirect}</p>
              <a
                href={priceListLink(locale)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white font-heading not-italic font-semibold text-sm px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.132.558 4.13 1.533 5.863L.057 23.57l5.861-1.508A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.91 0-3.695-.5-5.24-1.37l-.375-.22-3.478.895.93-3.373-.243-.389A9.943 9.943 0 012 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/>
                </svg>
                {t.contact.whatsappButton}
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
