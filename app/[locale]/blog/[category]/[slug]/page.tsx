import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getArticleBySlug, getArticleSlugs } from '@/lib/sanity/articles'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import type { Locale } from '@/lib/i18n/config'
import type {
  ArticleContentBlock,
  ArticleTextBlock,
  ArticleSectionBlock,
  ArticleProductGridBlock,
  ArticleTableBlock,
  ArticleFaqBlock,
} from '@/lib/sanity/types'

export const revalidate = 3600

interface PageProps {
  params: Promise<{ locale: Locale; category: string; slug: string }>
}

export async function generateStaticParams() {
  const articles = await getArticleSlugs()
  return articles.flatMap(({ category, slug }) => [
    { locale: 'en', category, slug },
    { locale: 'zh', category, slug },
  ])
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) return { title: 'Article Not Found' }

  const title = article.title?.[locale] ?? article.title?.en ?? ''
  const description = article.subtitle?.[locale] ?? article.subtitle?.en ?? ''

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Master 2 Blog`,
      description,
      ...(article.heroImage ? { images: [article.heroImage] } : {}),
    },
  }
}

function toAnchorId(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/, '')
}

const CATEGORY_LABEL: Record<string, string> = {
  guides: 'Guides',
  tips: 'Tips',
  news: 'News',
}

// ── Block renderers ──────────────────────────────────────────────────────────

function TextBlock({ block, locale }: { block: ArticleTextBlock; locale: Locale }) {
  const text = block.body?.[locale] ?? block.body?.en
  if (!text) return null
  return (
    <p className="text-base font-body text-text-secondary leading-relaxed mb-8">{text}</p>
  )
}

function SectionBlock({ block, locale }: { block: ArticleSectionBlock; locale: Locale }) {
  const heading = block.heading?.[locale] ?? block.heading?.en ?? ''
  const body = block.body?.[locale] ?? block.body?.en

  return (
    <section id={toAnchorId(heading)} className="mb-10 scroll-mt-24">
      {heading && (
        <h2 className="text-xl md:text-2xl font-heading text-text-primary mb-4">{heading}</h2>
      )}
      {body && (
        <p className="text-base font-body text-text-secondary leading-relaxed">{body}</p>
      )}
    </section>
  )
}

function ProductGridBlock({ block, locale }: { block: ArticleProductGridBlock; locale: Locale }) {
  const items = block.items ?? []
  if (items.length === 0) return null

  const cols = items.length === 1 ? 'grid-cols-1 max-w-[200px]' : items.length === 2 ? 'grid-cols-2' : 'grid-cols-3'

  return (
    <div className={`grid ${cols} gap-3 sm:gap-4 mb-8`}>
      {items.map((item, i) => {
        const product = item.product
        const label = item.label?.[locale] ?? item.label?.en ?? product?.name?.[locale] ?? product?.name?.en ?? ''
        const image = product?.image
        return (
          <div key={i} className="flex flex-col items-center gap-2">
            <div className="relative w-full aspect-square bg-white rounded-xl border border-border-color overflow-hidden">
              {image ? (
                <Image src={image} alt={label} fill className="object-contain p-3 sm:p-4" sizes="200px" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-text-muted">
                  <svg className="w-10 h-10 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>
            {label && (
              <span className="text-xs font-subheading not-italic text-text-secondary text-center leading-snug">
                {label}
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}

function TableBlock({ block }: { block: ArticleTableBlock }) {
  const { heading, columns = [], rows = [] } = block
  if (columns.length === 0) return null

  return (
    <div className="mb-10">
      {heading && (
        <h3 className="text-lg font-heading text-text-primary mb-3">{heading}</h3>
      )}
      <div className="overflow-x-auto rounded-xl border border-border-color">
        <table className="w-full text-sm font-body" style={{ minWidth: `${columns.length * 160}px` }}>
          <thead>
            <tr className="bg-primary text-white">
              {columns.map((col, i) => (
                <th key={i} className="text-left px-4 py-3 font-subheading not-italic whitespace-nowrap">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-surface'}>
                {columns.map((_, j) => (
                  <td key={j} className="px-4 py-3 text-text-secondary align-top">
                    {row.cells?.[j] ?? ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function FaqBlock({ block, locale }: { block: ArticleFaqBlock; locale: Locale }) {
  const items = block.items ?? []
  if (items.length === 0) return null

  return (
    <div className="mb-10">
      <h2 className="text-xl md:text-2xl font-heading text-text-primary mb-5">
        Frequently Asked Questions
      </h2>
      <div className="border border-border-color rounded-xl overflow-hidden bg-white">
        <Accordion type="multiple">
          {items.map((faq, i) => {
            const question = faq.question?.[locale] ?? faq.question?.en ?? ''
            const answer = faq.answer?.[locale] ?? faq.answer?.en ?? ''
            return (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="px-5 text-sm font-subheading not-italic font-semibold text-text-primary hover:no-underline hover:text-primary">
                  {question}
                </AccordionTrigger>
                <AccordionContent className="px-5">
                  <p className="text-sm font-body text-text-secondary leading-relaxed">{answer}</p>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>
    </div>
  )
}

function renderBlock(block: ArticleContentBlock, locale: Locale, index: number) {
  switch (block._type) {
    case 'articleTextBlock':
      return <TextBlock key={index} block={block} locale={locale} />
    case 'articleSectionBlock':
      return <SectionBlock key={index} block={block} locale={locale} />
    case 'articleProductGridBlock':
      return <ProductGridBlock key={index} block={block} locale={locale} />
    case 'articleTableBlock':
      return <TableBlock key={index} block={block} />
    case 'articleFaqBlock':
      return <FaqBlock key={index} block={block} locale={locale} />
    default:
      return null
  }
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function ArticlePage({ params }: PageProps) {
  const { locale, slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) notFound()

  const title = article.title?.[locale] ?? article.title?.en ?? ''
  const subtitle = article.subtitle?.[locale] ?? article.subtitle?.en ?? ''
  const categoryLabel = CATEGORY_LABEL[article.category] ?? article.category
  const content = article.content ?? []

  // Auto-derive TOC from section blocks
  const tocItems = content
    .filter((b): b is ArticleSectionBlock => b._type === 'articleSectionBlock')
    .map((b) => {
      const label = b.heading?.[locale] ?? b.heading?.en ?? ''
      return { id: toAnchorId(label), label }
    })
    .filter((t) => t.label)

  const hasSidebarProducts = (article.sidebarProducts?.length ?? 0) > 0
  const hasRelatedArticles = (article.relatedArticles?.length ?? 0) > 0
  const hasSidebar = tocItems.length > 0 || hasSidebarProducts || hasRelatedArticles

  return (
    <div style={{ backgroundColor: '#FFF7DE' }} className="min-h-screen pt-20">

      {/* Breadcrumb */}
      <div className="container-pad py-4">
        <nav className="text-xs font-body text-text-muted flex items-center gap-1.5 flex-wrap">
          <Link href={`/${locale}`} className="hover:text-primary transition-colors">Home</Link>
          <span>›</span>
          <Link href={`/${locale}/blog`} className="hover:text-primary transition-colors">Blog</Link>
          <span>›</span>
          <span className="text-text-secondary">{categoryLabel}</span>
          <span>›</span>
          <span className="text-text-secondary truncate max-w-[200px] sm:max-w-xs">{title}</span>
        </nav>
      </div>

      {/* Hero */}
      <div className="bg-white border-b border-border-color">
        <div className="container-pad py-8 md:py-12">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
            <div className="flex-1 min-w-0">
              <span className="inline-block text-xs font-subheading not-italic uppercase tracking-wider text-primary bg-primary/10 rounded-full px-3 py-1 mb-4">
                {categoryLabel}
              </span>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading text-text-primary leading-tight mb-3">
                {title}
              </h1>
              {subtitle && (
                <p className="text-text-secondary font-body text-base md:text-lg leading-relaxed mb-6">
                  {subtitle}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-body text-text-secondary">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold shrink-0">
                    M2
                  </div>
                  <span className="font-medium text-text-primary">{article.author ?? 'Master 2 Team'}</span>
                </div>
                {article.readTime && (
                  <>
                    <span className="text-text-muted">·</span>
                    <span>{article.readTime} min read</span>
                  </>
                )}
                {article.publishedAt && (
                  <>
                    <span className="text-text-muted">·</span>
                    <span>{article.publishedAt}</span>
                  </>
                )}
              </div>
            </div>

            {article.heroImage && (
              <div className="w-full md:w-72 lg:w-80 shrink-0">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-surface">
                  <Image
                    src={article.heroImage}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 320px"
                    priority
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Two-column body */}
      <div className="container-pad py-10">
        <div className="flex gap-8 xl:gap-12 items-start">

          {/* Article content */}
          <article className="flex-1 min-w-0">
            {content.map((block, i) => renderBlock(block, locale, i))}
          </article>

          {/* Sticky sidebar — only rendered when there's something to show */}
          {hasSidebar && (
            <aside className="hidden lg:block w-72 xl:w-80 shrink-0">
              <div className="sticky top-24 flex flex-col gap-4">

                {/* In this guide — TOC */}
                {tocItems.length > 0 && (
                  <div className="bg-white rounded-xl border border-border-color p-5">
                    <p className="text-xs font-subheading not-italic uppercase tracking-wider text-text-muted mb-3">
                      In this guide
                    </p>
                    <ul className="flex flex-col gap-2.5">
                      {tocItems.map((item) => (
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
                )}

                {/* Find perfect product */}
                {hasSidebarProducts && (
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
                      {article.sidebarProducts!.map((p) => {
                        const name = p.name[locale] ?? p.name.en
                        return (
                          <Link
                            key={p.id}
                            href={`/${locale}/products?q=${encodeURIComponent(p.name.en)}`}
                            className="flex items-center gap-3 group"
                          >
                            <div className="relative w-12 h-12 shrink-0 bg-surface rounded-lg border border-border-color overflow-hidden">
                              {p.image ? (
                                <Image src={p.image} alt={name} fill className="object-contain p-1" sizes="48px" />
                              ) : (
                                <div className="absolute inset-0 bg-surface" />
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-ui font-medium text-text-primary group-hover:text-primary transition-colors leading-tight">
                                {name}
                              </p>
                              {p.grade && <p className="text-xs text-text-muted capitalize">{p.grade}</p>}
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Related articles */}
                {hasRelatedArticles && (
                  <div className="bg-white rounded-xl border border-border-color p-5">
                    <p className="text-xs font-subheading not-italic uppercase tracking-wider text-text-muted mb-4">
                      Related Guides
                    </p>
                    <div className="flex flex-col gap-4">
                      {article.relatedArticles!.map((related) => {
                        const relTitle = related.title?.[locale] ?? related.title?.en ?? ''
                        return (
                          <Link
                            key={related.id}
                            href={`/${locale}/blog/${related.category}/${related.slug}`}
                            className="flex gap-3 group"
                          >
                            <div className="relative w-14 h-14 shrink-0 rounded-lg overflow-hidden bg-surface border border-border-color">
                              {related.heroImage ? (
                                <Image src={related.heroImage} alt={relTitle} fill className="object-cover" sizes="56px" />
                              ) : (
                                <div className="absolute inset-0 bg-surface" />
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-ui font-medium text-text-primary group-hover:text-primary transition-colors leading-snug line-clamp-2 mb-1">
                                {relTitle}
                              </p>
                              {related.publishedAt && (
                                <p className="text-xs text-text-muted">{related.publishedAt}</p>
                              )}
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                )}

              </div>
            </aside>
          )}

        </div>
      </div>
    </div>
  )
}
