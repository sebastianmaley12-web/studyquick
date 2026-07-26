import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { SqLogo } from '../SqLogo'
import { useRailUi } from '../../context/RailUiContext'

type RailProps = {
  backTo: string
  backTitle: string
  title: string
  subtitle: string
  children: ReactNode
}

export function Rail({ backTo, backTitle, title, subtitle, children }: RailProps) {
  const { collapsed, toggleCollapsed, mobileOpen } = useRailUi()
  const navigate = useNavigate()

  return (
    <aside
      className={['rail', collapsed && 'collapsed', mobileOpen && 'open'].filter(Boolean).join(' ')}
    >
      <div className="rail-brand">
        <button
          className="rail-logo"
          type="button"
          title="All subjects"
          onClick={() => navigate('/')}
        >
          <SqLogo size="sm" />
        </button>
        <button
          className="rail-collapse"
          type="button"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar (press [ )'}
          onClick={toggleCollapsed}
        >
          {collapsed ? '↝' : '↜'}
        </button>
      </div>
      <div className="rail-head">
        <button
          className="rail-back"
          type="button"
          title={backTitle}
          onClick={() => navigate(backTo)}
        >
          &larr;
        </button>
        <div className="rail-title">
          {title}
          <span>{subtitle}</span>
        </div>
      </div>
      <div className="rail-scroll">{children}</div>
    </aside>
  )
}
