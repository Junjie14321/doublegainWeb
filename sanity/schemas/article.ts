import { defineField, defineType } from 'sanity'

export const articleTextBlock = defineType({
  name: 'articleTextBlock',
  title: 'Text Block',
  type: 'object',
  fields: [
    defineField({
      name: 'body',
      title: 'Text',
      type: 'object',
      fields: [
        { name: 'en', type: 'text', title: 'English', rows: 4 },
        { name: 'zh', type: 'text', title: 'Chinese', rows: 4 },
      ],
    }),
  ],
  preview: {
    select: { body: 'body.en' },
    prepare({ body }: { body?: string }) {
      const snippet = body ? body.slice(0, 60) + (body.length > 60 ? '…' : '') : 'Empty'
      return { title: snippet, subtitle: 'Paragraph' }
    },
  },
})

export const articleSectionBlock = defineType({
  name: 'articleSectionBlock',
  title: 'Section (H2)',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'object',
      fields: [
        { name: 'en', type: 'string', title: 'English' },
        { name: 'zh', type: 'string', title: 'Chinese' },
      ],
    }),
    defineField({
      name: 'body',
      title: 'Body Text',
      type: 'object',
      fields: [
        { name: 'en', type: 'text', title: 'English', rows: 4 },
        { name: 'zh', type: 'text', title: 'Chinese', rows: 4 },
      ],
    }),
  ],
  preview: {
    select: { heading: 'heading.en' },
    prepare({ heading }: { heading?: string }) {
      return { title: heading ?? 'Untitled Section', subtitle: 'H2 Section' }
    },
  },
})

