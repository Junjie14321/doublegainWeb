'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MessageCircle, Plus, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { generateWhatsAppLink } from '@/lib/whatsapp'
import { useCart } from '@/context/cart-context'
import type { Product } from '@/lib/data/products'
import type { Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/dictionaries/en'

interface ProductCardProps {
  product: Product
  locale: Locale
  dict: Dictionary
}

export function ProductCard({ product, locale, dict }: ProductCardProps) {
  const { addItem, removeItem, isInCart } = useCart()
  const name = product.name[locale]
  const description = product.description[locale]
  const inCart = isInCart(product.id)

  const whatsappLink = generateWhatsAppLink({
    intent: 'product-inquiry',
    productName: name,
    locale,
  })

  const handleCartToggle = () => {
    if (inCart) {
      removeItem(product.id)
    } else {
      addItem(product)
    }
  }

  return (
    <div className="group bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-all duration-300">
      {/* Image */}
      <Link href={`/${locale}/products/${product.slug}`} className="block relative aspect-square overflow-hidden bg-muted">
        <Image
          src={product.image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {product.tags && product.tags.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-1">
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
      </Link>

      {/* Content */}
      <div className="p-4 space-y-3">
        <Link href={`/${locale}/products/${product.slug}`}>
          <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          {/* Add to inquiry list */}
          <Button
            size="sm"
            variant={inCart ? 'default' : 'outline'}
            className={`flex-1 gap-2 transition-colors ${
              inCart
                ? 'bg-green-600 hover:bg-green-700 text-white border-green-600'
                : ''
            }`}
            onClick={handleCartToggle}
          >
            {inCart ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {inCart ? dict.cart.added : dict.cart.addToList}
          </Button>

          {/* Direct WhatsApp inquiry */}
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <Button size="sm" variant="ghost" className="gap-1 px-3 text-muted-foreground hover:text-primary">
              <MessageCircle className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  )
}
