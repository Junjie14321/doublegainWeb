import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getArticles } from '@/lib/sanity/articles'
import { getRecipes, getFeaturedRecipe } from '@/lib/sanity/recipes'
import type { Locale } from '@/lib/i18n/config'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Articles | Master 2 Foods',
  description: 'Recipes, guides and knowledge for catering businesses and commercial kitchens in Singapore.',
}

interface PageProps {
  params: Promise<{ locale: Locale }>
}

function SectionIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center shrink-0">
      {children}
    </div>
  )
}

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params
  const [articles, recipes, featured] = await Promise.all([
    getArticles(),
    getRecipes(),
    getFeaturedRecipe(),
  ])

  const heroRecipe = featured ?? recipes[0] ?? null
  const heroName = heroRecipe ? (heroRecipe.name[locale] ?? heroRecipe.name.en) : null
  const heroTagline = heroRecipe
    ? (heroRecipe.tagline?.[locale] ?? heroRecipe.tagline?.en)
    : null

  return (
    <div style={{ backgroundColor: '#FFF7DE' }} className="min-h-screen pt-16 overflow-x-hidden">

      {/* ── Featured Recipe Hero ── */}
      {heroRecipe && (
        <section className="bg-primary py-10 md:py-14">
          <div className="container-pad">
            <div className="flex flex-col-reverse md:flex-row items-center gap-6 md:gap-12">

              {/* Left — circular dish image */}
              <div className="shrink-0">
                <div className="relative w-36 h-36 sm:w-56 sm:h-56 md:w-72 md:h-72 rounded-full overflow-hidden ring-4 ring-white/20 bg-white/10">
                  {heroRecipe.image ? (
                    <Image
                      src={heroRecipe.image}
                      alt={heroName ?? ''}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 240px, 288px"
                      priority
                    />
                  ) : (
                    <div className="absolute inset-0 bg-white/10" />
                  )}
                </div>
              </div>

              {/* Right — text + CTA */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading text-white leading-tight mb-3">
                  {heroName}
                </h1>
                {heroTagline && (
                  <p className="text-white/80 font-body text-sm md:text-base leading-relaxed mb-6 max-w-xs mx-auto md:mx-0">
                    {heroTagline}
                  </p>
                )}
                <Link
                  href={`/${locale}/recipes/${heroRecipe.slug}`}
                  className="inline-flex items-center justify-center bg-white text-primary font-subheading not-italic text-sm px-8 py-3 rounded-full hover:bg-white/90 transition-colors uppercase tracking-wide"
                >
                  Get Recipe
                </Link>
              </div>

            </div>
          </div>
        </section>
      )}

      <div className="container-pad py-10 md:py-14 flex flex-col gap-12">

        {/* ── Popular Recipes ── */}
        <section>
          {/* Section header */}
          <div className="flex items-center gap-3 mb-6">
            <SectionIcon>
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 3v1m0 16v1M4.22 4.22l.707.707M18.364 18.364l.707.707M1 12h2m18 0h2M4.22 19.78l.707-.707M18.364 5.636l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            </SectionIcon>
            <h2 className="text-base md:text-lg font-heading text-text-primary shrink-0">Popular Recipes</h2>
            {recipes.length > 0 && (
              <>
                <div className="flex-1 h-px bg-border-color" />
                <Link
                  href={`/${locale}/recipes`}
                  className="shrink-0 text-xs font-subheading not-italic uppercase tracking-wider text-primary hover:text-primary/70 transition-colors flex items-center gap-1"
                >
                  View all
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </>
            )}
          </div>

          {recipes.length === 0 ? (
            <p className="text-sm text-text-muted">No recipes yet — check back soon!</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {recipes.map((recipe) => {
                const name = recipe.name[locale] ?? recipe.name.en
                const totalTime = (recipe.prepTime ?? 0) + (recipe.cookTime ?? 0)
                return (
                  <Link
                    key={recipe.id}
                    href={`/${locale}/recipes/${recipe.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden hover:shadow-md transition-all"
                  >
                    <div className="relative aspect-square bg-surface overflow-hidden">
                      {recipe.image ? (
                        <Image
                          src={recipe.image}
                          alt={name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg className="w-10 h-10 text-text-muted opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-subheading not-italic font-semibold text-text-primary leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {name}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-text-muted flex-wrap">
                        {totalTime > 0 && (
                          <span className="flex items-center gap-1">
                            <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {totalTime} min
                          </span>
                        )}
                        {recipe.servings && (
                          <span className="flex items-center gap-1">
                            <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {recipe.servings} servings
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </section>

        {/* ── Knowledge ── */}
        <section>
          {/* Section header */}
          <div className="flex items-center gap-3 mb-6">
            <SectionIcon>
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </SectionIcon>
            <h2 className="text-base md:text-lg font-heading text-text-primary shrink-0">Knowledge</h2>
            {articles.length > 0 && (
              <>
                <div className="flex-1 h-px bg-border-color" />
                <Link
                  href={`/${locale}/blog`}
                  className="shrink-0 text-xs font-subheading not-italic uppercase tracking-wider text-primary hover:text-primary/70 transition-colors flex items-center gap-1"
                >
                  View all
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </>
            )}
          </div>

          {articles.length === 0 ? (
            <p className="text-sm text-text-muted">No articles yet — check back soon!</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {articles.map((article) => {
                const title = article.title?.[locale] ?? article.title?.en ?? ''
                return (
                  <Link
                    key={article.id}
                    href={`/${locale}/blog/${article.category}/${article.slug}`}
                    className="group"
                  >
                    <div className="relative aspect-[3/2] rounded-xl overflow-hidden bg-surface mb-3">
                      {article.heroImage ? (
                        <Image
                          src={article.heroImage}
                          alt={title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-surface" />
                      )}
                    </div>
                    <h3 className="text-sm md:text-base font-subheading not-italic font-semibold text-primary leading-snug line-clamp-3 group-hover:text-primary/70 transition-colors">
                      {title}
                    </h3>
                  </Link>
                )
              })}
            </div>
          )}
        </section>

      </div>

      {/* ── Newsletter ── */}
      <section style={{ backgroundColor: '#FFF0CC' }} className="border-t border-border-color mt-4">
        <div className="container-pad py-8 md:py-10">
          <div className="flex flex-col md:flex-row items-center gap-8">

            {/* Left — text + form */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-3 mb-5">
                <div className="w-9 h-9 rounded-full border-2 border-primary flex items-center justify-center shrink-0 text-primary mt-0.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="font-heading text-text-primary text-sm md:text-base leading-snug mb-1">
                    Get Recipes & More Knowledge Straight to Your Inbox
                  </p>
                  <p className="text-xs font-body text-text-secondary">
                    New recipes, cooking guides, and exclusive tips.
                  </p>
                </div>
              </div>
              <form className="flex gap-2 w-full max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 min-w-0 px-4 py-2.5 text-sm font-body bg-white border border-border-color rounded-lg focus:outline-none focus:border-primary/50 transition-colors placeholder:text-text-muted"
                />
                <button
                  type="submit"
                  className="shrink-0 px-5 py-2.5 bg-primary text-white text-xs font-subheading not-italic uppercase tracking-wider rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* Right — decorative food image */}
            {recipes[0]?.image && (
              <div className="hidden md:block shrink-0">
                <div className="relative w-40 h-32 rounded-2xl overflow-hidden">
                  <Image
                    src={recipes[0].image}
                    alt="Food"
                    fill
                    className="object-cover"
                    sizes="160px"
                  />
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

    </div>
  )
}
