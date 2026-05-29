import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n/config'
import { AboutClient } from '@/components/about/about-client'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === 'en'
      ? 'About Master 2 Foods | Asian Food Supplier Since 1996'
      : '关于 Master 2 Foods | 1996年起亚洲食材供应商',
    description: locale === 'en'
      ? 'Master 2 Foods has supplied specialty sauces, noodles, and pre-made ingredients to commercial kitchens, restaurants, and hotels in Singapore since 1996.'
      : 'Master 2 Foods 自1996年起为新加坡的餐厅、酒店及商业厨房供应特色酱料、面条及预制食材。',
  }
}

export default function AboutPage() {
  return <AboutClient />
}
