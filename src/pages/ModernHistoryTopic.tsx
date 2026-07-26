import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { TopicShell } from '../layouts/TopicShell'
import { HistoryRail } from '../components/rail/HistoryRail'
import { QuizPanel } from '../components/quiz/QuizPanel'
import { TriviaGrid } from '../components/trivia/TriviaGrid'
import { PracticeSection } from '../components/practice/PracticeSection'
import { SearchBar } from '../components/SearchBar'
import { useTopicSearch } from '../hooks/useTopicSearch'
import { SearchQueryProvider, highlightHtml } from '../context/SearchQueryContext'
import {
  MODERN_HISTORY_RESOURCES,
  MODERN_HISTORY_RESOURCE_LABELS,
  MODERN_HISTORY_TOPIC_DATA,
  MODERN_HISTORY_TOPIC_IDS,
  type ModernHistoryResource,
  type ModernHistoryTopicId,
} from '../lib/content/modernHistory'

function isTopicId(v: string | undefined): v is ModernHistoryTopicId {
  return !!v && (MODERN_HISTORY_TOPIC_IDS as readonly string[]).includes(v)
}

function isResource(v: string | undefined): v is ModernHistoryResource {
  return !!v && (MODERN_HISTORY_RESOURCES as readonly string[]).includes(v)
}

export function ModernHistoryTopic() {
  const { topicId, resource } = useParams()
  const navigate = useNavigate()

  // hooks must run unconditionally, before the validity guard below, so this
  // uses safe fallbacks — the invalid case redirects away before anything
  // built on top of the hook's state is ever shown
  const search = useTopicSearch(
    isTopicId(topicId) ? topicId : 's1',
    isResource(resource) ? resource : 'summary',
    navigate,
  )

  if (!isTopicId(topicId) || !isResource(resource)) {
    const fallbackTopic = isTopicId(topicId) ? topicId : 's1'
    return <Navigate to={`/subjects/modern-history/${fallbackTopic}/summary`} replace />
  }

  const data = MODERN_HISTORY_TOPIC_DATA[topicId]

  return (
    <TopicShell
      rail={<HistoryRail currentTopicId={topicId} currentResource={resource} />}
      searchbar={
        <SearchBar
          value={search.query}
          onChange={search.onChange}
          onKeyDown={search.onInputKeyDown}
          meta={search.meta}
          onPrev={search.onPrev}
          onNext={search.onNext}
          disabled={search.disabled}
          inputRef={search.inputRef}
        />
      }
    >
      <SearchQueryProvider value={search.committedQuery}>
        <section className="panel active" id={topicId}>
          <div className="panel-head">
            <h2>{data.meta.title}</h2>
            <div className="range">{data.meta.range}</div>
            <div className="scope">
              {data.meta.boxes.map((box) => (
                <div key={box.label} className={`box ${box.kind}`}>
                  <span className="lbl">{box.label}</span>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: highlightHtml(box.bodyHtml, search.committedQuery),
                    }}
                  />
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
                          <li
                            key={i}
                            dangerouslySetInnerHTML={{
                              __html: highlightHtml(point, search.committedQuery),
                            }}
                          />
                        ))}
                      </ul>
                    </div>
                  ))}
                </>
              )}
              {resource === 'quiz' && <QuizPanel topicId={topicId} questions={data.quiz} />}
              {resource === 'trivia' && <TriviaGrid topicId={topicId} cards={data.trivia} />}
              {resource === 'practice' && (
                <PracticeSection topicId={topicId} practice={data.practice} />
              )}
            </div>
          </div>
        </section>
      </SearchQueryProvider>
    </TopicShell>
  )
}
