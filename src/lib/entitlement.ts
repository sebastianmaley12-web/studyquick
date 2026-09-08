import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { supabase } from './supabase/client'

/** The one subject anyone can use, signed in or not, forever. Every other
 * subject needs a signed-in trial or an active subscription. Change this to
 * pick a different always-free subject. */
export const FREE_SUBJECT_ID = 'modern-history'

export const SUBJECT_NAMES: Record<string, string> = {
  'modern-history': 'Modern History',
  maths: 'Mathematics Standard 2',
  hms: 'Health & Movement Science',
  business: 'Business Studies',
  legal: 'Legal Studies',
}

export type SubscriptionStatus = 'free' | 'active' | 'past_due' | 'canceled'

type SubscriptionRow = {
  status: SubscriptionStatus
  trial_ends_at: string
  current_period_end: string | null
}

type Entitlement = {
  /** Whether Supabase is configured at all — when false every subject is
   * unlocked, matching the app's pre-accounts behaviour. */
  isConfigured: boolean
  loading: boolean
  /** True once we know the account is inside its 7-day trial window. */
  isTrialing: boolean
  /** True once we know the account has a Stripe-active subscription. */
  isSubscribed: boolean
  trialEndsAt: Date | null
  isSubjectUnlocked: (subjectId: string) => boolean
}

export function useEntitlement(): Entitlement {
  const { isConfigured, user } = useAuth()
  const [row, setRow] = useState<SubscriptionRow | null>(null)
  const [fetchedForUserId, setFetchedForUserId] = useState<string | null>(null)

  useEffect(() => {
    if (!isConfigured || !supabase || !user) return
    let cancelled = false
    supabase
      .from('subscriptions')
      .select('status, trial_ends_at, current_period_end')
      .eq('user_id', user.id)
      .single()
      .then(({ data }) => {
        if (cancelled) return
        setRow((data as SubscriptionRow | null) ?? null)
        setFetchedForUserId(user.id)
      })
    return () => {
      cancelled = true
    }
  }, [isConfigured, user])

  // Derived, not stored, and both gated on `user` matching who was actually
  // fetched: a stale `row` from a since-signed-out (or switched) user must
  // never leak into `isTrialing`/`isSubscribed` for whoever's current.
  const loading = isConfigured && !!user && fetchedForUserId !== user.id
  const effectiveRow = user && fetchedForUserId === user.id ? row : null

  const trialEndsAt = effectiveRow ? new Date(effectiveRow.trial_ends_at) : null
  // eslint-disable-next-line react-hooks/purity -- trial expiry is inherently wall-clock-dependent; staying correct as of the last render (not a live tick) is the intended behaviour
  const isTrialing = trialEndsAt !== null && trialEndsAt.getTime() > Date.now()
  const isSubscribed = effectiveRow?.status === 'active'

  function isSubjectUnlocked(subjectId: string): boolean {
    if (!isConfigured) return true
    if (subjectId === FREE_SUBJECT_ID) return true
    if (!user) return false
    if (loading) return false
    return isSubscribed || isTrialing
  }

  return { isConfigured, loading, isTrialing, isSubscribed, trialEndsAt, isSubjectUnlocked }
}
