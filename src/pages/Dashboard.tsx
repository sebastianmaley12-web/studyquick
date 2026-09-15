import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useProfile } from '../lib/profile'
import { useEntitlement, ONBOARDING_SUBJECT_IDS, SUBJECT_NAMES } from '../lib/entitlement'
import { useProgress } from '../lib/progressStore'
import { historyTopicStats, mathsTopicStats, pct } from '../lib/progressStats'
import { modernHistoryTopics } from '../lib/content/modernHistory'
import { mathsYear11Topics, mathsYear12Topics } from '../lib/content/maths'
import { hmsTopics } from '../lib/content/hms'
import { businessTopics } from '../lib/content/business'
import { legalTopics } from '../lib/content/legal'
import { callBillingApi } from '../lib/billingApi'
import { ENGLISH_TEXTS } from '../lib/content/englishRegistry'
import { PAPER_ONE_TECHNIQUES } from '../content/english/paper1-technique-bank'
import { PAPER_ONE_EVIDENCE } from '../content/english/paper1-evidence-bank'
import { buildQuoteTechniqueQuiz } from '../lib/content/englishQuiz'
import {
  buildIdentifyEffectQuestions,
  buildIdentifyQuestions,
  buildQuoteToAnalysisQuestions,
  buildTechniqueToEffectQuestions,
  paper1QuestionKey,
} from '../lib/content/paper1'
import { quizKey } from '../lib/keys'
import { onEnterOrSpace } from '../lib/a11y'

const SUBJECT_GLYPHS: Record<string, string> = {
  maths: '∫',
  'modern-history': '🏛',
  hms: '⚕',
  business: '💼',
  'english-advanced': '✎',
  legal: '⚖',
}

function subjectOverall(id: string, progress: ReturnType<typeof useProgress>) {
  switch (id) {
    case 'modern-history':
      return modernHistoryTopics.reduce(
        (acc, t) => {
          const s = historyTopicStats(progress, t)
          return { done: acc.done + s.score, total: acc.total + s.max }
        },
        { done: 0, total: 0 },
      )
    case 'hms':
      return hmsTopics.reduce(
        (acc, t) => {
          const s = historyTopicStats(progress, t)
          return { done: acc.done + s.score, total: acc.total + s.max }
        },
        { done: 0, total: 0 },
      )
    case 'business':
      return businessTopics.reduce(
        (acc, t) => {
          const s = historyTopicStats(progress, t)
          return { done: acc.done + s.score, total: acc.total + s.max }
        },
        { done: 0, total: 0 },
      )
    case 'legal':
      return legalTopics.reduce(
        (acc, t) => {
          const s = historyTopicStats(progress, t)
          return { done: acc.done + s.score, total: acc.total + s.max }
        },
        { done: 0, total: 0 },
      )
    case 'maths':
      return [...mathsYear12Topics, ...mathsYear11Topics].reduce(
        (acc, t) => {
          const s = mathsTopicStats(progress, t)
          return { done: acc.done + s.right, total: acc.total + s.total }
        },
        { done: 0, total: 0 },
      )
    case 'english-advanced': {
      // No single topic list to reduce over (English is module/text based,
      // not a flat topic list) — count answered items across every
      // registered text's quote/technique quiz plus the four generated
      // Paper 1 question pools instead.
      let quoteDone = 0
      let quoteTotal = 0
      for (const text of ENGLISH_TEXTS) {
        const quoteTestTopicId = `${text.id}-quote-test`
        const quoteQuestions = buildQuoteTechniqueQuiz(text)
        quoteDone += quoteQuestions.filter(
          (_, i) => progress.quiz[quizKey(quoteTestTopicId, i)] !== undefined,
        ).length
        quoteTotal += quoteQuestions.length
      }

      const bank = PAPER_ONE_TECHNIQUES
      const evidence = PAPER_ONE_EVIDENCE
      const paper1Questions = [
        ...buildIdentifyQuestions(evidence, bank),
        ...buildIdentifyEffectQuestions(evidence, bank),
        ...buildTechniqueToEffectQuestions(evidence, bank),
        ...buildQuoteToAnalysisQuestions(evidence, bank),
      ]
      const paper1Done = paper1Questions.filter(
        (q) => progress.quiz[paper1QuestionKey(q.id)] !== undefined,
      ).length

      return {
        done: quoteDone + paper1Done,
        total: quoteTotal + paper1Questions.length,
      }
    }
    default:
      return { done: 0, total: 0 }
  }
}

