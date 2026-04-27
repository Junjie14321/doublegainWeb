import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ProductGrid } from '@/components/product-grid'
import { ProductSchema } from '@/components/structured-data'
import { getDictionary } from '@/lib/i18n/get-dictionary'
import { getProductBySlug, getProductsByCategory, products } from '@/lib/data/products'
import { generateWhatsAppLink } from '@/lib/whatsapp'
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

  const name = product.name[locale]
  const description = product.description[locale]

  return {
    title: name,
    description,
    openGraph: {
      title: `${name} | Master 2`,
      description,
      images: [product.image],
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
  const name = product.name[locale]
  const description = product.description[locale]

  const whatsappLink = generateWhatsAppLink({
    intent: 'product-inquiry',
    productName: name,
    locale,
  })

  // Get related products from the same category
  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 3)

  return (
    <>
      <ProductSchema product={product} locale={locale} />
      <div className="py-12">
        <div className="container mx-auto px-4">
          {/* Back Link */}
          <Link
            href={`/${locale}/products`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {dict.product.backToProducts}
          </Link>

          {/* Product Detail */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Image */}
            <div className="relative aspect-square bg-muted rounded-xl overflow-hidden">
              <Image
                src={product.image}
                alt={name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={tag === 'premium' ? 'default' : 'secondary'}
                      className={
                        tag === 'premium'
                          ? 'bg-secondary text-secondary-foreground'
                          : 'bg-primary text-primary-foreground'
                      }
                    >
                      {tag === 'best-seller' ? dict.product.bestSeller : dict.product.premium}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
                  {dict.categories[product.category].name}
                </p>
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                  {name}
                </h1>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {description}
              </p>

              {/* CTA */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button size="lg" className="gap-2">
                  <MessageCircle className="h-5 w-5" />
                  {dict.product.inquire}
                </Button>
              </a>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-8">
                {dict.product.relatedProducts}
              </h2>
              <ProductGrid products={relatedProducts} locale={locale} dict={dict} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
