'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/context/language-context'
import { SITE } from '@/lib/constants/site'

export function Footer() {
  const { locale, t } = useLanguage()

  return (
    <footer className="bg-primary text-white">
      <div className="container-pad py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-ui text-secondary text-sm uppercase tracking-widest mb-4">
              {t.footer.stayConnected}
            </h3>
            <div className="flex flex-col gap-3">
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 text-sm text-white/80 hover:text-secondary transition-colors">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {SITE.email}
              </a>
              <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-sm text-white/80 hover:text-secondary transition-colors">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {SITE.phone}
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-ui text-secondary text-sm uppercase tracking-widest mb-4">
              {t.footer.quickLinks}
            </h3>
            <div className="flex flex-col gap-2">
              <Link href={`/${locale}`} className="text-sm text-white/80 hover:text-secondary transition-colors">{t.nav.home}</Link>
              <Link href={`/${locale}/products`} className="text-sm text-white/80 hover:text-secondary transition-colors">{t.nav.products}</Link>
              <Link href={`/${locale}/about`} className="text-sm text-white/80 hover:text-secondary transition-colors">{t.nav.brand}</Link>
              <Link href={`/${locale}/contact`} className="text-sm text-white/80 hover:text-secondary transition-colors">{t.nav.contact}</Link>
            </div>
          </div>

          <div className="flex flex-col md:items-end gap-4">
            <Image src="/images/logo-new.png" alt="Master 2 Foods" width={100} height={60} className="h-14 w-auto object-contain bg-white rounded p-2" />
            <div className="text-right">
              <p className="font-ui text-secondary text-sm">{t.footer.companyName}</p>
              <p className="text-xs text-white/60 mt-1">{SITE.address}</p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/50">{t.footer.copyright}</p>
          <p className="text-xs text-white/30">Master 2 Foods — Since {SITE.since}</p>
        </div>
      </div>
    </footer>
  )
}
