Create a high-converting, production-ready B2B website for "Master 2", a supplier of specialty sauces, noodles, and pre-made ingredients for Asian commercial kitchens.

⚠️ This must NOT be a simple UI mockup.
Output real, structured, scalable Next.js code that can be used in production with minimal refactoring.

---

## 🔧 PROJECT INTEGRATION REQUIREMENTS (CRITICAL)

### Folder Structure (MUST FOLLOW)
```
/app
  /[locale]
    /layout.tsx
    /page.tsx
    /products
      /page.tsx          ## Add filter UI here (category, tags, search)
      /[slug]
        /page.tsx        ## Add product detail with full description
    /about              ## Add company/team page structure
      /page.tsx
/components
  /layout               ## Navbar, Footer
  /sections             ## Hero, Categories, CTA, FAQ
  /products             ## ProductCard, ProductGrid
  /ui                   ## Reusable buttons, inputs
/lib
  /sanity               ## CMS client & queries
  /utils                ## Helper functions
  /constants            ## Brand colors, fonts
/hooks                  ## useWhatsApp, useLanguage
/types                  ## TypeScript interfaces
/public
  /images               ## Product images, logos
```

### Import Conventions (STRICT)
```typescript
// ✅ Use absolute imports with @ alias
import { ProductCard } from '@/components/products/ProductCard'
import { sanityClient } from '@/lib/sanity/client'

// ❌ DO NOT use relative imports
import { ProductCard } from '../../components/products/ProductCard'
```

### Component File Pattern
```
Each component must have:
- ComponentName.tsx (logic)
- ComponentName.module.css (styles) OR inline Tailwind
- index.ts (barrel export)

Example:
/components/products/ProductCard/
  - ProductCard.tsx
  - index.ts
```

### State Management
- Use **React Context** for language switching
- Use **URL state** for filters (searchParams)
- ❌ DO NOT add Redux/Zustand unless specified

### API Route Pattern
```typescript
// /app/api/contact/route.ts
export async function POST(request: Request) {
  // Validate with Zod
  // Send via Resend
  // Return structured response
}
```

### Environment Variables (MUST MATCH)
```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_GA_ID=
RESEND_API_KEY=
WHATSAPP_NUMBER=
```

---

🎯 Business Context

Target users:
- Restaurant owners
- Chefs  
- Hotel procurement teams

Main goal:
- Drive inquiries and bulk orders via WhatsApp

Core value:
- Reduce kitchen prep time
- Ensure consistency
- Enable scalability

Brand personality:
- Reliable
- Efficient
- Heritage-driven
- Professional

Tone:
- Clear
- Confident
- Benefit-focused
- No fluff

---

🌐 Internationalization (CRITICAL)

Implement route-based i18n:
- `/en` → English (default)
- `/zh` → Simplified Chinese

Requirements:
- Language switcher in navbar (EN / 中文)
- Switching language updates:
  - All UI text
  - Metadata (title, description)
  - Structured data (JSON-LD)
- Do NOT mix English and Chinese in the same sentence
- Maintain identical layout across languages
- Both languages must feel native (not translated awkwardly)

## Add language toggle persistence (localStorage or cookie)

---

⚙️ Tech Stack (STRICT)

- Framework: **Next.js 14 (App Router)**
- Language: **TypeScript**
- Styling: **Tailwind CSS**
- CMS: **Sanity** (structured, scalable)
- Hosting: **Vercel** (optimize for ISR)
- Email: **Resend** (prepare API route)
- Analytics: **Google Analytics (GA4)**
- WhatsApp: **wa.me deep links** (primary conversion)

---

🧱 App Router Structure

Use real Next.js structure:
- `/app/[locale]/layout.tsx`
- `/app/[locale]/page.tsx`
- `/app/[locale]/products/page.tsx`          ## Add filtering UI: category dropdown, search bar, tag filters
- `/app/[locale]/products/[slug]/page.tsx`   ## Add full product description, image gallery, related products
- `/app/api/contact/route.ts`

Include:
- `generateMetadata()` per page
- Static generation + ISR (revalidate)
- Clean folder separation (components, lib, hooks)

## Add /app/[locale]/about/page.tsx for company story
## Add /app/[locale]/contact/page.tsx for inquiry form

---

🧠 CMS Data Modeling (Sanity)

Design scalable schemas:

**Products**
- `name` (localized)
- `slug`
- `category` (reference)
- `description` (localized) ## Add rich text for detailed product specs
- `image`
- `tags` (Best Seller / Premium)
- `optional WhatsApp prefill message`
- ## Add: SKU, unit size, case quantity, shelf life

**Categories**
- `name` (localized)
- `tagline` (localized)
- `order`
- ## Add: icon, featured flag

**FAQ**
- `question` (localized)
- `answer` (localized)
- ## Add: category grouping (Ordering, Delivery, Products)

## Add schema: Testimonials (client name, quote, business type)
## Add schema: BlogPost (for recipe ideas/kitchen tips)

Must support:
- 100+ products
- Future filtering and search

---

💬 WhatsApp Conversion Logic (CORE)

All CTAs must generate dynamic WhatsApp links:
```
https://wa.me/<number>?text=<encoded message>
```

Message must include:
- Intent (Request Price List / Product Inquiry)
- Product name (if clicked from product)
- Category (optional)
- Business type (Restaurant / Hotel / Distributor)

