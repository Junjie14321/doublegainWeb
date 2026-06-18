import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getArticles } from '@/lib/sanity/articles'
import { getRecipes } from '@/lib/sanity/recipes'
import type { Locale } from '@/lib/i18n/config'

export const revalidate = 300

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

function SectionHeader({
  title,
  viewAllHref,
  viewAllLabel,
}: {
  title: string
  viewAllHref?: string
  viewAllLabel?: string
}) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <h2 className="text-lg md:text-xl font-heading text-primary shrink-0">{title}</h2>
      <div className="flex-1 h-px bg-primary/20" />
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="shrink-0 text-xs font-subheading not-italic uppercase tracking-wider text-primary hover:text-primary/70 transition-colors flex items-center gap-1"
        >
          {viewAllLabel ?? 'View all'}
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      )}
    </div>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="col-span-full py-10 text-center">
      <p className="text-sm text-text-muted">{message}</p>
    </div>
  )
}

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params
  const [articles, recipes] = await Promise.all([getArticles(), getRecipes()])

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
            Guides, tips, and recipes for catering businesses and commercial kitchens in Singapore.
          </p>
        </div>
      </div>

      <div className="container-pad py-12 flex flex-col gap-14">

        {/* ── Guides ── */}
        <section>
          <SectionHeader title="Guides" />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {articles.length === 0 ? (
              <EmptyState message="No guides yet — check back soon!" />
            ) : (
              articles.map((article) => {
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
                          priority
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg className="w-12 h-12 text-text-muted opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                      <span className="absolute top-3 left-3 text-xs font-subheading not-italic uppercase tracking-wider bg-primary text-white rounded-full px-3 py-1">
                        {categoryLabel}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-heading text-text-primary text-base leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-3">
                        {title}
                      </h3>
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
              })
            )}
          </div>
        </section>

        {/* ── Recipes ── */}
        <section>
          <SectionHeader
            title="Recipes"
            viewAllHref={`/${locale}/recipes`}
            viewAllLabel="All recipes"
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {recipes.length === 0 ? (
              <EmptyState message="No recipes yet — check back soon!" />
            ) : (
              recipes.map((recipe) => {
                const name = recipe.name[locale] ?? recipe.name.en
                const tagline = recipe.tagline?.[locale] ?? recipe.tagline?.en ?? ''
                const meta = [
                  recipe.prepTime && recipe.cookTime
                    ? `${recipe.prepTime + recipe.cookTime} min total`
                    : recipe.cookTime
                      ? `${recipe.cookTime} min cook`
                      : null,
                  recipe.servings ? `Serves ${recipe.servings}` : null,
                ].filter(Boolean)

                return (
                  <Link
                    key={recipe.id}
                    href={`/${locale}/recipes/${recipe.slug}`}
                    className="group bg-white rounded-2xl border border-border-color overflow-hidden hover:shadow-md hover:border-primary/20 transition-all"
                  >
                    <div className="relative aspect-[16/9] bg-surface overflow-hidden">
                      {recipe.image ? (
                        <Image
                          src={recipe.image}
                          alt={name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg className="w-12 h-12 text-text-muted opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                      <span className="absolute top-3 left-3 text-xs font-subheading not-italic uppercase tracking-wider bg-secondary text-dark rounded-full px-3 py-1">
                        Recipe
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-heading text-text-primary text-base leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {name}
                      </h3>
                      {tagline && (
                        <p className="text-sm font-body text-text-secondary leading-relaxed mb-4 line-clamp-2">
                          {tagline}
                        </p>
                      )}
                      {meta.length > 0 && (
                        <div className="flex items-center gap-2 text-xs font-body text-text-muted">
                          {meta.map((m, i) => (
                            <>
                              {i > 0 && <span key={`dot-${i}`}>·</span>}
                              <span key={m}>{m}</span>
                            </>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                )
              })
            )}
          </div>
        </section>

      </div>
    </div>
  )
}
