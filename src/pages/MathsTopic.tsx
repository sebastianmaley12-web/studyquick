import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { TopicShell } from '../layouts/TopicShell'
import { MathsRail } from '../components/rail/MathsRail'
import {
  MATHS_RESOURCES,
  MATHS_RESOURCE_LABELS,
  mathsTopicsBySlug,
  type MathsResource,
} from '../lib/content'

function isResource(v: string | undefined): v is MathsResource {
  return !!v && (MATHS_RESOURCES as readonly string[]).includes(v)
}

export function MathsTopic() {
  const { slug, resource } = useParams()
  const navigate = useNavigate()

  const topic = slug ? mathsTopicsBySlug[slug] : undefined

  if (!topic || !isResource(resource)) {
    return <Navigate to={`/subjects/maths/${topic ? slug : 'f4'}/facts`} replace />
  }

  return (
    <TopicShell rail={<MathsRail currentSlug={topic.slug} currentResource={resource} />}>
      <div className="m-head" data-strand={topic.strand}>
        <div className="kicker">
          {topic.code} &middot; {topic.strand} &middot; Year {topic.year}
        </div>
        <h2>{topic.name}</h2>
        <p>{topic.blurb}</p>
        <div className="prog-line">
          <div className="pbar">
            <i />
          </div>
          <span className="ptext">0 / {topic.questions.length} correct</span>
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
        <div>
          <div className="fact-box">
            <h3>Key facts &amp; formulae</h3>
            <ul className="fact-list formula">
              {topic.formulae.map((formula, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: formula }} />
              ))}
            </ul>
          </div>
          <div className="fact-box">
            <h3>Syllabus dot points — {topic.code}</h3>
            <ul className="fact-list">
              {topic.dotpoints.map((point, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: point }} />
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="emptymsg">
          Practice Questions is being rebuilt in Phase 4 (feature parity migration) — this page
          currently only covers the app shell and Key Facts &amp; Formulae content.
        </div>
      )}
    </TopicShell>
  )
}
