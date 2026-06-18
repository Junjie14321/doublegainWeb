import { defineField, defineType } from 'sanity'

const recipe = defineType({
  name: 'recipe',
  title: 'Recipe',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Recipe Name',
      type: 'object',
      fields: [
        { name: 'en', type: 'string', title: 'English' },
        { name: 'zh', type: 'string', title: 'Chinese' },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name.en', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      description: 'Short tagline shown under the recipe name on the hero/detail page',
      type: 'object',
      fields: [
        { name: 'en', type: 'string', title: 'English' },
        { name: 'zh', type: 'string', title: 'Chinese' },
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      description: 'Short description used for SEO / Recipe rich results',
      type: 'object',
      fields: [
        { name: 'en', type: 'text', title: 'English' },
        { name: 'zh', type: 'text', title: 'Chinese' },
      ],
    }),
    defineField({
      name: 'image',
      title: 'Recipe Image',
      description: 'Circular dish/plate photo used on the hero and recipe cards',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'prepTime', title: 'Prep Time (minutes)', type: 'number' }),
    defineField({ name: 'cookTime', title: 'Cook Time (minutes)', type: 'number' }),
    defineField({ name: 'servings', title: 'Servings', type: 'number' }),
    defineField({
      name: 'ingredients',
      title: 'Ingredients',
      description: 'One ingredient per line',
      type: 'object',
      fields: [
        { name: 'en', type: 'text', title: 'English' },
        { name: 'zh', type: 'text', title: 'Chinese' },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'instructions',
      title: 'Instructions',
      description: 'One step per line',
      type: 'object',
      fields: [
        { name: 'en', type: 'text', title: 'English' },
        { name: 'zh', type: 'text', title: 'Chinese' },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tip',
      title: 'Cooking Tip (optional)',
      description: 'Short tip shown below the ingredient list in a yellow box',
      type: 'object',
      fields: [
        { name: 'en', type: 'string', title: 'English' },
        { name: 'zh', type: 'string', title: 'Chinese' },
      ],
    }),
    defineField({
      name: 'nutrition',
      title: 'Nutrition per Serving (optional)',
      description: 'Leave the entire section empty to hide the nutrition column',
      type: 'object',
      fields: [
        defineField({ name: 'calories', title: 'Calories (kcal)', type: 'number' }),
        defineField({ name: 'protein', title: 'Protein (g)', type: 'number' }),
        defineField({ name: 'carbohydrates', title: 'Carbohydrates (g)', type: 'number' }),
        defineField({ name: 'fat', title: 'Fat (g)', type: 'number' }),
        defineField({ name: 'fiber', title: 'Fiber (g)', type: 'number' }),
        defineField({ name: 'sodium', title: 'Sodium (mg)', type: 'number' }),
      ],
    }),
    defineField({
      name: 'relatedProducts',
      title: 'Shop This Recipe (Related Products)',
      description: 'Products used in this recipe, shown as "Shop this recipe"',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      description: 'Show this recipe in the hero section of the Recipes listing page',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      description: 'Lower numbers appear first in the recipe grid',
      type: 'number',
    }),
  ],
  preview: {
    select: { title: 'name.en', subtitle: 'tagline.en', media: 'image' },
  },
})

export default recipe
