import { createClient, type SupabaseClient } from '@supabase/supabase-js'

/**
 * The Supabase client — stays `null` until VITE_SUPABASE_URL /
 * VITE_SUPABASE_ANON_KEY are set (see .env.example), so a clone with no env
 * file behaves identically to a deployment with accounts entirely off:
 * AuthContext's isConfigured flips false and every subject stays unlocked.
 */
export const supabase: SupabaseClient | null = (() => {
  const url = import.meta.env.VITE_SUPABASE_URL
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
  if (!url || !anonKey) return null
  return createClient(url, anonKey)
})()

/**
 * Runs `queryFn` once, retrying once more on error. Exists for one specific
 * race: a query fired from a `useEffect` keyed on the user right after a
 * sign-in event can land before the client has finished hydrating that
 * session, and gets a spurious RLS 401 back. Always call this rather than
 * querying directly from an effect that runs on auth-state changes
 * (useProfile, useEntitlement, progressSync's attachProgressSync all do).
 */
export async function queryWithRetry<T>(
  queryFn: () => PromiseLike<{ data: T; error: unknown }>,
): Promise<T> {
  await supabase!.auth.getSession()
  const first = await queryFn()
  if (!first.error) return first.data
  const retry = await queryFn()
  return retry.data
}
