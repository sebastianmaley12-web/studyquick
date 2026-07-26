export function PlanReveal({ planHtml }: { planHtml: string }) {
  return (
    <details className="planbox">
      <summary className="plan-summary">
        Reveal answer plan<span className="after-tag">— attempt first</span>
      </summary>
      <div dangerouslySetInnerHTML={{ __html: planHtml }} />
    </details>
  )
}
