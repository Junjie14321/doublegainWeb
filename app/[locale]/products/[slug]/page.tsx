import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { getProductBySlug, getProductsByCategory, products } from '@/lib/data/products'
import { productInquiryLink, sampleRequestLink } from '@/lib/whatsapp'
import type { Locale } from '@/lib/i18n/config'

export const revalidate = 3600

interface PageProps {
  params: Promise<{ locale: Locale; slug: string }>
}

export async function generateStaticParams() {
  return products.flatMap((product) => [
    { locale: 'en', slug: product.slug },
    { locale: 'zh', slug: product.slug },
  ])
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    return { title: 'Product Not Found' }
  }

  const name = product.name[locale] ?? product.name.en
  const description = product.shortDescription?.[locale] ?? product.shortDescription?.en ?? ''

  return {
    title: name,
    description,
    openGraph: {
      title: `${name} | Master 2`,
      description,
      ...(product.image ? { images: [product.image] } : {}),
    },
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { locale, slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const dict = getDictionary(locale)
  const name = product.name[locale] ?? product.name.en
  const packagingDisplay = product.unitSize ?? product.packagingSize ?? product.packaging?.[locale]
  const caseDisplay = product.caseQuantity

  const relatedProducts = product.category
    ? getProductsByCategory(product.category).filter((p) => p.id !== product.id).slice(0, 4)
    : []

  return (
    <div style={{ backgroundColor: '#FFF7DE' }} className="min-h-screen pt-20 pb-8">
      <div className="container-pad">
        {/* Back link */}
        <Link
          href={`/${locale}/products`}
          className="inline-flex items-center gap-2 text-sm font-ui text-text-muted hover:text-primary transition-colors mb-6"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {dict.productDetail.backToProducts}
        </Link>

        {/* Product detail card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-12">
          <div className="flex flex-col sm:flex-row">
            {/* Image */}
            <div className="sm:w-72 shrink-0 bg-surface flex items-center justify-center p-8">
              <div className="relative w-full aspect-square max-w-[240px]">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={name}
                    fill
                    className="object-contain"
                    sizes="240px"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-text-muted">
                    <svg className="w-20 h-20 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 p-6 md:p-8">
              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="flex gap-2 mb-3">
                  {product.tags.map((tag) => (
                    <span key={tag} className={`text-[10px] font-ui font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${
                      tag === 'best-seller' ? 'bg-primary/10 text-primary' :
                      tag === 'specialty' ? 'bg-secondary/20 text-dark' :
                      'bg-green-50 text-green-700'
                    }`}>
                      {dict.products.tags[tag as keyof typeof dict.products.tags] ?? tag}
                    </span>
                  ))}
                </div>
              )}

              <h1 className="text-2xl md:text-3xl font-heading text-text-primary mb-1">{name}</h1>
              {product.sku && (
                <p className="text-xs text-text-muted mb-4">{dict.productDetail.sku}: {product.sku}</p>
              )}

              {/* Detail rows */}
              <div className="border-t border-border-color mt-4">
                {packagingDisplay && (
                  <div className="flex gap-3 py-3 border-b border-border-color">
                    <span className="text-xs font-ui font-semibold text-text-muted uppercase tracking-wide w-32 shrink-0">{dict.productDetail.packaging}</span>
                    <span className="text-sm text-text-secondary">{caseDisplay ? `${packagingDisplay} · ${caseDisplay}` : packagingDisplay}</span>
                  </div>
                )}
                {product.ingredients?.[locale] && (
                  <div className="flex gap-3 py-3 border-b border-border-color">
                    <span className="text-xs font-ui font-semibold text-text-muted uppercase tracking-wide w-32 shrink-0">{dict.productDetail.ingredients}</span>
                    <span className="text-sm text-text-secondary leading-relaxed">{product.ingredients[locale]}</span>
                  </div>
                )}
                {product.suggestedUses?.[locale] && (
                  <div className="flex gap-3 py-3 border-b border-border-color last:border-0">
                    <span className="text-xs font-ui font-semibold text-text-muted uppercase tracking-wide w-32 shrink-0">{dict.productDetail.suggestedUses}</span>
                    <span className="text-sm text-text-secondary leading-relaxed">{product.suggestedUses[locale]}</span>
                  </div>
                )}
              </div>

              {/* CTAs */}
              <div className="flex gap-3 mt-6">
                <a
                  href={productInquiryLink(name, locale)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center text-sm font-ui font-semibold bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary-dark transition-colors"
                >
                  {dict.productDetail.addToOrder}
                </a>
                <a
                  href={sampleRequestLink(name, locale)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center text-sm font-ui font-semibold bg-surface text-text-primary border border-border-color py-3 px-4 rounded-lg hover:border-primary/30 hover:bg-white transition-colors"
                >
                  {dict.productDetail.askForSample}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-xl font-heading text-primary mb-6">{dict.productDetail.relatedProducts}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {relatedProducts.map((p) => (
                <Link
                  key={p.id}
                  href={`/${locale}/products/${p.slug}`}
                  className="bg-white rounded-xl overflow-hidden border border-border-color hover:border-primary/20 hover:shadow-md transition-all group"
                >
                  <div className="relative aspect-square bg-surface">
                    {p.image ? (
                      <Image src={p.image} alt={p.name[locale] ?? p.name.en} fill className="object-contain p-4" sizes="200px" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-text-muted">
                        <svg className="w-10 h-10 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-ui font-medium text-text-primary line-clamp-2 group-hover:text-primary transition-colors">
                      {p.name[locale] ?? p.name.en}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
