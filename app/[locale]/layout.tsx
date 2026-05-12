import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { locales, type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { LanguageProvider } from '@/context/language-context'
import { SavedListProvider } from '@/context/saved-list-context'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { WhatsAppFAB } from '@/components/ui/whatsapp-fab'
import '../globals.css'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!locales.includes(locale as Locale)) {
    notFound()
  }
  const dict = getDictionary(locale as Locale)

  return {
    title: {
      default: dict.metadata.title,
      template: `%s | Master 2`,
    },
    description: dict.metadata.description,
    openGraph: {
      title: dict.metadata.title,
      description: dict.metadata.description,
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      type: 'website',
      siteName: 'Master 2',
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.metadata.title,
      description: dict.metadata.description,
    },
    alternates: {
      languages: {
        en: '/en',
        zh: '/zh',
      },
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!locales.includes(locale as Locale)) {
    notFound()
  }
  const currentLocale = locale as Locale

  return (
    <LanguageProvider locale={currentLocale}>
      <SavedListProvider>
        <div className="bg-background min-h-screen flex flex-col font-sans antialiased">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppFAB />
        </div>
      </SavedListProvider>
    </LanguageProvider>
  )
}
