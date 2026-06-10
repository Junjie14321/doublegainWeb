'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useLanguage } from '@/context/language-context'
import { useSavedList } from '@/context/saved-list-context'
import { SavedListPanel } from '@/components/products/saved-list-panel'

export function Navbar() {
  const { locale, t } = useLanguage()
  const { savedItems } = useSavedList()
  const [savedOpen, setSavedOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus()
  }, [searchOpen])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/${locale}/products?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  const switchLocale = (newLocale: 'en' | 'zh') => {
    const newPath = pathname.replace(/^\/(en|zh)/, `/${newLocale}`)
    router.push(newPath)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-200 ${
          scrolled ? 'shadow-md' : 'border-b border-border-color'
        }`}
      >
        <div className="container-pad">
          <div className="flex items-center justify-between h-16">
            <Link href={`/${locale}`} className="flex items-center gap-2 flex-shrink-0">
              <Image
                src="/images/v2 red logo.png"
                alt="Master 2 Foods"
                width={120}
                height={40}
                style={{ width: 'auto', height: '40px' }}
                className="h-10 w-auto object-contain"
                priority
              />
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link href={`/${locale}`} className="text-sm font-subheading not-italic text-text-primary hover:text-primary transition-colors">
                {t.nav.home}
              </Link>
              <Link href={`/${locale}/products`} className="text-sm font-subheading not-italic text-text-primary hover:text-primary transition-colors flex items-center gap-1">
                {t.nav.products}
              </Link>
              <Link href={`/${locale}/recipes`} className="text-sm font-subheading not-italic text-text-primary hover:text-primary transition-colors">
                {t.nav.recipes}
              </Link>
              <Link href={`/${locale}/about`} className="text-sm font-subheading not-italic text-text-primary hover:text-primary transition-colors">
                {t.nav.brand}
              </Link>
              <Link href={`/${locale}/contact`} className="text-sm font-subheading not-italic text-text-primary hover:text-primary transition-colors">
                {t.nav.contact}
              </Link>
            </nav>

            <div className="flex items-center gap-1">
              <div className="hidden md:flex items-center border border-border-color rounded-full overflow-hidden text-xs font-subheading">
                <button
                  onClick={() => switchLocale('en')}
                  className={`px-3 py-1.5 transition-colors ${locale === 'en' ? 'bg-primary text-white' : 'text-text-secondary hover:bg-surface'}`}
                  aria-label="Switch to English"
                >
                  EN
                </button>
                <button
                  onClick={() => switchLocale('zh')}
                  className={`px-3 py-1.5 transition-colors ${locale === 'zh' ? 'bg-primary text-white' : 'text-text-secondary hover:bg-surface'}`}
                  aria-label="切换到中文"
                >
                  中文
                </button>
              </div>

              <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 text-text-secondary hover:text-primary transition-colors" aria-label="Search">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              <button onClick={() => setSavedOpen(!savedOpen)} className="relative p-2 text-text-secondary hover:text-primary transition-colors" aria-label={t.nav.savedList}>
                <svg className="w-5 h-5" fill={savedItems.length > 0 ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {savedItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center leading-[0]">
                    {savedItems.length}
                  </span>
                )}
              </button>

              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-text-secondary hover:text-primary transition-colors" aria-label="Menu">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen
                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                  }
                </svg>
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border-color bg-white">
            <div className="container-pad py-4 flex flex-col gap-4">
              <Link href={`/${locale}`} className="text-sm font-subheading not-italic text-text-primary" onClick={() => setMobileMenuOpen(false)}>{t.nav.home}</Link>
              <Link href={`/${locale}/products`} className="text-sm font-subheading not-italic text-text-primary" onClick={() => setMobileMenuOpen(false)}>{t.nav.products}</Link>
              <Link href={`/${locale}/recipes`} className="text-sm font-subheading not-italic text-text-primary" onClick={() => setMobileMenuOpen(false)}>{t.nav.recipes}</Link>
              <Link href={`/${locale}/about`} className="text-sm font-subheading not-italic text-text-primary" onClick={() => setMobileMenuOpen(false)}>{t.nav.brand}</Link>
              <Link href={`/${locale}/contact`} className="text-sm font-subheading not-italic text-text-primary" onClick={() => setMobileMenuOpen(false)}>{t.nav.contact}</Link>
              <div className="flex items-center gap-2 pt-2 border-t border-border-color">
                <span className="text-xs text-text-muted">Language:</span>
                <button onClick={() => { switchLocale('en'); setMobileMenuOpen(false) }} className={`text-xs px-3 py-1 rounded-full border ${locale === 'en' ? 'bg-primary text-white border-primary' : 'border-border-color text-text-secondary'}`}>EN</button>
                <button onClick={() => { switchLocale('zh'); setMobileMenuOpen(false) }} className={`text-xs px-3 py-1 rounded-full border ${locale === 'zh' ? 'bg-primary text-white border-primary' : 'border-border-color text-text-secondary'}`}>中文</button>
              </div>
            </div>
          </div>
        )}

        {searchOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-border-color shadow-lg">
            <form onSubmit={handleSearch} className="container-pad py-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 bg-surface rounded-full px-3 py-2.5 border border-border-color flex-1 min-w-0">
                  <svg className="w-4 h-4 text-text-muted flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.nav.searchPlaceholder}
                    className="flex-1 min-w-0 bg-transparent text-sm text-text-primary outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => { setSearchOpen(false); setSearchQuery('') }}
                  className="flex-shrink-0 p-2 rounded-full text-text-muted hover:text-primary hover:bg-surface transition-colors"
                  aria-label="Close search"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        )}
      </header>

      {savedOpen && <SavedListPanel onClose={() => setSavedOpen(false)} />}
      {savedOpen && <div className="fixed inset-0 z-40 bg-black/20" onClick={() => setSavedOpen(false)} />}
    </>
  )
}
