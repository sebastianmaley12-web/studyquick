import type { ReactNode } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useProfile } from '../lib/profile'
import { useEntitlement, SUBJECT_NAMES } from '../lib/entitlement'

/** Wraps a subject or topic route. Renders the real page only once we know
 * the current user is entitled to `subjectId` — signed in, onboarded, and
 * either subscribed or trialing this exact subject. See
 * src/lib/entitlement.ts for the unlock rule. Unauthenticated visitors are
 * redirected to /signup rather than shown any real content — there is no
 * anonymous free subject any more (product spec section 14). */
export function SubjectGuard({ subjectId, children }: { subjectId: string; children: ReactNode }) {
  const navigate = useNavigate()
  const { isConfigured, user, loading: authLoading } = useAuth()
  const { hasCompletedOnboarding, loading: profileLoading } = useProfile()
  const {
    loading: entitlementLoading,
    isSubjectUnlocked,
    isTrialing,
    trialEndsAt,
    focusSubjectId,
  } = useEntitlement()

  if (!isConfigured) return <>{children}</>
  if (authLoading) return null
  if (!user) return <Navigate to="/signup" replace />
  if (profileLoading) return null
  if (!hasCompletedOnboarding) return <Navigate to="/onboarding" replace />
  if (entitlementLoading) return null
  if (isSubjectUnlocked(subjectId)) return <>{children}</>

  const name = SUBJECT_NAMES[subjectId] ?? subjectId
  const trialExpired = trialEndsAt !== null && !isTrialing

  return (
    <div className="wrap">
      <div className="paywall">
        <span className="paywall-badge">Locked</span>
        <h1>{name} needs a subscription</h1>
        {trialExpired ? (
          <p>
            Your 7-day free trial ended on {trialEndsAt!.toLocaleDateString()}. Subscribe to
            unlock every subject, including {name}.
          </p>
        ) : focusSubjectId ? (
          <p>
            Your free trial covers {SUBJECT_NAMES[focusSubjectId] ?? focusSubjectId}. Subscribe to
            unlock {name} too.
          </p>
        ) : (
          <p>Subscribe to unlock {name}.</p>
        )}
        <div className="paywall-actions">
          <button className="cta" type="button" onClick={() => navigate('/pricing')}>
            Subscribe <span className="arw">&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  )
}
