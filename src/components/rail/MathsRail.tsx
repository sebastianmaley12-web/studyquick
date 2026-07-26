import { useNavigate } from 'react-router-dom'
import { Rail } from './Rail'
import {
  MATHS_RESOURCES,
  MATHS_RESOURCE_LABELS,
  mathsYear11Topics,
  mathsYear12Topics,
  type MathsResource,
  type MathsTopic,
} from '../../lib/content'

type MathsRailProps = {
  currentSlug: string
  currentResource: MathsResource
}

function MSection({
  topic,
  currentSlug,
  currentResource,
}: {
  topic: MathsTopic
  currentSlug: string
  currentResource: MathsResource
}) {
  const navigate = useNavigate()
  const isActive = topic.slug === currentSlug

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
        <span className="rdot" />
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
            {res === 'practice' && <span className="rc">0/{topic.questions.length}</span>}
          </button>
        ))}
      </div>
    </div>
  )
}

export function MathsRail({ currentSlug, currentResource }: MathsRailProps) {
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
        />
      ))}
    </Rail>
  )
}
