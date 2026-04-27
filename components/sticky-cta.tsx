'use client'

import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { generateWhatsAppLink } from '@/lib/whatsapp'
import type { Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/dictionaries/en'

interface StickyCTAProps {
  locale: Locale
  dict: Dictionary
}

export function StickyCTA({ locale, dict }: StickyCTAProps) {
  const whatsappLink = generateWhatsAppLink({
    intent: 'price-list',
    locale,
  })

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50"
    >
      <Button
        size="lg"
        className="bg-[#25D366] hover:bg-[#128C7E] text-white shadow-lg gap-2 rounded-full px-6"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="hidden sm:inline">{dict.cta.button}</span>
      </Button>
    </a>
  )
}
