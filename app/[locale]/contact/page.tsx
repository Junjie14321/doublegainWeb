import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n/config'
import { ContactClient } from '@/components/contact/contact-client'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === 'en'
      ? 'Contact Master 2 Foods | Bulk Orders & Product Enquiries'
      : '联系 Master 2 Foods | 批量订购与产品咨询',
    description: locale === 'en'
      ? 'Get in touch with Master 2 Foods for bulk orders, price lists, or product enquiries. Reach us via WhatsApp or email — fast response guaranteed.'
      : '通过 WhatsApp 或电邮联系 Master 2 Foods，咨询批量订购、价格清单或产品详情，我们快速回复。',
  }
}

export default function ContactPage() {
  return <ContactClient />
}
