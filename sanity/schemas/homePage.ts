import { defineField, defineType } from 'sanity'

const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Home Page Settings',
      readOnly: true,
    }),
    
    // Section: Specialty Products
    defineField({
      name: 'specialtySection',
      title: 'Specialty Products Section',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Section Heading',
          type: 'object',
          fields: [
            { name: 'en', type: 'string', title: 'English (e.g., Specialty Products)' },
            { name: 'zh', type: 'string', title: 'Chinese' },
          ],
        }),
        defineField({
          name: 'featuredCategories',
          title: 'Featured Categories',
          description: 'Select the categories to display on the Home Page (Sauces, Noodles, etc.)',
          type: 'array',
          of: [
            {
              type: 'reference',
              to: [{ type: 'category' }],
            },
          ],
          validation: (Rule) => Rule.max(3).error('You can only feature up to 3 categories'),
        }),
      ],
    }),

    // Section: Hero or anu section
  ],
  preview: {
    prepare() {
      return {
        title: 'Home Page Content',
      }
    },
  },
})

export default homePage