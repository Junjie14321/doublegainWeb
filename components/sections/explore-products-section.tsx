'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { useLanguage } from '@/context/language-context'
import { useSavedList } from '@/context/saved-list-context'
import type { Product } from '@/lib/sanity/types'

interface ExploreProductsSectionProps {
  products: Product[]
}

export function ExploreProductsSection({ products }: ExploreProductsSectionProps) {
  const { locale, t } = useLanguage()
  const { toggle, isSaved } = useSavedList()
  const scrollRef = useRef<HTMLDivElement>(null)

  if (products.length === 0) return null

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    const amount = el.clientWidth * 0.8
    el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  return (
    <section style={{ backgroundColor: '#FFF7DE' }} className="pt-6 pb-2 md:pt-8">
      <div className="container-pad">
        <h2 className="text-xl md:text-2xl font-heading text-primary mb-4">
          {t.categories.exploreProducts}
        </h2>

        <div className="relative flex items-center gap-3">
          <button
            onClick={() => scroll('left')}
            className="hidden md:flex shrink-0 items-center justify-center text-primary hover:text-primary-dark transition-colors"
            aria-label="Scroll left"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory"
          >
            {products.map((product) => {
              const name = product.name[locale]
              const saved = isSaved(product.id)
              const categorySlug = product.categories?.[0]?.slug

              return (
                <Link
                  key={product.id}
                  href={categorySlug ? `/${locale}/products?category=${categorySlug}` : `/${locale}/products`}
                  className="relative shrink-0 w-[78%] sm:w-[45%] md:w-[calc(25%-12px)] aspect-[4/5] rounded-2xl overflow-hidden snap-start bg-gradient-to-br from-primary to-dark group"
                >
                  {product.image && (
                    <Image
                      src={product.image}
                      alt={name}
                      fill
                      className="object-contain p-8 group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 78vw, (max-width: 1024px) 45vw, 23vw"
                    />
                  )}
                  <div className="absolute inset-x-0 bottom-0 p-4 flex items-end justify-between gap-2">
                    <h3 className="text-white font-subheading not-italic font-bold text-base leading-tight line-clamp-2">
                      {name}
                    </h3>
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        toggle({ id: product.id, name: product.name, image: product.image ?? '', grade: product.grade })
                      }}
                      className="w-7 h-7 rounded-md border border-white/70 flex items-center justify-center text-white hover:bg-white/10 transition-colors shrink-0"
                      aria-label={saved ? t.productDetail.addedToQuoteList : t.productDetail.addToQuoteList}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        {saved ? (
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        )}
                      </svg>
                    </button>
                  </div>
                </Link>
              )
            })}
          </div>

          <button
            onClick={() => scroll('right')}
            className="hidden md:flex shrink-0 items-center justify-center text-primary hover:text-primary-dark transition-colors"
            aria-label="Scroll right"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
