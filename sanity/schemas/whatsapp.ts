import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'whatsAppMessage',
  title: 'WhatsApp Message',
  type: 'document',
  fields: [
    defineField({
      name: 'phoneNumber',
      title: 'WhatsApp Number',
      type: 'string',
      description: 'Format: 628123456789 (no spaces or + sign)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'customerIntent', // new field
      title: 'Customer Intent',
      description: 'Select the purpose of this message',
      type: 'string',
      options: {
        list: [
          { title: 'Quote', value: 'quote' },
          { title: 'Sample', value: 'sample' },
          { title: 'Contact Us', value: 'contactus' },
          { title: 'Submit Request', value: 'submitrequest' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'generalMessage',
      title: 'General Message',
      type: 'text',
      description: 'Default message for general inquiries',
      rows: 2,
    }),
    defineField({
      name: 'sampleMessage',
      title: 'Sample Request Message',
      type: 'text',
      description: 'Example: "Hello, I would like to ask for a sample of: ". (Product name will be added automatically by the system)',
      rows: 2,
    }),
  ],
})