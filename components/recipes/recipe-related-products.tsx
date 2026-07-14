'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/context/language-context'
import { useSavedList } from '@/context/saved-list-context'
import type { RecipeProductRef } from '@/lib/sanity/types'
import type { Locale } from '@/lib/i18n/config'

interface RecipeRelatedProductsProps {
  products: RecipeProductRef[]
  locale: Locale
  compact?: boolean
}

export function RecipeRelatedProducts({ products, locale, compact }: RecipeRelatedProductsProps) {
  const { t } = useLanguage()
  const { toggle, isSaved } = useSavedList()

  if (compact) {
    return (
      <div className="grid grid-cols-2 gap-2">
        {products.map((p) => {
          const name = p.name[locale] ?? p.name.en
          const saved = isSaved(p.id)
          return (
            <div key={p.id} className="flex flex-col items-center">
              <Link href={`/${locale}/products/${p.slug}`} className="block w-full">
                <div className="relative aspect-square bg-white rounded-lg border border-border-color overflow-hidden mb-1">
                  {p.image ? (
                    <Image src={p.image} alt={name} fill className="object-contain p-1.5" sizes="80px" />
                  ) : (
                    <div className="absolute inset-0 bg-surface" />
                  )}
                </div>
                <p className="text-[10px] font-ui text-text-primary line-clamp-2 leading-tight text-center mb-0.5">
                  {name}
                </p>
              </Link>
              <button
                onClick={() => toggle({ id: p.id, name: p.name, image: p.image ?? '', grade: p.grade })}
                className="text-[10px] font-subheading not-italic font-semibold text-primary"
              >
                {saved ? t.productDetail.added : `+${t.productDetail.add}`}
              </button>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-xl font-heading text-primary mb-6">{t.recipeDetail.shopThisRecipe}</h2>
      <div className="grid grid-cols-2 gap-4">
        {products.map((p) => {
          const name = p.name[locale] ?? p.name.en
          const saved = isSaved(p.id)
          return (
            <div key={p.id} className="bg-white rounded-xl overflow-hidden border border-border-color hover:border-primary/20 hover:shadow-md transition-all group">
              <Link href={`/${locale}/products/${p.slug}`} className="block">
                <div className="relative aspect-square bg-surface">
                  {p.image ? (
                    <Image src={p.image} alt={name} fill className="object-contain p-4" sizes="200px" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-text-muted">
                      <svg className="w-10 h-10 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="p-3 pb-0">
                  <p className="text-sm font-ui font-medium text-text-primary line-clamp-2 group-hover:text-primary transition-colors">{name}</p>
                </div>
              </Link>
              <div className="p-3 pt-2">
                <button
                  onClick={() => toggle({ id: p.id, name: p.name, image: p.image ?? '', grade: p.grade })}
                  className="text-xs font-subheading not-italic font-semibold text-primary hover:text-primary-dark transition-colors"
                >
                  {saved ? t.productDetail.added : `+ ${t.productDetail.add}`}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
