import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { generateWhatsAppLink } from '@/lib/whatsapp'
import type { Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/dictionaries/en'

interface CTASectionProps {
  locale: Locale
  dict: Dictionary
}

export function CTASection({ locale, dict }: CTASectionProps) {
  const whatsappLink = generateWhatsAppLink({
    intent: 'price-list',
    locale,
  })

  return (
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            {dict.cta.title}
          </h2>
          <p className="text-lg text-muted-foreground">{dict.cta.description}</p>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="gap-2 mt-4">
              <MessageCircle className="h-5 w-5" />
              {dict.cta.button}
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
