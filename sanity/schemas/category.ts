/**
 * Sanity Schema for Categories
 * 
 * This schema defines the structure for product categories in the Sanity CMS.
 */

export const categorySchema = {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
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
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name.en',
        maxLength: 96,
      },
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'object',
      description: 'Short benefit-focused tagline (5-8 words)',
      fields: [
        {
          name: 'en',
          title: 'English',
          type: 'string',
          validation: (Rule: { max: (n: number) => unknown }) => Rule.max(50),
        },
        {
          name: 'zh',
          title: 'Chinese',
          type: 'string',
          validation: (Rule: { max: (n: number) => unknown }) => Rule.max(30),
        },
      ],
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Category Image',
      type: 'image',
      options: {
        hotspot: true,
      },
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
      title: 'name.en',
      subtitle: 'tagline.en',
      media: 'image',
    },
  },
}
