import { useNavigate } from 'react-router-dom'
import { SqLogo } from '../components/SqLogo'
import { ENGLISH_MODULES, textsForModule } from '../lib/content/englishRegistry'
import { textTotals } from '../lib/content/english'
import { onEnterOrSpace } from '../lib/a11y'

const MODULE_BLURB: Record<string, string> = {
  'common-module':
    'How texts represent individual and collective human experiences — studied through Nineteen Eighty-Four.',
  'module-a':
    'A comparative study of two texts in "textual conversation" — The Tempest and Hag-Seed.',
  'module-b': 'A critical study of a single body of literature in depth.',
  'module-c': 'Strengthening your own craft as a writer across imaginative, discursive and persuasive forms.',
}

/**
 * English Advanced's subject hub — one level above LegalSubject/BusinessSubject's
 * topic-card pattern, since English's unit of study is a module (which can
 * contain more than one prescribed text) rather than a flat topic. Cards
 * link into EnglishText (for modules with texts) or the dedicated Module C
 * page (which has no text at all).
 */
export function EnglishHub() {
  const navigate = useNavigate()

  const openModule = (moduleId: string) => {
    const texts = textsForModule(moduleId)
    if (texts.length > 0) {
      navigate(`/subjects/english-advanced/${moduleId}/${texts[0].id}/overview`)
    }
  }

  return (
    <div className="wrap">
      <div className="subject-hero">
        <div className="brand-row">
          <SqLogo size="xs" />
          <span className="brand-row-sep">&middot;</span>
          <span className="eyebrow">HSC English Advanced &middot; Year 12 &middot; NESA Stage 6</span>
        </div>
        <h1>English Advanced</h1>
        <div className="subject-kicker">
          Prescribed Texts, Evidence Banks &amp; Response Training
          <span>Common Module + Modules A/B/C + Paper 1</span>
        </div>
        <p className="lede">
          Every quote, technique and analytical note here is checked against the actual text —
          not generated, not guessed. Built around what you actually need for the exam: evidence
          you can find fast, and practice that builds toward full HSC-style responses.
        </p>
        <button
          className="cta"
          type="button"
          onClick={() => navigate('/subjects/english-advanced/common-module/nineteen-eighty-four/overview')}
        >
          Continue with the Common Module <span className="arw">&rarr;</span>
        </button>
        <button
          className="pub-btn-ghost"
          type="button"
          onClick={() => navigate('/subjects/english-advanced/paper-1/techniques')}
        >
          Paper 1 &middot; Language Techniques <span className="arw">&rarr;</span>
        </button>
      </div>

      <div className="section-label">Modules</div>
      <div className="topic-rows">
        {ENGLISH_MODULES.map((module) => {
          const texts = textsForModule(module.id)
          const totals = texts.map(textTotals)
          const quotes = totals.reduce((sum, t) => sum + t.quotes, 0)
          const techniques = totals.reduce((sum, t) => sum + t.techniques, 0)
          return (
            <div
              key={module.id}
              className="topic-card"
              role="button"
              tabIndex={0}
              onClick={() => openModule(module.id)}
              onKeyDown={onEnterOrSpace(() => openModule(module.id))}
            >
              <div className="spine">{module.name.replace('Module ', '').slice(0, 2).toUpperCase()}</div>
              <div className="topic-inner">
                <div className="topic-text">
                  <div className="yr">Year {module.yearLevel}</div>
                  <h3>{module.name}</h3>
                  <p>{MODULE_BLURB[module.id]}</p>
                  <div className="topic-tags">
                    <span>{texts.map((t) => t.title).join(' & ') || 'Coming soon'}</span>
                    {quotes > 0 && <span>{quotes} quotes</span>}
                    {techniques > 0 && <span>{techniques} techniques</span>}
                  </div>
                </div>
                <div className="topic-go">
                  Open module <span className="arw">&rarr;</span>
                </div>
              </div>
            </div>
          )
        })}

        <div
          className="topic-card"
          role="button"
          tabIndex={0}
          onClick={() => navigate('/subjects/english-advanced/module-c/overview')}
          onKeyDown={onEnterOrSpace(() => navigate('/subjects/english-advanced/module-c/overview'))}
        >
          <div className="spine">MC</div>
          <div className="topic-inner">
            <div className="topic-text">
              <div className="yr">Year 12</div>
              <h3>Module C: The Craft of Writing</h3>
              <p>{MODULE_BLURB['module-c']}</p>
              <div className="topic-tags">
                <span>No fixed prescribed text</span>
              </div>
            </div>
            <div className="topic-go">
              Open module <span className="arw">&rarr;</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
