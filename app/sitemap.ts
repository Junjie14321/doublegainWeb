import { MetadataRoute } from 'next'
import { getProductSlugs } from '@/lib/sanity/products'
import { getRecipeSlugs } from '@/lib/sanity/recipes'
import { getArticleSlugs } from '@/lib/sanity/articles'
import { locales } from '@/lib/i18n/config'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://master2foods.com'
  const [slugs, recipeSlugs, articleSlugs] = await Promise.all([
    getProductSlugs(),
    getRecipeSlugs(),
    getArticleSlugs(),
  ])

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

    routes.push({
      url: `${baseUrl}/${locale}/recipes`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    })

    routes.push({
      url: `${baseUrl}/${locale}/blog`,
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

    for (const slug of recipeSlugs) {
      routes.push({
        url: `${baseUrl}/${locale}/recipes/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    }

    for (const { category, slug } of articleSlugs) {
      routes.push({
        url: `${baseUrl}/${locale}/blog/${category}/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      })
    }
  }

  return routes
}
