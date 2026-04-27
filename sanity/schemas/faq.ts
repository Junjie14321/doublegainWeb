/**
 * Sanity Schema for FAQ
 * 
 * This schema defines the structure for FAQ items in the Sanity CMS.
 */

export const faqSchema = {
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    {
      name: 'question',
      title: 'Question',
      type: 'object',
      fields: [
        {
          name: 'en',
          title: 'English',
          type: 'string',
          validation: (Rule: { required: () => unknown }) => Rule.required(),
        },
        {
          name: 'zh',
          title: 'Chinese',
          type: 'string',
          validation: (Rule: { required: () => unknown }) => Rule.required(),
        },
      ],
    },
    {
      name: 'answer',
      title: 'Answer',
      type: 'object',
      fields: [
        {
          name: 'en',
          title: 'English',
          type: 'text',
          rows: 4,
          validation: (Rule: { required: () => unknown }) => Rule.required(),
        },
        {
          name: 'zh',
          title: 'Chinese',
          type: 'text',
          rows: 4,
          validation: (Rule: { required: () => unknown }) => Rule.required(),
        },
      ],
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    },
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
}
