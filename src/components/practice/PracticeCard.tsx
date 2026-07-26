import { PlanReveal } from './PlanReveal'
import { AnswerBox } from './AnswerBox'

type PracticeCardProps = {
  noteKey: string
  accent: string | null
  qtype: string
  badge: string
  questionHtml: string
  planHtml: string
}

export function PracticeCard({
  noteKey,
  accent,
  qtype,
  badge,
  questionHtml,
  planHtml,
}: PracticeCardProps) {
  return (
    <div className="card" data-accent={accent ?? undefined}>
      <div className="card-top">
        <span className="qtype">{qtype}</span>
        <span className="badge">{badge}</span>
      </div>
      <p className="qtext" dangerouslySetInnerHTML={{ __html: questionHtml }} />
      <AnswerBox key={noteKey} noteKey={noteKey} />
      <PlanReveal planHtml={planHtml} />
    </div>
  )
}
