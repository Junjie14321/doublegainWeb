'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/context/language-context'
import type { CategoryNode } from '@/lib/sanity/products'

const HERO_IMAGES = [
  '/images/hero-sauces-background.jpg',
  '/images/hero-noodles-background.jpg',
  '/images/hero-premade-background.jpg',
]

interface CategorySectionProps {
  categories: CategoryNode[]
}

export function CategorySection({ categories }: CategorySectionProps) {
  const { locale, t } = useLanguage()

  const displayCategories = categories.slice(0, 3)

  return (
    <section style={{ backgroundColor: '#FFF7DE', paddingTop: '22px', paddingBottom: '34px' }}>
      <div className="container-pad">
        <div className="text-left mb-6">
          <h2 className="text-xl md:text-2xl font-heading text-primary">
            {t.categories.title}
          </h2>
        </div>

        <div className="space-y-4">
          {displayCategories.map((cat, i) => (
            <Link
              key={cat.slug}
              href={`/${locale}/products?category=${cat.slug}`}
              className="relative w-full h-48 md:h-56 rounded-2xl overflow-hidden group block cursor-pointer"
            >
              <Image
                src={HERO_IMAGES[i] ?? HERO_IMAGES[0]}
                alt={cat.name[locale] ?? cat.name.en}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 100vw"
                priority={i === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-l from-black/40 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-end p-6 md:p-12">
                <div className="max-w-xs text-right">
                  <p className="text-secondary font-subheading text-sm md:text-base uppercase tracking-widest mb-0.5">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="text-white font-heading text-2xl md:text-4xl uppercase tracking-widest font-bold mb-1">
                    {cat.name[locale] ?? cat.name.en}
                  </h3>
                  <p className="text-white/90 text-sm md:text-base italic leading-relaxed mb-4">
                    {[t.categories.sauces.tagline, t.categories.noodles.tagline, t.categories.premade.tagline][i]}
                  </p>
                  <span className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-dark font-subheading text-sm px-6 py-2.5 rounded-full transition-all duration-300 font-medium tracking-wide hover:shadow-lg group-hover:scale-105">
                    Explore
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href={`/${locale}/products`}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-subheading text-sm px-8 py-3 rounded-lg transition-all duration-300 uppercase tracking-wide shadow-md hover:shadow-lg hover:scale-105"
          >
            {t.categories.viewAll}
          </Link>
        </div>
      </div>
    </section>
  )
}
