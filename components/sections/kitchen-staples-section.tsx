'use client'

import Link from 'next/link'
import { useLanguage } from '@/context/language-context'

const STAPLES = [
  {
    key: 'cannedFood',
    subKey: 'canned-food',
    dark: true,
  },
  {
    key: 'herbsSpices',
    subKey: 'herbs-spices',
    dark: false,
  },
  {
    key: 'sugar',
    subKey: 'sugar',
    dark: true,
  },
  {
    key: 'drink',
    subKey: 'drink',
    dark: false,
  },
] as const

export function KitchenStaplesSection() {
  const { locale, t } = useLanguage()

  const labels: Record<string, string> = {
    cannedFood: t.categories.cannedFood,
    herbsSpices: t.categories.herbsSpices,
    sugar: t.categories.sugar,
    drink: t.categories.drink,
  }

  return (
    <section style={{ backgroundColor: '#FFCC5A' }} className="py-6 md:py-8">
      <div className="container-pad">
        <div className="mb-4">
          <h2 className="text-xl md:text-2xl font-heading text-primary">
            {t.categories.kitchenStaples}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STAPLES.map((item) => (
            <Link
              key={item.key}
              href={`/${locale}/products?category=others&sub=${item.subKey}`}
              className={`rounded-xl p-5 flex items-center justify-between transition-all hover:shadow-lg hover:scale-105 group ${
                item.dark ? 'bg-primary hover:bg-primary/90' : 'bg-[#FFF7DE] hover:bg-white'
              }`}
            >
              <h3 className={`font-subheading text-sm font-semibold ${
                item.dark ? 'text-white' : 'text-text-primary'
              }`}>
                {labels[item.key]}
              </h3>
              <svg
                className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${
                  item.dark ? 'text-white' : 'text-text-primary'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