Example:
"I'm interested in your Premium Oyster Sauce. I run a restaurant and would like your price list."

Apply to:
- Product cards
- Product detail pages
- Hero CTA
- Sticky CTA button

## Add tracking: log WhatsApp click events to GA4

---

📄 Pages & Structure

### Homepage
- Hero section (headline + CTA)
  - Tagline: "Supplying specialty sauces and noodles to Asian kitchens from caterers to hotels and restaurants since 1996"
- Trust section (credibility) ## Add: "Trusted by 500+ restaurants" with logos
- Value proposition (3 benefits)
- Product categories (3 sections)
- Featured products (dynamic)
- Benefits (problem → solution)
- FAQ (SEO/AEO optimized)
- CTA section
- Footer

### Product Categories

**Sauces**
- Tagline: focus on consistency & depth

**Noodles**
- Tagline: focus on texture & authenticity

**Pre-made Ingredients**
- Tagline: focus on speed & convenience

Each tagline:
- 5–8 words
- Benefit-driven

## Add category description (2-3 sentences explaining use cases)

### Products

Include:

**Sauces**
- Light Soya Sauce (Standard, Premium)
- Dark Soya Sauce
- Oyster Sauce (Standard, Premium)
- Paste (Tomato, Plum, Lemon, XO)
- Sesame Oil (Standard, Premium)
- Flavours / Vinegar

**Noodles**
- Yee Fu Noodles
- Tai Lok Mee

**Pre-made Ingredients**
- Yam Ring
- Pork Lard
- Prawn Roll

Each product:
- Image
- Name
- Short benefit description
- Tag (optional)
- CTA → WhatsApp

## Add product attributes: serving size, shelf life, storage instructions

### Product Detail Page (`/products/[slug]`)
- Full description ## Add: ingredient list, suggested uses, pairing ideas
- Tags
- CTA → WhatsApp
- Structured data (Product schema)
- ## Add: image carousel, nutritional info, download spec sheet button
- ## Add: "Related Products" section

## Add Filter Page (`/products?category=sauces&tag=premium`)
- Sidebar filters (category, tags, search)
- Grid view with sorting (newest, A-Z, popular)
- Breadcrumbs
- Active filter chips

## Add Contact Page
- Inquiry form (name, business type, message)
- Direct WhatsApp link
- Office address/hours
- Google Maps embed (optional)

---

🎨 Design System (STRICT)

### Colors
- Primary: `#AE220A`
- Secondary: `#FFCC5A`
- Background: `#FFEDC4`
- Dark: `#451919`
- White: `#FFFFFF`

## Define in /lib/constants/colors.ts and Tailwind config

### Typography
- H1/H2: **Amiri Quran Bold**
- Body: **Iosevka Charon**
- Emphasis: **Bold Italic**

Rules:
- Do NOT mix fonts in same line
- Strong hierarchy
- Short readable text

## Define in /lib/constants/typography.ts

---

🧩 Components

Generate reusable components:
- `Navbar` (sticky + language switcher)
- `HeroSection`
- `CategorySection`
- `ProductCard`
- `ProductGrid`
- `CTASection` (sticky CTA included)
- `FAQSection`
- `Footer`

## Add components:
- `FilterSidebar` (for products page)
- `Breadcrumbs`
- `LanguageSwitcher`
- `WhatsAppButton` (reusable CTA)
- `TestimonialCarousel`

---

🚀 SEO / AEO (HIGH PRIORITY)

Implement:

**Metadata**
- Dynamic title/description
- OpenGraph
- Twitter cards

**Structured Data (JSON-LD)**
- Organization schema
- FAQ schema
- Product schema
- ## Add: BreadcrumbList schema

**Technical SEO**
- Sitemap
- robots.txt
- Semantic HTML

**AEO**
- FAQ in direct Q&A format
- Concise answers

---

⚡ Performance (Vercel Optimized)

- Use `next/image`
- Use `next/font`
- Static generation where possible
- ISR for CMS content
- Minimal client-side JS

## Add: Image optimization (WebP, responsive sizes)
## Add: Font preloading

---

📊 Analytics

Prepare:
- GA4 tracking
- Track:
  - CTA clicks
  - WhatsApp clicks
  - Page views
  - ## Add: filter interactions, language switches

---

🧼 Code Quality

- TypeScript (strict)
- Clean architecture
- Modular components
- No hardcoded content (mock CMS fetch allowed)
- Ready for Sanity integration

## Add: ESLint config, Prettier config
## Add: TypeScript interfaces in /types (Product, Category, FAQ)

---

⚠️ Constraints

- No generic templates
- No clutter
- No consumer-style design
- Prioritize conversion
- Users scan quickly → optimize for speed

---

💡 Key Outcome

This should result in:
- A real Next.js project structure
- Fully scalable CMS-driven site
- SEO + AEO optimized
- Conversion-first UX via WhatsApp

## Integration Checklist:
- [ ] Folder structure matches /app, /components, /lib pattern
- [ ] All imports use @ alias
- [ ] Environment variables match naming convention
- [ ] Components follow file pattern (ComponentName.tsx + index.ts)
- [ ] TypeScript interfaces defined in /types
- [ ] Tailwind config includes brand colors
- [ ] No external state management libraries added