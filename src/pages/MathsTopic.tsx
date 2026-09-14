import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { TopicShell } from '../layouts/TopicShell'
import { MathsRail } from '../components/rail/MathsRail'
import { MathsTest } from '../components/maths/MathsTest'
import {
  MATHS_RESOURCES,
  MATHS_RESOURCE_LABELS,
  mathsTopicsBySlug,
  type MathsResource,
} from '../lib/content/maths'
import { mathsKey } from '../lib/keys'
import { useProgress } from '../lib/progressStore'
import { SearchBar } from '../components/SearchBar'
import { useMathsTopicSearch } from '../hooks/useMathsTopicSearch'
import { SearchQueryProvider, highlightHtml } from '../context/SearchQueryContext'

function isResource(v: string | undefined): v is MathsResource {
  return !!v && (MATHS_RESOURCES as readonly string[]).includes(v)
}

export function MathsTopic() {
  const { slug, resource } = useParams()
  const navigate = useNavigate()
  const progress = useProgress()

  const topic = slug ? mathsTopicsBySlug[slug] : undefined

  // Hooks must run unconditionally, before the validity guard below, so
  // this uses safe fallbacks — the invalid case redirects away before
  // anything built on top of the hook's state is ever shown.
  const search = useMathsTopicSearch(
    topic ?? mathsTopicsBySlug.f4,
    isResource(resource) ? resource : 'facts',
    navigate,
  )

  if (!topic || !isResource(resource)) {
    return <Navigate to={`/subjects/maths/${topic ? slug : 'f4'}/facts`} replace />
  }

  const right = topic.questions.filter((q) => progress.maths[mathsKey(topic.slug, q.id)]?.ok).length
  const total = topic.questions.length
  const pct = total ? Math.round((right / total) * 100) : 0

  return (
    <TopicShell
      rail={<MathsRail currentSlug={topic.slug} currentResource={resource} />}
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
      <div className="m-head" data-strand={topic.strand}>
        <div className="kicker">
          {topic.code} &middot; {topic.strand} &middot; Year {topic.year}
        </div>
        <h2>{topic.name}</h2>
        <p>{topic.blurb}</p>
        <div className="prog-line">
          <div className="pbar">
            <i
              className={pct >= 100 ? 'good' : pct > 0 ? 'mid' : ''}
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="ptext">
            {right} / {total} correct
          </span>
        </div>
      </div>

      <div className="subtab-nav">
        {MATHS_RESOURCES.map((res) => (
          <button
            key={res}
            className={['subtab-btn', res === resource && 'active'].filter(Boolean).join(' ')}
            type="button"
            onClick={() => navigate(`/subjects/maths/${topic.slug}/${res}`)}
          >
            {MATHS_RESOURCE_LABELS[res]}
          </button>
        ))}
      </div>

      {resource === 'facts' ? (
        <SearchQueryProvider value={search.committedQuery}>
          <div>
            <div className="fact-box">
              <h3>Key facts &amp; formulae</h3>
              <ul className="fact-list formula">
                {topic.formulae.map((formula, i) => (
                  <li
                    key={i}
                    dangerouslySetInnerHTML={{ __html: highlightHtml(formula, search.committedQuery) }}
                  />
                ))}
              </ul>
            </div>
            <div className="fact-box">
              <h3>Syllabus dot points — {topic.code}</h3>
              <ul className="fact-list">
                {topic.dotpoints.map((point, i) => (
                  <li
                    key={i}
                    dangerouslySetInnerHTML={{ __html: highlightHtml(point, search.committedQuery) }}
                  />
                ))}
              </ul>
            </div>
          </div>
        </SearchQueryProvider>
      ) : (
        <MathsTest key={topic.slug} topic={topic} />
      )}
    </TopicShell>
  )
}
