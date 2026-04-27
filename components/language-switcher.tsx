'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { locales, localeNames, type Locale } from '@/lib/i18n/config'

interface LanguageSwitcherProps {
  locale: Locale
}

export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const pathname = usePathname()

  // Get the path without the current locale
  const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/'

  return (
    <div className="flex items-center gap-1 bg-muted rounded-md p-0.5">
      {locales.map((l) => (
        <Link key={l} href={`/${l}${pathWithoutLocale}`}>
          <Button
            variant={locale === l ? 'default' : 'ghost'}
            size="sm"
            className={`text-xs px-3 py-1 h-7 ${
              locale === l
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-transparent'
            }`}
          >
            {localeNames[l]}
          </Button>
        </Link>
      ))}
    </div>
  )
}
