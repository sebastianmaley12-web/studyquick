import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useProfile } from '../lib/profile'
import { ONBOARDING_SUBJECT_IDS, SUBJECT_NAMES } from '../lib/entitlement'

const SUBJECT_GLYPHS: Record<string, string> = {
  maths: '∫',
  'modern-history': '🏛',
  hms: '⚕',
  business: '💼',
}

const SUBJECT_BLURBS: Record<string, string> = {
  maths: 'Every syllabus topic with worked formulae and answer-entry practice that marks itself as you type.',
  'modern-history': 'Syllabus summaries, sourced practice questions with answer plans, and exam-style quizzes.',
  hms: 'Both HSC focus areas covered in full, with real exam-style questions and model answers.',
  business: 'All four HSC topics — Operations, Marketing, Finance, HR — with case-study practice.',
}

const PILLARS = [
  {
    icon: '🎓',
    title: 'Self-guided tutoring',
    body: 'The structure and resources of tutoring, built so you can work through them independently, on your own schedule.',
  },
  {
    icon: '📚',
    title: 'Everything in one place',
    body: "No more switching between notes, textbooks, past papers and random websites — your whole subject lives in one place.",
  },
  {
    icon: '🎯',
    title: 'Exam improvement',
    body: 'Active practice, not passive reading — quizzes, exam-style questions and progress tracking show you exactly what to work on.',
  },
  {
    icon: '⏱',
    title: 'Study at your own pace',
    body: 'Structured support without needing to book a session — study when it suits you, at the pace that suits you.',
  },
]

const LOOP_STEPS = [
  { label: 'Learn', body: 'Work through clear syllabus summaries for every dot point.' },
  { label: 'Practise', body: 'Answer exam-style questions with full worked answer plans.' },
  { label: 'Test', body: 'Mark yourself with quizzes and trivia under real exam conditions.' },
  { label: 'Improve', body: 'See exactly where you’re weak, review it, and track it closing.' },
]

const HOW_IT_WORKS = [
  { title: 'Tell StudyQuick what you’re studying', body: 'A short survey personalises your setup around your subjects and goals — no account needed yet.' },
  { title: 'Create your account', body: 'Sign up with your name, email and a password — nothing else needed.' },
  { title: 'Start your free week', body: 'Full access to the subject you chose, free for 7 days — no payment details required.' },
  { title: 'Study, practise and track your progress', body: 'Work through the Learn → Practise → Test → Improve loop and watch it add up.' },
]

export function Landing() {
  const navigate = useNavigate()
  const { isConfigured, user, loading: authLoading } = useAuth()
  const { hasCompletedOnboarding, loading: profileLoading } = useProfile()

  if (isConfigured && user && !authLoading && !profileLoading) {
    return <Navigate to={hasCompletedOnboarding ? '/dashboard' : '/onboarding'} replace />
  }

  return (
    <>
      <section className="mkt-hero">
        <div className="mkt-hero-inner">
          <span className="mkt-hero-badge">Self-guided HSC tutoring</span>
          <h1>
            Your HSC tutor. <span className="hl">Your study plan.</span> Your progress.
          </h1>
          <p className="mkt-hero-sub">
            Self-guided tutoring designed to help you understand your subjects, practise
            exam-style questions and improve where it matters most — all in one place.
          </p>
          <div className="hero-ctas">
            <button
              className="cta"
              type="button"
              onClick={() => navigate(isConfigured ? '/onboarding' : '/subjects/modern-history')}
            >
              Start your free week <span className="arw">&rarr;</span>
            </button>
            <a className="cta-secondary" href="#how-it-works">
              See how it works
            </a>
          </div>
          <p className="mkt-hero-note">No payment details required to start your free week.</p>
        </div>
      </section>

      <section className="mkt-section tight">
        <div className="mkt-pillars">
          {PILLARS.map((p) => (
            <div className="mkt-pillar" key={p.title}>
              <div className="mkt-pillar-ic">{p.icon}</div>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mkt-section">
        <div className="mkt-section-head">
          <span className="mkt-eyebrow">The StudyQuick loop</span>
          <h2>A structure that actually improves your marks</h2>
          <p>
            Reading notes tells you what you know. Practising tells you what you don&rsquo;t. The
            loop is built around the second one.
          </p>
        </div>
        <div className="mkt-loop">
          {LOOP_STEPS.map((step, i) => (
            <div className={`mkt-loop-step${i === LOOP_STEPS.length - 1 ? ' mkt-loop-improve' : ''}`} key={step.label}>
              <span className="mkt-loop-n">{i + 1}</span>
              <h4>{step.label}</h4>
              <p>{step.body}</p>
              {i < LOOP_STEPS.length - 1 && <span className="mkt-loop-arrow">&darr;</span>}
            </div>
          ))}
        </div>
      </section>

      <section className="mkt-section">
        <div className="mkt-section-head">
          <span className="mkt-eyebrow">Subjects</span>
          <h2>Everything currently supported</h2>
          <p>More subjects are on the way — every new one drops into the same structure.</p>
        </div>
        <div className="mkt-subject-grid">
          {ONBOARDING_SUBJECT_IDS.map((id) => (
            <div className="mkt-subject-card" key={id}>
              <div className="subject-glyph">{SUBJECT_GLYPHS[id]}</div>
              <h3>{SUBJECT_NAMES[id]}</h3>
              <p>{SUBJECT_BLURBS[id]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mkt-section" id="how-it-works">
        <div className="mkt-section-head">
          <span className="mkt-eyebrow">How it works</span>
          <h2>From first visit to your first study session</h2>
        </div>
        <div className="how-grid">
          {HOW_IT_WORKS.map((step, i) => (
            <div className="how-card" key={step.title}>
              <span className="how-n">{i + 1}</span>
              <h4>{step.title}</h4>
              <p>{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mkt-section">
        <div className="mkt-cta-band">
          <h2>Ready to see what StudyQuick recommends for you?</h2>
          <p>
            Tell us what you&rsquo;re studying, create a free account, and try one subject in
            full for 7 days.
          </p>
          <button
            className="cta"
            type="button"
            onClick={() => navigate(isConfigured ? '/onboarding' : '/subjects/modern-history')}
          >
            Start your free week <span className="arw">&rarr;</span>
          </button>
        </div>
      </section>
    </>
  )
}
