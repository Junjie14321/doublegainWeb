'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import type { Product } from '@/lib/sanity/types'
import type { CategoryNode } from '@/lib/sanity/products'
import { useLanguage } from '@/context/language-context'
import { useSavedList } from '@/context/saved-list-context'
import { ProductCard } from '@/components/products/product-card'
import { ProductDetailModal } from '@/components/products/product-detail-modal'
import { SavedListPanel } from '@/components/products/saved-list-panel'

interface ProductsClientPageProps {
  products: Product[]
  categories: CategoryNode[]
}

type TagFilter = 'all' | 'specialty' | 'bestsellers' | 'newitems'

export function ProductsClientPage({ products, categories }: ProductsClientPageProps) {
  const { t, locale } = useLanguage()
  const { savedItems } = useSavedList()
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [filterType, setFilterType] = useState<TagFilter>('all')
  const [savedOpen, setSavedOpen] = useState(false)

  useEffect(() => {
    const cat = searchParams.get('category')
    const sub = searchParams.get('sub')
    const q = searchParams.get('q')
    if (cat) setSelectedCategory(cat)
    if (sub) setSelectedSubCategory(sub)
    if (q) setSearchQuery(q)
  }, [searchParams])

  const updateURL = (cat: string, sub: string) => {
    const params = new URLSearchParams()
    if (cat !== 'all') params.set('category', cat)
    if (sub !== 'all') params.set('sub', sub)
    const qs = params.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat)
    setSelectedSubCategory('all')
    updateURL(cat, 'all')
  }

  const handleSubCategoryChange = (sub: string) => {
    setSelectedSubCategory(sub)
    updateURL(selectedCategory, sub)
  }

  const handleTagFilter = (tag: TagFilter) => {
    setFilterType(filterType === tag ? 'all' : tag)
  }

  const activeCategory = categories.find((c) => c.slug === selectedCategory)
  const subCategoriesForRow = activeCategory?.subcategories ?? []

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat = selectedCategory === 'all' ||
        (p.categories?.some((c) => c.slug === selectedCategory) ?? false)
      const matchSub = selectedSubCategory === 'all' ||
        (p.subcategories?.some((c) => c.slug === selectedSubCategory) ?? false)
      const q = searchQuery.toLowerCase()
      const matchSearch = !q ||
        p.name.en.toLowerCase().includes(q) ||
        p.name.zh.toLowerCase().includes(q) ||
        (p.shortDescription?.en ?? '').toLowerCase().includes(q) ||
        (p.sku ?? '').toLowerCase().includes(q)
      const matchFilter =
        filterType === 'all' ||
        (filterType === 'specialty' && p.tags?.includes('specialty')) ||
        (filterType === 'bestsellers' && p.tags?.includes('best-seller')) ||
        (filterType === 'newitems' && p.tags?.includes('new'))
      return matchCat && matchSub && matchSearch && matchFilter
    })
  }, [products, selectedCategory, selectedSubCategory, searchQuery, filterType])

  const catPillClass = (slug: string) =>
    `px-5 py-2 rounded-full text-sm font-subheading border transition-colors whitespace-nowrap ${
      selectedCategory === slug
        ? 'bg-primary text-white border-primary'
        : 'bg-white text-primary border-primary hover:bg-primary/5'
    }`

  const subPillClass = (slug: string) =>
    `px-4 py-1.5 rounded-full text-sm font-subheading border transition-colors whitespace-nowrap ${
      selectedSubCategory === slug
        ? 'bg-primary text-white border-primary'
        : 'bg-white text-text-secondary border-border-color hover:border-primary/50'
    }`

  const tagItemClass = (tag: TagFilter) =>
    `block w-full text-left text-sm font-body py-0.5 transition-colors cursor-pointer ${
      filterType === tag
        ? 'font-bold text-primary'
        : 'text-text-secondary hover:text-primary'
    }`

  return (
    <>
      <main className={`min-h-screen pt-16 ${savedItems.length > 0 ? 'pb-20' : ''}`} style={{ backgroundColor: '#FFF7DE' }}>
        <div className="container-pad py-6">

          {/* Search */}
          <div className="relative mb-6">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.products.search}
              className="w-full pl-12 pr-4 py-3 text-sm font-body bg-white border border-border-color rounded-xl focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-colors placeholder:text-text-muted"
              aria-label="Search products"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-surface flex items-center justify-center hover:bg-border-color transition-colors"
              >
                <svg className="w-3 h-3 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Category pills */}
          <div className="mb-4">
            <p className="text-xs font-subheading text-text-secondary uppercase tracking-wider mb-2">
              {t.products.refineCategory}
            </p>
            <div className="flex flex-nowrap gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
              <button onClick={() => handleCategoryChange('all')} className={catPillClass('all')}>
                {t.products.allCategories}
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => handleCategoryChange(cat.slug)}
                  className={catPillClass(cat.slug)}
                >
                  {cat.name[locale] ?? cat.name.en}
                </button>
              ))}
            </div>
          </div>

          {/* Subcategory section */}
          {subCategoriesForRow.length > 0 && (
            <div className="mb-6">
              <div className="border-b-2 border-primary pb-1.5 mb-3">
                <span className="text-sm font-subheading not-italic font-bold text-primary">
                  {locale === 'zh'
                    ? `${activeCategory?.name[locale] ?? activeCategory?.name.en}${t.products.subCategoryType}`
                    : `${activeCategory?.name[locale] ?? activeCategory?.name.en} ${t.products.subCategoryType}`}
                </span>
              </div>
              <div className="flex flex-nowrap gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
                <button onClick={() => handleSubCategoryChange('all')} className={subPillClass('all')}>
                  {t.products.all}
                </button>
                {subCategoriesForRow.map((sub) => (
                  <button
                    key={sub.slug}
                    onClick={() => handleSubCategoryChange(sub.slug)}
                    className={subPillClass(sub.slug)}
                  >
                    {sub.name[locale] ?? sub.name.en}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Content area: TAGS sidebar + product grid */}
          <div className="flex gap-6 items-start">

            {/* TAGS sidebar */}
            <aside className="hidden lg:block w-44 shrink-0">
              <div className="bg-white rounded-xl p-5 border border-border-color">
                <p className="text-xs font-subheading uppercase tracking-wider text-text-muted mb-3">
                  Tags
                </p>
                <div className="flex flex-col gap-1.5">
                  <button onClick={() => handleTagFilter('specialty')} className={tagItemClass('specialty')}>
                    {t.products.specialty}
                  </button>
                  <button onClick={() => handleTagFilter('bestsellers')} className={tagItemClass('bestsellers')}>
                    {t.products.bestSellers}
                  </button>
                  <button onClick={() => handleTagFilter('newitems')} className={tagItemClass('newitems')}>
                    {t.products.newItems}
                  </button>
                </div>
              </div>
            </aside>

            {/* Product grid */}
            <div className="flex-1 min-w-0">

              {/* Mobile tag filters */}
              <div className="flex lg:hidden flex-col gap-2 mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-subheading uppercase tracking-wider text-text-muted shrink-0">Tags</span>
                  <div className="flex-1 h-px bg-primary" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {(['specialty', 'bestsellers', 'newitems'] as TagFilter[]).map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleTagFilter(tag)}
                      className={`px-3 py-1 text-xs font-subheading rounded-full border transition-colors ${
                        filterType === tag
                          ? 'bg-secondary border-secondary text-dark font-bold'
                          : 'bg-white border-border-color text-text-secondary'
                      }`}
                    >
                      {tag === 'specialty' ? t.products.specialty : tag === 'bestsellers' ? t.products.bestSellers : t.products.newItems}
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-xs text-text-muted mb-4">
                {t.products.showing}{' '}
                <span className="font-semibold text-text-primary">{filteredProducts.length}</span>{' '}
                {t.products.productsIn}{' '}
                <span className="font-semibold text-text-primary">
                  {selectedCategory === 'all' ? t.products.allCategories : (activeCategory?.name[locale] ?? selectedCategory)}
                </span>
              </p>

              {filteredProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <svg className="w-12 h-12 text-text-muted opacity-30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <p className="text-text-muted text-sm">No products found. Try adjusting your filters.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredProducts.map((product, i) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onViewDetails={(p) => setSelectedProduct(p)}
                      isPriority={i < 4}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <ProductDetailModal
        product={selectedProduct}
        allProducts={products}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onClose={() => setSelectedProduct(null)}
      />

      {savedItems.length > 0 && (
        <button
          onClick={() => setSavedOpen(true)}
          className="fixed bottom-0 left-0 right-0 z-40 bg-background border-t border-border-color"
          aria-label={t.quoteBar.title}
        >
          <div className="container-pad py-3 flex items-center justify-between text-left">
            <div>
              <p className="text-xs font-body text-text-secondary">{t.quoteBar.title}</p>
              <p className="text-sm font-subheading not-italic font-bold text-primary">
                {t.quoteBar.productsSelected.replace('{count}', String(savedItems.length))}
              </p>
            </div>
            <svg className="w-6 h-6 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </button>
      )}

      {savedOpen && <SavedListPanel onClose={() => setSavedOpen(false)} />}
      {savedOpen && <div className="fixed inset-0 z-40 bg-black/20" onClick={() => setSavedOpen(false)} />}
    </>
  )
}
