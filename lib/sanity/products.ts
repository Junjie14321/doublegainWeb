import { client } from '@/lib/sanity.client'
import type { Product } from '@/lib/data/products'

const PRODUCT_PROJECTION = `{
  "id": _id,
  "slug": slug.current,
  sku,
  name,
  variantName,
  "category": categories[0]->slug.current,
  "categories": categories[]->{
    "slug": slug.current,
    name
  },
  "subcategories": subcategories[]->{
    "slug": slug.current,
    name
  },
  packaging,
  "packagingSize": packaging.en,
  ingredients,
  suggestedUses,
  "image": image.asset->url,
  specialty,
  bestSeller,
  "isNew": new,
  allowQuote,
  allowSample
}`

export async function getProducts(): Promise<Product[]> {
  return await client.fetch(`*[_type == "product"] | order(_createdAt asc) ${PRODUCT_PROJECTION}`)
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return await client.fetch(
    `*[_type == "product" && slug.current == $slug][0]${PRODUCT_PROJECTION}`,
    { slug }
  )
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  return await client.fetch(
    `*[_type == "product" && $categorySlug in categories[]->slug.current] | order(_createdAt asc) ${PRODUCT_PROJECTION}`,
    { categorySlug }
  )
}
