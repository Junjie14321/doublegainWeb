import { defineField, defineType } from 'sanity'

/**
 * Sanity Schema for FAQ
 * This schema defines the structure for FAQ items in the Sanity CMS.
 * Supports multi-language (English and Chinese).
 */
export default defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'object',
      fields: [
        { 
          name: 'en', 
          title: 'English', 
          type: 'string', 
          validation: (Rule) => Rule.required() 
        },
        { 
          name: 'zh', 
          title: 'Chinese', 
          type: 'string', 
          validation: (Rule) => Rule.required() 
        },
      ],
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'object',
      fields: [
        { 
          name: 'en', 
          title: 'English', 
          type: 'text', 
          rows: 4, 
          validation: (Rule) => Rule.required() 
        },
        { 
          name: 'zh', 
          title: 'Chinese', 
          type: 'text', 
          rows: 4, 
          validation: (Rule) => Rule.required() 
        },
      ],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first (e.g., 1, 2, 3)',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'question.en',
    },
  },
})