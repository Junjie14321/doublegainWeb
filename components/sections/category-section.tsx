import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/dictionaries/en'

interface CategorySectionProps {
  locale: Locale
  dict: Dictionary
}

export function CategorySection({ locale, dict }: CategorySectionProps) {
  const categories = [
    {
      id: 'sauces',
      name: dict.categories.sauces.name,
      tagline: dict.categories.sauces.tagline,
      image: '/images/categories/sauces.jpg',
    },
    {
      id: 'noodles',
      name: dict.categories.noodles.name,
      tagline: dict.categories.noodles.tagline,
      image: '/images/categories/noodles.jpg',
    },
    {
      id: 'ingredients',
      name: dict.categories.ingredients.name,
      tagline: dict.categories.ingredients.tagline,
      image: '/images/categories/ingredients.jpg',
    },
  ]

  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-center text-foreground mb-16">
          {dict.categories.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/${locale}/products?category=${category.id}`}
              className="group relative overflow-hidden rounded-xl aspect-[4/5] bg-card"
            >
              {/* Image */}
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="font-serif text-2xl font-bold mb-2">{category.name}</h3>
                <p className="text-white/80 text-sm mb-4">{category.tagline}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/30 text-white hover:bg-white/10 gap-2 group-hover:gap-3 transition-all"
                >
                  {dict.categories.viewAll}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
