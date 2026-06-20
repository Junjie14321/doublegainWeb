import { client } from '@/lib/sanity.client'
import type { Article, ArticleRef } from '@/lib/sanity/types'

export type { Article, ArticleRef } from '@/lib/sanity/types'

const ARTICLE_CARD_PROJECTION = `{
  "id": _id,
  "slug": slug.current,
  category,
  title,
  subtitle,
  "heroImage": heroImage.asset->url,
  author,
  publishedAt,
  readTime,
  featured
}`

const ARTICLE_PROJECTION = `{
  "id": _id,
  "slug": slug.current,
  category,
  title,
  subtitle,
  "heroImage": heroImage.asset->url,
  author,
  publishedAt,
  readTime,
  featured,
  content[]{
    _type,
    body,
    heading,
    columns,
    rows[]{ cells },
    _type == "articleProductGridBlock" => {
      items[]{
        label,
        "product": product->{ "id": _id, "slug": slug.current, name, "image": image.asset->url, grade }
      }
    },
    _type == "articleFaqBlock" => {
      items[]{ question, answer }
    },
    _type == "articleImageBlock" => {
      "image": image.asset->url,
      caption
    }
  },
  "sidebarProducts": sidebarProducts[]->{
    "id": _id,
    "slug": slug.current,
    name,
    "image": image.asset->url,
    grade
  },
  "relatedArticles": relatedArticles[]->{
    "id": _id,
    "slug": slug.current,
    category,
    title,
    subtitle,
    "heroImage": heroImage.asset->url,
    publishedAt,
    readTime
  }
}`

export async function getArticles(): Promise<ArticleRef[]> {
  return client.fetch(
    `*[_type == "article"] | order(publishedAt desc) ${ARTICLE_CARD_PROJECTION}`
  )
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return client.fetch(
    `*[_type == "article" && slug.current == $slug][0]${ARTICLE_PROJECTION}`,
    { slug }
  )
}

export async function getArticleSlugs(): Promise<Array<{ category: string; slug: string }>> {
  return client.fetch(
    `*[_type == "article" && defined(slug.current) && defined(category)]{ "slug": slug.current, category }`
  )
}