export const articleProductGridBlock = defineType({
  name: 'articleProductGridBlock',
  title: 'Product Images Grid',
  type: 'object',
  description: 'Show 1–3 product images in a row inside the article body',
  fields: [
    defineField({
      name: 'items',
      title: 'Products (max 3)',
      type: 'array',
      validation: (Rule) => Rule.max(3),
      of: [
        {
          type: 'object',
          name: 'productGridItem',
          title: 'Product',
          fields: [
            defineField({
              name: 'product',
              title: 'Product',
              type: 'reference',
              to: [{ type: 'product' }],
            }),
            defineField({
              name: 'label',
              title: 'Caption (overrides product name)',
              description: 'Optional — leave blank to use the product name',
              type: 'object',
              fields: [
                { name: 'en', type: 'string', title: 'English' },
                { name: 'zh', type: 'string', title: 'Chinese' },
              ],
            }),
          ],
          preview: {
            select: { title: 'product.name.en', subtitle: 'label.en', media: 'product.image' },
            prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
              return { title: subtitle || title || 'Product', subtitle: 'Grid item' }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { items: 'items' },
    prepare({ items }: { items?: unknown[] }) {
      const n = items?.length ?? 0
      return { title: `Product Grid`, subtitle: `${n} product${n !== 1 ? 's' : ''}` }
    },
  },
})

export const articleTableBlock = defineType({
  name: 'articleTableBlock',
  title: 'Table',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Table Heading (optional)',
      type: 'string',
    }),
    defineField({
      name: 'columns',
      title: 'Column Headers',
      description: 'Add column headers in order (e.g. "Event Type", "Priority Sauce", "Reason")',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'rows',
      title: 'Rows',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'tableRow',
          title: 'Row',
          fields: [
            defineField({
              name: 'cells',
              title: 'Cells (one value per column, in order)',
              type: 'array',
              of: [{ type: 'string' }],
            }),
          ],
          preview: {
            select: { cells: 'cells' },
            prepare({ cells }: { cells?: string[] }) {
              return { title: cells?.[0] ?? 'Row', subtitle: cells?.slice(1, 3).join(' · ') }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { heading: 'heading', rows: 'rows' },
    prepare({ heading, rows }: { heading?: string; rows?: unknown[] }) {
      return { title: heading || 'Table', subtitle: `${rows?.length ?? 0} rows` }
    },
  },
})

export const articleImageBlock = defineType({
  name: 'articleImageBlock',
  title: 'Image',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug / Anchor ID (optional)',
      description: 'URL-friendly name used as an anchor link for this image (e.g. "tai-lok-mee-comparison")',
      type: 'slug',
      options: { maxLength: 96 },
    }),
    defineField({
      name: 'caption',
      title: 'Caption (optional)',
      description: 'Short description shown below the image',
      type: 'object',
      fields: [
        { name: 'en', type: 'string', title: 'English' },
        { name: 'zh', type: 'string', title: 'Chinese' },
      ],
    }),
    defineField({
      name: 'source',
      title: 'Image Source (optional)',
      description: 'Attribution shown below the caption (e.g. "Source: Getty Images")',
      type: 'object',
      fields: [
        { name: 'en', type: 'string', title: 'English' },
        { name: 'zh', type: 'string', title: 'Chinese' },
      ],
    }),
  ],
  preview: {
    select: { title: 'caption.en', media: 'image' },
  },
})

export const articleFaqBlock = defineType({
  name: 'articleFaqBlock',
  title: 'FAQ',
  type: 'object',
  fields: [
    defineField({
      name: 'items',
      title: 'Questions & Answers',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          title: 'FAQ Item',
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'object',
              fields: [
                { name: 'en', type: 'string', title: 'English' },
                { name: 'zh', type: 'string', title: 'Chinese' },
              ],
            }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'object',
              fields: [
                { name: 'en', type: 'text', title: 'English', rows: 3 },
                { name: 'zh', type: 'text', title: 'Chinese', rows: 3 },
              ],
            }),
          ],
          preview: {
            select: { question: 'question.en' },
            prepare({ question }: { question?: string }) {
              return { title: question ?? 'Question', subtitle: 'FAQ' }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { items: 'items' },
    prepare({ items }: { items?: unknown[] }) {
      const n = items?.length ?? 0
      return { title: 'FAQ', subtitle: `${n} question${n !== 1 ? 's' : ''}` }
    },
  },
})

const article = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        { name: 'en', type: 'string', title: 'English' },
        { name: 'zh', type: 'string', title: 'Chinese' },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title.en', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle / Excerpt',
      description: 'Short description shown on article cards and in SEO meta',
      type: 'object',
      fields: [
        { name: 'en', type: 'string', title: 'English' },
        { name: 'zh', type: 'string', title: 'Chinese' },
      ],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Guides', value: 'guides' },
          { title: 'Tips', value: 'tips' },
          { title: 'News', value: 'news' },
        ],
        layout: 'radio',
      },
      initialValue: 'guides',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      initialValue: 'Master 2 Team',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publish Date',
      type: 'date',
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time (minutes)',
      type: 'number',
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Blog page',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'content',
      title: 'Article Content',
      description: 'Build the article by adding and reordering blocks',
      type: 'array',
      of: [
        { type: 'articleTextBlock' },
        { type: 'articleSectionBlock' },
        { type: 'articleImageBlock' },
        { type: 'articleProductGridBlock' },
        { type: 'articleTableBlock' },
        { type: 'articleFaqBlock' },
      ],
    }),
    defineField({
      name: 'sidebarProducts',
      title: 'Sidebar — Find Perfect Product (max 3)',
      description: 'Products shown in the right sidebar. Leave empty to hide the box.',
      type: 'array',
      validation: (Rule) => Rule.max(3),
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
    }),
    defineField({
      name: 'relatedArticles',
      title: 'Sidebar — Related Articles / Recipes (max 3)',
      description: 'Articles or recipes shown as related content in the sidebar. Leave empty to hide.',
      type: 'array',
      validation: (Rule) => Rule.max(3),
      of: [{ type: 'reference', to: [{ type: 'article' }, { type: 'recipe' }] }],
    }),
  ],
  preview: {
    select: { title: 'title.en', subtitle: 'category' },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return { title: title ?? 'Untitled Article', subtitle: subtitle ?? 'article' }
    },
  },
})

export default article
