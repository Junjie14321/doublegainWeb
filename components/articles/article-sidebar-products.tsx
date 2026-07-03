'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/context/language-context'
import { useSavedList } from '@/context/saved-list-context'
import type { ArticleSidebarProduct } from '@/lib/sanity/types'
import type { Locale } from '@/lib/i18n/config'

interface ArticleSidebarProductsProps {
  products: ArticleSidebarProduct[]
  locale: Locale
}

export function ArticleSidebarProducts({ products, locale }: ArticleSidebarProductsProps) {
  const { t } = useLanguage()
  const { toggle, isSaved } = useSavedList()

  return (
    <div className="flex flex-col gap-3">
      {products.map((p) => {
        const name = p.name[locale] ?? p.name.en
        const saved = isSaved(p.id)

        return (
          <div key={p.id} className="flex items-center gap-3">
            <Link
              href={`/${locale}/products?q=${encodeURIComponent(p.name.en)}`}
              className="flex items-center gap-3 group flex-1 min-w-0"
            >
              <div className="relative w-12 h-12 shrink-0 bg-surface rounded-lg border border-border-color overflow-hidden">
                {p.image ? (
                  <Image src={p.image} alt={name} fill className="object-contain p-1" sizes="48px" />
                ) : (
                  <div className="absolute inset-0 bg-surface" />
                )}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-ui font-medium text-text-primary group-hover:text-primary transition-colors leading-tight">
                  {name}
                </p>
                {p.grade && <p className="text-xs text-text-muted capitalize">{p.grade}</p>}
              </div>
            </Link>

            <button
              onClick={() => toggle({ id: p.id, name: p.name, image: p.image ?? '', grade: p.grade })}
              title={saved ? t.productDetail.added : t.productDetail.add}
              className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-colors ${
                saved
                  ? 'bg-primary border-primary text-white'
                  : 'border-primary text-primary hover:bg-primary hover:text-white'
              }`}
            >
              {saved ? (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
              )}
            </button>
          </div>
        )
      })}
    </div>
  )
}
