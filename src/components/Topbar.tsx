import { useNavigate } from 'react-router-dom'
import { SqLogo } from './SqLogo'
import { Breadcrumbs } from './Breadcrumbs'

export function Topbar() {
  const navigate = useNavigate()

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <button
          className="tb-brand"
          type="button"
          title="All subjects"
          onClick={() => navigate('/')}
        >
          <SqLogo size="sm" />
        </button>
        <Breadcrumbs />
        <span className="tb-hint">
          Press <b>/</b> to search &middot; <b>[</b> to retract
        </span>
      </div>
    </header>
  )
}
