const WHATSAPP_NUMBER = '60123456789' // Replace with actual number

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
