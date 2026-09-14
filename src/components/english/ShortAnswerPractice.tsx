import { useState } from 'react'
import type { EnglishText } from '../../lib/content/english'
import { AnswerBox } from '../practice/AnswerBox'
import { englishNoteKey } from '../../lib/keys'
import { ModelAnswerReveal } from './ModelAnswerReveal'

const QTYPE_LABELS: Record<string, string> = {
  identify: 'Identify',
  explain: 'Explain',
  analyse: 'Analyse',
  how: 'How does…',
  'to-what-extent': 'To what extent…',
}

/** Short-answer practice, one question at a time (spec section 7) — not a
 * worksheet dump. Each question gets its own draft (auto-saved via the
 * existing AnswerBox/progressStore.notes infra) before the model answer can
 * be revealed. */
export function ShortAnswerPractice({ text }: { text: EnglishText }) {
  const [index, setIndex] = useState(0)
  const questions = text.shortAnswerQuestions
  const q = questions[index]

  return (
    <div className="q-short-answer">
      <div className="seq-header">
        <div>
          <div className="seq-section-label">Short-answer practice</div>
          <div className="seq-meta">
            Question {index + 1} of {questions.length}
          </div>
        </div>
      </div>

      <div className="q-sa-card">
        <div className="card-top">
          <span className="qtype">{QTYPE_LABELS[q.qtype] ?? q.qtype}</span>
          <span className="badge">{q.marks} marks</span>
        </div>
        <p className="qtext">{q.prompt}</p>
        {q.stimulusHtml && (
          <div className="q-sa-stimulus" dangerouslySetInnerHTML={{ __html: q.stimulusHtml }} />
        )}
        <AnswerBox key={q.id} noteKey={englishNoteKey(text.id, 'short-answer', q.id)} />
        <ModelAnswerReveal
          text={text}
          modelAnswerHtml={q.modelAnswerHtml}
          markingGuidanceHtml={q.markingGuidanceHtml}
          keyPoints={q.keyPoints}
          relevantQuoteIds={q.relevantQuoteIds}
          strongerResponseHtml={q.strongerResponseHtml}
        />
      </div>

      <div className="q-chapter-controls">
        <button
          type="button"
          className="seq-back"
          disabled={index === 0}
          onClick={() => setIndex((i) => i - 1)}
        >
          &larr; Previous
        </button>
        <button
          type="button"
          className="cta"
          disabled={index === questions.length - 1}
          onClick={() => setIndex((i) => i + 1)}
        >
          Next question <span className="arw">&rarr;</span>
        </button>
      </div>
    </div>
  )
}
