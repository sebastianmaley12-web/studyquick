import { useNavigate } from 'react-router-dom'
import { Rail } from './Rail'
import {
  ENGLISH_RESOURCES,
  ENGLISH_RESOURCE_LABELS,
  type EnglishResource,
  type EnglishText,
} from '../../lib/content/english'

/**
 * English Advanced's rail — structurally like LegalRail/HistoryRail (reuses
 * the shared Rail shell) but one level shallower: a single module/text
 * hub's resources, rather than a list of topics each with the same four
 * resources. Once more than one text/module exists this needs a
 * topic-style level above it — not needed while there's only one.
 *
 * `currentResource` also accepts `'paper-1'` so the Paper 1 area (a
 * sibling of the text hub, not one more resource tab within it) can
 * highlight correctly instead of falsely lighting up "Text Overview".
 */
export function EnglishRail({
  text,
  currentResource,
}: {
  text: EnglishText
  currentResource: EnglishResource | 'paper-1'
}) {
  const navigate = useNavigate()

  return (
    <Rail
      backTo="/subjects/english-advanced"
      backTitle="Back to English Advanced"
      title="English Advanced"
      subtitle="Common Module"
    >
      <div className="rail-label">{text.title}</div>
      <div className="side-section active">
        <div className="side-sub">
          {ENGLISH_RESOURCES.map((res) => (
            <button
              key={res}
              className={['side-sub-btn', res === currentResource && 'active'].filter(Boolean).join(' ')}
              type="button"
              onClick={() => navigate(`/subjects/english-advanced/${res}`)}
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
