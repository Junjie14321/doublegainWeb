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
        { name: 'zh', type: 'string', title: 'Chinese' },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'variantName', // Supports the "Interested List" (e.g., Premium, Semi Premium)
      title: 'Variant/Grade Name',
      description: 'E.g., Standard, Semi Premium (Shown in Interested List)',
      type: 'object',
      fields: [
        { name: 'en', type: 'string', title: 'English' },
        { name: 'zh', type: 'string', title: 'Chinese' },
      ],
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
      name: 'badge',
      title: 'Product Badge',
      description: 'Label on the top corner (e.g., Best Seller)',
      type: 'string',
      options: {
        list: [
          { title: 'Best Seller', value: 'best-seller' },
          { title: 'Specialty', value: 'specialty' },
          { title: 'New', value: 'new' },
        ],
      },
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
      name: 'packaging',
      title: 'Packaging',
      description: 'Format: 1 Litre x 12 bottles/case',
      type: 'object',
      fields: [
        { name: 'en', type: 'string', title: 'English' },
        { name: 'zh', type: 'string', title: 'Chinese' },
      ],
    }),
    defineField({
      name: 'ingredients',
      title: 'Ingredients',
      description: 'List of ingredients',
      type: 'object',
      fields: [
        { name: 'en', type: 'text', title: 'English' },
        { name: 'zh', type: 'text', title: 'Chinese' },
      ],
    }),
    defineField({
      name: 'suggestedUses',
      title: 'Suggested Uses',
      description: 'Usage or cooking instructions',
      type: 'object',
      fields: [
        { name: 'en', type: 'text', title: 'English' },
        { name: 'zh', type: 'text', title: 'Chinese' },
      ],
    }),
    defineField({
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    // Buttons Visibility Toggles
    defineField({
      name: 'allowQuote',
      title: 'Allow Request for Quote',
      description: 'Enable the "Request for Quote" button',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'allowSample',
      title: 'Allow Request Sample',
      description: 'Enable the "Request Sample" button',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name.en',
      subtitle: 'variantName.en',
      media: 'image',
    },
  },
})

export default product