function greeting(): string {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

export function Dashboard() {
  const navigate = useNavigate()
  const { isConfigured, user, loading: authLoading, signOut } = useAuth()
  const { profile, loading: profileLoading, hasCompletedOnboarding } = useProfile()
  const { isTrialing, isSubscribed, trialEndsAt, focusSubjectId, isSubjectUnlocked } =
    useEntitlement()
  const progress = useProgress()
  const [billingBusy, setBillingBusy] = useState(false)
  const [billingError, setBillingError] = useState<string | null>(null)

  if (isConfigured && !authLoading && !user) return <Navigate to="/login" replace />
  if (isConfigured && !profileLoading && !hasCompletedOnboarding) {
    return <Navigate to="/onboarding" replace />
  }
  if (profileLoading || !profile) return null

  const studySubjects = profile.subjects_studying.length > 0 ? profile.subjects_studying : ONBOARDING_SUBJECT_IDS
  const focusName = focusSubjectId ? SUBJECT_NAMES[focusSubjectId] : null
  const overallTotals = studySubjects.reduce(
    (acc, id) => {
      const s = subjectOverall(id, progress)
      return { done: acc.done + s.done, total: acc.total + s.total }
    },
    { done: 0, total: 0 },
  )

  async function onSubscribe() {
    setBillingBusy(true)
    setBillingError(null)
    const { url, error } = await callBillingApi('/api/create-checkout-session')
    setBillingBusy(false)
    if (url) window.location.href = url
    else setBillingError(error ?? 'Could not start checkout.')
  }

  async function onManageBilling() {
    setBillingBusy(true)
    setBillingError(null)
    const { url, error } = await callBillingApi('/api/create-portal-session')
    setBillingBusy(false)
    if (url) window.location.href = url
    else setBillingError(error ?? 'Could not open billing.')
  }

  return (
    <div className="dash-shell">
      <div className="dash-welcome">
        <h1>
          {greeting()}
          {profile.display_name ? `, ${profile.display_name}` : ''}.
        </h1>
        <p>
          {focusName
            ? `Let's keep improving your ${focusName}.`
            : 'Pick a subject below and start studying.'}
        </p>
        {profile.biggest_challenge && (
          <p className="dash-challenge-note">
            You told us: &ldquo;{profile.biggest_challenge}&rdquo; — worth keeping in mind today.
          </p>
        )}
      </div>

      {focusSubjectId && isSubjectUnlocked(focusSubjectId) && (
        <div className="dash-continue">
          <div className="dash-continue-txt">
            <div className="eyebrow">Continue studying</div>
            <h2>{focusName}</h2>
          </div>
          <button className="cta" type="button" onClick={() => navigate(`/subjects/${focusSubjectId}`)}>
            Continue studying <span className="arw">&rarr;</span>
          </button>
        </div>
      )}

      {!isSubscribed && (
        <div className="dash-trial-banner">
          {isTrialing ? (
            <span>
              Free trial active for <b>{focusName}</b> until{' '}
              <b>{trialEndsAt?.toLocaleDateString()}</b>.
            </span>
          ) : (
            <span>Your free trial has ended. Subscribe to unlock every subject again.</span>
          )}
          <button className="pub-btn-primary" type="button" disabled={billingBusy} onClick={onSubscribe}>
            {isTrialing ? 'Subscribe now' : 'Subscribe'}
          </button>
        </div>
      )}
      {isSubscribed && (
        <div className="dash-trial-banner">
          <span>Subscription active — every subject unlocked.</span>
        </div>
      )}
      {billingError && <p className="auth-error dash-inline-error">{billingError}</p>}

      <div className="dash-section-label">Your progress</div>
      <div className="dash-stat-grid">
        <div className="dash-stat">
          <div className="n">{pct(overallTotals.done, overallTotals.total)}%</div>
          <div className="l">Overall complete</div>
        </div>
        <div className="dash-stat">
          <div className="n">{overallTotals.done}</div>
          <div className="l">Items completed</div>
        </div>
        <div className="dash-stat">
          <div className="n">{studySubjects.length}</div>
          <div className="l">Subjects studying</div>
        </div>
        <div className="dash-stat">
          <div className="n">{studySubjects.filter((id) => isSubjectUnlocked(id)).length}</div>
          <div className="l">Unlocked now</div>
        </div>
      </div>
      <p className="dash-link-row">
        <button className="text-link" type="button" onClick={() => navigate('/progress')}>
          See full progress breakdown &rarr;
        </button>
      </p>

      <div className="dash-section-label">Your subjects</div>
      <div className="subject-rows">
        {studySubjects.map((id) => {
          const unlocked = isSubjectUnlocked(id)
          const s = subjectOverall(id, progress)
          return (
            <div
              key={id}
              className={`subject-card${unlocked ? '' : ' locked'}`}
              role="button"
              tabIndex={0}
              onClick={() => navigate(unlocked ? `/subjects/${id}` : '/pricing')}
              onKeyDown={onEnterOrSpace(() => navigate(unlocked ? `/subjects/${id}` : '/pricing'))}
            >
              <div className="subject-glyph">{SUBJECT_GLYPHS[id]}</div>
              <div className="subject-body">
                <h3>
                  {SUBJECT_NAMES[id]}{' '}
                  {unlocked ? (
                    <span className="live">
                      {!isSubscribed && id === focusSubjectId && isTrialing ? 'Trial' : 'Unlocked'}
                    </span>
                  ) : (
                    <span className="live locked-badge">Subscribe to unlock</span>
                  )}
                </h3>
                <p>{unlocked ? `${pct(s.done, s.total)}% complete` : 'Subscribe to unlock this subject.'}</p>
              </div>
              <div className="subject-arrow">&rarr;</div>
            </div>
          )
        })}
      </div>

      <div className="dash-account-row">
        <p>Signed in as {user?.email}</p>
        <div className="hero-ctas">
          {isSubscribed && (
            <button className="pub-btn-ghost" type="button" disabled={billingBusy} onClick={onManageBilling}>
              Manage billing
            </button>
          )}
          <button className="pub-btn-ghost" type="button" onClick={() => void signOut()}>
            Sign out
          </button>
        </div>
      </div>
    </div>
  )
}
