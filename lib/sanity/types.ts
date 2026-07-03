export type Grade = 'standard' | 'semi-premium' | 'premium'

export type ProductTag = 'best-seller' | 'specialty' | 'new'

export type MainCategory = 'sauces' | 'noodles' | 'pre-made' | 'others'

export type ProductCategory = 'sauces' | 'noodles' | 'ingredients'

export type SubCategory =
  | 'soya-sauce'
  | 'sesame-oil'
  | 'vinegar'
  | 'paste'
  | 'authentic-sauce'
  | 'e-fu-noodle'
  | 'tai-lok-mee'
  | 'yam-ring'
  | 'prawn-roll'
  | 'pork-lard'
  | 'canned-food'
  | 'herbs-spices'
  | 'sugar'
  | 'drink'

export interface LocalizedString {
  en: string
  zh: string
}

export interface ProductCategoryRef {
  slug: string
  name: LocalizedString
}

export interface SavedProduct {
  id: string
  name: LocalizedString
  image: string
  grade?: Grade
}

export interface Product {
  id: string
  slug: string
  sku?: string

  name: LocalizedString
  variantName?: LocalizedString
  description?: LocalizedString
  shortDescription?: LocalizedString

  category?: string
  subCategory?: SubCategory
  categories?: ProductCategoryRef[]
  subcategories?: ProductCategoryRef[]

  grade?: Grade

  tags?: ProductTag[]
  specialty?: boolean
  bestSeller?: boolean
  isNew?: boolean

  packaging?: LocalizedString
  packagingSize?: string
  unitSize?: string
  caseQuantity?: string
  shelfLife?: string
  storageInstructions?: LocalizedString
  ingredients?: LocalizedString
  suggestedUses?: LocalizedString

  image?: string

  allowQuote?: boolean
  allowSample?: boolean
  whatsappMessage?: LocalizedString
}

export interface RecipeProductRef {
  id: string
  slug: string
  name: LocalizedString
  image?: string
  grade?: Grade
}

export interface RecipeInstructionStep {
  heading?: LocalizedString
  body?: LocalizedString
}

export interface RecipeFaqItem {
  question?: LocalizedString
  answer?: LocalizedString
}

export interface RecipeNutrition {
  calories?: number
  protein?: number
  carbohydrates?: number
  fat?: number
  fiber?: number
  sodium?: number
}

export interface Recipe {
  id: string
  slug: string
  name: LocalizedString
  tagline?: LocalizedString
  description?: LocalizedString
  image?: string
  prepTime?: number
  cookTime?: number
  servings?: number
  ingredients?: LocalizedString
  instructions?: RecipeInstructionStep[]
  tip?: LocalizedString
  nutrition?: RecipeNutrition
  faq?: RecipeFaqItem[]
  relatedProducts?: RecipeProductRef[]
  featured?: boolean
  order?: number | null
}

// ── Article block types ──────────────────────────────────────────────────────

export interface ArticleTextBlock {
  _type: 'articleTextBlock'
  body?: LocalizedString
}

export interface ArticleSectionBlock {
  _type: 'articleSectionBlock'
  heading?: LocalizedString
  body?: LocalizedString
}

export interface ArticleGridProduct {
  label?: LocalizedString
  product?: {
    id: string
    slug: string
    name: LocalizedString
    image?: string
    grade?: Grade
  }
}

export interface ArticleProductGridBlock {
  _type: 'articleProductGridBlock'
  items?: ArticleGridProduct[]
}

export interface ArticleTableBlock {
  _type: 'articleTableBlock'
  heading?: string
  columns?: string[]
  rows?: Array<{ cells: string[] }>
}

export interface ArticleFaqItem {
  question?: LocalizedString
  answer?: LocalizedString
}

export interface ArticleFaqBlock {
  _type: 'articleFaqBlock'
  items?: ArticleFaqItem[]
}

export interface ArticleImageBlock {
  _type: 'articleImageBlock'
  image?: string
  slug?: string
  caption?: LocalizedString
  source?: LocalizedString
}

export type ArticleContentBlock =
  | ArticleTextBlock
  | ArticleSectionBlock
  | ArticleProductGridBlock
  | ArticleTableBlock
  | ArticleFaqBlock
  | ArticleImageBlock

export interface ArticleSidebarProduct {
  id: string
  slug: string
  name: LocalizedString
  image?: string
  grade?: Grade
}

export interface ArticleRef {
  id: string
  slug: string
  category: string
  title?: LocalizedString
  subtitle?: LocalizedString
  heroImage?: string
  publishedAt?: string
  readTime?: number
}

export interface Article {
  id: string
  slug: string
  category: string
  title?: LocalizedString
  subtitle?: LocalizedString
  heroImage?: string
  author?: string
  publishedAt?: string
  readTime?: number
  featured?: boolean
  content?: ArticleContentBlock[]
  sidebarProducts?: ArticleSidebarProduct[]
  relatedArticles?: ArticleRef[]
}
