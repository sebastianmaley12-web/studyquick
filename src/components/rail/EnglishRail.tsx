import { useNavigate } from 'react-router-dom'
import { Rail } from './Rail'
import {
  ENGLISH_RESOURCES,
  ENGLISH_RESOURCE_LABELS,
  type EnglishResource,
  type EnglishModule,
  type EnglishText,
} from '../../lib/content/english'
import { ENGLISH_MODULES } from '../../lib/content/englishRegistry'

/**
 * English Advanced's rail — one level deeper than LegalRail/HistoryRail
 * because a module can hold more than one text: it shows a module switcher,
 * a text switcher (when the current module has more than one), the current
 * text's resource tabs, and a link out to Paper 1 as a sibling area.
 *
 * `currentResource` also accepts `'paper-1'` so the Paper 1 area (a
 * sibling of every text hub, not one more resource tab within it) can
 * highlight correctly instead of falsely lighting up "Text Overview".
 */
export function EnglishRail({
  module,
  siblingTexts,
  text,
  currentResource,
}: {
  module: EnglishModule
  siblingTexts: EnglishText[]
  text: EnglishText
  currentResource: EnglishResource | 'paper-1'
}) {
  const navigate = useNavigate()

  return (
    <Rail
      backTo="/subjects/english-advanced"
      backTitle="Back to English Advanced"
      title="English Advanced"
      subtitle={module.name}
    >
      <div className="rail-label">Modules</div>
      <div className="side-section active">
        <div className="side-sub">
          {ENGLISH_MODULES.map((m) => (
            <button
              key={m.id}
              className={['side-sub-btn', m.id === module.id && 'active'].filter(Boolean).join(' ')}
              type="button"
              onClick={() => {
                if (m.id === module.id) return
                navigate(`/subjects/english-advanced`)
              }}
            >
              {m.name.replace(/^Module [ABC]: /, '').replace(/^Common Module: /, '')}
            </button>
          ))}
          <button
            className="side-sub-btn"
            type="button"
            onClick={() => navigate('/subjects/english-advanced/module-c/overview')}
          >
            Craft of Writing
          </button>
        </div>
      </div>

      {siblingTexts.length > 1 && (
        <>
          <div className="rail-label">Text</div>
          <div className="side-section active">
            <div className="side-sub">
              {siblingTexts.map((t) => (
                <button
                  key={t.id}
                  className={['side-sub-btn', t.id === text.id && 'active'].filter(Boolean).join(' ')}
                  type="button"
                  onClick={() => navigate(`/subjects/english-advanced/${module.id}/${t.id}/${currentResource === 'paper-1' ? 'overview' : currentResource}`)}
                >
                  {t.title}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="rail-label">{text.title}</div>
      <div className="side-section active">
        <div className="side-sub">
          {ENGLISH_RESOURCES.map((res) => (
            <button
              key={res}
              className={['side-sub-btn', res === currentResource && 'active'].filter(Boolean).join(' ')}
              type="button"
              onClick={() => navigate(`/subjects/english-advanced/${module.id}/${text.id}/${res}`)}
            >
              {ENGLISH_RESOURCE_LABELS[res]}
            </button>
          ))}
        </div>
      </div>

      <div className="rail-label">Paper 1</div>
      <div className="side-section active">
        <div className="side-sub">
          <button
            className={['side-sub-btn', currentResource === 'paper-1' && 'active'].filter(Boolean).join(' ')}
            type="button"
            onClick={() => navigate('/subjects/english-advanced/paper-1/techniques')}
          >
            Language Techniques
          </button>
        </div>
      </div>
    </Rail>
  )
}
