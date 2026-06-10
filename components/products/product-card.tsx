'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { Product } from '@/lib/sanity/types'
import { useLanguage } from '@/context/language-context'
import { useSavedList } from '@/context/saved-list-context'
import { sampleRequestLink } from '@/lib/whatsapp'

interface ProductCardProps {
  product: Product
  onViewDetails?: (product: Product) => void
  isPriority?: boolean
}

export function ProductCard({ product, onViewDetails, isPriority = false }: ProductCardProps) {
  const { locale, t } = useLanguage()
  const { toggle, isSaved } = useSavedList()
  const saved = isSaved(product.id)
  const [imgError, setImgError] = useState(false)

  const name = product.name[locale]

  const gradeBadge: Record<string, string> = {
    standard: 'bg-neutral-100 text-neutral-600',
    'semi-premium': 'bg-amber-50 text-amber-700',
    premium: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
  }

  const tagBadgeStyle: Record<string, string> = {
    'best-seller': 'bg-primary text-white',
    specialty: 'bg-secondary text-dark',
    new: 'bg-green-500 text-white',
  }

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggle({
      id: product.id,
      name: product.name,
      image: product.image ?? '',
      grade: product.grade,
    })
  }

  return (
    <article className="bg-white rounded-xl border border-border-color hover:border-primary/20 hover:shadow-md transition-all flex flex-col group">
      {/* Image */}
      <div
        className="relative aspect-square overflow-hidden rounded-t-xl bg-surface cursor-pointer"
        onClick={() => onViewDetails?.(product)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onViewDetails?.(product)}
        aria-label={`View details for ${name}`}
      >
        {product.image && !imgError ? (
          <Image
            src={product.image}
            alt={name}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            onError={() => setImgError(true)}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={isPriority}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-text-muted">
            <svg className="w-12 h-12 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Save button */}
        <button
          onClick={handleSave}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm border border-border-color hover:border-primary/30 transition-colors"
          aria-label={saved ? 'Remove from saved list' : 'Save product'}
        >
          <svg
            className={`w-4 h-4 transition-colors ${saved ? 'text-primary fill-primary' : 'text-text-muted'}`}
            fill={saved ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* Tag badges */}
        {product.tags && product.tags.length > 0 && (
          <div className="absolute top-0 left-0 flex flex-col gap-1">
            {product.tags.slice(0, 1).map((tag) => (
              <span
                key={tag}
                className={`text-[11px] font-subheading not-italic font-bold uppercase tracking-wide px-2 py-1 ${tagBadgeStyle[tag] ?? 'bg-gray-100 text-gray-600'}`}
              >
                {t.products.tags[tag as keyof typeof t.products.tags] ?? tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3
          className="font-ui text-text-primary text-sm font-semibold leading-snug mb-2 cursor-pointer hover:text-primary transition-colors"
          onClick={() => onViewDetails?.(product)}
        >
          {name}
        </h3>

        {product.grade && (
          <span className={`self-start text-[11px] font-body px-2 py-0.5 rounded-full mb-4 ${gradeBadge[product.grade] ?? gradeBadge.standard}`}>
            {t.products.grades[product.grade as keyof typeof t.products.grades] ?? product.grade}
          </span>
        )}

        <div className="flex flex-col gap-2 mt-auto">
          <button
            onClick={handleSave}
            className="w-full flex items-center justify-center gap-1.5 text-center text-xs font-subheading not-italic font-semibold bg-primary text-white py-2 px-2 rounded-lg hover:bg-primary-dark transition-colors"
          >
            {saved ? (
              <>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                {t.productDetail.addedToQuoteList}
              </>
            ) : (
              <>+ {t.productDetail.addToQuoteList}</>
            )}
          </button>
          {product.allowSample !== false && (
            <a
              href={sampleRequestLink(name, locale)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 text-center text-xs font-subheading not-italic font-semibold text-primary hover:text-primary-dark transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
              </svg>
              {t.productDetail.askForSample}
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
