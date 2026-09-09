import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  useProfile,
  IMPROVEMENT_GOAL_LABELS,
  STUDY_STYLE_LABELS,
  type Year,
  type ImprovementGoal,
  type StudyStyle,
} from '../lib/profile'
import { ONBOARDING_SUBJECT_IDS, SUBJECT_NAMES } from '../lib/entitlement'

type Answers = {
  year: Year | null
  subjectsStudying: string[]
  focusSubjectId: string | null
  improvementGoal: ImprovementGoal | null
  studyStyle: StudyStyle | null
  biggestChallenge: string
}

const EMPTY_ANSWERS: Answers = {
  year: null,
  subjectsStudying: [],
  focusSubjectId: null,
  improvementGoal: null,
  studyStyle: null,
  biggestChallenge: '',
}

const TOTAL_STEPS = 6

export function Onboarding() {
  const navigate = useNavigate()
  const { user, loading: authLoading } = useAuth()
  const { hasCompletedOnboarding, loading: profileLoading, update } = useProfile()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>(EMPTY_ANSWERS)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  // update() below sets onboarding_completed_at optimistically in local
  // profile state as soon as it resolves, which would otherwise make the
  // "already onboarded" redirect just below fire and race the explicit
  // navigate('/onboarding/results') call at the end of onContinue() — this
  // flag says "we're already navigating ourselves, don't redirect".
  const [justCompleted, setJustCompleted] = useState(false)

  if (!authLoading && !user) return <Navigate to="/signup" replace />
  if (!justCompleted && !profileLoading && hasCompletedOnboarding) {
    return <Navigate to="/dashboard" replace />
  }

  const canContinue =
    (step === 0 && answers.year !== null) ||
    (step === 1 && answers.subjectsStudying.length > 0) ||
    (step === 2 && answers.focusSubjectId !== null) ||
    (step === 3 && answers.improvementGoal !== null) ||
    (step === 4 && answers.studyStyle !== null) ||
    step === 5

  async function onContinue() {
    if (step < TOTAL_STEPS - 1) {
      setStep(step + 1)
      return
    }
    setSubmitting(true)
    setError(null)
    setJustCompleted(true)
    const { error: err } = await update({
      year: answers.year,
      subjects_studying: answers.subjectsStudying,
      focus_subject_id: answers.focusSubjectId,
      improvement_goal: answers.improvementGoal,
      study_style: answers.studyStyle,
      biggest_challenge: answers.biggestChallenge.trim() || null,
      onboarding_completed_at: new Date().toISOString(),
    })
    setSubmitting(false)
    if (err) {
      setError(err)
      return
    }
    navigate('/onboarding/results')
  }

  function toggleSubject(id: string) {
    setAnswers((a) => {
      const has = a.subjectsStudying.includes(id)
      const subjectsStudying = has
        ? a.subjectsStudying.filter((s) => s !== id)
        : [...a.subjectsStudying, id]
      // Keep the focus pick valid — clear it if it's no longer a studied subject
      const focusSubjectId = a.focusSubjectId && !subjectsStudying.includes(a.focusSubjectId)
        ? null
        : a.focusSubjectId
      return { ...a, subjectsStudying, focusSubjectId }
    })
  }

  return (
    <div className="survey-shell">
      <div className="survey-progress">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div
            key={i}
            className={`survey-progress-dot${i < step ? ' done' : i === step ? ' active' : ''}`}
          />
        ))}
      </div>
      <div className="survey-step-label">
        Step {step + 1} of {TOTAL_STEPS}
      </div>

      {step === 0 && (
        <div className="survey-question survey-radio">
          <h2>What year are you in?</h2>
          <p className="survey-hint">This helps us show you the right level of content.</p>
          <div className="survey-options">
            {(['11', '12'] as const).map((y) => (
              <button
                key={y}
                type="button"
                className={`survey-option${answers.year === y ? ' selected' : ''}`}
                onClick={() => setAnswers((a) => ({ ...a, year: y }))}
              >
                <span className="survey-option-check">&#10003;</span>
                Year {y}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="survey-question">
          <h2>What subjects are you studying?</h2>
          <p className="survey-hint">Select every subject you&rsquo;d like on StudyQuick.</p>
          <div className="survey-options">
            {ONBOARDING_SUBJECT_IDS.map((id) => (
              <button
                key={id}
                type="button"
                className={`survey-option${answers.subjectsStudying.includes(id) ? ' selected' : ''}`}
                onClick={() => toggleSubject(id)}
              >
                <span className="survey-option-check">&#10003;</span>
                {SUBJECT_NAMES[id]}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="survey-question survey-radio">
          <h2>Which subject do you want to focus on first?</h2>
          <p className="survey-hint">This is the subject you&rsquo;ll get free for your first 7 days.</p>
          <div className="survey-options">
            {answers.subjectsStudying.map((id) => (
              <button
                key={id}
                type="button"
                className={`survey-option${answers.focusSubjectId === id ? ' selected' : ''}`}
                onClick={() => setAnswers((a) => ({ ...a, focusSubjectId: id }))}
              >
                <span className="survey-option-check">&#10003;</span>
                {SUBJECT_NAMES[id]}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="survey-question survey-radio">
          <h2>What are you mainly trying to improve?</h2>
          <div className="survey-options">
            {(Object.keys(IMPROVEMENT_GOAL_LABELS) as ImprovementGoal[]).map((goal) => (
              <button
                key={goal}
                type="button"
                className={`survey-option${answers.improvementGoal === goal ? ' selected' : ''}`}
                onClick={() => setAnswers((a) => ({ ...a, improvementGoal: goal }))}
              >
                <span className="survey-option-check">&#10003;</span>
                {IMPROVEMENT_GOAL_LABELS[goal]}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="survey-question survey-radio">
          <h2>How do you normally study?</h2>
          <div className="survey-options">
            {(Object.keys(STUDY_STYLE_LABELS) as StudyStyle[]).map((style) => (
              <button
                key={style}
                type="button"
                className={`survey-option${answers.studyStyle === style ? ' selected' : ''}`}
                onClick={() => setAnswers((a) => ({ ...a, studyStyle: style }))}
              >
                <span className="survey-option-check">&#10003;</span>
                {STUDY_STYLE_LABELS[style]}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 5 && (
        <div className="survey-question">
          <h2>What&rsquo;s your biggest challenge right now?</h2>
          <p className="survey-hint">Optional — helps us personalise your dashboard.</p>
          <textarea
            className="survey-textarea"
            value={answers.biggestChallenge}
            onChange={(e) => setAnswers((a) => ({ ...a, biggestChallenge: e.target.value }))}
            placeholder="e.g. I run out of time in exams, or I don't know what to revise first…"
          />
        </div>
      )}

      {error && <p className="auth-error">{error}</p>}

      <div className="survey-nav">
        <button
          className="survey-back"
          type="button"
          disabled={step === 0}
          onClick={() => setStep((s) => Math.max(0, s - 1))}
        >
          &larr; Back
        </button>
        <button className="cta" type="button" disabled={!canContinue || submitting} onClick={onContinue}>
          {step === TOTAL_STEPS - 1 ? "Finish" : 'Continue'} <span className="arw">&rarr;</span>
        </button>
      </div>
    </div>
  )
}
