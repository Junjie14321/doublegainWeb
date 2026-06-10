import Image from 'next/image'
import Link from 'next/link'
import type { Recipe } from '@/lib/sanity/types'
import type { Locale } from '@/lib/i18n/config'

interface RecipeCardProps {
  recipe: Recipe
  locale: Locale
}

export function RecipeCard({ recipe, locale }: RecipeCardProps) {
  const name = recipe.name[locale] ?? recipe.name.en

  return (
    <Link href={`/${locale}/recipes/${recipe.slug}`} className="group flex flex-col items-center text-center">
      <div className="relative w-full aspect-square max-w-[200px] rounded-full overflow-hidden bg-white shadow-sm group-hover:shadow-md transition-shadow">
        {recipe.image ? (
          <Image
            src={recipe.image}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 45vw, 22vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-text-muted">
            <svg className="w-10 h-10 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
      <h3 className="mt-3 text-sm md:text-base font-subheading not-italic font-bold text-primary leading-tight line-clamp-2">
        {name}
      </h3>
    </Link>
  )
}
