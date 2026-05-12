'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { products } from '@/lib/data/products'
import type { MainCategory, SubCategory, Product } from '@/lib/data/products'
import { useLanguage } from '@/context/language-context'
import { FilterSidebar } from '@/components/products/filter-sidebar'
import { ProductCard } from '@/components/products/product-card'
import { ProductDetailModal } from '@/components/products/product-detail-modal'

const ALL_SUBCATEGORIES_BY_CATEGORY: Record<string, SubCategory[]> = {
  sauces: ['soya-sauce', 'sesame-oil', 'vinegar', 'paste', 'authentic-sauce'],
  noodles: ['e-fu-noodle', 'tai-lok-mee'],
  'pre-made': ['yam-ring', 'prawn-roll', 'pork-lard'],
  others: ['canned-food', 'herbs-spices', 'sugar', 'drink'],
}

export function ProductsClientPage() {
  const { t } = useLanguage()
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const [selectedCategory, setSelectedCategory] = useState<MainCategory | 'all'>('all')
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)
  const [filterType, setFilterType] = useState<'all' | 'specialty' | 'bestsellers' | 'newitems'>('all')

  useEffect(() => {
    const cat = searchParams.get('category') as MainCategory | null
    const sub = searchParams.get('sub') as SubCategory | null
    const q = searchParams.get('q')
    if (cat) setSelectedCategory(cat)
    if (sub) setSelectedSubCategory(sub)
    if (q) setSearchQuery(q)
  }, [searchParams])

  const updateURL = (cat: MainCategory | 'all', sub: SubCategory | 'all') => {
    const params = new URLSearchParams()
    if (cat !== 'all') params.set('category', cat)
    if (sub !== 'all') params.set('sub', sub)
    const qs = params.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }

  const handleCategoryChange = (cat: MainCategory | 'all') => {
    setSelectedCategory(cat)
    setSelectedSubCategory('all')
    updateURL(cat, 'all')
  }

  const handleSubCategoryChange = (sub: SubCategory | 'all') => {
    setSelectedSubCategory(sub)
    updateURL(selectedCategory, sub)
  }

  const subCategoriesForSidebar: SubCategory[] = selectedCategory === 'all'
    ? []
    : ALL_SUBCATEGORIES_BY_CATEGORY[selectedCategory] ?? []

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat = selectedCategory === 'all' || p.category === selectedCategory
      const matchSub = selectedSubCategory === 'all' || p.subCategory === selectedSubCategory
      const q = searchQuery.toLowerCase()
      const matchSearch = !q ||
        p.name.en.toLowerCase().includes(q) ||
        p.name.zh.toLowerCase().includes(q) ||
        (p.shortDescription?.en ?? '').toLowerCase().includes(q) ||
        (p.subCategory ?? '').toLowerCase().includes(q) ||
        (p.sku ?? '').toLowerCase().includes(q)
      const matchFilter =
        filterType === 'all' ||
        (filterType === 'specialty' && p.tags?.includes('specialty')) ||
        (filterType === 'bestsellers' && p.tags?.includes('best-seller')) ||
        (filterType === 'newitems' && p.tags?.includes('new'))
      return matchCat && matchSub && matchSearch && matchFilter
    })
  }, [selectedCategory, selectedSubCategory, searchQuery, filterType])

  const productCounts = useMemo(() => {
    const counts: Record<string, number> = { all: products.length }
    ;(['sauces', 'noodles', 'pre-made', 'others'] as MainCategory[]).forEach((cat) => {
      counts[cat] = products.filter((p) => p.category === cat).length
    })
    subCategoriesForSidebar.forEach((sub) => {
      counts[sub] = products.filter((p) => p.subCategory === sub).length
    })
    return counts
  }, [subCategoriesForSidebar])

  const tagButtonClass = (type: typeof filterType) =>
    `px-4 py-1.5 text-xs font-subheading not-italic font-medium rounded-lg border transition-colors ${
      filterType === type
        ? 'bg-secondary border-secondary text-dark'
        : 'bg-white border-border-color text-text-primary hover:bg-surface'
    }`

  return (
    <>
      <main className="min-h-screen pt-16" style={{ backgroundColor: '#FFF7DE' }}>
        <div style={{ backgroundColor: '#FFF7DE' }} className="border-b border-border-color">
          <div className="container-pad py-4">
            {/* Search */}
            <div className="relative mb-3">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.products.search}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-border-color rounded-xl focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-colors placeholder:text-text-muted"
                aria-label="Search products"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-surface flex items-center justify-center hover:bg-border-color transition-colors"
                >
                  <svg className="w-3 h-3 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Tag filters */}
            <div className="mb-4 py-2">
              <p className="text-xs font-ui text-center text-text-secondary mb-2">Tags</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <button onClick={() => setFilterType(filterType === 'specialty' ? 'all' : 'specialty')} className={tagButtonClass('specialty')}>
                  {t.products.specialty}
                </button>
                <button onClick={() => setFilterType(filterType === 'bestsellers' ? 'all' : 'bestsellers')} className={tagButtonClass('bestsellers')}>
                  {t.products.bestSellers}
                </button>
                <button onClick={() => setFilterType(filterType === 'newitems' ? 'all' : 'newitems')} className={tagButtonClass('newitems')}>
                  {t.products.newItems}
                </button>
              </div>
            </div>

            {/* Mobile filter toggle */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden flex items-center gap-2 text-xs font-ui font-semibold text-text-secondary mb-3 border border-border-color px-3 py-2 rounded-lg hover:border-primary/30 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4h18M7 8h10M10 12h4" />
              </svg>
              Filter
              {selectedCategory !== 'all' && (
                <span className="ml-1 bg-primary text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">1</span>
              )}
            </button>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Sidebar */}
              <div className={`${mobileFilterOpen ? 'block' : 'hidden'} lg:block border-b lg:border-b-0 lg:border-r border-border-color pb-4 lg:pb-0 lg:pr-6 w-full lg:w-56 lg:sticky lg:top-20 lg:self-start`}>
                <FilterSidebar
                  selectedCategory={selectedCategory}
                  selectedSubCategory={selectedSubCategory}
                  onCategoryChange={handleCategoryChange}
                  onSubCategoryChange={handleSubCategoryChange}
                  subCategories={subCategoriesForSidebar}
                  productCounts={productCounts}
                />
              </div>

              {/* Product Grid */}
              <div className="flex-1 min-w-0 w-full">
                <p className="text-xs text-text-muted mb-4">
                  {t.products.showing} <span className="font-semibold text-text-primary">{filteredProducts.length}</span> {t.products.productsIn}{' '}
                  <span className="font-semibold text-text-primary">
                    {selectedCategory === 'all' ? t.products.allCategories : t.products[selectedCategory as keyof typeof t.products] as string}
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
                    {filteredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onViewDetails={(p) => setSelectedProduct(p)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  )
}
