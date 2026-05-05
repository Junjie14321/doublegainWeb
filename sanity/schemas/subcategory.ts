import { defineField, defineType } from 'sanity'

const subcategory = defineType({
  name: 'subcategory',
  title: 'Subcategory',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Subcategory Name',
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
      name: 'parentCategory',
      title: 'Parent Category',
      type: 'reference',
      to: [{ type: 'category' }],
      description: 'Reference to the main category this subcategory belongs to',
      validation: (Rule) => Rule.required(),
    }),
  ],
  // Setup preview for the Sanity Studio dashboard
  preview: {
    select: {
      title: 'name.en',
      subtitle: 'parentCategory.name.en', // Displays the parent category name for better organization
    },
  },
})

export default subcategory