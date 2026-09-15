import type { Metadata } from 'next'
import Link from 'next/link'
import type { Locale } from '@/lib/i18n/config'

interface PageProps {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === 'en' ? 'Landing Pages | Master 2' : '落地页 | Master 2',
    description: 'Explore Master 2 Foods campaign landing pages.',
  }
}

const landingPages = [
  { label: 'English Braises', href: 'landing-pages/english-braises', active: true },
  { label: 'Chinese Braises', href: 'landing-pages/chinese-braises', active: true },
  { label: 'English Noodle', href: 'landing-pages/english-noodle', active: true },
  { label: 'Chinese Noodle', href: 'landing-pages/chinese-noodle', active: true },
  { label: 'English Carousel', active: false },
  { label: 'Chinese Carousel', active: false },
]

export default async function LandingPagesIndexPage({ params }: PageProps) {
  const { locale } = await params
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-background py-16 md:py-24">
      <div className="container-pad">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 text-xs font-subheading uppercase tracking-[0.2em] text-text-muted">Campaigns</p>
          <h1 className="text-balance text-4xl font-heading text-primary md:text-6xl">Landing Pages</h1>
          <p className="mx-auto mt-5 max-w-2xl font-body leading-relaxed text-text-secondary">
            Choose a campaign page to explore.
          </p>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {landingPages.map((page) =>
              page.active ? (
                <Link
                  key={page.label}
                  href={`/${locale}/${page.href}`}
                  className="group rounded-xl border border-primary bg-primary p-6 text-left text-white shadow-sm transition-transform hover:-translate-y-1"
                >
                  <span className="block text-lg font-heading">{page.label}</span>
                  <span className="mt-2 block text-sm font-body text-white/75">Open template →</span>
                </Link>
              ) : (
                <div
                  key={page.label}
                  aria-disabled="true"
                  className="cursor-not-allowed rounded-xl border border-border-color bg-surface p-6 text-left opacity-55"
                >
                  <span className="block text-lg font-heading text-text-primary">{page.label}</span>
                  <span className="mt-2 block text-sm font-body text-text-muted">Coming soon</span>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
