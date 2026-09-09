import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { supabase, queryWithRetry } from './supabase/client'

export const SUBJECT_NAMES: Record<string, string> = {
  'modern-history': 'Modern History',
  maths: 'Mathematics Standard 2',
  hms: 'Health & Movement Science',
  business: 'Business Studies',
  legal: 'Legal Studies',
}

/** Subjects offered during onboarding (section 2/6 of the product spec) —
 * Legal Studies exists in the app but isn't part of the public launch
 * subject set yet, so it's deliberately excluded here even though it's a
 * valid key in SUBJECT_NAMES/SubjectGuard. */
export const ONBOARDING_SUBJECT_IDS = ['maths', 'modern-history', 'hms', 'business']

export type SubscriptionStatus = 'free' | 'active' | 'past_due' | 'canceled'

type SubscriptionRow = {
  status: SubscriptionStatus
  trial_ends_at: string
  current_period_end: string | null
}

type Entitlement = {
  /** Whether Supabase is configured at all — when false every subject is
   * unlocked, matching the app's pre-accounts behaviour (local dev/preview
   * with no backend wired up). */
  isConfigured: boolean
  loading: boolean
  /** True once we know the account is inside its 7-day trial window. */
  isTrialing: boolean
  /** True once we know the account has a Stripe-active subscription. */
  isSubscribed: boolean
  trialEndsAt: Date | null
  /** The one subject the trial applies to — profiles.focus_subject_id,
   * chosen during onboarding. Null until onboarding is completed. */
  focusSubjectId: string | null
  isSubjectUnlocked: (subjectId: string) => boolean
}

export function useEntitlement(): Entitlement {
  const { isConfigured, user } = useAuth()
  const [row, setRow] = useState<SubscriptionRow | null>(null)
  const [focusSubjectId, setFocusSubjectId] = useState<string | null>(null)
  const [fetchedForUserId, setFetchedForUserId] = useState<string | null>(null)

  useEffect(() => {
    if (!isConfigured || !supabase || !user) return
    const client = supabase
    let cancelled = false
    Promise.all([
      queryWithRetry(() =>
        client
          .from('subscriptions')
          .select('status, trial_ends_at, current_period_end')
          .eq('user_id', user.id)
          .single(),
      ),
      queryWithRetry(() => client.from('profiles').select('focus_subject_id').eq('id', user.id).single()),
    ]).then(([subData, profileData]) => {
      if (cancelled) return
      setRow((subData as SubscriptionRow | null) ?? null)
      setFocusSubjectId((profileData?.focus_subject_id as string | null) ?? null)
      setFetchedForUserId(user.id)
    })
    return () => {
      cancelled = true
    }
  }, [isConfigured, user])

  // Derived, not stored, and both gated on `user` matching who was actually
  // fetched: stale data from a since-signed-out (or switched) user must
  // never leak into `isTrialing`/`isSubscribed`/`focusSubjectId` for
  // whoever's current.
  const loading = isConfigured && !!user && fetchedForUserId !== user.id
  const effectiveRow = user && fetchedForUserId === user.id ? row : null
  const effectiveFocusSubjectId = user && fetchedForUserId === user.id ? focusSubjectId : null

  const trialEndsAt = effectiveRow ? new Date(effectiveRow.trial_ends_at) : null
  // eslint-disable-next-line react-hooks/purity -- trial expiry is inherently wall-clock-dependent; staying correct as of the last render (not a live tick) is the intended behaviour
  const isTrialing = trialEndsAt !== null && trialEndsAt.getTime() > Date.now()
  const isSubscribed = effectiveRow?.status === 'active'

  function isSubjectUnlocked(subjectId: string): boolean {
    if (!isConfigured) return true
    if (!user) return false
    if (loading) return false
    if (isSubscribed) return true
    return isTrialing && subjectId === effectiveFocusSubjectId
  }

  return {
    isConfigured,
    loading,
    isTrialing,
    isSubscribed,
    trialEndsAt,
    focusSubjectId: effectiveFocusSubjectId,
    isSubjectUnlocked,
  }
}
