import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n/config'

interface PageProps {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === 'en' ? 'Landing Pages | Master 2' : '落地页 | Master 2',
  }
}

export default async function LandingPagesPage({ params }: PageProps) {
  const { locale } = await params
  return (
    <main className="container-pad py-20 min-h-screen">
      <h1 className="font-heading text-primary text-4xl mb-4">
        {locale === 'en' ? 'Landing Pages' : '落地页'}
      </h1>
      <p className="font-body text-text-muted text-sm">
        {locale === 'en' ? 'Coming soon.' : '即将推出。'}
      </p>
    </main>
  )
}
