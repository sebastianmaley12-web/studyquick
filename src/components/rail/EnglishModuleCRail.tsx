import { useNavigate } from 'react-router-dom'
import { Rail } from './Rail'
import { MODULE_C_RESOURCES, MODULE_C_RESOURCE_LABELS, type ModuleCResource } from '../../lib/content/english'
import { ENGLISH_MODULES } from '../../lib/content/englishRegistry'

export function EnglishModuleCRail({ currentResource }: { currentResource: ModuleCResource }) {
  const navigate = useNavigate()

  return (
    <Rail
      backTo="/subjects/english-advanced"
      backTitle="Back to English Advanced"
      title="English Advanced"
      subtitle="Module C: Craft of Writing"
    >
      <div className="rail-label">Modules</div>
      <div className="side-section active">
        <div className="side-sub">
          {ENGLISH_MODULES.map((m) => (
            <button
              key={m.id}
              className="side-sub-btn"
              type="button"
              onClick={() => navigate(`/subjects/english-advanced/${m.id}/${m.textIds[0]}/overview`)}
            >
              {m.name.replace(/^Module [ABC]: /, '').replace(/^Common Module: /, '')}
            </button>
          ))}
          <button className="side-sub-btn active" type="button" disabled>
            Craft of Writing
          </button>
        </div>
      </div>

      <div className="rail-label">Module C</div>
      <div className="side-section active">
        <div className="side-sub">
          {MODULE_C_RESOURCES.map((res) => (
            <button
              key={res}
              className={['side-sub-btn', res === currentResource && 'active'].filter(Boolean).join(' ')}
              type="button"
              onClick={() => navigate(`/subjects/english-advanced/module-c/${res}`)}
            >
              {MODULE_C_RESOURCE_LABELS[res]}
            </button>
          ))}
        </div>
      </div>

      <div className="rail-label">Paper 1</div>
      <div className="side-section active">
        <div className="side-sub">
          <button className="side-sub-btn" type="button" onClick={() => navigate('/subjects/english-advanced/paper-1/techniques')}>
            Language Techniques
          </button>
        </div>
      </div>
    </Rail>
  )
}
