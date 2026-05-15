'use client'

import { useState } from 'react'
import { useLanguage } from '@/context/language-context'
import type { CategoryNode } from '@/lib/sanity/products'

interface FilterSidebarProps {
  categories: CategoryNode[]
  selectedCategory: string
  selectedSubCategory: string
  onCategoryChange: (cat: string) => void
  onSubCategoryChange: (sub: string) => void
  subCategories: { slug: string; name: { en: string; zh: string } }[]
  productCounts: Record<string, number>
}

export function FilterSidebar({
  categories,
  selectedCategory,
  selectedSubCategory,
  onCategoryChange,
  onSubCategoryChange,
  subCategories,
  productCounts,
}: FilterSidebarProps) {
  const { t, locale } = useLanguage()
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(selectedCategory !== 'all' ? [selectedCategory] : [])
  )

  const handleCategoryClick = (catId: string) => {
    onCategoryChange(catId)
    const newExpanded = new Set(expandedCategories)
    newExpanded.add(catId)
    setExpandedCategories(newExpanded)
  }

  const items: Array<{ id: string; label: string; hasSubs: boolean }> = [
    { id: 'all', label: t.products.allCategories, hasSubs: false },
    ...categories.map((c) => ({
      id: c.slug,
      label: c.name[locale] ?? c.name.en,
      hasSubs: c.subcategories.length > 0,
    })),
  ]

  return (
    <aside className="w-full lg:w-full lg:h-fit bg-white rounded-xl p-4 lg:p-6">
      <p className="text-[13px] font-ui font-semibold uppercase tracking-wider text-text-muted mb-3">
        {t.products.refineCategory}
      </p>
      <nav className="flex flex-col gap-1">
        {items.map((cat) => {
          const count = productCounts[cat.id]
          const active = selectedCategory === cat.id
          const isExpanded = expandedCategories.has(cat.id)

          return (
            <div key={cat.id}>
              <button
                onClick={() => handleCategoryClick(cat.id)}
                className={`flex items-center justify-between w-full text-left px-3 py-2 rounded-lg text-base transition-colors ${
                  active ? 'bg-primary text-white font-semibold' : 'text-text-secondary hover:bg-surface hover:text-text-primary'
                }`}
              >
                <span>{cat.label}</span>
                <div className="flex items-center gap-1">
                  {count !== undefined && (
                    <span className={`text-sm ${active ? 'text-white/70' : 'text-text-muted'}`}>{count}</span>
                  )}
                  {cat.hasSubs && (
                    <svg className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </div>
              </button>

              {cat.hasSubs && isExpanded && subCategories.length > 0 && selectedCategory === cat.id && (
                <div className="flex flex-col gap-1 mt-1 ml-2 border-l-2 border-border-color pl-2">
                  <button
                    onClick={() => onSubCategoryChange('all')}
                    className={`flex items-center justify-between w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedSubCategory === 'all' ? 'bg-secondary/20 text-dark font-semibold' : 'text-text-secondary hover:bg-surface'
                    }`}
                  >
                    All {cat.label}
                  </button>
                  {subCategories.map((sub) => {
                    const subLabel = sub.name[locale] ?? sub.name.en
                    const subCount = productCounts[sub.slug]
                    const subActive = selectedSubCategory === sub.slug
                    return (
                      <button
                        key={sub.slug}
                        onClick={() => onSubCategoryChange(sub.slug)}
                        className={`flex items-center justify-between w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          subActive ? 'bg-secondary/20 text-dark font-semibold' : 'text-text-secondary hover:bg-surface'
                        }`}
                      >
                        <span>{subLabel}</span>
                        {subCount !== undefined && <span className="text-text-muted">{subCount}</span>}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}
