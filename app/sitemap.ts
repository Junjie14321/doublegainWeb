import { MetadataRoute } from 'next'
import { getProductSlugs } from '@/lib/sanity/products'
import { locales } from '@/lib/i18n/config'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://master2foods.com'
  const slugs = await getProductSlugs()

  const routes: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    routes.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    })

    routes.push({
      url: `${baseUrl}/${locale}/products`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    })

    for (const category of ['sauces', 'noodles', 'ingredients']) {
      routes.push({
        url: `${baseUrl}/${locale}/products?category=${category}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      })
    }

    for (const slug of slugs) {
      routes.push({
        url: `${baseUrl}/${locale}/products/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    }
  }

  return routes
}
