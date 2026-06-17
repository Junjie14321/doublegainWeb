import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getArticles } from '@/lib/sanity/articles'
import type { Locale } from '@/lib/i18n/config'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Blog | Master 2 Foods',
  description: 'Guides, tips, and insights for catering businesses and commercial kitchens in Singapore.',
}

interface PageProps {
  params: Promise<{ locale: Locale }>
}

const CATEGORY_LABEL: Record<string, string> = {
  guides: 'Guides',
  tips: 'Tips',
  news: 'News',
}

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params
  const articles = await getArticles()

  return (
    <div style={{ backgroundColor: '#FFF7DE' }} className="min-h-screen pt-20">
      {/* Hero */}
      <div className="bg-primary pt-16 pb-12 md:pt-20 md:pb-16">
        <div className="container-pad text-center">
          <p className="text-white/70 text-xs font-subheading not-italic uppercase tracking-widest mb-3">
            Master 2 Foods
          </p>
          <h1 className="text-3xl md:text-5xl font-heading text-white mb-4">Blog</h1>
          <p className="text-white/80 font-body text-base md:text-lg max-w-lg mx-auto">
            Guides, tips, and insights for catering businesses and commercial kitchens in Singapore.
          </p>
        </div>
      </div>

      <div className="container-pad py-12">
        {articles.length === 0 ? (
          <p className="text-sm text-text-muted text-center py-16">No articles yet — check back soon!</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {articles.map((article) => {
              const title = article.title?.[locale] ?? article.title?.en ?? ''
              const subtitle = article.subtitle?.[locale] ?? article.subtitle?.en ?? ''
              const categoryLabel = CATEGORY_LABEL[article.category] ?? article.category

              return (
                <Link
                  key={article.id}
                  href={`/${locale}/blog/${article.category}/${article.slug}`}
                  className="group bg-white rounded-2xl border border-border-color overflow-hidden hover:shadow-md hover:border-primary/20 transition-all"
                >
                  <div className="relative aspect-[16/9] bg-surface overflow-hidden">
                    {article.heroImage ? (
                      <Image
                        src={article.heroImage}
                        alt={title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-text-muted">
                        <svg className="w-12 h-12 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    <span className="absolute top-3 left-3 text-xs font-subheading not-italic uppercase tracking-wider bg-primary text-white rounded-full px-3 py-1">
                      {categoryLabel}
                    </span>
                  </div>
                  <div className="p-5">
                    <h2 className="font-heading text-text-primary text-base leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-3">
                      {title}
                    </h2>
                    {subtitle && (
                      <p className="text-sm font-body text-text-secondary leading-relaxed mb-4 line-clamp-2">
                        {subtitle}
                      </p>
                    )}
                    <div className="flex items-center gap-2 text-xs font-body text-text-muted">
                      {article.publishedAt && <span>{article.publishedAt}</span>}
                      {article.publishedAt && article.readTime && <span>·</span>}
                      {article.readTime && <span>{article.readTime} min read</span>}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
