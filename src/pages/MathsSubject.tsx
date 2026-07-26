import { useNavigate } from 'react-router-dom'
import { SqLogo } from '../components/SqLogo'
import {
  mathsTotals,
  mathsYear11Topics,
  mathsYear12Topics,
  type MathsTopic,
} from '../lib/content/maths'
import { useProgress, type ProgressState } from '../lib/progressStore'
import { mathsTopicStats } from '../lib/progressStats'
import { ProgressLine } from '../components/ProgressLine'

function MTopicCard({ topic, progress }: { topic: MathsTopic; progress: ProgressState }) {
  const navigate = useNavigate()
  const stats = mathsTopicStats(progress, topic)
  return (
    <div
      className="mtopic-card"
      data-slug={topic.slug}
      data-strand={topic.strand}
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/subjects/maths/${topic.slug}/facts`)}
    >
      <span className="code">{topic.code}</span>
      <h4>{topic.name}</h4>
      <p>{topic.blurb}</p>
      <div className="meta">
        {topic.questions.length} questions &middot; {topic.strand}
      </div>
      <ProgressLine
        done={stats.right}
        total={stats.total}
        text={`${stats.right}/${stats.total}`}
        size="sm"
      />
    </div>
  )
}

export function MathsSubject() {
  const navigate = useNavigate()
  const progress = useProgress()
  const allTopics = [...mathsYear12Topics, ...mathsYear11Topics]
  const overall = allTopics.reduce(
    (acc, topic) => {
      const stats = mathsTopicStats(progress, topic)
      return { right: acc.right + stats.right, total: acc.total + stats.total }
    },
    { right: 0, total: 0 },
  )

  return (
    <div className="wrap">
      <div className="subject-hero">
        <div className="brand-row">
          <SqLogo size="xs" />
          <span className="brand-row-sep">&middot;</span>
          <span className="eyebrow">
            HSC Mathematics Standard 2 &middot; Year 12 &middot; NESA Stage 6
          </span>
        </div>
        <h1>Mathematics Standard 2</h1>
        <div className="subject-kicker">
          Full Course Question Bank
          <span>Years 11 &amp; 12</span>
        </div>
        <p className="lede">
          The HSC paper examines the nine Year 12 topics, but it assumes everything from Year 11 —
          so both years are here. Work the Year 12 topics for the exam itself, and drop back to Year
          11 whenever a skill underneath it feels shaky.
        </p>
        <p className="lede">
          Every question marks itself. Type a number, press Enter, and you get an immediate verdict
          plus a worked solution. Answers are stored on this device, so your score and your
          incorrect questions are still waiting when you come back.
        </p>
        <div className="stat-strip">
          <div>
            <div className="k">Topics</div>
            <div className="v">{mathsTotals.topics}</div>
          </div>
          <div>
            <div className="k">Questions</div>
            <div className="v">{mathsTotals.questions}</div>
          </div>
          <div>
            <div className="k">Answer-entry</div>
            <div className="v">{mathsTotals.numEntry}</div>
          </div>
          <div>
            <div className="k">Multiple choice</div>
            <div className="v">{mathsTotals.multipleChoice}</div>
          </div>
        </div>
        <ProgressLine
          done={overall.right}
          total={overall.total}
          text={`${overall.right} of ${overall.total} questions correct`}
        />
        <button
          className="cta"
          type="button"
          onClick={() => navigate('/subjects/maths/f4/practice')}
        >
          Start with Investments &amp; Loans <span className="arw">&rarr;</span>
        </button>
      </div>

      <div className="section-label">Resources in this subject</div>
      <div className="res-grid">
        <div className="res-card">
          <div className="ic">&#402;</div>
          <h4>Key Facts &amp; Formulae</h4>
          <p>
            Every formula you need for the topic in one place, followed by the official NESA dot
            points so you can see exactly what is examinable.
          </p>
          <div className="count">{mathsTotals.topics} topics</div>
        </div>
        <div className="res-card">
          <div className="ic">&#9998;</div>
          <h4>Practice Questions</h4>
          <p>
            Type your answer and it is marked instantly, with rounding tolerance so a sensible
            answer still counts. A full worked solution unfolds underneath.
          </p>
          <div className="count">{mathsTotals.questions} questions</div>
        </div>
      </div>

      <div className="section-label">Topics</div>
      <div className="year-band">
        <span className="yb">Year 12</span>Examined directly in the HSC
        <span className="note">
          &mdash; {mathsYear12Topics.length} topics, {mathsTotals.year12Questions} questions
        </span>
      </div>
      <div className="mtopic-grid">
        {mathsYear12Topics.map((topic) => (
          <MTopicCard key={topic.slug} topic={topic} progress={progress} />
        ))}
      </div>
      <div className="year-band">
        <span className="yb y11">Year 11</span>Assumed knowledge
        <span className="note">
          &mdash; {mathsYear11Topics.length} topics, {mathsTotals.year11Questions} questions
        </span>
      </div>
      <div className="mtopic-grid">
        {mathsYear11Topics.map((topic) => (
          <MTopicCard key={topic.slug} topic={topic} progress={progress} />
        ))}
      </div>

      <div className="brand-strip" style={{ marginTop: '34px' }}>
        <SqLogo size="md" />
        <p>
          Written against the NESA Mathematics Standard Stage 6 Syllabus (2017), which is the
          syllabus examined in the 2026 HSC. Every numeric answer was computed rather than
          transcribed, and independently re-checked. Answers within about 1% of the exact value are
          marked correct, so sensible rounding will not cost you.
        </p>
      </div>
    </div>
  )
}
