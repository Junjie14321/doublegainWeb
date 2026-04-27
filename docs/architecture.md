# Architecture Decisions

## Runtime Stack
- Framework: Next.js 16 (App Router)
- Language: TypeScript with strict mode enabled
- Styling: Tailwind CSS
- UI System: shadcn/ui components in `components/ui`

## State Management
- Current approach: local React state (`useState`, `useEffect`) and component-scoped hooks.
- No global state library is used.
- Guideline: introduce a global state solution only when state must be shared across distant feature boundaries.

## Backend Strategy
- Current backend: Next.js Route Handlers for server endpoints (for example `app/api/contact/route.ts`).
- Product content currently comes from in-repo data files.
- Guideline: route handlers are the only public backend surface in this app unless an external service is explicitly integrated.

## SEO and AEO
- Use Next Metadata API for route metadata (`metadata` / `generateMetadata`).
- Keep `robots.ts` and `sitemap.ts` updated with production URLs.
- Add structured data where content type benefits from rich results.
- Metadata should be locale-aware for all localized routes.
