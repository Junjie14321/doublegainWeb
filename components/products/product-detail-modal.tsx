'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import type { Product } from '@/lib/sanity/types'
import { useLanguage } from '@/context/language-context'
import { useSavedList } from '@/context/saved-list-context'
import { productInquiryLink, sampleRequestLink } from '@/lib/whatsapp'

interface ProductDetailModalProps {
  product: Product | null
  onClose: () => void
}

export function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  const { locale, t } = useLanguage()
  const { toggle, isSaved } = useSavedList()
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden'
      closeRef.current?.focus()
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [product])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!product) return null

  const saved = isSaved(product.id)
  const name = product.name[locale]
  const packagingDisplay = product.unitSize ?? product.packagingSize ?? product.packaging?.[locale]
  const caseDisplay = product.caseQuantity

  const DetailRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex gap-3 py-3 border-b border-border-color last:border-0">
      <span className="text-xs font-subheading not-italic font-semibold text-text-muted uppercase tracking-wide w-28 shrink-0">{label}</span>
      <span className="text-sm font-body text-text-secondary leading-relaxed">{value}</span>
    </div>
  )

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
    >
      <div className="absolute inset-0 bg-dark/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      <button
        ref={closeRef}
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-0 sm:right-0 sm:translate-y-0 sm:translate-x-12 z-50 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-lg hover:bg-border-color transition-colors"
        aria-label="Close"
      >
        <svg className="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="relative bg-white w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col">
        <div className="flex flex-col sm:flex-row gap-0">
          {/* Image */}
          <div className="sm:w-64 shrink-0 bg-surface sm:rounded-l-2xl flex items-center justify-center p-6 relative">
            <div className="relative w-full aspect-square max-w-[200px]">
              {product.image ? (
                <Image src={product.image} alt={name} fill className="object-contain" sizes="200px" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-text-muted">
                  <svg className="w-16 h-16 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>
            {product.grade && (
              <div className="absolute bottom-4 left-4">
                <span className={`text-[10px] font-body uppercase tracking-wide px-2.5 py-1 rounded-full ${
                  product.grade === 'premium' ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' :
                  product.grade === 'semi-premium' ? 'bg-amber-50 text-amber-700' :
                  'bg-neutral-100 text-neutral-600'
                }`}>
                  {t.products.grades[product.grade as keyof typeof t.products.grades]}
                </span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex-1 p-6">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                {product.tags && product.tags.length > 0 && (
                  <div className="flex gap-1 mb-2">
                    {product.tags.map((tag) => (
                      <span key={tag} className={`text-[10px] font-ui font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${
                        tag === 'best-seller' ? 'bg-primary/10 text-primary' :
                        tag === 'specialty' ? 'bg-secondary/20 text-dark' :
                        'bg-green-50 text-green-700'
                      }`}>
                        {t.products.tags[tag as keyof typeof t.products.tags] ?? tag}
                      </span>
                    ))}
                  </div>
                )}
                <h2 id="product-modal-title" className="text-xl font-heading text-text-primary leading-tight">
                  {name}
                </h2>
                {product.sku && (
                  <p className="text-xs font-body text-text-muted mt-0.5">{t.productDetail.sku}: {product.sku}</p>
                )}
              </div>
              <button
                onClick={() => toggle({ id: product.id, name: product.name, image: product.image ?? '', grade: product.grade })}
                className="w-9 h-9 rounded-full border border-border-color flex items-center justify-center hover:border-primary/30 transition-colors shrink-0"
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
            </div>

            <div className="border-t border-border-color">
              {packagingDisplay && (
                <DetailRow
                  label={t.productDetail.packaging}
                  value={caseDisplay ? `${packagingDisplay} · ${caseDisplay}` : packagingDisplay}
                />
              )}
              {product.ingredients?.[locale] && <DetailRow label={t.productDetail.ingredients} value={product.ingredients[locale]} />}
              {product.suggestedUses?.[locale] && <DetailRow label={t.productDetail.suggestedUses} value={product.suggestedUses[locale]} />}
            </div>

            <div className="flex gap-3 mt-5 pt-4 border-t border-border-color">
              <a
                href={productInquiryLink(name, locale)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center text-sm font-subheading not-italic font-semibold bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary-dark transition-colors"
              >
                {t.productDetail.addToOrder}
              </a>
              <a
                href={sampleRequestLink(name, locale)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center text-sm font-subheading not-italic font-semibold bg-surface text-text-primary border border-border-color py-3 px-4 rounded-lg hover:border-primary/30 hover:bg-white transition-colors"
              >
                {t.productDetail.askForSample}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
