# CLAUDE.md — Master 2 B2B Website

## Project Overview

B2B e-commerce/inquiry site for **Master 2**, a specialty Asian food supplier (sauces, noodles, pre-made ingredients) targeting commercial kitchens, restaurants, hotels, and distributors. No cart/checkout — conversion is via WhatsApp CTA and email inquiry.

## Tech Stack

- **Framework:** Next.js (App Router, TypeScript strict mode)
- **Styling:** Tailwind CSS 4 + shadcn/ui (Radix UI)
- **CMS:** Sanity v5 (project ID: `b0byprax`, dataset: `production`)
- **i18n:** Route-based (`/en/*`, `/zh/*`) with dictionary system in `lib/i18n/`
- **Deployment:** Vercel — auto-deploys on push to `main`
- **Forms:** React Hook Form + Zod
- **Live site:** https://doublegainweb.vercel.app

## Key Commands

```bash
npm run dev       # Next.js dev server (localhost:3000)
npm run sanity    # Sanity Studio (localhost:3333)
npm run build     # Production build
npm run lint      # ESLint
```

## Project Structure (key paths)

```
app/[locale]/           # All pages (en + zh routes)
components/sections/    # Homepage section components
components/ui/          # shadcn/ui components
sanity/schemas/         # Sanity content type schemas
lib/i18n/dictionaries/  # en.ts + zh.ts translation files
lib/sanity/             # GROQ queries
middleware.ts           # i18n routing
```

## Sanity Schemas

- `product` — bilingual name/description/whatsappMessage, image, categories, subcategories, packagingSize, tags, allowSample
- `category` — bilingual name/tagline, slug, order
- `subcategory` — bilingual name, slug, parentCategory ref
- `faq` — bilingual question/answer, order
- `whatsapp` — phoneNumber, generalMessage, sampleMessage

## Design System

- Primary: `#AE220A` (red)
- Secondary: `#FFCC5A` (yellow)
- Background: `#FFEDC4` (cream)
- Fonts: defined in Tailwind config

## i18n Convention

All user-facing strings must exist in both `lib/i18n/dictionaries/en.ts` and `zh.ts`. Use `getDictionary(locale)` to fetch at the page level and pass down as props.

## Environment Variables

```
NEXT_PUBLIC_SANITY_PROJECT_ID=b0byprax
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

Copy `.env.example` → `.env.local` for local development.

## Git Workflow

- Branch from `main`, open PR, merge after review
- Auto-deploy to Vercel on merge to `main`
- 8 PRs merged so far; team uses feature branches (`feature/`, `mdfiles/`, etc.)

## Current State (as of May 2026)

- Core infrastructure complete (routing, CMS, i18n, components, schemas)
- Schemas finalized with subcategory + bilingual support (PR #8)
- ~70-80% feature-complete
- Pending: product filtering UI, rich text descriptions, FAQ grouping, analytics (GA4), image galleries
