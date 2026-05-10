import { defineField, defineType } from 'sanity'

const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Category Name',
      type: 'object',
      fields: [
        { name: 'en', type: 'string', title: 'English (e.g., SAUCES)' },
        { name: 'zh', type: 'string', title: 'Chinese' },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name.en', maxLength: 96 },
    }),
    defineField({
      name: 'subHeading', 
      title: 'Sub-heading',
      description: 'The uppercase text above the description (e.g., CONSISTENT DEPTH, AUTHENTIC TASTE)',
      type: 'object',
      fields: [
        { name: 'en', type: 'string', title: 'English' },
        { name: 'zh', type: 'string', title: 'Chinese' },
      ],
    }),
    defineField({
      name: 'description', 
      title: 'Description',
      description: 'Main category description shown on the Home page card',
      type: 'object',
      fields: [
        { name: 'en', type: 'text', title: 'English' },
        { name: 'zh', type: 'text', title: 'Chinese' },
      ],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first (e.g., 1, 2, 3)',
    }),
    defineField({
      name: 'image',
      title: 'Category Image',
      description: 'Product group image shown in the category card',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: 'name.en', media: 'image' },
  },
})

export default category