/**
 * Sanity Schema for Products
 * 
 * This schema defines the structure for products in the Sanity CMS.
 * To use this schema:
 * 1. Install Sanity in your project: npx sanity init
 * 2. Copy this file to your Sanity studio schemas folder
 * 3. Import and add to schemaTypes in your sanity.config.ts
 */

export const productSchema = {
  name: 'product',
  title: 'Product',
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
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        {
          name: 'en',
          title: 'English',
          type: 'text',
          rows: 3,
          validation: (Rule: { required: () => unknown }) => Rule.required(),
        },
        {
          name: 'zh',
          title: 'Chinese',
          type: 'text',
          rows: 3,
          validation: (Rule: { required: () => unknown }) => Rule.required(),
        },
      ],
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: [
              { title: 'Best Seller', value: 'best-seller' },
              { title: 'Premium', value: 'premium' },
            ],
          },
        },
      ],
    },
    {
      name: 'whatsappMessage',
      title: 'Custom WhatsApp Message',
      type: 'object',
      fields: [
        {
          name: 'en',
          title: 'English',
          type: 'string',
        },
        {
          name: 'zh',
          title: 'Chinese',
          type: 'string',
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
    {
      title: 'Name (English)',
      name: 'nameAsc',
      by: [{ field: 'name.en', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name.en',
      subtitle: 'category.name.en',
      media: 'image',
    },
  },
}
