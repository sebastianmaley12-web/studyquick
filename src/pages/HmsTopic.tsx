import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { TopicShell } from '../layouts/TopicShell'
import { HmsRail } from '../components/rail/HmsRail'
import { QuizPanel } from '../components/quiz/QuizPanel'
import { TriviaGrid } from '../components/trivia/TriviaGrid'
import { PracticeSection } from '../components/practice/PracticeSection'
import { SearchBar } from '../components/SearchBar'
import { useHmsTopicSearch } from '../hooks/useHmsTopicSearch'
import { SearchQueryProvider, highlightHtml } from '../context/SearchQueryContext'
import {
  HMS_RESOURCES,
  HMS_RESOURCE_LABELS,
  HMS_TOPIC_DATA,
  HMS_TOPIC_IDS,
  type HmsResource,
  type HmsTopicId,
} from '../lib/content/hms'

function isTopicId(v: string | undefined): v is HmsTopicId {
  return !!v && (HMS_TOPIC_IDS as readonly string[]).includes(v)
}

function isResource(v: string | undefined): v is HmsResource {
  return !!v && (HMS_RESOURCES as readonly string[]).includes(v)
}

export function HmsTopic() {
  const { topicId, resource } = useParams()
  const navigate = useNavigate()

  // hooks must run unconditionally, before the validity guard below, so this
  // uses safe fallbacks — the invalid case redirects away before anything
  // built on top of the hook's state is ever shown
  const search = useHmsTopicSearch(
    isTopicId(topicId) ? topicId : 'fa1',
    isResource(resource) ? resource : 'summary',
    navigate,
  )

  if (!isTopicId(topicId) || !isResource(resource)) {
    const fallbackTopic = isTopicId(topicId) ? topicId : 'fa1'
    return <Navigate to={`/subjects/hms/${fallbackTopic}/summary`} replace />
  }

  const data = HMS_TOPIC_DATA[topicId]

  return (
    <TopicShell
      rail={<HmsRail currentTopicId={topicId} currentResource={resource} />}
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
              {HMS_RESOURCES.map((res) => (
                <button
                  key={res}
                  className={['subtab-btn', res === resource && 'active'].filter(Boolean).join(' ')}
                  type="button"
                  onClick={() => navigate(`/subjects/hms/${topicId}/${res}`)}
                >
                  {HMS_RESOURCE_LABELS[res]}
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
