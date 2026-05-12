import { createClient } from '@sanity/client';
import type { VercelRequest, VercelResponse } from '@vercel/node';

type FormType = 'advertise' | 'collab';

type FormPayload = {
  formType?: FormType;
  turnstileToken?: string;
  fields?: Record<string, string>;
};

const allowedFormTypes = new Set<FormType>(['advertise', 'collab']);

const fieldLimits: Record<string, number> = {
  firstName: 80,
  lastName: 80,
  name: 120,
  email: 180,
  socialHandle: 120,
  company: 160,
  collaborationType: 80,
  message: 2000,
  details: 2000,
};

function sanitizeFields(fields: unknown) {
  if (!fields || typeof fields !== 'object') return {};

  return Object.entries(fields as Record<string, unknown>).reduce<Record<string, string>>((acc, [key, value]) => {
    if (!(key in fieldLimits) || typeof value !== 'string') return acc;
    acc[key] = value.trim().slice(0, fieldLimits[key]);
    return acc;
  }, {});
}

function getMissingRequiredFields(formType: FormType, fields: Record<string, string>) {
  const required =
    formType === 'advertise'
      ? ['firstName', 'lastName', 'email', 'socialHandle', 'company', 'message']
      : ['name', 'email', 'socialHandle', 'collaborationType', 'details'];

  return required.filter((field) => !fields[field]);
}

async function verifyTurnstile(token: string, request: VercelRequest) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) throw new Error('TURNSTILE_SECRET_KEY is not configured.');

  const verificationBody = new URLSearchParams({
    secret,
    response: token,
  });

  const ip = request.headers['x-forwarded-for'];
  if (typeof ip === 'string') {
    verificationBody.set('remoteip', ip.split(',')[0].trim());
  }

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: verificationBody,
  });

  if (!response.ok) return false;
  const result = (await response.json()) as { success?: boolean };
  return result.success === true;
}

function getSanityClient() {
  const projectId = process.env.SANITY_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID;
  const dataset = process.env.SANITY_DATASET || process.env.VITE_SANITY_DATASET || 'production';
  const token = process.env.SANITY_WRITE_TOKEN;

  if (!projectId || !dataset || !token) {
    throw new Error('Sanity write environment variables are not configured.');
  }

  return createClient({
    projectId,
    dataset,
    token,
    apiVersion: process.env.SANITY_API_VERSION || process.env.VITE_SANITY_API_VERSION || '2025-01-01',
    useCdn: false,
  });
}

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Method not allowed.' });
  }

  const payload = request.body as FormPayload;
  const formType = payload?.formType;

  if (!formType || !allowedFormTypes.has(formType)) {
    return response.status(400).json({ error: 'Invalid form type.' });
  }

  const fields = sanitizeFields(payload.fields);
  const missingFields = getMissingRequiredFields(formType, fields);
  if (missingFields.length > 0) {
    return response.status(400).json({ error: 'Missing required fields.', missingFields });
  }

  if (!fields.email.includes('@')) {
    return response.status(400).json({ error: 'Enter a valid email address.' });
  }

  if (!payload.turnstileToken) {
    return response.status(400).json({ error: 'Captcha verification is required.' });
  }

  try {
    const captchaPassed = await verifyTurnstile(payload.turnstileToken, request);
    if (!captchaPassed) {
      return response.status(400).json({ error: 'Captcha verification failed.' });
    }

    const sanity = getSanityClient();
    const submission = await sanity.create({
      _type: 'formSubmission',
      formType,
      status: 'new',
      submittedAt: new Date().toISOString(),
      fields,
      source: {
        page: 'Producer Ujay website',
        userAgent: request.headers['user-agent'] || '',
      },
    });

    return response.status(200).json({ ok: true, id: submission._id });
  } catch (error) {
    console.error('Form submission failed', error);
    return response.status(500).json({ error: 'Unable to submit the form right now.' });
  }
}
