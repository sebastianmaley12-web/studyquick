import { useNavigate } from 'react-router-dom'
import { Rail } from './Rail'
import {
  LEGAL_RESOURCES,
  LEGAL_RESOURCE_LABELS,
  legalTopics,
  type LegalResource,
  type LegalTopicId,
} from '../../lib/content/legal'
import { useProgress } from '../../lib/progressStore'
import { historyTopicStats } from '../../lib/progressStats'

type LegalRailProps = {
  currentTopicId: LegalTopicId
  currentResource: LegalResource
}

export function LegalRail({ currentTopicId, currentResource }: LegalRailProps) {
  const navigate = useNavigate()
  const progress = useProgress()

  return (
    <Rail
      backTo="/subjects/legal"
      backTitle="Back to Legal Studies"
      title="Legal Studies"
      subtitle="4 topics"
    >
      <div className="rail-label">Topics &amp; resources</div>
      {legalTopics.map((topic) => {
        const isActive = topic.id === currentTopicId
        const stats = historyTopicStats(progress, topic)
        return (
          <div
            key={topic.id}
            className={['side-section', isActive && 'active'].filter(Boolean).join(' ')}
            data-section={topic.id}
          >
            <button
              className="side-section-btn"
              type="button"
              onClick={() =>
                navigate(`/subjects/legal/${topic.id}/${isActive ? currentResource : 'summary'}`)
              }
            >
              <span className="roman">{topic.short.slice(0, 2).toUpperCase()}</span>
              <span className="slabel" dangerouslySetInnerHTML={{ __html: topic.short }} />
            </button>
            <div className="side-sub">
              {LEGAL_RESOURCES.map((res) => {
                const count =
                  res === 'summary'
                    ? topic.summaryPointCount
                    : res === 'practice'
                      ? `${stats.pDone}/${stats.pTotal}`
                      : res === 'trivia'
                        ? `${stats.tKnown}/${stats.tTotal}`
                        : `${stats.qRight}/${stats.qTotal}`
                return (
                  <button
                    key={res}
                    className={['side-sub-btn', isActive && res === currentResource && 'active']
                      .filter(Boolean)
                      .join(' ')}
                    type="button"
                    onClick={() => navigate(`/subjects/legal/${topic.id}/${res}`)}
                  >
                    {LEGAL_RESOURCE_LABELS[res]}
                    <span className="rc">{count}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
    </Rail>
  )
}
