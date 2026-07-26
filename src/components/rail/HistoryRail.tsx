import { useNavigate } from 'react-router-dom'
import { Rail } from './Rail'
import {
  MODERN_HISTORY_RESOURCES,
  MODERN_HISTORY_RESOURCE_LABELS,
  modernHistoryTopics,
  type ModernHistoryResource,
  type ModernHistoryTopicId,
} from '../../lib/content/modernHistory'
import { useProgress } from '../../lib/progressStore'
import { historyTopicStats } from '../../lib/progressStats'

type HistoryRailProps = {
  currentTopicId: ModernHistoryTopicId
  currentResource: ModernHistoryResource
}

export function HistoryRail({ currentTopicId, currentResource }: HistoryRailProps) {
  const navigate = useNavigate()
  const progress = useProgress()

  return (
    <Rail
      backTo="/subjects/modern-history"
      backTitle="Back to Modern History"
      title="Modern History"
      subtitle="4 topics"
    >
      <div className="rail-label">Topics &amp; resources</div>
      {modernHistoryTopics.map((topic, i) => {
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
                  `/subjects/modern-history/${topic.id}/${isActive ? currentResource : 'summary'}`,
                )
              }
            >
              <span className="roman">{['I', 'II', 'III', 'IV'][i]}</span>
              <span className="slabel" dangerouslySetInnerHTML={{ __html: topic.short }} />
            </button>
            <div className="side-sub">
              {MODERN_HISTORY_RESOURCES.map((res) => {
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
                    onClick={() => navigate(`/subjects/modern-history/${topic.id}/${res}`)}
                  >
                    {MODERN_HISTORY_RESOURCE_LABELS[res]}
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
