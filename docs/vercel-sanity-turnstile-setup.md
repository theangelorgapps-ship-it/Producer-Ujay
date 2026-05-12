# Vercel, Sanity, and CAPTCHA Setup

This site can read page content from Sanity and save Advertise/Collab form submissions into Sanity. The forms are protected with Cloudflare Turnstile.

## 1. Add the Sanity Schemas

In your Sanity Studio, add:

- `siteSettings` from `docs/sanity-site-settings-schema.md`
- `formSubmission` from the schema below

```ts
import { defineField, defineType } from 'sanity';

export const formSubmission = defineType({
  name: 'formSubmission',
  title: 'Form Submission',
  type: 'document',
  fields: [
    defineField({
      name: 'formType',
      title: 'Form Type',
      type: 'string',
      options: {
        list: [
          { title: 'Advertise', value: 'advertise' },
          { title: 'Collab', value: 'collab' },
        ],
      },
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      initialValue: 'new',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Contacted', value: 'contacted' },
          { title: 'Closed', value: 'closed' },
        ],
      },
    }),
    defineField({ name: 'submittedAt', title: 'Submitted At', type: 'datetime' }),
    defineField({
      name: 'fields',
      title: 'Fields',
      type: 'object',
      fields: [
        defineField({ name: 'firstName', title: 'First Name', type: 'string' }),
        defineField({ name: 'lastName', title: 'Last Name', type: 'string' }),
        defineField({ name: 'name', title: 'Name', type: 'string' }),
        defineField({ name: 'email', title: 'Email', type: 'string' }),
        defineField({ name: 'socialHandle', title: 'Social Media Handle', type: 'string' }),
        defineField({ name: 'company', title: 'Company / Brand', type: 'string' }),
        defineField({ name: 'collaborationType', title: 'Collaboration Type', type: 'string' }),
        defineField({ name: 'message', title: 'Message / Goals', type: 'text' }),
        defineField({ name: 'details', title: 'Collaboration Details', type: 'text' }),
      ],
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'object',
      fields: [
        defineField({ name: 'page', title: 'Page', type: 'string' }),
        defineField({ name: 'userAgent', title: 'User Agent', type: 'text' }),
      ],
    }),
  ],
  preview: {
    select: {
      formType: 'formType',
      email: 'fields.email',
      submittedAt: 'submittedAt',
    },
    prepare({ formType, email, submittedAt }) {
      return {
        title: `${formType ?? 'Form'} - ${email ?? 'No email'}`,
        subtitle: submittedAt,
      };
    },
  },
});
```

Publish one `siteSettings` document so the website can read editable About and Collab section content.

## 2. Configure Sanity

Go to Sanity Manage, open the project, then:

1. Copy the Project ID and Dataset name.
2. Go to API settings and add your Vercel production domain to CORS.
3. Create an API token with write access. Keep this token private.

## 3. Configure Cloudflare Turnstile

Create a Turnstile widget for the production domain in Cloudflare. Copy the Site Key and Secret Key.

## 4. Add Vercel Environment Variables

In Vercel, open the project, then go to Settings > Environment Variables and add:

```env
VITE_SANITY_PROJECT_ID="your_project_id"
VITE_SANITY_DATASET="production"
VITE_SANITY_API_VERSION="2025-01-01"
VITE_SANITY_USE_CDN="true"

SANITY_PROJECT_ID="your_project_id"
SANITY_DATASET="production"
SANITY_API_VERSION="2025-01-01"
SANITY_WRITE_TOKEN="your_server_only_sanity_write_token"

VITE_TURNSTILE_SITE_KEY="your_turnstile_site_key"
TURNSTILE_SECRET_KEY="your_server_only_turnstile_secret_key"
```

Only the `VITE_` variables are safe for the browser. Never expose `SANITY_WRITE_TOKEN` or `TURNSTILE_SECRET_KEY` as `VITE_` variables.

## 5. Redeploy and Test

Redeploy the Vercel project from Git. After deployment:

1. Open the live site.
2. Submit the Advertise form.
3. Submit the Collab form.
4. Confirm the new documents appear in Sanity under `formSubmission`.

If the site content does not appear from Sanity, it will keep using the built-in fallback content until the Sanity project variables and published `siteSettings` document are available.
