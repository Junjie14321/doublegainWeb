import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { getRecipeBySlug, getRecipeSlugs } from '@/lib/sanity/recipes'
import { RecipeRelatedProducts } from '@/components/recipes/recipe-related-products'
import type { Locale } from '@/lib/i18n/config'

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

export default async function RecipeDetailPage({ params }: PageProps) {
  const { locale, slug } = await params
  const recipe = await getRecipeBySlug(slug)
  if (!recipe) notFound()

  const dict = getDictionary(locale)
  const name = recipe.name[locale] ?? recipe.name.en
  const tagline = recipe.tagline?.[locale] ?? recipe.tagline?.en
  const description = recipe.description?.[locale] ?? recipe.description?.en ?? ''

  const ingredientLines = (recipe.ingredients?.[locale] ?? recipe.ingredients?.en ?? '')
    .split('\n').map((l) => l.trim()).filter(Boolean)
  const instructionLines = (recipe.instructions?.[locale] ?? recipe.instructions?.en ?? '')
    .split('\n').map((l) => l.trim()).filter(Boolean)

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
  }

  return (
    <div style={{ backgroundColor: '#FFF7DE' }} className="min-h-screen pt-20 pb-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="container-pad">
        <Link href={`/${locale}/recipes`} className="inline-flex items-center gap-2 text-sm font-ui text-text-muted hover:text-primary transition-colors mb-6">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {dict.recipeDetail.backToRecipes}
        </Link>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-12">
          <div className="flex flex-col sm:flex-row">
            <div className="sm:w-72 shrink-0 bg-surface flex items-center justify-center p-8">
              <div className="relative w-full aspect-square max-w-[240px] rounded-full overflow-hidden">
                {recipe.image ? (
                  <Image src={recipe.image} alt={name} fill className="object-cover" sizes="240px" priority />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-text-muted">
                    <svg className="w-20 h-20 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 p-6 md:p-8">
              <h1 className="text-2xl md:text-3xl font-heading text-text-primary mb-1">{name}</h1>
              {tagline && <p className="text-sm md:text-base text-text-secondary mb-4">{tagline}</p>}

              <div className="flex flex-wrap gap-4 md:gap-6 border-t border-b border-border-color py-4 mt-4">
                {recipe.prepTime != null && (
                  <div>
                    <p className="text-xs font-ui font-semibold text-text-muted uppercase tracking-wide">{dict.recipeDetail.prepTime}</p>
                    <p className="text-sm text-text-secondary mt-0.5">{recipe.prepTime} {dict.recipeDetail.minutes}</p>
                  </div>
                )}
                {recipe.cookTime != null && (
                  <div>
                    <p className="text-xs font-ui font-semibold text-text-muted uppercase tracking-wide">{dict.recipeDetail.cookTime}</p>
                    <p className="text-sm text-text-secondary mt-0.5">{recipe.cookTime} {dict.recipeDetail.minutes}</p>
                  </div>
                )}
                {recipe.servings != null && (
                  <div>
                    <p className="text-xs font-ui font-semibold text-text-muted uppercase tracking-wide">{dict.recipeDetail.servings}</p>
                    <p className="text-sm text-text-secondary mt-0.5">{recipe.servings}</p>
                  </div>
                )}
              </div>

              {description && <p className="text-sm text-text-secondary leading-relaxed mt-4">{description}</p>}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8 border-t border-border-color">
            {ingredientLines.length > 0 && (
              <div>
                <h2 className="text-lg font-heading text-primary mb-4">{dict.recipeDetail.ingredients}</h2>
                <ul className="space-y-2">
                  {ingredientLines.map((line, i) => (
                    <li key={i} className="flex gap-2 text-sm text-text-secondary leading-relaxed">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {instructionLines.length > 0 && (
              <div>
                <h2 className="text-lg font-heading text-primary mb-4">{dict.recipeDetail.instructions}</h2>
                <ol className="space-y-3">
                  {instructionLines.map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm text-text-secondary leading-relaxed">
                      <span className="shrink-0 w-6 h-6 rounded-full bg-primary text-white text-xs font-semibold flex items-center justify-center">{i + 1}</span>
                      <span className="pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>

        {recipe.relatedProducts && recipe.relatedProducts.length > 0 && (
          <RecipeRelatedProducts products={recipe.relatedProducts} locale={locale} />
        )}
      </div>
    </div>
  )
}
