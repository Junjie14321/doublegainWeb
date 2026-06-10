import { client } from '@/lib/sanity.client'
import type { Recipe } from '@/lib/sanity/types'

export type { Recipe } from '@/lib/sanity/types'

const RECIPE_PROJECTION = `{
  "id": _id,
  "slug": slug.current,
  name,
  tagline,
  description,
  "image": image.asset->url,
  prepTime,
  cookTime,
  servings,
  ingredients,
  instructions,
  "relatedProducts": relatedProducts[]->{
    "id": _id,
    "slug": slug.current,
    name,
    "image": image.asset->url,
    grade
  },
  featured,
  order
}`

export async function getRecipes(): Promise<Recipe[]> {
  return await client.fetch(
    `*[_type == "recipe"] | order(coalesce(order, 999) asc, _createdAt asc) ${RECIPE_PROJECTION}`
  )
}

export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  return await client.fetch(
    `*[_type == "recipe" && slug.current == $slug][0]${RECIPE_PROJECTION}`,
    { slug }
  )
}

export async function getRecipeSlugs(): Promise<string[]> {
  return await client.fetch(`*[_type == "recipe" && defined(slug.current)].slug.current`)
}

export async function getFeaturedRecipe(): Promise<Recipe | null> {
  return await client.fetch(
    `*[_type == "recipe" && featured == true] | order(coalesce(order, 999) asc, _createdAt asc) [0]${RECIPE_PROJECTION}`
  )
}
