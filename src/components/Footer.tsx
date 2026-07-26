import { SqLogo } from './SqLogo'
import { progressStore, useStorageAvailable } from '../lib/progressStore'

export function Footer() {
  const storageAvailable = useStorageAvailable()

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
          Practice questions only — not official HSC or NESA material &middot; built from Task 4,
          Term 3 notification and the NESA Modern History Stage 6 Syllabus (2017) &middot; historian
          quotes verified against published sources
          <br />
          Your answers, scores and notes are saved in this browser on this device only — nothing is
          uploaded anywhere.
        </p>
        <button className="btn danger" type="button" onClick={resetAll}>
          Reset all progress
        </button>
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
