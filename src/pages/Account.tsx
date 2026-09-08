import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useEntitlement } from '../lib/entitlement'
import { supabase } from '../lib/supabase/client'
import { SUBSCRIPTION_PRICE_LABEL } from '../lib/pricing'

async function callApi(path: string): Promise<{ url?: string; error?: string }> {
  const { data } = await supabase!.auth.getSession()
  const token = data.session?.access_token
  const res = await fetch(path, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.json()
}

function AuthForms() {
  const { signIn, signUp } = useAuth()
  const [mode, setMode] = useState<'signin' | 'signup'>('signup')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setNotice(null)
    setBusy(true)
    const result = mode === 'signup' ? await signUp(email, password) : await signIn(email, password)
    setBusy(false)
    if (result.error) {
      setError(result.error)
      return
    }
    if (mode === 'signup') {
      setNotice('Check your email to confirm your account, then sign in.')
    }
  }

  return (
    <div className="auth-card">
      <div className="auth-tabs">
        <button
          type="button"
          className={mode === 'signup' ? 'active' : ''}
          onClick={() => setMode('signup')}
        >
          Start free trial
        </button>
        <button
          type="button"
          className={mode === 'signin' ? 'active' : ''}
          onClick={() => setMode('signin')}
        >
          Sign in
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <label>
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </label>
        <label>
          Password
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
          />
        </label>
        {error && <p className="auth-error">{error}</p>}
        {notice && <p className="auth-notice">{notice}</p>}
        <button className="cta" type="submit" disabled={busy}>
          {mode === 'signup' ? 'Create account' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}

function AccountPanel() {
  const { user, signOut } = useAuth()
  const { isTrialing, isSubscribed, trialEndsAt, loading } = useEntitlement()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubscribe() {
    setBusy(true)
    setError(null)
    try {
      const { url, error } = await callApi('/api/create-checkout-session')
      if (url) window.location.href = url
      else setError(error ?? 'Could not start checkout.')
    } finally {
      setBusy(false)
    }
  }

  async function onManageBilling() {
    setBusy(true)
    setError(null)
    try {
      const { url, error } = await callApi('/api/create-portal-session')
      if (url) window.location.href = url
      else setError(error ?? 'Could not open billing.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="auth-card">
      <p className="account-email">Signed in as {user!.email}</p>

      {loading ? null : isSubscribed ? (
        <>
          <p className="account-status ok">Subscription active — every subject unlocked.</p>
          <button className="cta" type="button" disabled={busy} onClick={onManageBilling}>
            Manage billing
          </button>
        </>
      ) : isTrialing ? (
        <>
          <p className="account-status">
            Free trial active — every subject unlocked until{' '}
            {trialEndsAt?.toLocaleDateString()}.
          </p>
          <button className="cta" type="button" disabled={busy} onClick={onSubscribe}>
            Subscribe now
          </button>
        </>
      ) : (
        <>
          <p className="account-status">
            Your trial has ended. Subscribe to keep every subject unlocked.
          </p>
          <button className="cta" type="button" disabled={busy} onClick={onSubscribe}>
            Subscribe
          </button>
        </>
      )}
      {error && <p className="auth-error">{error}</p>}

      <button className="account-signout" type="button" onClick={() => void signOut()}>
        Sign out
      </button>
    </div>
  )
}

export function Account() {
  const { isConfigured, user, loading } = useAuth()

  return (
    <div className="wrap">
      <div className="account-page">
        <h1>Account</h1>
        {!isConfigured ? (
          <p className="account-status">
            Accounts aren&rsquo;t set up on this deployment yet — every subject is free for now.
          </p>
        ) : loading ? null : user ? (
          <AccountPanel />
        ) : (
          <>
            <p className="hero-sub">
              One subject is always free. Create an account for a 7-day free trial of every
              subject, then {SUBSCRIPTION_PRICE_LABEL} for full access.
            </p>
            <AuthForms />
          </>
        )}
      </div>
    </div>
  )
}
