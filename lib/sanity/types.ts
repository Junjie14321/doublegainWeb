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
