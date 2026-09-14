import { Link } from 'react-router-dom'
import { SqLogo } from './SqLogo'
import { progressStore, useStorageAvailable } from '../lib/progressStore'
import { useAuth } from '../context/AuthContext'

export function Footer() {
  const storageAvailable = useStorageAvailable()
  const { isConfigured, user } = useAuth()

  function resetAll() {
    if (
      !confirm(
        'This clears every saved answer, quiz score, trivia rating and written note on this device. Continue?',
      )
    )
      return
    progressStore.resetAll()
  }

  return (
    <footer>
      <div className="foot-inner">
        <SqLogo size="md" />
        <p>
          Practice questions only — not official HSC or NESA material &middot; built from the
          official NESA Stage 6 syllabuses &middot; quotes and evidence checked against their
          original sources
          <br />
          {user
            ? 'Your answers, scores and notes are synced to your account, so they follow you across devices.'
            : isConfigured
              ? 'Your answers, scores and notes are saved in this browser on this device only — nothing is uploaded anywhere unless you sign in.'
              : 'Your answers, scores and notes are saved in this browser on this device only — nothing is uploaded anywhere.'}
        </p>
        <button className="btn danger" type="button" onClick={resetAll}>
          Reset all progress
        </button>
        <p className="foot-legal-links">
          <Link to="/terms">Terms</Link> &middot; <Link to="/privacy">Privacy</Link>
        </p>
      </div>
      {!storageAvailable && (
        <div className="wrap">
          <div className="note-box rust" style={{ marginBottom: '26px' }}>
            <b>Progress can&rsquo;t be saved.</b> This browser is blocking local storage, so answers
            and scores will be lost when you close the page. Opening the file directly (rather than
            in a private window) usually fixes it.
          </div>
        </div>
      )}
    </footer>
  )
}
