const WHATSAPP_NUMBER = '60123456789'

export type BusinessType = 'restaurant' | 'hotel' | 'distributor' | 'caterer'

export interface WhatsAppMessageParams {
  intent: 'price-list' | 'product-inquiry'
  productName?: string
  category?: string
  businessType?: BusinessType
  locale: 'en' | 'zh'
}

const businessTypeMessages = {
  en: {
    restaurant: 'I run a restaurant',
    hotel: 'I work for a hotel',
    distributor: 'I am a distributor',
    caterer: 'I run a catering company',
  },
  zh: {
    restaurant: '我经营一家餐厅',
    hotel: '我在酒店工作',
    distributor: '我是经销商',
    caterer: '我经营一家餐饮公司',
  },
}

export function generateWhatsAppLink(params: WhatsAppMessageParams): string {
  const { intent, productName, businessType, locale } = params

  let message = ''

  if (locale === 'en') {
    if (intent === 'price-list') {
      message = 'Hello, I would like to request your price list.'
      if (businessType) {
        message += ` ${businessTypeMessages.en[businessType]}.`
      }
    } else if (intent === 'product-inquiry' && productName) {
      message = `Hello, I am interested in your ${productName}.`
      if (businessType) {
        message += ` ${businessTypeMessages.en[businessType]}`
      }
      message += ' Could you provide more information and pricing?'
    }
  } else {
    if (intent === 'price-list') {
      message = '您好，我想索取您的报价单。'
      if (businessType) {
        message += `${businessTypeMessages.zh[businessType]}。`
      }
    } else if (intent === 'product-inquiry' && productName) {
      message = `您好，我对您的${productName}感兴趣。`
      if (businessType) {
        message += businessTypeMessages.zh[businessType]
      }
      message += '请问可以提供更多信息和价格吗？'
    }
  }

  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`
}

export interface CartLineItem {
  name: { en: string; zh: string }
  packagingSize?: string
  quantity: number
}

export function generateCartWhatsAppLink(params: {
  items: CartLineItem[]
  intent: 'quote' | 'sample'
  locale: 'en' | 'zh'
}): string {
  const { items, intent, locale } = params

  const productList = items
    .map((item, i) => {
      const name = item.name[locale]
      const packaging = item.packagingSize ? ` (${item.packagingSize})` : ''
      const qty = item.quantity > 1 ? ` x${item.quantity}` : ''
      return `${i + 1}. ${name}${packaging}${qty}`
    })
    .join('\n')

  let message = ''

  if (locale === 'en') {
    message = intent === 'quote'
      ? `Hello, I would like to request a quote for the following products:\n\n${productList}\n\nCould you please provide pricing and availability? Thank you.`
      : `Hello, I would like to request samples for the following products:\n\n${productList}\n\nThank you.`
  } else {
    message = intent === 'quote'
      ? `您好，我想询问以下产品的报价：\n\n${productList}\n\n请提供价格和库存情况，谢谢。`
      : `您好，我想申请以下产品的样品：\n\n${productList}\n\n谢谢。`
  }

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
