// lib/sanity/products.ts
import { client } from '@/lib/sanity.client'
import type { Product } from '@/lib/data/products'

const PRODUCT_PROJECTION = `{
  "id": _id,
  "slug": slug.current,
  "category": category->slug.current,
  "name": name,
  "description": description,
  "image": image.asset->url,
  "tags": tags,
  "whatsappMessage": whatsappMessage
}`

export async function getProducts(): Promise<Product[]> {
  return await client.fetch(`*[_type == "product"]${PRODUCT_PROJECTION}`)
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return await client.fetch(
    `*[_type == "product" && slug.current == $slug][0]${PRODUCT_PROJECTION}`,
    { slug }
  )
}

