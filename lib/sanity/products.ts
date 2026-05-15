import { client } from '@/lib/sanity.client'
import type { Product, LocalizedString } from '@/lib/sanity/types'

export type { Product } from '@/lib/sanity/types'

export interface CategoryNode {
  slug: string
  name: LocalizedString
  order: number | null
  subcategories: { slug: string; name: LocalizedString }[]
}

const PRODUCT_PROJECTION = `{
  "id": _id,
  "slug": slug.current,
  sku,
  name,
  variantName,
  grade,
  "categories": categories[]->{
    "slug": slug.current,
    name
  },
  "subcategories": subcategories[]->{
    "slug": slug.current,
    name
  },
  "tags": [
    select(bestSeller == true => "best-seller"),
    select(specialty == true => "specialty"),
    select(new == true => "new")
  ][@ != null],
  specialty,
  bestSeller,
  "isNew": new,
  packaging,
  "packagingSize": packaging.en,
  ingredients,
  suggestedUses,
  "image": image.asset->url,
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

export async function getProductSlugs(): Promise<string[]> {
  return await client.fetch(`*[_type == "product" && defined(slug.current)].slug.current`)
}

export async function getCategoriesWithSubs(): Promise<CategoryNode[]> {
  return await client.fetch(`*[_type == "category"] | order(coalesce(order, 999) asc, name.en asc) {
    "slug": slug.current,
    name,
    order,
    "subcategories": *[_type == "subcategory" && references(^._id)] | order(name.en asc) {
      "slug": slug.current,
      name
    }
  }`)
}
