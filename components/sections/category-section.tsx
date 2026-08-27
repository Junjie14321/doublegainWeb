'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/context/language-context'

const CATEGORY_IMAGES = {
  sauces: '/images/master2food-saucesnCondiments.png',
  noodles: '/images/master2food-noodle.png',
  premade: '/images/master2food-premade.png',
}

export function CategorySection() {
  const { locale, t } = useLanguage()

  const categories = [
    {
      key: 'sauces' as const,
      name: t.categories.sauces.name,
      tagline: t.categories.sauces.tagline,
    },
    {
      key: 'noodles' as const,
      name: t.categories.noodles.name,
      tagline: t.categories.noodles.tagline,
    },
    {
      key: 'premade' as const,
      name: t.categories.premade.name,
      tagline: t.categories.premade.tagline,
    },
  ]

  return (
    <section style={{ backgroundColor: '#FFFEF8', paddingTop: '41px', paddingBottom: '34px' }}>
      <div className="container-pad">
        <div className="text-center mb-6">
          <h2 className="font-heading text-primary text-balance" style={{ fontSize: '30px' }}>
            {t.categories.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {categories.map((cat) => (
            <article key={cat.key} className="text-center">
              <Link
                href={`/${locale}/products`}
                aria-label={`${cat.name} — view products`}
                className="group relative block aspect-square overflow-hidden rounded-2xl bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <Image
                  src={CATEGORY_IMAGES[cat.key]}
                  alt={cat.name}
                  fill
                  className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 33vw, 30vw"
                  priority={false}
                  loading="lazy"
                  quality={80}
                  style={{ backgroundColor: '#FFFEF8' }}
                />
              </Link>
              <div className="mt-3">
                <h3 className="text-primary font-heading text-xl md:text-2xl uppercase tracking-wide mb-0">
                  {cat.name}
                </h3>
                <p className="text-text-secondary font-body text-sm leading-relaxed">
                  {cat.tagline}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center" style={{ marginTop: '14px' }}>
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
