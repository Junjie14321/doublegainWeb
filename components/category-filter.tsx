import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { ProductCategory } from '@/lib/data/products'
import type { Locale } from '@/lib/i18n/config'

interface CategoryFilterProps {
  locale: Locale
  selectedCategory?: ProductCategory
  categoryNames: Record<ProductCategory | 'all', string>
}

export function CategoryFilter({
  locale,
  selectedCategory,
  categoryNames,
}: CategoryFilterProps) {
  const categories: (ProductCategory | 'all')[] = ['all', 'sauces', 'noodles', 'ingredients']

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-10">
      {categories.map((cat) => {
        const isActive = cat === 'all' ? !selectedCategory : selectedCategory === cat
        const href = cat === 'all' 
          ? `/${locale}/products` 
          : `/${locale}/products?category=${cat}`

        return (
          <Link key={cat} href={href}>
            <Button
              variant={isActive ? 'default' : 'outline'}
              size="sm"
              className={isActive ? '' : 'hover:bg-muted'}
            >
              {categoryNames[cat]}
            </Button>
          </Link>
        )
      })}
    </div>
  )
}
