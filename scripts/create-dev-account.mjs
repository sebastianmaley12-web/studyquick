#!/usr/bin/env node
/**
 * One-off: create (or reset) a confirmed dev/test account with unlimited
 * access, for browser-testing gated subject pages without touching a real
 * user's credentials. Mirrors grant-access.mjs's entitlement write.
 *
 * Usage: node --env-file=.env.local scripts/create-dev-account.mjs
 */
import { createClient } from '@supabase/supabase-js'

const DEV_EMAIL = 'dev@studyquick.local'
const DEV_PASSWORD = 'StudyQuickDev2026!'

const url = process.env.VITE_SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !serviceKey) {
  console.error('VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must both be set')
  process.exit(1)
}

const supabase = createClient(url, serviceKey, { auth: { persistSession: false } })

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

let user = await findUserByEmail(DEV_EMAIL)

if (!user) {
  const { data, error } = await supabase.auth.admin.createUser({
    email: DEV_EMAIL,
    password: DEV_PASSWORD,
    email_confirm: true,
    user_metadata: { display_name: 'Dev Account' },
  })
  if (error) {
    console.error('Failed to create dev user:', error.message)
    process.exit(1)
  }
  user = data.user
  console.log(`Created dev user ${DEV_EMAIL}`)
} else {
  const { error } = await supabase.auth.admin.updateUserById(user.id, { password: DEV_PASSWORD })
  if (error) {
    console.error('Failed to reset dev user password:', error.message)
    process.exit(1)
  }
  console.log(`Dev user ${DEV_EMAIL} already existed — password reset`)
}

const { error: updateError } = await supabase
  .from('subscriptions')
  .update({ status: 'active', current_period_end: null, updated_at: new Date().toISOString() })
  .eq('user_id', user.id)

if (updateError) {
  console.error('Failed to update subscriptions row:', updateError.message)
  process.exit(1)
}

// Give the dev profile a full subjects_studying list so every subject also
// shows up in onboarding-driven UI (dashboard glyphs etc), not just via
// direct URL/entitlement bypass.
const { error: profileError } = await supabase
  .from('profiles')
  .update({
    subjects_studying: ['english-advanced', 'legal', 'modern-history', 'business', 'hms', 'maths'],
    year: '12',
    focus_subject_id: 'english-advanced',
    improvement_goal: 'Dev/test account',
    study_style: 'mixed',
    biggest_challenge: 'Internal QA account — not a real student.',
    onboarding_completed_at: new Date().toISOString(),
  })
  .eq('id', user.id)

if (profileError) {
  console.error('Failed to update profile row (non-fatal):', profileError.message)
}

console.log(`Dev account ready: ${DEV_EMAIL} / ${DEV_PASSWORD}`)
