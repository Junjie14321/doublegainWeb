import { defineField, defineType } from 'sanity'

/**
 * Sanity Schema for FAQ
 * This schema defines the structure for FAQ items in the Sanity CMS.
 * Supports multi-language (English and Chinese) and Category.
 */
export default defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    
    defineField({
      name: 'category',
      title: 'Question Category',
      description: 'Select which section this FAQ belongs to',
      type: 'string',
      options: {
        list: [
          { title: 'Product Inquiry', value: 'product' },
          { title: 'Ordering & Shipping', value: 'shipping' },
          { title: 'Sample Request', value: 'sample' },
          { title: 'Company Info', value: 'company' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    
    defineField({
      name: 'categoryLabel',
      title: 'Category Label (Multilingual)',
      description: 'Optional: Overwrite category display name',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'zh', title: 'Chinese', type: 'string' },
      ],
    }),

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
      subtitle: 'category', 
    },
  },
})