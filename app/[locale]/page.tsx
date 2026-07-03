import { HeroSection } from '@/components/sections/hero-section'
import { ExploreProductsSection } from '@/components/sections/explore-products-section'
import { CategorySection } from '@/components/sections/category-section'
import { RecipeSection } from '@/components/sections/recipe-section'
import { TrustSection } from '@/components/sections/trust-section'
import { FAQSection } from '@/components/sections/faq-section'
import { CTASection } from '@/components/sections/cta-section'
import { getCategoriesWithSubs, getProducts } from '@/lib/sanity/products'
import { getRecipes } from '@/lib/sanity/recipes'

export const revalidate = 3600

export default async function HomePage() {
  const [categories, products, recipes] = await Promise.all([
    getCategoriesWithSubs(),
    getProducts(),
    getRecipes(),
  ])

  return (
    <>
      <HeroSection />
      <ExploreProductsSection products={products} />
      <CategorySection categories={categories} />
      <RecipeSection recipes={recipes.slice(0, 4)} />
      <TrustSection />
      <FAQSection />
      <CTASection />
    </>
  )
}
