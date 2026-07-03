'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/context/language-context'
import type { Recipe } from '@/lib/sanity/types'

interface RecipeSectionProps {
  recipes: Recipe[]
}

export function RecipeSection({ recipes }: RecipeSectionProps) {
  const { locale, t } = useLanguage()

  if (recipes.length === 0) return null

  return (
    <section style={{ backgroundColor: '#FFF7DE' }} className="py-12 md:py-16 border-t border-border-color">
      <div className="container-pad">

        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-xl md:text-2xl font-heading text-primary shrink-0">
            {t.recipes.homeHeading}
          </h2>
          <div className="flex-1 h-px bg-border-color" />
          <Link
            href={`/${locale}/recipes`}
            className="shrink-0 text-xs font-subheading not-italic uppercase tracking-wider text-primary hover:text-primary/70 transition-colors flex items-center gap-1"
          >
            {t.recipes.viewAll}
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

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

      </div>
    </section>
  )
}
