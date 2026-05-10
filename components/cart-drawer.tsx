'use client'

import { useState, useEffect } from 'react'
import { ShoppingBasket, X, Plus, Minus, Trash2, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { useCart } from '@/context/cart-context'
import { generateCartWhatsAppLink, generateWhatsAppLink } from '@/lib/whatsapp'
import type { Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/dictionaries/en'

interface CartDrawerProps {
  locale: Locale
  dict: Dictionary
}

export function CartDrawer({ locale, dict }: CartDrawerProps) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { items, removeItem, updateQuantity, clearCart, itemCount } = useCart()

  useEffect(() => { setMounted(true) }, [])

  if (!mounted) return null

  const handleRequestQuote = () => {
    const link = generateCartWhatsAppLink({
      items: items.map(i => ({
        name: i.product.name,
        packagingSize: i.product.packagingSize,
        quantity: i.quantity,
      })),
      intent: 'quote',
      locale,
    })
    window.open(link, '_blank')
  }

  const handleRequestSample = () => {
    const link = generateCartWhatsAppLink({
      items: items.map(i => ({
        name: i.product.name,
        packagingSize: i.product.packagingSize,
        quantity: i.quantity,
      })),
      intent: 'sample',
      locale,
    })
    window.open(link, '_blank')
  }

  const handlePriceList = () => {
    const link = generateWhatsAppLink({ intent: 'price-list', locale })
    window.open(link, '_blank')
  }

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-primary text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors"
        aria-label={dict.cart.title}
      >
        <ShoppingBasket className="h-6 w-6" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </button>

      {/* Drawer */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md flex flex-col p-0">
          {/* Header */}
          <SheetHeader className="px-6 py-4 border-b">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-lg font-semibold">
                {dict.cart.title}
                {itemCount > 0 && (
                  <span className="ml-2 text-sm font-normal text-muted-foreground">
                    ({itemCount} {dict.cart.items})
                  </span>
                )}
              </SheetTitle>
              {itemCount > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1 transition-colors"
                >
                  <Trash2 className="h-3 w-3" />
                  {dict.cart.clearAll}
                </button>
              )}
            </div>
          </SheetHeader>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {itemCount === 0 ? (
              /* Empty state */
              <div className="h-full flex flex-col items-center justify-center text-center gap-3 py-16">
                <ShoppingBasket className="h-12 w-12 text-muted-foreground/40" />
                <p className="font-medium text-foreground">{dict.cart.empty}</p>
                <p className="text-sm text-muted-foreground max-w-xs">{dict.cart.emptyHint}</p>
              </div>
            ) : (
              /* Item list */
              <ul className="space-y-4">
                {items.map(({ product, quantity }) => {
                  const name = product.name[locale]
                  return (
                    <li key={product.id} className="flex gap-3">
                      {/* Product info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm leading-snug line-clamp-2">{name}</p>
                        {product.packagingSize && (
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {product.packagingSize}
                          </p>
                        )}
                        {/* Quantity controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="w-6 h-6 rounded border flex items-center justify-center hover:bg-muted transition-colors"
                            disabled={quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-sm w-6 text-center">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="w-6 h-6 rounded border flex items-center justify-center hover:bg-muted transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                      {/* Remove */}
                      <button
                        onClick={() => removeItem(product.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0 mt-0.5"
                        aria-label={dict.cart.remove}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          {/* Footer CTAs */}
          <div className="px-6 py-4 border-t space-y-2">
            {itemCount === 0 ? (
              <Button
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white gap-2"
                onClick={handlePriceList}
              >
                <MessageCircle className="h-4 w-4" />
                {dict.cart.requestPriceList}
              </Button>
            ) : (
              <>
                <Button
                  className="w-full bg-primary hover:bg-primary/90 gap-2"
                  onClick={handleRequestQuote}
                >
                  <MessageCircle className="h-4 w-4" />
                  {dict.cart.requestQuote}
                </Button>
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={handleRequestSample}
                >
                  <MessageCircle className="h-4 w-4" />
                  {dict.cart.requestSample}
                </Button>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
