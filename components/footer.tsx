import Link from 'next/link'
import type { Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/dictionaries/en'

interface FooterProps {
  locale: Locale
  dict: Dictionary
}

export function Footer({ locale, dict }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#451919] text-white/90 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-white">Master 2</h3>
            <p className="text-sm text-white/70 leading-relaxed">
              {dict.footer.description}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">{dict.footer.quickLinks}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={`/${locale}`} className="text-white/70 hover:text-white transition-colors">
                  {dict.nav.home}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/products`} className="text-white/70 hover:text-white transition-colors">
                  {dict.nav.products}
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">{dict.footer.categories}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={`/${locale}/products?category=sauces`} className="text-white/70 hover:text-white transition-colors">
                  {dict.nav.sauces}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/products?category=noodles`} className="text-white/70 hover:text-white transition-colors">
                  {dict.nav.noodles}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/products?category=ingredients`} className="text-white/70 hover:text-white transition-colors">
                  {dict.nav.ingredients}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">{dict.footer.contact}</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>WhatsApp: +60 12-345 6789</li>
              <li>Email: info@master2.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/20 text-center text-sm text-white/60">
          <p>&copy; {currentYear} Master 2. {dict.footer.rights}</p>
        </div>
      </div>
    </footer>
  )
}
