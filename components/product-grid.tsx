import { ProductCard } from '@/components/product-card'
import type { Product } from '@/lib/data/products'
import type { Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/dictionaries/en'

interface ProductGridProps {
  products: Product[]
  locale: Locale
  dict: Dictionary
}

export function ProductGrid({ products, locale, dict }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No products found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          locale={locale}
          dict={dict}
        />
      ))}
    </div>
  )
}
