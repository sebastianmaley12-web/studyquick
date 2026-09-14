import { useState } from 'react'
import type { ComparisonQuestion } from '../../lib/content/paper1'
import { AnswerBox } from '../practice/AnswerBox'
import { englishNoteKey } from '../../lib/keys'

/** Format F (spec section 11) — technique comparison across two quotes,
 * for higher-order Paper 1 analysis (how language differs, not just what
 * it is). */
export function Paper1Comparison({ comparisons }: { comparisons: ComparisonQuestion[] }) {
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const c = comparisons[index]

  function goTo(next: number) {
    setIndex(next)
    setRevealed(false)
  }

  if (comparisons.length === 0) return <div className="emptymsg">No comparison questions available yet.</div>

  return (
    <div className="q-short-answer">
      <div className="seq-header">
        <div>
          <div className="seq-section-label">Technique comparison</div>
          <div className="seq-meta">
            Question {index + 1} of {comparisons.length}
          </div>
        </div>
      </div>

      <div className="q-sa-card">
        <div className="q-comparison-quotes">
          {[c.quoteA, c.quoteB].map((q) => (
            <div key={q.id} className="q-comparison-quote">
              <blockquote className="q-quote-text">&ldquo;{q.text}&rdquo;</blockquote>
              <div className="q-quote-meta">
                {q.speaker && <span className="q-quote-speaker">{q.speaker}</span>}
                <span className="q-quote-location">{q.location}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="qtext">{c.promptHtml}</p>
        <AnswerBox key={c.id} noteKey={englishNoteKey('nineteen-eighty-four', 'paper1-comparison', c.id)} />

        {!revealed ? (
          <button type="button" className="btn on" onClick={() => setRevealed(true)}>
            Reveal model comparison
          </button>
        ) : (
          <div className="q-model-answer-body">
            <div className="q-chapter-subhead">Model comparison</div>
            <p dangerouslySetInnerHTML={{ __html: c.modelComparisonHtml }} />
          </div>
        )}
      </div>

      <div className="q-chapter-controls">
        <button type="button" className="seq-back" disabled={index === 0} onClick={() => goTo(index - 1)}>
          &larr; Previous
        </button>
        <button
          type="button"
          className="cta"
          disabled={index === comparisons.length - 1}
          onClick={() => goTo(index + 1)}
        >
          Next comparison <span className="arw">&rarr;</span>
        </button>
      </div>
    </div>
  )
}
