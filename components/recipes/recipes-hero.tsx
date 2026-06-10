import Image from 'next/image'
import Link from 'next/link'
import type { Recipe } from '@/lib/sanity/types'
import type { Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/translations'

interface RecipesHeroProps {
  recipe: Recipe
  locale: Locale
  dict: Dictionary
}

export function RecipesHero({ recipe, locale, dict }: RecipesHeroProps) {
  const name = recipe.name[locale] ?? recipe.name.en
  const tagline = recipe.tagline?.[locale] ?? recipe.tagline?.en

  return (
    <section className="bg-primary pt-24 pb-12 md:pt-28 md:pb-16">
      <div className="container-pad">
        <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading text-white leading-tight mb-3 md:mb-4">
              {name}
            </h1>
            {tagline && (
              <p className="text-white/85 text-sm md:text-lg font-body leading-relaxed mb-6 md:mb-8 max-w-md mx-auto md:mx-0">
                {tagline}
              </p>
            )}
            <Link
              href={`/${locale}/recipes/${recipe.slug}`}
              className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-dark text-dark font-subheading not-italic text-sm px-8 py-3 rounded-full transition-colors uppercase tracking-wide"
            >
              {dict.recipes.getRecipe}
            </Link>
          </div>

          <div className="shrink-0">
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full overflow-hidden ring-4 ring-white/20 bg-white/10">
              {recipe.image ? (
                <Image
                  src={recipe.image}
                  alt={name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 256px, 320px"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-white/30">
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
