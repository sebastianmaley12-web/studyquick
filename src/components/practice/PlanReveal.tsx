import { highlightHtml, useSearchQuery } from '../../context/SearchQueryContext'

export function PlanReveal({ planHtml }: { planHtml: string }) {
  const query = useSearchQuery()
  return (
    <details className="planbox">
      <summary className="plan-summary">
        Reveal answer plan<span className="after-tag">— attempt first</span>
      </summary>
      <div dangerouslySetInnerHTML={{ __html: highlightHtml(planHtml, query) }} />
    </details>
  )
}
