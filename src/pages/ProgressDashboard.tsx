import { Link, useNavigate } from 'react-router-dom'
import { modernHistoryTopics } from '../lib/content/modernHistory'
import { mathsYear11Topics, mathsYear12Topics } from '../lib/content/maths'
import { hmsTopics } from '../lib/content/hms'
import { businessTopics } from '../lib/content/business'
import { progressStore, useProgress } from '../lib/progressStore'
import {
  historyTopicStats,
  mathsTopicStats,
  dueQuizKeys,
  dueMathsKeys,
  pct,
} from '../lib/progressStats'
import { ProgressLine } from '../components/ProgressLine'

interface TopicRow {
  label: string
  to: string
  done: number
  total: number
  attempted: boolean
}

interface SubjectGroup {
  name: string
  rows: TopicRow[]
}

interface DueRow {
  subject: string
  label: string
  to: string
  dueKeys: string[]
  kind: 'quiz' | 'maths'
}

/** A topic counts as "attempted" once at least one item in it has been
 * answered — untouched topics are excluded from the weak-spots list so a
 * student isn't told to "focus on" something they simply haven't opened yet. */
export function ProgressDashboard() {
  const progress = useProgress()
  const navigate = useNavigate()

  const historyRows: TopicRow[] = modernHistoryTopics.map((t) => {
    const s = historyTopicStats(progress, t)
    return {
      label: t.short,
      to: `/subjects/modern-history/${t.id}/quiz`,
      done: s.score,
      total: s.max,
      attempted: s.score > 0,
    }
  })

  const mathsRows: TopicRow[] = [...mathsYear12Topics, ...mathsYear11Topics].map((t) => {
    const s = mathsTopicStats(progress, t)
    return {
      label: `${t.code} ${t.name}`,
      to: `/subjects/maths/${t.slug}/practice`,
      done: s.right,
      total: s.total,
      attempted: s.done > 0,
    }
  })

  const hmsRows: TopicRow[] = hmsTopics.map((t) => {
    const s = historyTopicStats(progress, t)
    return {
      label: t.short,
      to: `/subjects/hms/${t.id}/quiz`,
      done: s.score,
      total: s.max,
      attempted: s.score > 0,
    }
  })

  const businessRows: TopicRow[] = businessTopics.map((t) => {
    const s = historyTopicStats(progress, t)
    return {
      label: t.short,
      to: `/subjects/business/${t.id}/quiz`,
      done: s.score,
      total: s.max,
      attempted: s.score > 0,
    }
  })

  const subjectGroups: SubjectGroup[] = [
    { name: 'Modern History', rows: historyRows },
    { name: 'Maths', rows: mathsRows },
    { name: 'Health & Movement Science', rows: hmsRows },
    { name: 'Business Studies', rows: businessRows },
  ]

  const weakSpots = subjectGroups
    .flatMap((group) => group.rows.map((row) => ({ subject: group.name, ...row })))
    .filter((row) => row.attempted && row.total > 0 && pct(row.done, row.total) < 70)
    .sort((a, b) => pct(a.done, a.total) - pct(b.done, b.total))
    .slice(0, 6)

  const dueRows: DueRow[] = [
    ...modernHistoryTopics.map((t) => ({
      subject: 'Modern History',
      label: t.short,
      to: `/subjects/modern-history/${t.id}/quiz`,
      dueKeys: dueQuizKeys(progress, t),
      kind: 'quiz' as const,
    })),
    ...[...mathsYear12Topics, ...mathsYear11Topics].map((t) => ({
      subject: 'Maths',
      label: `${t.code} ${t.name}`,
      to: `/subjects/maths/${t.slug}/practice`,
      dueKeys: dueMathsKeys(progress, t),
      kind: 'maths' as const,
    })),
    ...hmsTopics.map((t) => ({
      subject: 'Health & Movement Science',
      label: t.short,
      to: `/subjects/hms/${t.id}/quiz`,
      dueKeys: dueQuizKeys(progress, t),
      kind: 'quiz' as const,
    })),
    ...businessTopics.map((t) => ({
      subject: 'Business Studies',
      label: t.short,
      to: `/subjects/business/${t.id}/quiz`,
      dueKeys: dueQuizKeys(progress, t),
      kind: 'quiz' as const,
    })),
  ]
    .filter((row) => row.dueKeys.length > 0)
    .sort((a, b) => b.dueKeys.length - a.dueKeys.length)
    .slice(0, 8)

  function reviewNow(row: DueRow) {
    if (row.kind === 'quiz') progressStore.resetQuizTopic(row.dueKeys)
    else progressStore.resetMathsTopic(row.dueKeys)
    navigate(row.to)
  }

  return (
    <div className="wrap">
      <div className="section-label">Your progress</div>

      {dueRows.length > 0 && (
        <div className="dash-due">
          <h3>Due for review</h3>
          <p>
            Questions you&rsquo;ve answered before that are ready to revisit, most due topics
            first.
          </p>
          <ul className="dash-list">
            {dueRows.map((row) => (
              <li key={`${row.subject}-${row.label}`}>
                <div className="dash-row">
                  <span className="dash-subject-tag">{row.subject}</span>
                  <span className="dash-topic-name" dangerouslySetInnerHTML={{ __html: row.label }} />
                  <span className="dash-due-count">
                    {row.dueKeys.length} due
                  </span>
                  <button type="button" className="dash-review-btn" onClick={() => reviewNow(row)}>
                    Review now
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {weakSpots.length > 0 && (
        <div className="dash-weak">
          <h3>Focus on these next</h3>
          <p>Topics you&rsquo;ve started but haven&rsquo;t mastered yet, lowest score first.</p>
          <ul className="dash-list">
            {weakSpots.map((row) => (
              <li key={`${row.subject}-${row.label}`}>
                <Link to={row.to} className="dash-row">
                  <span className="dash-subject-tag">{row.subject}</span>
                  <span className="dash-topic-name" dangerouslySetInnerHTML={{ __html: row.label }} />
                  <ProgressLine
                    done={row.done}
                    total={row.total}
                    text={`${pct(row.done, row.total)}%`}
                    size="sm"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {subjectGroups.map((group) => (
        <div key={group.name} className="dash-subject">
          <h3>{group.name}</h3>
          <ul className="dash-list">
            {group.rows.map((row) => (
              <li key={row.label}>
                <Link to={row.to} className="dash-row">
                  <span className="dash-topic-name" dangerouslySetInnerHTML={{ __html: row.label }} />
                  <ProgressLine
                    done={row.done}
                    total={row.total}
                    text={`${row.done}/${row.total}`}
                    size="sm"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
