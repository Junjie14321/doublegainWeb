import type { Metadata } from 'next'
import { Amiri, Source_Code_Pro } from 'next/font/google'
import { notFound } from 'next/navigation'
import { locales, type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { StickyCTA } from '@/components/sticky-cta'
import '../globals.css'

const amiri = Amiri({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-heading',
  display: 'swap',
})

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

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
  const currentLocale = locale as Locale
  const dict = getDictionary(currentLocale)

  return {
    title: {
      default: dict.metadata.title,
      template: `%s | Master 2`,
    },
    description: dict.metadata.description,
    openGraph: {
      title: dict.metadata.title,
      description: dict.metadata.description,
      locale: currentLocale === 'zh' ? 'zh_CN' : 'en_US',
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
  const dict = getDictionary(currentLocale)

  return (
    <div
      lang={currentLocale}
      className={`${amiri.variable} ${sourceCodePro.variable} bg-background min-h-screen flex flex-col font-sans antialiased`}
    >
      <Navbar locale={currentLocale} dict={dict} />
      <main className="flex-1">{children}</main>
      <Footer locale={currentLocale} dict={dict} />
      <StickyCTA locale={currentLocale} dict={dict} />
    </div>
  )
}
