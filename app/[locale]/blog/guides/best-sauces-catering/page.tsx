import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import type { Locale } from '@/lib/i18n/config'

export const metadata: Metadata = {
  title: 'Best & Most Commonly Used Sauces for Catering Businesses (Singapore Edition)',
  description:
    'A must-have list of sauces every Singapore catering kitchen should keep in stock — light soy, dark soy, oyster sauce, sambal belacan, and more.',
}

interface PageProps {
  params: Promise<{ locale: Locale }>
}

const TOC = [
  { id: 'heritage-sauces', label: 'Local Heritage Sauces & Cooking Pastes' },
  { id: 'soy-sauces', label: 'Soy Sauces: Light & Dark' },
  { id: 'everyday-condiments', label: 'Everyday Multi-Purpose Condiments' },
  { id: 'sauce-event-guide', label: 'Matching Sauce Categories to Event Type' },
  { id: 'faq', label: 'FAQ' },
]

const SIDEBAR_PRODUCTS = [
  {
    name: 'Light Soya Sauce',
    grade: 'Standard',
    image: '/images/products/light-soya-sauce-standard.png',
    slug: 'light-soya-sauce-standard',
  },
  {
    name: 'Oyster Sauce',
    grade: 'Premium',
    image: '/images/products/oyster-sauce-premium.png',
    slug: 'oyster-sauce-premium',
  },
  {
    name: 'Seafood Belacan Paste',
    grade: 'Standard',
    image: '/images/products/seafood-belacan-paste-standard.png',
    slug: 'seafood-belacan-paste-standard',
  },
]

const RELATED_GUIDES = [
  {
    title: 'Best Noodles for High-Volume Catering Events',
    date: 'May 30, 2026',
    image: '/images/hero-noodles-background.jpg',
  },
  {
    title: 'How to Choose the Right Oyster Sauce for Your Menu',
    date: 'May 12, 2026',
    image: '/images/hero-ingredients-background.jpg',
  },
]

const TABLE_ROWS = [
  {
    event: 'Commercial / Lunch boxes',
    sauce: 'Broad-appeal sauces: Chinese, Malay, and Western options',
    reason: 'Multiple cultural options needed to serve diverse office worker demographics',
  },
  {
    event: 'Wedding / Premium event',
    sauce: 'Chilli sauces, sweet and sour sauces, oyster sauce (premium grade)',
    reason: 'Higher price point allows premium grades; oyster sauce adds perceived value and richness',
  },
  {
    event: 'Community event / family',
    sauce: 'Sweet and sour, sambal, chilli paste',
    reason: 'Familiar and nostalgic flavours; sambal is a crowd-pleaser for Singapore community events',
  },
]

const FAQS = [
  {
    q: 'What sauces should a Singapore catering business always have in stock?',
    a: "At minimum, a catering kitchen should stock: light soya sauce, dark soya sauce, oyster sauce, sambal belacan (or seafood belacan paste), and sesame oil. These cover the majority of Chinese, Malay, and multi-cultural Singapore menus. A sweet chilli sauce and thick soya sauce round out the essentials for rice boxes and noodle dishes.",
  },
  {
    q: 'Why do caterers prefer thick soya sauce for buffet lines?',
    a: 'Thick soya sauce has a lower water content and caramelises better under heat. For buffet lines where dishes sit in chafing dishes for extended periods, thick soya helps maintain colour and flavour consistency — unlike light soya, which can evaporate or taste diluted over time.',
  },
  {
    q: 'Can the same sambal be used for cooking and as a condiment?',
    a: "It depends on the formulation. Master 2's Seafood Belacan Paste is designed for cooking — it's robust enough to survive high heat without losing its belacan character. For table condiment use, it's best served alongside rice or as a dipping paste, but caterers often dilute it slightly with lime juice and sugar to create a table sambal. We recommend testing with your chef before serving uncooked.",
  },
]

