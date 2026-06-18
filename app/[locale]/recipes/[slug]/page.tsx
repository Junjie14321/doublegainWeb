import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { getRecipeBySlug, getRecipeSlugs, getOtherRecipes } from '@/lib/sanity/recipes'
import { RecipeRelatedProducts } from '@/components/recipes/recipe-related-products'
import type { Locale } from '@/lib/i18n/config'
import type { RecipeNutrition } from '@/lib/sanity/types'

export const revalidate = 3600

interface PageProps {
  params: Promise<{ locale: Locale; slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getRecipeSlugs()
  return slugs.flatMap((slug) => [
    { locale: 'en', slug },
    { locale: 'zh', slug },
  ])
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const recipe = await getRecipeBySlug(slug)
  if (!recipe) return { title: 'Recipe Not Found' }
  const name = recipe.name[locale] ?? recipe.name.en
  const description = recipe.description?.[locale] ?? recipe.description?.en ?? ''
  return {
    title: name,
    description,
    openGraph: {
      title: `${name} | Master 2`,
      description,
      ...(recipe.image ? { images: [recipe.image] } : {}),
    },
  }
}

function toIsoDuration(minutes?: number): string | undefined {
  if (!minutes || minutes <= 0) return undefined
  return `PT${minutes}M`
}

function hasAnyNutrition(n?: RecipeNutrition): boolean {
  if (!n) return false
  return Object.values(n).some((v) => v != null)
}

// ── Sub-components ─────────────────────────────────────────────────────────

function StatBox({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <div className="flex flex-col items-center gap-1 px-4 py-2.5 border-r border-primary/20 last:border-r-0">
      <div className="text-primary">{icon}</div>
      <span className="text-[10px] font-subheading not-italic uppercase tracking-wider text-text-secondary">
        {label}
      </span>
      <span className="text-sm font-heading text-text-primary">{value}</span>
    </div>
  )
}

function SectionHeading({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="text-primary shrink-0">{icon}</div>
      <h2 className="text-base font-heading text-text-primary">{title}</h2>
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────

export default async function RecipeDetailPage({ params }: PageProps) {
  const { locale, slug } = await params
  const [recipe, otherRecipes] = await Promise.all([
    getRecipeBySlug(slug),
    getOtherRecipes(slug),
  ])
  if (!recipe) notFound()

  const dict = getDictionary(locale)
  const name = recipe.name[locale] ?? recipe.name.en
  const description = recipe.description?.[locale] ?? recipe.description?.en ?? ''
  const tipText = recipe.tip?.[locale] ?? recipe.tip?.en

  const ingredientLines = (recipe.ingredients?.[locale] ?? recipe.ingredients?.en ?? '')
    .split('\n').map((l) => l.trim()).filter(Boolean)
  const instructionLines = (recipe.instructions?.[locale] ?? recipe.instructions?.en ?? '')
    .split('\n').map((l) => l.trim()).filter(Boolean)

  const showNutrition = hasAnyNutrition(recipe.nutrition)
  const hasRelatedProducts = (recipe.relatedProducts?.length ?? 0) > 0
  const hasOtherRecipes = otherRecipes.length > 0

  const nutritionRows = showNutrition
    ? ([
        recipe.nutrition?.calories != null && { label: 'Calories', value: `${recipe.nutrition.calories} kcal` },
        recipe.nutrition?.protein != null && { label: 'Protein', value: `${recipe.nutrition.protein} g` },
        recipe.nutrition?.carbohydrates != null && { label: 'Carbohydrates', value: `${recipe.nutrition.carbohydrates} g` },
        recipe.nutrition?.fat != null && { label: 'Fat', value: `${recipe.nutrition.fat} g` },
        recipe.nutrition?.fiber != null && { label: 'Fiber', value: `${recipe.nutrition.fiber} g` },
        recipe.nutrition?.sodium != null && { label: 'Sodium', value: `${recipe.nutrition.sodium} mg` },
      ] as const).filter((r): r is { label: string; value: string } => Boolean(r))
    : []

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name,
    image: recipe.image ? [recipe.image] : undefined,
    description: description || undefined,
    recipeIngredient: ingredientLines.length > 0 ? ingredientLines : undefined,
    recipeInstructions: instructionLines.map((step) => ({ '@type': 'HowToStep', text: step })),
    prepTime: toIsoDuration(recipe.prepTime),
    cookTime: toIsoDuration(recipe.cookTime),
    recipeYield: recipe.servings ? String(recipe.servings) : undefined,
    ...(recipe.nutrition?.calories
      ? { nutrition: { '@type': 'NutritionInformation', calories: `${recipe.nutrition.calories} calories` } }
      : {}),
  }

  return (
    <div style={{ backgroundColor: '#FFF7DE' }} className="min-h-screen overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Back link */}
      <div className="container-pad pt-20 pb-2">
        <Link
          href={`/${locale}/recipes`}
          className="inline-flex items-center gap-1.5 text-xs font-ui text-text-muted hover:text-primary transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {dict.recipeDetail.backToRecipes}
        </Link>
      </div>

      {/* ── Hero ── */}
      <section className="container-pad py-6 md:py-8">
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">

          {/* Food image */}
          <div className="w-full md:w-[42%] shrink-0">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-surface">
              {recipe.image ? (
                <Image
                  src={recipe.image}
                  alt={name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45vw"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-20 h-20 text-text-muted opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            {/* Stats row — only shows boxes for fields that exist */}
            {(recipe.prepTime != null || recipe.cookTime != null || recipe.servings != null) && (
              <div className="inline-flex items-stretch bg-white/70 rounded-xl border border-primary/15 mb-5 overflow-hidden">
                {recipe.prepTime != null && (
                  <StatBox
                    label={dict.recipeDetail.prepTime}
                    value={`${recipe.prepTime} ${dict.recipeDetail.minutes}`}
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    }
                  />
                )}
                {recipe.cookTime != null && (
                  <StatBox
                    label={dict.recipeDetail.cookTime}
                    value={`${recipe.cookTime} ${dict.recipeDetail.minutes}`}
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12h18M3 12a9 9 0 0118 0M5 12V8a7 7 0 0114 0v4M8 20h8M9 16l3 4 3-4" />
                      </svg>
                    }
                  />
                )}
                {recipe.servings != null && (
                  <StatBox
                    label={dict.recipeDetail.servings}
                    value={recipe.servings}
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    }
                  />
                )}
              </div>
            )}

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading text-primary leading-tight mb-3">
              {name}
            </h1>
            {description && (
              <p className="text-sm md:text-base font-body text-text-secondary leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── Body ── */}
      <div className="bg-white">
        <div className="container-pad py-8 md:py-10">
          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* Left — Ingredients + Tip + Related Products */}
            <div className="w-full lg:w-56 xl:w-64 shrink-0">

              {ingredientLines.length > 0 && (
                <div className="mb-6">
                  <SectionHeading
                    title={dict.recipeDetail.ingredients}
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    }
                  />
                  <ul className="space-y-2">
                    {ingredientLines.map((line, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm font-body text-text-secondary leading-relaxed">
                        <svg className="w-4 h-4 shrink-0 mt-0.5 text-primary/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="9" strokeWidth={1.5} />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4" />
                        </svg>
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tip — only if filled in Sanity */}
              {tipText && (
                <div className="rounded-xl p-3 mb-6" style={{ backgroundColor: '#FFF7DE' }}>
                  <p className="text-xs font-body text-text-secondary leading-relaxed">
                    <span className="font-semibold text-primary">Tip: </span>
                    {tipText}
                  </p>
                </div>
              )}

              {/* Related Products — only if any linked in Sanity */}
              {hasRelatedProducts && (
                <div>
                  <p className="text-sm font-heading text-text-primary mb-3">Related Products</p>
                  <RecipeRelatedProducts
                    products={recipe.relatedProducts!}
                    locale={locale}
                    compact
                  />
                </div>
              )}
            </div>

            {/* Center — Instructions + Other Recipes */}
            <div className="flex-1 min-w-0">

              {instructionLines.length > 0 && (
                <div className="mb-8">
                  <SectionHeading
                    title={dict.recipeDetail.instructions}
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                      </svg>
                    }
                  />
                  <ol className="space-y-4">
                    {instructionLines.map((step, i) => (
                      <li key={i} className="flex gap-3 text-sm font-body text-text-secondary leading-relaxed">
                        <span className="shrink-0 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                          {i + 1}
                        </span>
                        <span className="pt-0.5">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Other Recipes — only if other recipes exist in Sanity */}
              {hasOtherRecipes && (
                <div>
                  <h2 className="text-base font-heading text-text-primary mb-4">Other Recipes</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {otherRecipes.map((r, i) => {
                      const rName = r.name[locale] ?? r.name.en
                      const isPrimary = ((Math.floor(i / 2)) + (i % 2)) % 2 === 0
                      return (
                        <Link
                          key={r.id}
                          href={`/${locale}/recipes/${r.slug}`}
                          className={`group flex items-center rounded-xl overflow-hidden min-h-[72px] hover:opacity-90 transition-opacity ${
                            isPrimary ? 'bg-primary' : 'bg-secondary'
                          }`}
                        >
                          <div className="flex-1 p-3 min-w-0">
                            <h3 className={`text-sm font-subheading not-italic font-bold italic leading-snug line-clamp-3 ${
                              isPrimary ? 'text-white' : 'text-dark'
                            }`}>
                              {rName}
                            </h3>
                          </div>
                          <div className="relative w-20 h-[72px] shrink-0">
                            {r.image ? (
                              <Image src={r.image} alt={rName} fill className="object-cover" sizes="80px" />
                            ) : (
                              <div className="absolute inset-0 bg-white/10" />
                            )}
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Right — Nutrition (hidden entirely if no data in Sanity) */}
            {showNutrition && (
              <div className="w-full lg:w-48 xl:w-52 shrink-0">
                <div className="rounded-xl border border-border-color overflow-hidden bg-white">
                  <div className="bg-surface px-4 py-3 border-b border-border-color">
                    <p className="text-xs font-heading text-text-primary">Nutrition</p>
                    <p className="text-[10px] font-body text-text-muted">(per serving)</p>
                  </div>
                  <div className="divide-y divide-border-color">
                    {nutritionRows.map((row) => (
                      <div key={row.label} className="flex items-center justify-between px-4 py-2.5">
                        <span className="text-xs font-body text-text-secondary">{row.label}</span>
                        <span className="text-xs font-semibold font-ui text-text-primary">{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

    </div>
  )
}
