import {defineType, defineField} from 'sanity'
import {CalendarIcon} from '@sanity/icons/Calendar'

export const eventType = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End date',
      type: 'date',
      description: 'Optional — for multi-day events.',
      validation: (rule) =>
        rule.custom((endDate, context) => {
          const date = context.document?.date
          if (endDate && date && new Date(endDate) < new Date(date)) {
            return 'End date must be on or after the start date'
          }
          return true
        }),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Free text, e.g. "Concert", "Aviation", "Networking".',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'registerUrl',
      title: 'Register / info URL',
      type: 'url',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'date', media: 'image'},
  },
  orderings: [
    {
      title: 'Date, soonest first',
      name: 'dateAsc',
      by: [{field: 'date', direction: 'asc'}],
    },
  ],
})
