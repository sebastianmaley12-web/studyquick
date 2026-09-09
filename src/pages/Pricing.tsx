import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useEntitlement } from '../lib/entitlement'
import { SUBSCRIPTION_PRICE_LABEL } from '../lib/pricing'
import { callBillingApi } from '../lib/billingApi'

/** One plan today. The billing API (api/create-checkout-session.ts) takes a
 * single STRIPE_PRICE_ID env var — adding a yearly option or a subject-only
 * tier later is a matter of adding entries here plus another Price id
 * server-side, not a data-model change (subscriptions.status/current_
 * period_end already generalise across interval and plan). */
const PLAN = {
  name: 'StudyQuick Unlimited',
  price: SUBSCRIPTION_PRICE_LABEL,
  features: [
    'Every subject unlocked',
    'Unlimited practice questions, trivia and quizzes',
    'Progress tracking and spaced-review reminders',
    'Synced across every device you sign in on',
    'Cancel any time',
  ],
}

export function Pricing() {
  const navigate = useNavigate()
  const { isConfigured, user } = useAuth()
  const { isSubscribed } = useEntitlement()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubscribe() {
    if (!user) {
      navigate('/onboarding')
      return
    }
    setBusy(true)
    setError(null)
    const { url, error: err } = await callBillingApi('/api/create-checkout-session')
    setBusy(false)
    if (url) window.location.href = url
    else setError(err ?? 'Could not start checkout.')
  }

  return (
    <div className="pricing-shell">
      <span className="mkt-eyebrow">Pricing</span>
      <h1>One simple plan</h1>
      <p>Try your first subject free for 7 days. Subscribe whenever you want the rest unlocked too.</p>

      <div className="pricing-card">
        <div className="pricing-card-name">{PLAN.name}</div>
        <div className="pricing-card-price">
          <span className="amount">{PLAN.price.split('/')[0]}</span>
          <span className="period">/{PLAN.price.split('/')[1] ?? 'month'}</span>
        </div>
        <p className="pricing-card-note">Cancel any time — no lock-in contract.</p>
        <ul className="pricing-features">
          {PLAN.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>

        {isSubscribed ? (
          <button className="cta" type="button" onClick={() => navigate('/dashboard')}>
            You&rsquo;re subscribed — go to dashboard
          </button>
        ) : (
          <button className="cta" type="button" disabled={busy} onClick={onSubscribe}>
            {user ? 'Subscribe' : 'Create an account to subscribe'}
          </button>
        )}
        {error && <p className="auth-error">{error}</p>}
        {!isConfigured && (
          <p className="pricing-unconfigured">
            Payments aren&rsquo;t connected on this deployment yet — this button won&rsquo;t
            charge anything until Stripe is configured.
          </p>
        )}
      </div>
    </div>
  )
}
