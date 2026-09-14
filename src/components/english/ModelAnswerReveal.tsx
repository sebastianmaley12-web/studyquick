import { lookupManyById, type EnglishText } from '../../lib/content/english'

/**
 * The reveal behind a short-answer question — deliberately richer than
 * PlanReveal (used elsewhere for extended-response plans): a model answer
 * alone isn't enough for English, since there's no single "correct" answer
 * to mark against. Shows the model answer, the marking guidance a real
 * marker would apply, the key points a strong response needs, the quotes
 * that support it, and what a stronger response would additionally do —
 * self-assessment scaffolding, not an automated mark (spec section 7: never
 * pretend automated marking can perfectly grade an English response).
 */
export function ModelAnswerReveal({
  text,
  modelAnswerHtml,
  markingGuidanceHtml,
  keyPoints,
  relevantQuoteIds,
  strongerResponseHtml,
}: {
  text: EnglishText
  modelAnswerHtml: string
  markingGuidanceHtml: string
  keyPoints: string[]
  relevantQuoteIds: string[]
  strongerResponseHtml: string
}) {
  const quotes = lookupManyById(text.quotes, relevantQuoteIds)

  return (
    <details className="planbox q-model-answer">
      <summary className="plan-summary">
        Reveal model answer<span className="after-tag">— attempt first</span>
      </summary>
      <div className="q-model-answer-body">
        <p dangerouslySetInnerHTML={{ __html: modelAnswerHtml }} />

        <div className="q-model-answer-section">
          <div className="q-chapter-subhead">Key points a strong response needs</div>
          <ul>
            {keyPoints.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </div>

        {quotes.length > 0 && (
          <div className="q-model-answer-section">
            <div className="q-chapter-subhead">Useful evidence</div>
            <ul className="q-model-answer-quotes">
              {quotes.map((q) => (
                <li key={q.id}>
                  &ldquo;{q.textHtml}&rdquo; <cite>{q.location}</cite>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="q-model-answer-section">
          <div className="q-chapter-subhead">Marking guidance</div>
          <p dangerouslySetInnerHTML={{ __html: markingGuidanceHtml }} />
        </div>

        <div className="q-model-answer-section stronger">
          <div className="q-chapter-subhead">What a stronger response would do</div>
          <p dangerouslySetInnerHTML={{ __html: strongerResponseHtml }} />
        </div>
      </div>
    </details>
  )
}
