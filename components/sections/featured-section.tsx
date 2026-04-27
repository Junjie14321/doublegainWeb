import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductGrid } from '@/components/product-grid'
import { getFeaturedProducts } from '@/lib/data/products'
import type { Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/dictionaries/en'

interface FeaturedSectionProps {
  locale: Locale
  dict: Dictionary
}

export function FeaturedSection({ locale, dict }: FeaturedSectionProps) {
  const featuredProducts = getFeaturedProducts(6)

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            {dict.featured.title}
          </h2>
          <Link href={`/${locale}/products`}>
            <Button variant="outline" className="gap-2">
              {dict.featured.viewAll}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <ProductGrid products={featuredProducts} locale={locale} dict={dict} />
      </div>
    </section>
  )
}
