'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/context/language-context'
import type { CategoryNode } from '@/lib/sanity/products'

type ConfigKey = 'sauces' | 'noodles' | 'premade'

const IMAGE_BY_KEY: Record<ConfigKey, string> = {
  sauces: '/images/hero-sauces-background.png',
  noodles: '/images/hero-noodles-background.png',
  premade: '/images/hero-premade-background.png',
}

const DISPLAY_ORDER: ConfigKey[] = ['sauces', 'noodles', 'premade']

function getCategoryKey(nameEn: string): ConfigKey | null {
  const lower = nameEn.toLowerCase()
  if (lower.includes('sauce')) return 'sauces'
  if (lower.includes('noodle')) return 'noodles'
  if (lower.includes('pre-made') || lower.includes('ingredient')) return 'premade'
  return null
}

interface CategorySectionProps {
  categories: CategoryNode[]
}

export function CategorySection({ categories }: CategorySectionProps) {
  const { locale, t } = useLanguage()

  const categoriesByKey = new Map<ConfigKey, CategoryNode>()
  for (const cat of categories) {
    const key = getCategoryKey(cat.name.en)
    if (key && !categoriesByKey.has(key)) {
      categoriesByKey.set(key, cat)
    }
  }

  const displayCategories = DISPLAY_ORDER
    .filter((key) => categoriesByKey.has(key))
    .map((key) => ({ key, cat: categoriesByKey.get(key)! }))

  const taglineByKey: Record<ConfigKey, string> = {
    sauces: t.categories.sauces.tagline,
    noodles: t.categories.noodles.tagline,
    premade: t.categories.premade.tagline,
  }

  return (
    <section style={{ backgroundColor: '#FFF7DE', paddingTop: '22px', paddingBottom: '34px' }}>
      <div className="container-pad">
        <div className="text-left mb-6">
          <h2 className="text-xl md:text-2xl font-heading text-primary">
            {t.categories.title}
          </h2>
        </div>

        <div className="space-y-4">
          {displayCategories.map(({ key, cat }, i) => (
            <Link
              key={cat.slug}
              href={`/${locale}/products`}
              className="relative w-full h-48 md:h-56 rounded-2xl overflow-hidden group block cursor-pointer"
            >
              <Image
                src={IMAGE_BY_KEY[key]}
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
                    {taglineByKey[key]}
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
