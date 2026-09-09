import { Suspense } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { SqSprite } from '../components/SqSprite'
import { SqLogo } from '../components/SqLogo'
import { useAuth } from '../context/AuthContext'

/** Layout for the marketing/funnel pages (landing, login, signup,
 * onboarding, pricing) — a minimal nav and a light footer, deliberately
 * not the study app's Topbar/Footer (search hints, "reset all progress",
 * breadcrumbs — none of that belongs on a page a first-time visitor lands
 * on). AppLayout still wraps the dashboard and every /subjects/* route. */
export function PublicLayout() {
  const navigate = useNavigate()
  const { isConfigured, user } = useAuth()

  return (
    <>
      <SqSprite />
      <header className="pub-header">
        <div className="pub-header-inner">
          <button className="pub-brand" type="button" onClick={() => navigate('/')}>
            <SqLogo size="sm" />
          </button>
          <nav className="pub-nav">
            <a href="#how-it-works">How it works</a>
            <button className="pub-link" type="button" onClick={() => navigate('/pricing')}>
              Pricing
            </button>
          </nav>
          <div className="pub-header-actions">
            {isConfigured && user ? (
              <button className="pub-btn-primary" type="button" onClick={() => navigate('/dashboard')}>
                Dashboard
              </button>
            ) : isConfigured ? (
              <>
                <button className="pub-btn-ghost" type="button" onClick={() => navigate('/login')}>
                  Sign in
                </button>
                <button className="pub-btn-primary" type="button" onClick={() => navigate('/signup')}>
                  Get started
                </button>
              </>
            ) : (
              <button
                className="pub-btn-primary"
                type="button"
                onClick={() => navigate('/subjects/modern-history')}
              >
                Start revising
              </button>
            )}
          </div>
        </div>
      </header>
      <main className="pub-main">
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
      <footer className="pub-footer">
        <div className="pub-footer-inner">
          <p>
            StudyQuick — self-guided HSC tutoring. Practice questions only, not official HSC or
            NESA material.
          </p>
          <div className="pub-footer-links">
            <button type="button" onClick={() => navigate('/pricing')}>
              Pricing
            </button>
            {isConfigured && !user && (
              <button type="button" onClick={() => navigate('/login')}>
                Sign in
              </button>
            )}
          </div>
        </div>
      </footer>
    </>
  )
}
