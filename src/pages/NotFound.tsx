import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function NotFound() {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <div className="results-shell">
      <h1>Page not found</h1>
      <p className="results-summary">
        That link doesn&rsquo;t match anything in StudyQuick — it may be out of date or mistyped.
      </p>
      <button
        className="cta"
        type="button"
        onClick={() => navigate(user ? '/dashboard' : '/')}
      >
        {user ? 'Back to Dashboard' : 'Back to StudyQuick'} <span className="arw">&rarr;</span>
      </button>
    </div>
  )
}
