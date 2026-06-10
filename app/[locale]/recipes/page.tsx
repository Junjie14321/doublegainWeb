import type { Metadata } from 'next'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { getRecipes, getFeaturedRecipe } from '@/lib/sanity/recipes'
import { RecipesHero } from '@/components/recipes/recipes-hero'
import { RecipeCard } from '@/components/recipes/recipe-card'
import type { Locale } from '@/lib/i18n/config'

export const revalidate = 3600

interface PageProps {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === 'en' ? 'Recipes | Master 2 Foods' : '食谱 | Master 2 Foods',
    description: locale === 'en'
      ? 'Discover recipes using Master 2 sauces, noodles, and pre-made ingredients — built for commercial kitchens and home cooks alike.'
      : '探索使用 Master 2 酱料、面条及预制食材制作的食谱 —— 适合商业厨房与家庭厨房。',
  }
}

export default async function RecipesPage({ params }: PageProps) {
  const { locale } = await params
  const dict = getDictionary(locale)
  const [recipes, featured] = await Promise.all([getRecipes(), getFeaturedRecipe()])

  const heroRecipe = featured ?? recipes[0] ?? null
  const gridRecipes = heroRecipe ? recipes.filter((r) => r.id !== heroRecipe.id) : recipes

  return (
    <>
      {heroRecipe && <RecipesHero recipe={heroRecipe} locale={locale} dict={dict} />}

      <section style={{ backgroundColor: '#FFF7DE' }} className="py-12 md:py-16">
        <div className="container-pad">
          <h2 className="text-xl md:text-2xl font-heading text-primary mb-6">
            {dict.recipes.sectionHeading}
          </h2>

          {gridRecipes.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {gridRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} locale={locale} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-text-muted">{dict.recipes.empty}</p>
          )}
        </div>
      </section>
    </>
  )
}
