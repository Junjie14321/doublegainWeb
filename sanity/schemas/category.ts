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
      name: 'tagline',
      title: 'Tagline',
      type: 'object',
      fields: [
        { name: 'en', type: 'string', title: 'English' },
        { name: 'zh', type: 'string', title: '中文' },
      ],
      description: '5-8 words, benefit-driven',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
  ],
})

export default category