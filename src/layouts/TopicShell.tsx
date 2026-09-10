import { useEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { useRailUi } from '../context/RailUiContext'

type TopicShellProps = {
  rail: ReactNode
  searchbar?: ReactNode
  children: ReactNode
}

export function TopicShell({ rail, searchbar, children }: TopicShellProps) {
  const { mobileOpen, openMobile, closeMobile } = useRailUi()
  const { pathname } = useLocation()

  // matches the original app's route() calling closeDrawer() on every navigation
  useEffect(() => {
    closeMobile()
  }, [pathname, closeMobile])

  // React Router doesn't reset scroll position on client-side navigation —
  // without this, switching topics (or resource tabs) leaves the page
  // wherever the previous one was scrolled to.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <div
        className={['scrim', mobileOpen && 'show'].filter(Boolean).join(' ')}
        onClick={closeMobile}
      />
      <div className="topic-shell">
        {rail}
        <div className="topic-col">
          <div className="topic-topbar">
            <button className="rail-open" type="button" onClick={openMobile}>
              <span className="bars">
                <span />
                <span />
                <span />
              </span>
              Topics
            </button>
            {searchbar}
          </div>
          <main>{children}</main>
        </div>
      </div>
    </>
  )
}
