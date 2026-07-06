'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/context/language-context'
import type { ArticleRef } from '@/lib/sanity/types'

interface ArticlesSectionProps {
  articles: ArticleRef[]
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-SG', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function ArticlesSection({ articles }: ArticlesSectionProps) {
  const { locale, t } = useLanguage()

  if (articles.length === 0) return null

  return (
    <section style={{ backgroundColor: '#FFF7DE' }} className="py-12 md:py-16 border-t border-border-color">
      <div className="container-pad">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">

          {/* Left — copy */}
          <div className="md:w-2/5 shrink-0">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading text-primary leading-tight mb-4">
              {t.articles.homeHeading}
            </h2>
            <p className="text-sm md:text-base text-text-secondary font-body leading-relaxed mb-6">
              {t.articles.homeDescription}
            </p>
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-subheading not-italic text-sm px-7 py-3 rounded-full transition-colors uppercase tracking-wide"
            >
              {t.articles.getInspired}
            </Link>
          </div>

          {/* Right — article cards */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles.map((article) => {
              const title = article.title?.[locale] ?? article.title?.en ?? ''
              const subtitle = article.subtitle?.[locale] ?? article.subtitle?.en ?? ''
              return (
                <Link
                  key={article.id}
                  href={`/${locale}/blog/${article.category}/${article.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden hover:shadow-md transition-all flex flex-col"
                >
                  <div className="relative aspect-video overflow-hidden bg-surface">
                    {article.heroImage ? (
                      <Image
                        src={article.heroImage}
                        alt={title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 28vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-10 h-10 text-text-muted opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <span className="text-[10px] font-subheading not-italic uppercase tracking-widest text-primary mb-2">
                      Article
                    </span>
                    <h3 className="text-sm font-subheading not-italic font-semibold text-text-primary leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {title}
                    </h3>
                    {subtitle && (
                      <p className="text-xs text-text-muted leading-relaxed line-clamp-2 mb-3 flex-1">
                        {subtitle}
                      </p>
                    )}
                    <div className="flex items-center gap-3 text-xs text-text-muted mt-auto pt-2 border-t border-border-color/50">
                      {article.publishedAt && <span>{formatDate(article.publishedAt)}</span>}
                      {article.readTime && (
                        <span>{article.readTime} {t.articles.minRead}</span>
                      )}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
