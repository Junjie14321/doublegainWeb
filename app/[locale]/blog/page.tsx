import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import type { Locale } from '@/lib/i18n/config'

export const metadata: Metadata = {
  title: 'Blog | Master 2 Foods',
  description: 'Guides, tips, and insights for catering businesses and commercial kitchens in Singapore.',
}

interface PageProps {
  params: Promise<{ locale: Locale }>
}

const GUIDES = [
  {
    slug: 'best-sauces-catering',
    title: 'Best & Most Commonly Used Sauces for Catering Businesses (Singapore Edition)',
    excerpt: 'A must-have list of sauces every catering kitchen should keep in stock — covering light soy, dark soy, oyster sauce, sambal, and more.',
    date: 'June 14, 2026',
    readTime: '4 min read',
    image: '/images/hero-sauces-background.jpg',
  },
]

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params

  return (
    <div style={{ backgroundColor: '#FFF7DE' }} className="min-h-screen pt-20">
      {/* Hero */}
      <div className="bg-primary pt-16 pb-12 md:pt-20 md:pb-16">
        <div className="container-pad text-center">
          <p className="text-white/70 text-xs font-subheading uppercase tracking-widest mb-3">Master 2 Foods</p>
          <h1 className="text-3xl md:text-5xl font-heading text-white mb-4">Blog</h1>
          <p className="text-white/80 font-body text-base md:text-lg max-w-lg mx-auto">
            Guides, tips, and insights for catering businesses and commercial kitchens in Singapore.
          </p>
        </div>
      </div>

      {/* Guides section */}
      <div className="container-pad py-12">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-lg font-heading text-primary">Guides</h2>
          <div className="flex-1 h-px bg-primary/20" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {GUIDES.map((guide) => (
            <Link
              key={guide.slug}
              href={`/${locale}/blog/guides/${guide.slug}`}
              className="group bg-white rounded-2xl border border-border-color overflow-hidden hover:shadow-md hover:border-primary/20 transition-all"
            >
              <div className="relative aspect-[16/9] bg-surface overflow-hidden">
                <Image
                  src={guide.image}
                  alt={guide.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />
                <span className="absolute top-3 left-3 text-xs font-subheading not-italic uppercase tracking-wider bg-primary text-white rounded-full px-3 py-1">
                  Guides
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-heading text-text-primary text-base leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-3">
                  {guide.title}
                </h3>
                <p className="text-sm font-body text-text-secondary leading-relaxed mb-4 line-clamp-2">
                  {guide.excerpt}
                </p>
                <div className="flex items-center gap-2 text-xs font-body text-text-muted">
                  <span>{guide.date}</span>
                  <span>·</span>
                  <span>{guide.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
