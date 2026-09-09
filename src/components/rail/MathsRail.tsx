import { useNavigate } from 'react-router-dom'
import { Rail } from './Rail'
import {
  MATHS_RESOURCES,
  MATHS_RESOURCE_LABELS,
  mathsYear11Topics,
  mathsYear12Topics,
  type MathsResource,
  type MathsTopic,
} from '../../lib/content/maths'
import { useProgress, type ProgressState } from '../../lib/progressStore'
import { mathsTopicStats } from '../../lib/progressStats'

type MathsRailProps = {
  currentSlug: string
  currentResource: MathsResource
}

function MSection({
  topic,
  currentSlug,
  currentResource,
  progress,
}: {
  topic: MathsTopic
  currentSlug: string
  currentResource: MathsResource
  progress: ProgressState
}) {
  const navigate = useNavigate()
  const isActive = topic.slug === currentSlug
  const stats = mathsTopicStats(progress, topic)
  const rdotClass = [
    'rdot',
    stats.right === stats.total && stats.total ? 'done' : stats.done > 0 ? 'part' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={['m-section', isActive && 'active'].filter(Boolean).join(' ')}
      data-slug={topic.slug}
      data-strand={topic.strand}
    >
      <button
        className="m-section-btn"
        type="button"
        onClick={() =>
          navigate(`/subjects/maths/${topic.slug}/${isActive ? currentResource : 'facts'}`)
        }
      >
        <span className="mcode">{topic.code}</span>
        <span className="mlabel">{topic.name}</span>
        <span className={rdotClass} />
      </button>
      <div className="m-sub">
        {MATHS_RESOURCES.map((res) => (
          <button
            key={res}
            className={['m-sub-btn', isActive && res === currentResource && 'active']
              .filter(Boolean)
              .join(' ')}
            type="button"
            onClick={() => navigate(`/subjects/maths/${topic.slug}/${res}`)}
          >
            {MATHS_RESOURCE_LABELS[res]}
            {res === 'test' && (
              <span className="rc">
                {stats.right}/{stats.total}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export function MathsRail({ currentSlug, currentResource }: MathsRailProps) {
  const progress = useProgress()
  return (
    <Rail
      backTo="/subjects/maths"
      backTitle="Back to Mathematics Standard 2"
      title="Maths Standard 2"
      subtitle="16 topics"
    >
      <div className="m-year-label">
        <span>Year 12 — HSC topics</span>
      </div>
      {mathsYear12Topics.map((topic) => (
        <MSection
          key={topic.slug}
          topic={topic}
          currentSlug={currentSlug}
          currentResource={currentResource}
          progress={progress}
        />
      ))}
      <div className="m-year-label">
        <span>Year 11 — assumed knowledge</span>
      </div>
      {mathsYear11Topics.map((topic) => (
        <MSection
          key={topic.slug}
          topic={topic}
          currentSlug={currentSlug}
          currentResource={currentResource}
          progress={progress}
        />
      ))}
    </Rail>
  )
}
