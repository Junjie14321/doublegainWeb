'use client'

import { useState } from 'react'
import { useLanguage } from '@/context/language-context'
import type { MainCategory, SubCategory } from '@/lib/data/products'

interface FilterSidebarProps {
  selectedCategory: MainCategory | 'all'
  selectedSubCategory: SubCategory | 'all'
  onCategoryChange: (cat: MainCategory | 'all') => void
  onSubCategoryChange: (sub: SubCategory | 'all') => void
  subCategories: SubCategory[]
  productCounts: Record<string, number>
}

const MAIN_CATEGORIES: Array<{ id: MainCategory | 'all'; labelKey: string }> = [
  { id: 'all', labelKey: 'allCategories' },
  { id: 'sauces', labelKey: 'sauces' },
  { id: 'noodles', labelKey: 'noodles' },
  { id: 'pre-made', labelKey: 'premade' },
  { id: 'others', labelKey: 'others' },
]

export function FilterSidebar({
  selectedCategory,
  selectedSubCategory,
  onCategoryChange,
  onSubCategoryChange,
  subCategories,
  productCounts,
}: FilterSidebarProps) {
  const { t } = useLanguage()
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(selectedCategory !== 'all' ? [selectedCategory] : [])
  )

  const handleCategoryClick = (catId: MainCategory | 'all') => {
    onCategoryChange(catId)
    const newExpanded = new Set(expandedCategories)
    newExpanded.add(catId)
    setExpandedCategories(newExpanded)
  }

  return (
    <aside className="w-full lg:w-full lg:h-fit bg-white rounded-xl p-4 lg:p-6">
      <p className="text-[11px] font-ui font-semibold uppercase tracking-wider text-text-muted mb-3">
        {t.products.refineCategory}
      </p>
      <nav className="flex flex-col gap-1">
        {MAIN_CATEGORIES.map((cat) => {
          const label = t.products[cat.labelKey as keyof typeof t.products] as string
          const count = productCounts[cat.id]
          const active = selectedCategory === cat.id
          const isExpanded = expandedCategories.has(cat.id)
          const hasSubs = cat.id !== 'all'

          return (
            <div key={cat.id}>
              <button
                onClick={() => handleCategoryClick(cat.id as MainCategory | 'all')}
                className={`flex items-center justify-between w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  active ? 'bg-primary text-white font-semibold' : 'text-text-secondary hover:bg-surface hover:text-text-primary'
                }`}
              >
                <span>{label}</span>
                <div className="flex items-center gap-1">
                  {count !== undefined && (
                    <span className={`text-xs ${active ? 'text-white/70' : 'text-text-muted'}`}>{count}</span>
                  )}
                  {hasSubs && (
                    <svg className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </div>
              </button>

              {hasSubs && isExpanded && subCategories.length > 0 && selectedCategory === cat.id && (
                <div className="flex flex-col gap-1 mt-1 ml-2 border-l-2 border-border-color pl-2">
                  <button
                    onClick={() => onSubCategoryChange('all')}
                    className={`flex items-center justify-between w-full text-left px-3 py-2 rounded-lg text-xs transition-colors ${
                      selectedSubCategory === 'all' ? 'bg-secondary/20 text-dark font-semibold' : 'text-text-secondary hover:bg-surface'
                    }`}
                  >
                    All {label}
                  </button>
                  {subCategories.map((sub) => {
                    const subLabel = t.products.subcategories[sub as keyof typeof t.products.subcategories] ?? sub
                    const subCount = productCounts[sub]
                    const subActive = selectedSubCategory === sub
                    return (
                      <button
                        key={sub}
                        onClick={() => onSubCategoryChange(sub)}
                        className={`flex items-center justify-between w-full text-left px-3 py-2 rounded-lg text-xs transition-colors ${
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
