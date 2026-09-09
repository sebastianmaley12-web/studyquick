import { useState, type FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useProfile } from '../lib/profile'

export function Login() {
  const navigate = useNavigate()
  const { isConfigured, user, signIn } = useAuth()
  const { hasCompletedOnboarding, loading: profileLoading } = useProfile()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  if (user && !profileLoading) {
    return <Navigate to={hasCompletedOnboarding ? '/dashboard' : '/onboarding'} replace />
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setBusy(true)
    const result = await signIn(email, password)
    setBusy(false)
    if (result.error) setError(result.error)
  }

  return (
    <div className="auth-shell">
      <div className="auth-shell-head">
        <h1>Welcome back</h1>
        <p>Sign in to keep studying where you left off.</p>
      </div>
      {!isConfigured ? (
        <p className="account-status">Accounts aren&rsquo;t set up on this deployment yet.</p>
      ) : (
        <>
          <div className="auth-card">
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </label>
              {error && <p className="auth-error">{error}</p>}
              <button className="cta" type="submit" disabled={busy}>
                Sign in
              </button>
            </form>
          </div>
          <p className="auth-switch">
            New to StudyQuick?{' '}
            <button type="button" onClick={() => navigate('/onboarding')}>
              Start your free week
            </button>
          </p>
        </>
      )}
    </div>
  )
}