export default async function BestSaucesCateringPage({ params }: PageProps) {
  const { locale } = await params

  return (
    <div style={{ backgroundColor: '#FFF7DE' }} className="min-h-screen pt-20">

      {/* Breadcrumb */}
      <div className="container-pad py-4">
        <nav className="text-xs font-body text-text-muted flex items-center gap-1.5 flex-wrap">
          <Link href={`/${locale}`} className="hover:text-primary transition-colors">Home</Link>
          <span>›</span>
          <Link href={`/${locale}/blog`} className="hover:text-primary transition-colors">Blog</Link>
          <span>›</span>
          <span className="text-text-secondary">Guides</span>
          <span>›</span>
          <span className="text-text-secondary truncate max-w-[200px] sm:max-w-none">
            Best & Most Commonly Used Sauces for Catering Businesses
          </span>
        </nav>
      </div>

      {/* Hero */}
      <div className="bg-white border-b border-border-color">
        <div className="container-pad py-8 md:py-12">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">

            {/* Left — title + author */}
            <div className="flex-1 min-w-0">
              <span className="inline-block text-xs font-subheading not-italic uppercase tracking-wider text-primary bg-primary/10 rounded-full px-3 py-1 mb-4">
                Guides
              </span>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading text-text-primary leading-tight mb-3">
                Best & Most Commonly Used Sauces for Catering Businesses (Singapore Edition)
              </h1>
              <p className="text-text-secondary font-body text-base md:text-lg leading-relaxed mb-6">
                A must-have list of sauces every catering kitchen should keep in stock
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-body text-text-secondary">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold shrink-0">
                    M2
                  </div>
                  <span className="font-medium text-text-primary">Master 2 Team</span>
                </div>
                <span className="text-text-muted">·</span>
                <span>4 min read</span>
                <span className="text-text-muted">·</span>
                <span>June 14, 2026</span>
              </div>
            </div>

            {/* Right — hero image */}
            <div className="w-full md:w-72 lg:w-80 shrink-0">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-surface">
                <Image
                  src="/images/hero-sauces-background.jpg"
                  alt="Catering sauces"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 320px"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Two-column body */}
      <div className="container-pad py-10">
        <div className="flex gap-8 xl:gap-12 items-start">

          {/* ── Main article ── */}
          <article className="flex-1 min-w-0">

            {/* Intro */}
            <p className="text-base font-body text-text-secondary leading-relaxed mb-10">
              Running a successful food catering business in Singapore is all about speed and consistency.
              Unlike a restaurant where dishes are served immediately, a commercial catering operation needs food
              that can withstand transport, hold quality during service, and impress guests — all at once.
              A well-stocked sauce inventory is the backbone of this. Choosing the right sauces for your catering
              kitchen means considering volume, shelf stability, versatility, and the cultural preferences of
              Singapore's diverse dining population.
            </p>

            {/* Section 1 — Heritage Sauces */}
            <section id="heritage-sauces" className="mb-10 scroll-mt-24">
              <h2 className="text-xl md:text-2xl font-heading text-text-primary mb-4">
                Local Heritage Sauces &amp; Cooking Pastes
              </h2>
              <p className="text-base font-body text-text-secondary leading-relaxed mb-6">
                These are the unmistakable foundations of Singaporean cuisine. From hawker stalls to hotel banquets,
                sambal belacan and belacan-based pastes are essential for authentic local depth. A catering kitchen
                that serves Singaporean menus will go through these at high volumes — especially for Malay-style rice
                dishes, seafood sets, and local buffet spreads.
              </p>

              {/* 3 inline product images */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
                {[
                  { img: '/images/products/light-soya-sauce-standard.png', label: 'Light Soya Sauce' },
                  { img: '/images/products/seafood-belacan-paste-standard.png', label: 'Sambal Belacan Paste' },
                  { img: '/images/products/seafood-xo-paste-standard.png', label: 'Seafood XO Paste' },
                ].map((p) => (
                  <div key={p.label} className="flex flex-col items-center gap-2">
                    <div className="relative w-full aspect-square bg-white rounded-xl border border-border-color overflow-hidden">
                      <Image src={p.img} alt={p.label} fill className="object-contain p-3 sm:p-4" sizes="200px" />
                    </div>
                    <span className="text-xs font-subheading not-italic text-text-secondary text-center leading-snug">
                      {p.label}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-base font-body text-text-secondary leading-relaxed">
                Soy Sauce (Light &amp; Dark): The Cornerstone of Asian Cooking. Light soy sauce is essential for basic
                seasoning, marinating, and simple dipping dressings (such as for steamed chicken or dim sum). Dark soy
                sauce delivers a deep, glossy colour and a mildly sweet flavour — perfect for braised dishes,
                wok-fried noodles, and rich sauces.
              </p>
            </section>

            {/* Section 2 — Soy Sauces */}
            <section id="soy-sauces" className="mb-10 scroll-mt-24">
              <h2 className="text-xl md:text-2xl font-heading text-text-primary mb-4">
                Soy Sauces: Light &amp; Dark
              </h2>
              <p className="text-base font-body text-text-secondary leading-relaxed mb-6">
                Soy sauce is the most universally used sauce across all Asian cuisines. For a Singapore catering
                kitchen, stocking both light and dark soya sauce in bulk is non-negotiable. Light soya sauce is your
                go-to for seasoning and finishing, while dark soya sauce is essential for colour and depth in braised
                meats, fried rice, and noodles.
              </p>
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {[
                  { img: '/images/products/light-soya-sauce-standard.png', label: 'Light Soya Sauce — Standard' },
                  { img: '/images/products/dark-soya-sauce-standard.png', label: 'Dark Soya Sauce — Standard' },
                  { img: '/images/products/oyster-sauce-standard.png', label: 'Oyster Sauce — Standard' },
                ].map((p) => (
                  <div key={p.label} className="flex flex-col items-center gap-2">
                    <div className="relative w-full aspect-square bg-white rounded-xl border border-border-color overflow-hidden">
                      <Image src={p.img} alt={p.label} fill className="object-contain p-3 sm:p-4" sizes="200px" />
                    </div>
                    <span className="text-xs font-subheading not-italic text-text-secondary text-center leading-snug">
                      {p.label}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 3 — Everyday Condiments */}
            <section id="everyday-condiments" className="mb-10 scroll-mt-24">
              <h2 className="text-xl md:text-2xl font-heading text-text-primary mb-4">
                Everyday Multi-Purpose Condiments
              </h2>
              <p className="text-base font-body text-text-secondary leading-relaxed">
                Beyond soy and sambal, a well-stocked Singapore catering kitchen should always have oyster sauce,
                sesame oil, and hoisin sauce as core condiments. Oyster sauce adds a savoury-sweet umami layer to
                stir-fries and braises. Sesame oil works as a finishing drizzle for cold dishes, noodles, and soups.
                Hoisin sauce is essential for Peking duck wrappers, char siu marinades, and northern Chinese-inspired
                dishes that regularly appear on local buffet menus.
              </p>
            </section>

            {/* Section 4 — Table */}
            <section id="sauce-event-guide" className="mb-10 scroll-mt-24">
              <h2 className="text-xl md:text-2xl font-heading text-text-primary mb-3">
                Matching Sauce Categories to Event Type
              </h2>
              <p className="text-base font-body text-text-secondary leading-relaxed mb-5">
                Singapore's catering landscape spans corporate lunch boxes, wedding banquets, and community events.
                Each context has different expectations — and different sauce priorities.
              </p>
              <div className="overflow-x-auto rounded-xl border border-border-color">
                <table className="w-full text-sm font-body min-w-[480px]">
                  <thead>
                    <tr className="bg-primary text-white">
                      <th className="text-left px-4 py-3 font-subheading not-italic whitespace-nowrap">Event Type</th>
                      <th className="text-left px-4 py-3 font-subheading not-italic">Priority Sauce Category</th>
                      <th className="text-left px-4 py-3 font-subheading not-italic">Primary Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TABLE_ROWS.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-surface'}>
                        <td className="px-4 py-3 font-medium text-text-primary align-top whitespace-nowrap">{row.event}</td>
                        <td className="px-4 py-3 text-text-secondary align-top">{row.sauce}</td>
                        <td className="px-4 py-3 text-text-secondary align-top">{row.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 5 — FAQ */}
            <section id="faq" className="mb-10 scroll-mt-24">
              <h2 className="text-xl md:text-2xl font-heading text-text-primary mb-5">
                Frequently Asked Question
              </h2>
              <div className="border border-border-color rounded-xl overflow-hidden bg-white">
                <Accordion type="multiple">
                  {FAQS.map((faq, i) => (
                    <AccordionItem key={i} value={`faq-${i}`}>
                      <AccordionTrigger className="px-5 text-sm font-subheading not-italic font-semibold text-text-primary hover:no-underline hover:text-primary">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="px-5">
                        <p className="text-sm font-body text-text-secondary leading-relaxed">{faq.a}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </section>

          </article>

          {/* ── Sticky sidebar ── */}
          <aside className="hidden lg:block w-72 xl:w-80 shrink-0">
            <div className="sticky top-24 flex flex-col gap-4">

              {/* In this guide — TOC */}
              <div className="bg-white rounded-xl border border-border-color p-5">
                <p className="text-xs font-subheading not-italic uppercase tracking-wider text-text-muted mb-3">
                  In this guide
                </p>
                <ul className="flex flex-col gap-2.5">
                  {TOC.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="text-sm font-body text-text-secondary hover:text-primary transition-colors leading-snug block"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Find perfect product */}
              <div className="bg-white rounded-xl border border-border-color p-5">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs font-subheading not-italic uppercase tracking-wider text-text-muted">
                    Find perfect product
                  </p>
                  <Link
                    href={`/${locale}/products`}
                    className="text-primary hover:text-primary/70 transition-colors"
                    aria-label="View all products"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
                <div className="flex flex-col gap-3">
                  {SIDEBAR_PRODUCTS.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/${locale}/products?q=${encodeURIComponent(p.name)}`}
                      className="flex items-center gap-3 group"
                    >
                      <div className="relative w-12 h-12 shrink-0 bg-surface rounded-lg border border-border-color overflow-hidden">
                        <Image src={p.image} alt={p.name} fill className="object-contain p-1" sizes="48px" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-ui font-medium text-text-primary group-hover:text-primary transition-colors leading-tight">
                          {p.name}
                        </p>
                        <p className="text-xs text-text-muted">{p.grade}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Related Guides */}
              <div className="bg-white rounded-xl border border-border-color p-5">
                <p className="text-xs font-subheading not-italic uppercase tracking-wider text-text-muted mb-4">
                  Related Guides
                </p>
                <div className="flex flex-col gap-4">
                  {RELATED_GUIDES.map((g) => (
                    <div key={g.title} className="flex gap-3">
                      <div className="relative w-14 h-14 shrink-0 rounded-lg overflow-hidden bg-surface border border-border-color">
                        <Image src={g.image} alt={g.title} fill className="object-cover" sizes="56px" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-ui font-medium text-text-primary leading-snug line-clamp-2 mb-1">
                          {g.title}
                        </p>
                        <p className="text-xs text-text-muted">{g.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </aside>

        </div>
      </div>
    </div>
  )
}
