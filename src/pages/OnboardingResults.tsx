import { Navigate, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useProfile, IMPROVEMENT_GOAL_LABELS, type Profile } from '../lib/profile'
import { SUBJECT_NAMES } from '../lib/entitlement'
import { loadOnboardingDraft, clearOnboardingDraft, type OnboardingDraft } from '../lib/onboardingDraft'

function joinNatural(items: string[]): string {
  if (items.length === 0) return ''
  if (items.length === 1) return items[0]
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`
}

/** Both the just-signed-in profile shape and the pre-confirmation draft
 * carry the same personalisation fields under different key names — this
 * normalises either into what the page actually renders. */
function summaryFrom(source: Profile | OnboardingDraft) {
  const isProfile = 'subjects_studying' in source
  const subjectIds = isProfile ? source.subjects_studying : source.subjectsStudying
  const focusId = isProfile ? source.focus_subject_id : source.focusSubjectId
  const goal = isProfile ? source.improvement_goal : source.improvementGoal
  return {
    year: source.year,
    subjectIds,
    focusId,
    goalLabel: goal ? IMPROVEMENT_GOAL_LABELS[goal].toLowerCase() : null,
  }
}

export function OnboardingResults() {
  const navigate = useNavigate()
  const { user, loading: authLoading } = useAuth()
  const { profile, loading: profileLoading } = useProfile()
  const draft = loadOnboardingDraft()

  // The draft's only job was bridging /onboarding -> /signup -> here across
  // the account-creation gap. Once a real session exists there's no reason
  // to keep it around.
  useEffect(() => {
    if (user) clearOnboardingDraft()
  }, [user])

  if (!authLoading && !user && !draft) return <Navigate to="/onboarding" replace />
  if (user && !profileLoading && !profile?.onboarding_completed_at) {
    return <Navigate to="/onboarding" replace />
  }
  if (user && (profileLoading || !profile)) return null

  const source = user ? profile! : draft!
  const { year, subjectIds, focusId, goalLabel } = summaryFrom(source)
  const subjectNames = subjectIds.map((id) => SUBJECT_NAMES[id] ?? id)
  const focusName = focusId ? SUBJECT_NAMES[focusId] : null

  return (
    <div className="results-shell">
      <div className="results-check">&#10003;</div>
      <h1>You&rsquo;re ready to get started.</h1>
      <p className="results-summary">
        You&rsquo;re studying {year ? `Year ${year} ` : ''}
        {joinNatural(subjectNames)}
        {goalLabel ? `, and your main goal is ${goalLabel}` : ''}.
      </p>

      <div className="results-explain">
        <h3>How StudyQuick helps</h3>
        <p>
          StudyQuick gives you a self-guided path through your subjects — learn the content,
          practise questions, test yourself and identify what needs more work. No tutor needs to
          be present; the structure does the work of a study plan for you.
        </p>
      </div>

      {focusName && (
        <div className="trial-card">
          <div className="trial-card-eyebrow">Your free week</div>
          <h3>{focusName}</h3>
          <p>Full access for 7 days, starting now. No payment details required.</p>
          {user ? (
            <button className="cta" type="button" onClick={() => navigate('/dashboard')}>
              Start my free week <span className="arw">&rarr;</span>
            </button>
          ) : (
            <>
              <p>
                <b>Check your email to confirm your account</b> — then sign in to start studying.
              </p>
              <button className="cta" type="button" onClick={() => navigate('/login')}>
                I&rsquo;ve confirmed — sign in <span className="arw">&rarr;</span>
              </button>
            </>
          )}
        </div>
      )}

      {subjectNames.length > 1 && (
        <div className="locked-row">
          {subjectIds
            .filter((id) => id !== focusId)
            .map((id) => (
              <span className="locked-pill" key={id}>
                <span className="lock-ic">&#128274;</span> {SUBJECT_NAMES[id] ?? id}
              </span>
            ))}
        </div>
      )}

      <p className="mkt-hero-note">
        After your free week, {focusName ?? 'your subject'} and every other subject need a
        subscription to stay unlocked.{' '}
        <button className="text-link" type="button" onClick={() => navigate('/pricing')}>
          See pricing
        </button>
        .
      </p>
    </div>
  )
}
