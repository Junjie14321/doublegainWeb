/**
 * Sanity Schema Types Index
 * 
 * Export all schema types for use in sanity.config.ts
 * 
 * Usage in sanity.config.ts:
 * import { schemaTypes } from './schemas'
 * 
 * export default defineConfig({
 *   // ...
 *   schema: {
 *     types: schemaTypes,
 *   },
 * })
 */

import { productSchema } from './product'
import { categorySchema } from './category'
import { faqSchema } from './faq'

export const schemaTypes = [productSchema, categorySchema, faqSchema]
