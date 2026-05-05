import { defineField, defineType } from 'sanity'

const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'object',
      fields: [
        { name: 'en', type: 'string', title: 'English' },
        { name: 'zh', type: 'string', title: '中文' },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name.en',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
      validation: (Rule) => Rule.required(),
    }),
    
    defineField({
      name: 'subcategories',
      title: 'Subcategories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'subcategory' }] }],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        { name: 'en', type: 'text', title: 'English' },
        { name: 'zh', type: 'text', title: '中文' },
      ],
    }),
    
    defineField({
      name: 'packagingSize',
      title: 'Packaging Size',
      type: 'string',
      description: 'E.g., 150ml, 500g',
    }),
    defineField({
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Best Seller', value: 'best-seller' },
          { title: 'Premium', value: 'premium' },
        ],
      },
    }),
    
    defineField({
      name: 'allowSample',
      title: 'Allow Sample Request',
      type: 'boolean',
      description: 'Enable the "Ask for sample" button for this product',
      initialValue: false,
    }),
    
    defineField({
      name: 'whatsappMessage',
      title: 'WhatsApp Pre-fill Message',
      type: 'object',
      fields: [
        { name: 'en', type: 'text', title: 'English' },
        { name: 'zh', type: 'text', title: '中文' },
      ],
      description: 'Optional custom message when user clicks WhatsApp CTA',
    }),
  ],
  preview: {
    select: {
      title: 'name.en',
      subtitle: 'packagingSize',
      media: 'image',
    },
  },
})

export default product