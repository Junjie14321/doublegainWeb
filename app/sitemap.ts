import { MetadataRoute } from 'next'
import { products } from '@/lib/data/products'
import { locales } from '@/lib/i18n/config'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://master2.com'

  const routes: MetadataRoute.Sitemap = []

  // Homepage for each locale
  for (const locale of locales) {
    routes.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    })

    // Products page
    routes.push({
      url: `${baseUrl}/${locale}/products`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    })

    // Category pages
    for (const category of ['sauces', 'noodles', 'ingredients']) {
      routes.push({
        url: `${baseUrl}/${locale}/products?category=${category}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      })
    }

    // Product detail pages
    for (const product of products) {
      routes.push({
        url: `${baseUrl}/${locale}/products/${product.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    }
  }

  return routes
}
