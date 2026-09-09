import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useProfile, IMPROVEMENT_GOAL_LABELS } from '../lib/profile'
import { SUBJECT_NAMES } from '../lib/entitlement'

function joinNatural(items: string[]): string {
  if (items.length === 0) return ''
  if (items.length === 1) return items[0]
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`
}

export function OnboardingResults() {
  const navigate = useNavigate()
  const { user, loading: authLoading } = useAuth()
  const { profile, loading: profileLoading } = useProfile()

  if (!authLoading && !user) return <Navigate to="/signup" replace />
  if (!profileLoading && !profile?.onboarding_completed_at) return <Navigate to="/onboarding" replace />
  if (profileLoading || !profile) return null

  const subjectNames = profile.subjects_studying.map((id) => SUBJECT_NAMES[id] ?? id)
  const focusName = profile.focus_subject_id ? SUBJECT_NAMES[profile.focus_subject_id] : null
  const goalLabel = profile.improvement_goal
    ? IMPROVEMENT_GOAL_LABELS[profile.improvement_goal].toLowerCase()
    : null

  return (
    <div className="results-shell">
      <div className="results-check">&#10003;</div>
      <h1>You&rsquo;re ready to get started.</h1>
      <p className="results-summary">
        You&rsquo;re studying {profile.year ? `Year ${profile.year} ` : ''}
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
          <button
            className="cta"
            type="button"
            onClick={() => navigate('/dashboard')}
            style={{ marginTop: 0 }}
          >
            Start my free week <span className="arw">&rarr;</span>
          </button>
        </div>
      )}

      {subjectNames.length > 1 && (
        <div className="locked-row">
          {profile.subjects_studying
            .filter((id) => id !== profile.focus_subject_id)
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
