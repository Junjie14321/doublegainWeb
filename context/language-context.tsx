'use client'

import { createContext, useContext, type ReactNode } from 'react'
import { translations, type Dictionary } from '@/lib/i18n/translations'

type Locale = 'en' | 'zh'

interface LanguageContextValue {
  locale: Locale
  t: Dictionary
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const t = translations[locale] as Dictionary
  return (
    <LanguageContext.Provider value={{ locale, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
