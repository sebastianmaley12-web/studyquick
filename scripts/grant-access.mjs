#!/usr/bin/env node
/**
 * One-off: grant a specific real user unlimited access, bypassing Stripe
 * checkout. Sets their `subscriptions` row to status='active' with no
 * current_period_end (entitlement only checks status, not the period end,
 * for 'active' — see useEntitlement in src/lib/entitlement.ts), so it never
 * expires until manually revoked.
 *
 * Usage: node --env-file=.env.local scripts/grant-access.mjs <email>
 */
import { createClient } from '@supabase/supabase-js'

const email = process.argv[2]
if (!email) {
  console.error('Usage: node --env-file=.env.local scripts/grant-access.mjs <email>')
  process.exit(1)
}

const url = process.env.VITE_SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !serviceKey) {
  console.error('VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must both be set')
  process.exit(1)
}

const supabase = createClient(url, serviceKey, { auth: { persistSession: false } })

// admin.listUsers() doesn't support filtering by email server-side across
// all Supabase versions, so page through and match — fine for a one-off,
// admin-only script on a small user base.
async function findUserByEmail(targetEmail) {
  const perPage = 200
  for (let page = 1; page <= 50; page++) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage })
    if (error) throw error
    const match = data.users.find((u) => u.email?.toLowerCase() === targetEmail.toLowerCase())
    if (match) return match
    if (data.users.length < perPage) return null
  }
  return null
}

const user = await findUserByEmail(email)
if (!user) {
  console.error(`No auth user found with email ${email}`)
  process.exit(1)
}

const { error: upsertError } = await supabase
  .from('subscriptions')
  .update({
    status: 'active',
    current_period_end: null,
    updated_at: new Date().toISOString(),
  })
  .eq('user_id', user.id)

if (upsertError) {
  console.error('Failed to update subscriptions row:', upsertError.message)
  process.exit(1)
}

const { data: row, error: readError } = await supabase
  .from('subscriptions')
  .select('user_id, status, trial_ends_at, current_period_end')
  .eq('user_id', user.id)
  .single()

if (readError) {
  console.error('Update likely succeeded but verification read failed:', readError.message)
  process.exit(1)
}

console.log(`Granted unlimited access to ${email}`)
console.log(row)
