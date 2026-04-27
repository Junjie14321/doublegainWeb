import type { Metadata } from 'next'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { ProductGrid } from '@/components/product-grid'
import { CategoryFilter } from '@/components/category-filter'
import { products, getProductsByCategory, type ProductCategory } from '@/lib/data/products'
import type { Locale } from '@/lib/i18n/config'

export const revalidate = 3600

interface PageProps {
  params: Promise<{ locale: Locale }>
  searchParams: Promise<{ category?: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const dict = getDictionary(locale)

  return {
    title: dict.nav.products,
    description: locale === 'en' 
      ? 'Browse our complete range of specialty sauces, noodles, and pre-made ingredients for commercial kitchens.'
      : '浏览我们为商业厨房提供的全系列特色酱料、面条和预制食材。',
  }
}

export default async function ProductsPage({ params, searchParams }: PageProps) {
  const { locale } = await params
  const { category } = await searchParams
  const dict = getDictionary(locale)

  const validCategories: ProductCategory[] = ['sauces', 'noodles', 'ingredients']
  const selectedCategory = validCategories.includes(category as ProductCategory)
    ? (category as ProductCategory)
    : undefined

  const filteredProducts = selectedCategory
    ? getProductsByCategory(selectedCategory)
    : products

  const categoryNames: Record<ProductCategory | 'all', string> = {
    all: locale === 'en' ? 'All Products' : '全部产品',
    sauces: dict.categories.sauces.name,
    noodles: dict.categories.noodles.name,
    ingredients: dict.categories.ingredients.name,
  }

  const pageTitle = selectedCategory
    ? categoryNames[selectedCategory]
    : categoryNames.all

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            {pageTitle}
          </h1>
          {selectedCategory && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {dict.categories[selectedCategory].tagline}
            </p>
          )}
        </div>

        {/* Filter */}
        <CategoryFilter
          locale={locale}
          selectedCategory={selectedCategory}
          categoryNames={categoryNames}
        />

        {/* Products Grid */}
        <ProductGrid products={filteredProducts} locale={locale} dict={dict} />
      </div>
    </div>
  )
}
