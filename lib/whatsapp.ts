import { SITE, WHATSAPP_BASE } from '@/lib/constants/site'

function buildWhatsAppLink(message: string): string {
  return `${WHATSAPP_BASE}${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export function priceListLink(locale: 'en' | 'zh'): string {
  const msg =
    locale === 'zh'
      ? '您好，我想索取Master 2 Foods的产品价目表。'
      : "Hi, I'd like to request your price list for Master 2 Foods products."
  return buildWhatsAppLink(msg)
}

export function productInquiryLink(productName: string, locale: 'en' | 'zh'): string {
  const msg =
    locale === 'zh'
      ? `您好，我对您的${productName}感兴趣，想了解更多关于定价和供货情况。`
      : `Hi, I'm interested in your ${productName}. I'd like to know more about pricing and availability.`
  return buildWhatsAppLink(msg)
}

export function sampleRequestLink(productName: string, locale: 'en' | 'zh'): string {
  const msg =
    locale === 'zh'
      ? `您好，我想申请您的${productName}样品，请告知后续步骤。`
      : `Hi, I'd like to request a sample of your ${productName}. Please let me know the next steps.`
  return buildWhatsAppLink(msg)
}

export function savedListLink(productNames: string[], locale: 'en' | 'zh'): string {
  const list = productNames.map((p) => `• ${p}`).join('\n')
  const msg =
    locale === 'zh'
      ? `您好，我对Master 2 Foods以下产品感兴趣：\n\n${list}\n\n请问能否提供定价与供货信息？`
      : `Hi, I'm interested in the following products from Master 2 Foods:\n\n${list}\n\nCould you please send me pricing and availability?`
  return buildWhatsAppLink(msg)
}

// Legacy compat — used by structured-data and product detail page
export function generateWhatsAppLink(params: {
  intent: 'price-list' | 'product-inquiry'
  productName?: string
  locale: 'en' | 'zh'
}): string {
  if (params.intent === 'price-list') return priceListLink(params.locale)
  return productInquiryLink(params.productName ?? '', params.locale)
}
