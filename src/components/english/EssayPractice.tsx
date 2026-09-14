import { useState } from 'react'
import { lookupAcrossTexts, type EnglishText, type EssayQuestion } from '../../lib/content/english'
import { AnswerBox } from '../practice/AnswerBox'
import { englishNoteKey } from '../../lib/keys'

const PLANNER_STEPS = [
  { id: 'decode', label: 'Decode the question', hint: 'What is it actually asking? Underline the directive verb.' },
  { id: 'key-terms', label: 'Identify key terms', hint: 'Which words in the question need to be defined or unpacked?' },
  { id: 'thesis', label: 'Develop your thesis', hint: 'One sentence that directly answers the question.' },
  { id: 'arguments', label: 'Choose 3–4 arguments', hint: 'Each one should be a distinct reason your thesis is true.' },
  { id: 'evidence', label: 'Select your evidence', hint: 'Which quotes best support each argument?' },
  { id: 'techniques', label: 'Match techniques to evidence', hint: 'What is each quote actually doing, technically?' },
  { id: 'purpose', label: "Explain authorial purpose", hint: 'Why did the author make this choice?' },
  { id: 'connect', label: 'Connect back to the question', hint: 'Restate how this argument answers what was asked.' },
  { id: 'conclusion', label: 'Build your conclusion', hint: 'Synthesise — don’t just repeat the introduction.' },
] as const

const TYPE_LABELS: Record<EssayQuestion['type'], string> = {
  thesis: 'Thesis practice',
  'topic-sentence': 'Topic sentence practice',
  paragraph: 'Paragraph practice',
  'full-essay': 'Full essay',
}

function EssayPlanner({ text, question }: { text: EnglishText; question: EssayQuestion }) {
  const [openStep, setOpenStep] = useState<string | null>('decode')
  return (
    <div className="q-essay-planner">
      <div className="q-chapter-subhead">Essay planner</div>
      {PLANNER_STEPS.map((step) => (
        <div key={step.id} className="q-planner-step">
          <button
            type="button"
            className="q-planner-step-head"
            onClick={() => setOpenStep(openStep === step.id ? null : step.id)}
          >
            <span>{step.label}</span>
            <span className="q-technique-caret">{openStep === step.id ? '−' : '+'}</span>
          </button>
          {openStep === step.id && (
            <div className="q-planner-step-body">
              <p className="q-planner-hint">{step.hint}</p>
              <AnswerBox noteKey={englishNoteKey(text.id, `planner-${question.id}`, step.id)} />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

/** Essay/thesis practice (spec section 8) — thesis-only questions skip
 * straight to a single thesis attempt + model; full-essay questions get
 * the whole planner plus a full-response AnswerBox.
 *
 * `comparativeQuestions` + `evidenceTexts` support Module A's textual-
 * conversation essays, whose evidence can come from either prescribed text
 * — evidence for every question (single-text or comparative) is looked up
 * across all of `evidenceTexts` so one code path covers both cases. */
export function EssayPractice({
  text,
  comparativeQuestions = [],
  evidenceTexts,
}: {
  text: EnglishText
  comparativeQuestions?: EssayQuestion[]
  evidenceTexts?: EnglishText[]
}) {
  const [index, setIndex] = useState(0)
  const questions = [...text.essayQuestions, ...comparativeQuestions]
  const q = questions[index]
  const evidence = lookupAcrossTexts(evidenceTexts ?? [text], q.suggestedEvidence)

  return (
    <div className="q-essay-practice">
      <div className="seq-header">
        <div>
          <div className="seq-section-label">Essay practice</div>
          <div className="seq-meta">
            Question {index + 1} of {questions.length} &middot; {TYPE_LABELS[q.type]}
            {q.marks && <> &middot; {q.marks} marks</>}
          </div>
        </div>
      </div>

      <div className="q-sa-card">
        <p className="qtext">{q.prompt}</p>

        {evidence.length > 0 && (
          <div className="q-essay-evidence">
            <b>Suggested evidence:</b>{' '}
            {evidence.map((e) => `“${e.textHtml}”`).join('  ·  ')}
          </div>
        )}

        {q.type === 'thesis' ? (
          <>
            <AnswerBox noteKey={englishNoteKey(text.id, 'essay-thesis', q.id)} />
            <details className="planbox">
              <summary className="plan-summary">
                Reveal model thesis<span className="after-tag">— attempt first</span>
              </summary>
              <p dangerouslySetInnerHTML={{ __html: q.modelThesisHtml }} />
              <p dangerouslySetInnerHTML={{ __html: q.modelArgumentStructureHtml }} />
            </details>
          </>
        ) : (
          <>
            <EssayPlanner text={text} question={q} />
            <div className="q-chapter-subhead">Full response</div>
            <AnswerBox noteKey={englishNoteKey(text.id, 'essay-full', q.id)} />
            <details className="planbox">
              <summary className="plan-summary">
                Reveal model thesis &amp; structure<span className="after-tag">— attempt first</span>
              </summary>
              <p dangerouslySetInnerHTML={{ __html: q.modelThesisHtml }} />
              <p dangerouslySetInnerHTML={{ __html: q.modelArgumentStructureHtml }} />
              <p dangerouslySetInnerHTML={{ __html: q.modelResponseHtml }} />
            </details>
          </>
        )}

        <details className="planbox">
          <summary className="plan-summary">Planning guidance</summary>
          <p dangerouslySetInnerHTML={{ __html: q.planningGuidanceHtml }} />
        </details>
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
