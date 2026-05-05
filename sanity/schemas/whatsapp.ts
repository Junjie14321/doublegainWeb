import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'whatsApp',
  title: 'whatsApp settings',
  type: 'document',
  fields: [
    defineField({
      name: 'phoneNumber',
      title: 'whatsapp number',
      type: 'string',
      description: 'format: 628123456789 (no spaces or + sign)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'generalMessage',
      title: 'general message',
      type: 'text',
      description: 'default message for general inquiries',
      rows: 2,
    }),
    defineField({
      name: 'sampleMessage',
      title: 'sample request message',
      type: 'text',
      description: 'example: "hello, i would like to ask for a sample of: ". (product name will be added automatically by the system)',
      rows: 2,
    }),
  ],
})