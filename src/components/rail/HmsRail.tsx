import { useNavigate } from 'react-router-dom'
import { Rail } from './Rail'
import {
  HMS_RESOURCES,
  HMS_RESOURCE_LABELS,
  hmsTopics,
  type HmsResource,
  type HmsTopicId,
} from '../../lib/content/hms'
import { useProgress } from '../../lib/progressStore'
import { historyTopicStats } from '../../lib/progressStats'

type HmsRailProps = {
  currentTopicId: HmsTopicId
  currentResource: HmsResource
}

export function HmsRail({ currentTopicId, currentResource }: HmsRailProps) {
  const navigate = useNavigate()
  const progress = useProgress()

  return (
    <Rail
      backTo="/subjects/hms"
      backTitle="Back to Health and Movement Science"
      title="Health & Movement Science"
      subtitle="2 focus areas"
    >
      <div className="rail-label">Focus areas &amp; resources</div>
      {hmsTopics.map((topic) => {
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
                navigate(`/subjects/hms/${topic.id}/${isActive ? currentResource : 'summary'}`)
              }
            >
              <span className="roman">{topic.id.toUpperCase()}</span>
              <span className="slabel" dangerouslySetInnerHTML={{ __html: topic.short }} />
            </button>
            <div className="side-sub">
              {HMS_RESOURCES.map((res) => {
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
                    onClick={() => navigate(`/subjects/hms/${topic.id}/${res}`)}
                  >
                    {HMS_RESOURCE_LABELS[res]}
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
