# Sanity Site Settings Schema

Add this document schema to your Sanity Studio, then create one published document with `_type: "siteSettings"`.

```ts
import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'about',
      title: 'About Section',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'intro', title: 'Intro Paragraph', type: 'text' }),
        defineField({ name: 'body', title: 'Expanded Body Paragraphs', type: 'array', of: [{ type: 'text' }] }),
        defineField({
          name: 'images',
          title: 'Portrait Images',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
                defineField({ name: 'image', title: 'Image Upload', type: 'image' }),
                defineField({ name: 'url', title: 'External Image URL', type: 'url' }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'connect',
      title: 'Collab Section',
      type: 'object',
      fields: [
        defineField({
          name: 'stats',
          title: 'Stats Card',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'subtitle', title: 'Subtitle', type: 'string' }),
            defineField({
              name: 'bars',
              title: 'Social Bars',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'platform',
                      title: 'Platform',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'LinkedIn', value: 'linkedin' },
                          { title: 'TikTok', value: 'tiktok' },
                          { title: 'Instagram', value: 'instagram' },
                          { title: 'YouTube', value: 'youtube' },
                          { title: 'X', value: 'x' },
                        ],
                      },
                    }),
                    defineField({ name: 'value', title: 'Value', type: 'string' }),
                    defineField({ name: 'height', title: 'Bar Height Percent', type: 'number' }),
                  ],
                },
              ],
            }),
          ],
        }),
        defineField({
          name: 'cards',
          title: 'CTA Cards',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'kind',
                  title: 'Card Type',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Collab', value: 'collab' },
                      { title: 'Advertise', value: 'advertise' },
                      { title: 'Community', value: 'community' },
                    ],
                  },
                }),
                defineField({ name: 'title', title: 'Title', type: 'string' }),
                defineField({ name: 'description', title: 'Description', type: 'text' }),
                defineField({ name: 'buttonLabel', title: 'Button Label', type: 'string' }),
                defineField({ name: 'url', title: 'Button URL', type: 'url' }),
                defineField({
                  name: 'image',
                  title: 'Image',
                  type: 'object',
                  fields: [
                    defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
                    defineField({ name: 'image', title: 'Image Upload', type: 'image' }),
                    defineField({ name: 'url', title: 'External Image URL', type: 'url' }),
                  ],
                }),
              ],
            },
          ],
        }),
        defineField({ name: 'primaryCta', title: 'Primary CTA Label', type: 'string' }),
        defineField({
          name: 'modals',
          title: 'Popup Headings',
          type: 'object',
          fields: [
            defineField({ name: 'advertiseHeading', title: 'Advertise Heading', type: 'string' }),
            defineField({ name: 'collabHeading', title: 'Collab Heading', type: 'string' }),
          ],
        }),
      ],
    }),
  ],
});
```
