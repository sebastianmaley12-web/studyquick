import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useEntitlement, FREE_SUBJECT_ID, SUBJECT_NAMES } from '../lib/entitlement'

/** Wraps a subject or topic route. Renders the real page when the current
 * user (signed in or not) has access to `subjectId`; otherwise renders a
 * paywall screen in its place. See src/lib/entitlement.ts for the rules. */
export function SubjectGuard({ subjectId, children }: { subjectId: string; children: ReactNode }) {
  const navigate = useNavigate()
  const { isConfigured, user, loading: authLoading } = useAuth()
  const { loading: entitlementLoading, isSubjectUnlocked, isTrialing, trialEndsAt } =
    useEntitlement()

  if (!isConfigured) return <>{children}</>
  if (authLoading || (user && entitlementLoading)) return null
  if (isSubjectUnlocked(subjectId)) return <>{children}</>

  const name = SUBJECT_NAMES[subjectId] ?? subjectId

  return (
    <div className="wrap">
      <div className="paywall">
        <span className="paywall-badge">Locked</span>
        <h1>{name} needs a subscription</h1>
        {!user ? (
          <>
            <p>
              {SUBJECT_NAMES[FREE_SUBJECT_ID]} is free to use, no account needed. Create a free
              account to unlock every subject for 7 days, then keep full access with a monthly
              subscription.
            </p>
            <div className="paywall-actions">
              <button className="cta" type="button" onClick={() => navigate('/account')}>
                Start your free trial <span className="arw">&rarr;</span>
              </button>
            </div>
          </>
        ) : isTrialing === false && trialEndsAt !== null ? (
          <>
            <p>
              Your 7-day trial ended on {trialEndsAt.toLocaleDateString()}. Subscribe to keep full
              access to every subject.
            </p>
            <div className="paywall-actions">
              <button className="cta" type="button" onClick={() => navigate('/account')}>
                Subscribe <span className="arw">&rarr;</span>
              </button>
            </div>
          </>
        ) : (
          <>
            <p>Subscribe to unlock every subject, including {name}.</p>
            <div className="paywall-actions">
              <button className="cta" type="button" onClick={() => navigate('/account')}>
                Subscribe <span className="arw">&rarr;</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
