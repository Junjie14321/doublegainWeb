import { defineField, defineType } from 'sanity'

const uiLabels = defineType({
  name: 'uiLabels',
  title: 'UI Labels & Text',
  type: 'document',
  fields: [
    // Only for Interested List (Cart)
    defineField({
      name: 'interestedList',
      title: 'Interested List (Cart)',
      description: 'Labels for the side shopping cart popup',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Cart Title',
          description: "Default: I'M INTERESTED IN",
          type: 'object',
          fields: [
            { name: 'en', type: 'string', title: 'English' },
            { name: 'zh', type: 'string', title: 'Chinese' },
          ],
        },
        {
          name: 'whatsappButtonLabel',
          title: 'WhatsApp Button Label',
          description: 'Text inside the big red button',
          type: 'object',
          fields: [
            { name: 'en', type: 'string', title: 'English' },
            { name: 'zh', type: 'string', title: 'Chinese' },
          ],
        },
      ],
    }),
  ],

  preview: {
    select: {
      titleEn: 'interestedList.title.en',
      titleZh: 'interestedList.title.zh',
    },
    prepare(selection) {
      const { titleEn, titleZh } = selection
      return {
        title: titleEn || 'Untitled Label',
        subtitle: titleZh || 'No Chinese Translation',
      }
    },
  },
})

export default uiLabels