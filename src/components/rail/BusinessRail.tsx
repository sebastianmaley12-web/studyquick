import { useNavigate } from 'react-router-dom'
import { Rail } from './Rail'
import {
  BUSINESS_RESOURCES,
  BUSINESS_RESOURCE_LABELS,
  businessTopics,
  type BusinessResource,
  type BusinessTopicId,
} from '../../lib/content/business'
import { useProgress } from '../../lib/progressStore'
import { historyTopicStats } from '../../lib/progressStats'

type BusinessRailProps = {
  currentTopicId: BusinessTopicId
  currentResource: BusinessResource
}

export function BusinessRail({ currentTopicId, currentResource }: BusinessRailProps) {
  const navigate = useNavigate()
  const progress = useProgress()

  return (
    <Rail
      backTo="/subjects/business"
      backTitle="Back to Business Studies"
      title="Business Studies"
      subtitle="4 topics"
    >
      <div className="rail-label">Topics &amp; resources</div>
      {businessTopics.map((topic) => {
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
                navigate(
                  `/subjects/business/${topic.id}/${isActive ? currentResource : 'summary'}`,
                )
              }
            >
              <span className="roman">{topic.short.slice(0, 2).toUpperCase()}</span>
              <span className="slabel" dangerouslySetInnerHTML={{ __html: topic.short }} />
            </button>
            <div className="side-sub">
              {BUSINESS_RESOURCES.map((res) => {
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
                    onClick={() => navigate(`/subjects/business/${topic.id}/${res}`)}
                  >
                    {BUSINESS_RESOURCE_LABELS[res]}
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
