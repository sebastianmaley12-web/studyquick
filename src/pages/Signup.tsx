import { useState, type FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useProfile } from '../lib/profile'

export function Signup() {
  const navigate = useNavigate()
  const { isConfigured, user, signUp } = useAuth()
  const { hasCompletedOnboarding, loading: profileLoading } = useProfile()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  if (user && !profileLoading) {
    return <Navigate to={hasCompletedOnboarding ? '/dashboard' : '/onboarding'} replace />
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setNotice(null)
    setBusy(true)
    const result = await signUp(name.trim(), email, password)
    setBusy(false)
    if (result.error) {
      setError(result.error)
      return
    }
    setNotice('Check your email to confirm your account, then sign in to get started.')
  }

  return (
    <div className="auth-shell">
      <div className="auth-shell-head">
        <h1>Start your free week</h1>
        <p>One subject, full access, free for 7 days — no payment details needed.</p>
      </div>
      {!isConfigured ? (
        <p className="account-status">Accounts aren&rsquo;t set up on this deployment yet.</p>
      ) : (
        <>
          <div className="auth-card">
            <form onSubmit={onSubmit}>
              <label>
                Name
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </label>
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
                  autoComplete="new-password"
                />
              </label>
              {error && <p className="auth-error">{error}</p>}
              {notice && <p className="auth-notice">{notice}</p>}
              <button className="cta" type="submit" disabled={busy}>
                Create my account
              </button>
            </form>
          </div>
          <p className="auth-switch">
            Already have an account?{' '}
            <button type="button" onClick={() => navigate('/login')}>
              Sign in
            </button>
          </p>
        </>
      )}
    </div>
  )
}
