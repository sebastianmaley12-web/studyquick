import { useState } from 'react'
import type { OpenResponseQuestion } from '../../lib/content/paper1'
import { AnswerBox } from '../practice/AnswerBox'
import { englishNoteKey } from '../../lib/keys'

/**
 * Format E (spec section 10) — "write your own analysis". No automated
 * grading of an English response (the brief is explicit about this); a
 * checkpoint list plus a fully modelled analysis lets the student
 * self-assess instead of being given a fake mark.
 */
export function Paper1OpenResponse({ questions }: { questions: OpenResponseQuestion[] }) {
  const [index, setIndex] = useState(0)
  const q = questions[index]
  const [checked, setChecked] = useState<Set<number>>(new Set())
  const [revealed, setRevealed] = useState(false)

  function goTo(next: number) {
    setIndex(next)
    setChecked(new Set())
    setRevealed(false)
  }

  if (questions.length === 0) return <div className="emptymsg">No open-response questions available yet.</div>

  return (
    <div className="q-short-answer">
      <div className="seq-header">
        <div>
          <div className="seq-section-label">Write your own analysis</div>
          <div className="seq-meta">
            Question {index + 1} of {questions.length}
          </div>
        </div>
      </div>

      <div className="q-sa-card">
        <blockquote className="q-quote-text">&ldquo;{q.quote.text}&rdquo;</blockquote>
        <div className="q-quote-meta">
          {q.quote.speaker && <span className="q-quote-speaker">{q.quote.speaker}</span>}
          <span className="q-quote-location">{q.quote.location}</span>
        </div>
        <p className="qtext">{q.promptHtml}</p>
        <AnswerBox key={q.id} noteKey={englishNoteKey('nineteen-eighty-four', 'paper1-open', q.id)} />

        {!revealed ? (
          <button type="button" className="btn on" onClick={() => setRevealed(true)}>
            Reveal model analysis &amp; checkpoints
          </button>
        ) : (
          <div className="q-model-answer-body">
            <div className="q-chapter-subhead">Self-assessment checkpoints</div>
            <ul className="q-checkpoint-list">
              {q.checkpoints.map((c, i) => (
                <li key={i}>
                  <label>
                    <input
                      type="checkbox"
                      checked={checked.has(i)}
                      onChange={() =>
                        setChecked((prev) => {
                          const next = new Set(prev)
                          if (next.has(i)) next.delete(i)
                          else next.add(i)
                          return next
                        })
                      }
                    />
                    {c}
                  </label>
                </li>
              ))}
            </ul>
            <div className="q-model-answer-section">
              <div className="q-chapter-subhead">Model analysis</div>
              <p dangerouslySetInnerHTML={{ __html: q.modelAnalysisHtml }} />
            </div>
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
          disabled={index === questions.length - 1}
          onClick={() => goTo(index + 1)}
        >
          Next question <span className="arw">&rarr;</span>
        </button>
      </div>
    </div>
  )
}
