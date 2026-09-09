import { supabase } from './supabase/client'

/** Calls one of the /api Stripe endpoints (api/create-checkout-session.ts,
 * api/create-portal-session.ts) with the current user's access token. Both
 * endpoints redirect the browser to the returned `url` on success. */
export async function callBillingApi(path: string): Promise<{ url?: string; error?: string }> {
  if (!supabase) return { error: 'Accounts are not set up yet.' }
  const { data } = await supabase.auth.getSession()
  const token = data.session?.access_token
  if (!token) return { error: 'Sign in required.' }
  const res = await fetch(path, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.json()
}
