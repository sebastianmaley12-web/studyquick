import { useState } from 'react'
import type { UnseenExtract } from '../../lib/content/paper1'
import { AnswerBox } from '../practice/AnswerBox'
import { englishNoteKey } from '../../lib/keys'

const KIND_LABELS: Record<UnseenExtract['kind'], string> = {
  'persuasive-speech': 'Persuasive extract',
  poem: 'Poem',
  'visual-description': 'Visual/multimodal text',
}

/** Format G (spec section 12) — unseen practice using original extracts
 * (never real exam/published texts, per this app's copyright discipline),
 * so students can't lean on memorised quotes. One extract at a time, then
 * its questions one at a time within it. */
export function Paper1Unseen({ extracts }: { extracts: UnseenExtract[] }) {
  const [extractIndex, setExtractIndex] = useState(0)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)

  const extract = extracts[extractIndex]
  const question = extract?.questions[questionIndex]

  function goToExtract(next: number) {
    setExtractIndex(next)
    setQuestionIndex(0)
    setRevealed(false)
  }
  function goToQuestion(next: number) {
    setQuestionIndex(next)
    setRevealed(false)
  }

  if (!extract || !question) return <div className="emptymsg">No unseen extracts available yet.</div>

  return (
    <div className="q-short-answer">
      <div className="seq-header">
        <div>
          <div className="seq-section-label">Unseen practice</div>
          <div className="seq-meta">
            Extract {extractIndex + 1} of {extracts.length} &middot; Question {questionIndex + 1} of{' '}
            {extract.questions.length}
          </div>
        </div>
      </div>

      <div className="q-unseen-extract">
        <div className="q-chapter-kicker">{KIND_LABELS[extract.kind]}</div>
        <h3>{extract.title}</h3>
        <div className="q-unseen-body" dangerouslySetInnerHTML={{ __html: extract.bodyHtml }} />
        <div className="q-unseen-attribution">{extract.attribution}</div>
      </div>

      <div className="q-sa-card">
        <p className="qtext">{question.promptHtml}</p>
        <AnswerBox
          key={question.id}
          noteKey={englishNoteKey('nineteen-eighty-four', 'paper1-unseen', question.id)}
        />
        {!revealed ? (
          <button type="button" className="btn on" onClick={() => setRevealed(true)}>
            Reveal model answer
          </button>
        ) : (
          <div className="q-model-answer-body">
            <div className="q-chapter-subhead">Model answer</div>
            <p dangerouslySetInnerHTML={{ __html: question.modelAnswerHtml }} />
          </div>
        )}
      </div>

      <div className="q-chapter-controls">
        <button
          type="button"
          className="seq-back"
          disabled={extractIndex === 0 && questionIndex === 0}
          onClick={() => (questionIndex > 0 ? goToQuestion(questionIndex - 1) : goToExtract(extractIndex - 1))}
        >
          &larr; Previous
        </button>
        <button
          type="button"
          className="cta"
          disabled={extractIndex === extracts.length - 1 && questionIndex === extract.questions.length - 1}
          onClick={() =>
            questionIndex < extract.questions.length - 1
              ? goToQuestion(questionIndex + 1)
              : goToExtract(extractIndex + 1)
          }
        >
          Next <span className="arw">&rarr;</span>
        </button>
      </div>
    </div>
  )
}
