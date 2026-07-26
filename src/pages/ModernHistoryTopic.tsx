import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { TopicShell } from '../layouts/TopicShell'
import { HistoryRail } from '../components/rail/HistoryRail'
import { QuizPanel } from '../components/quiz/QuizPanel'
import { TriviaGrid } from '../components/trivia/TriviaGrid'
import {
  MODERN_HISTORY_RESOURCES,
  MODERN_HISTORY_RESOURCE_LABELS,
  MODERN_HISTORY_TOPIC_DATA,
  MODERN_HISTORY_TOPIC_IDS,
  type ModernHistoryResource,
  type ModernHistoryTopicId,
} from '../lib/content'

function isTopicId(v: string | undefined): v is ModernHistoryTopicId {
  return !!v && (MODERN_HISTORY_TOPIC_IDS as readonly string[]).includes(v)
}

function isResource(v: string | undefined): v is ModernHistoryResource {
  return !!v && (MODERN_HISTORY_RESOURCES as readonly string[]).includes(v)
}

function ComingInPhase4({ label }: { label: string }) {
  return (
    <div className="emptymsg">
      {label} is being rebuilt in Phase 4 (feature parity migration) — this page currently only
      covers the app shell and Syllabus Summary content.
    </div>
  )
}

export function ModernHistoryTopic() {
  const { topicId, resource } = useParams()
  const navigate = useNavigate()

  if (!isTopicId(topicId) || !isResource(resource)) {
    const fallbackTopic = isTopicId(topicId) ? topicId : 's1'
    return <Navigate to={`/subjects/modern-history/${fallbackTopic}/summary`} replace />
  }

  const data = MODERN_HISTORY_TOPIC_DATA[topicId]

  return (
    <TopicShell
      rail={<HistoryRail currentTopicId={topicId} currentResource={resource} />}
      searchbar={
        <div className="searchbar">
          <span className="icon">&#9906;</span>
          <input
            type="text"
            placeholder="Search every topic — dates, names, terms…"
            autoComplete="off"
            disabled
          />
        </div>
      }
    >
      <section className="panel active" id={topicId}>
        <div className="panel-head">
          <h2>{data.meta.title}</h2>
          <div className="range">{data.meta.range}</div>
          <div className="scope">
            {data.meta.boxes.map((box) => (
              <div key={box.label} className={`box ${box.kind}`}>
                <span className="lbl">{box.label}</span>
                <span dangerouslySetInnerHTML={{ __html: box.bodyHtml }} />
              </div>
            ))}
          </div>
        </div>
        <div className="panel-body">
          <div className="subtab-nav">
            {MODERN_HISTORY_RESOURCES.map((res) => (
              <button
                key={res}
                className={['subtab-btn', res === resource && 'active'].filter(Boolean).join(' ')}
                type="button"
                onClick={() => navigate(`/subjects/modern-history/${topicId}/${res}`)}
              >
                {MODERN_HISTORY_RESOURCE_LABELS[res]}
              </button>
            ))}
          </div>

          <div className="subtab-panel active">
            {resource === 'summary' && (
              <>
                <div className="summary-note">{data.summary.note}</div>
                {data.summary.groups.map((group) => (
                  <div className="dot-group" key={group.title}>
                    <div className="dot-group-title">{group.title}</div>
                    <ul className="dotpoints">
                      {group.points.map((point, i) => (
                        <li key={i} dangerouslySetInnerHTML={{ __html: point }} />
                      ))}
                    </ul>
                  </div>
                ))}
              </>
            )}
            {resource === 'quiz' && <QuizPanel topicId={topicId} questions={data.quiz} />}
            {resource === 'trivia' && <TriviaGrid topicId={topicId} cards={data.trivia} />}
            {resource === 'practice' && (
              <ComingInPhase4 label={MODERN_HISTORY_RESOURCE_LABELS[resource]} />
            )}
          </div>
        </div>
      </section>
    </TopicShell>
  )
}
