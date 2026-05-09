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
      name: 'sku',
      title: 'SKU Number',
      description: 'Unique Stock Keeping Unit number',
      type: 'string',
    }),
    defineField({
      name: 'variantName', 
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

    // Badge
    defineField({
      name: 'specialty',
      title: 'Specialty',
      description: 'Check to show Specialty badge',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'bestSeller',
      title: 'Best Seller',
      description: 'Check to show Best Seller badge',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'new',
      title: 'New',
      description: 'Check to show New badge',
      type: 'boolean',
      initialValue: false,
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
      subtitle: 'sku',
      media: 'image',
    },
  },
})

export default product