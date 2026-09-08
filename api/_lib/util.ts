import type { IncomingMessage } from 'node:http'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

/**
 * Shared helpers for the /api serverless functions. These run server-side
 * only (Vercel Node runtime) and use the Supabase *service role* key, which
 * bypasses row-level security — never expose that key to the client. It's
 * read from SUPABASE_SERVICE_ROLE_KEY (no VITE_ prefix, so Vite never bundles
 * it into client JS).
 */

export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('STRIPE_SECRET_KEY is not set')
  return new Stripe(key)
}

export function getSupabaseAdmin() {
  const url = process.env.VITE_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey) throw new Error('Supabase server env vars are not set')
  return createClient(url, serviceKey, { auth: { persistSession: false } })
}

export function getAppUrl(req: IncomingMessage): string {
  if (process.env.APP_URL) return process.env.APP_URL
  const host = req.headers.host
  return `https://${host}`
}

/** Reads the raw request body as a Buffer. Vercel's Node runtime does not
 * pre-parse the body for plain (non-framework) /api functions, so this is
 * safe to call as long as nothing has already consumed `req` as a stream —
 * required for Stripe webhook signature verification, which needs the exact
 * raw bytes rather than a re-serialised JSON.parse round-trip. */
export async function readRawBody(req: IncomingMessage): Promise<Buffer> {
  const chunks: Buffer[] = []
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks)
}

/** Verifies the caller's Supabase access token (sent as `Authorization:
 * Bearer <token>` by the client) and returns the authenticated user, or null
 * if the token is missing/invalid. Using the *anon* key here is deliberate —
 * getUser() with a bearer token only needs to validate the JWT, not bypass
 * RLS, so it doesn't need the service role. */
export async function getBearerUser(req: IncomingMessage) {
  const auth = req.headers.authorization
  const token = auth?.startsWith('Bearer ') ? auth.slice(7) : null
  if (!token) return null
  const url = process.env.VITE_SUPABASE_URL
  const anonKey = process.env.VITE_SUPABASE_ANON_KEY
  if (!url || !anonKey) return null
  const supabase = createClient(url, anonKey, { auth: { persistSession: false } })
  const { data, error } = await supabase.auth.getUser(token)
  if (error) return null
  return data.user
}
