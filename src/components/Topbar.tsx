import { lazy, Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import { SqLogo } from './SqLogo'
import { useAuth } from '../context/AuthContext'

const Breadcrumbs = lazy(() =>
  import('./Breadcrumbs').then((m) => ({ default: m.Breadcrumbs })),
)

export function Topbar() {
  const navigate = useNavigate()
  const { isConfigured, user } = useAuth()

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <button
          className="tb-brand"
          type="button"
          title="Dashboard"
          onClick={() => navigate(isConfigured && user ? '/dashboard' : '/')}
        >
          <SqLogo size="sm" />
        </button>
        <Suspense fallback={null}>
          <Breadcrumbs />
        </Suspense>
        <button className="tb-progress" type="button" onClick={() => navigate('/progress')}>
          Your progress
        </button>
        {isConfigured && (
          <button
            className="tb-progress"
            type="button"
            onClick={() => navigate(user ? '/dashboard' : '/login')}
          >
            {user ? 'Dashboard' : 'Sign in'}
          </button>
        )}
        <span className="tb-hint">
          Press <b>/</b> to search &middot; <b>[</b> to retract
        </span>
      </div>
    </header>
  )
}
