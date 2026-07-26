import { createClient, type SupabaseClient } from '@supabase/supabase-js'

/**
 * Scaffolding for future accounts/cloud-sync — not used by any current
 * feature. Nothing in the app imports this yet; progress lives entirely in
 * localStorage via progressStore.ts. Stays `null` until VITE_SUPABASE_URL /
 * VITE_SUPABASE_ANON_KEY are set (see .env.example), so a clone with no env
 * file behaves identically to today.
 */
export const supabase: SupabaseClient | null = (() => {
  const url = import.meta.env.VITE_SUPABASE_URL
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
  if (!url || !anonKey) return null
  return createClient(url, anonKey)
})()
