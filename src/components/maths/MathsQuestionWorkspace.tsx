import { useState } from 'react'
import 'katex/dist/katex.min.css'
import type { MathsTopic } from '../../lib/content/maths'
import type { MathsWorkspaceEntry } from '../../lib/content/mathsWorkspace'
import { progressStore, useMathsAnswer } from '../../lib/progressStore'
import { mathsKey } from '../../lib/keys'
import { renderLatex } from '../../lib/latex'

type Question = MathsTopic['questions'][number]

/** Kept identical to MathsQuestion.tsx's private helpers (not exported
 * there), rather than changing that file to share them — this component
 * must not require any edit to the existing, verified question renderer. */
function formatAnswer(q: Question): string {
  if (q.type !== 'num') return ''
  if (q.prefix === '$') {
    return q.ans.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }
  const rounded = Math.round(q.ans * 1e6) / 1e6
  if (Math.abs(rounded) >= 10000) return rounded.toLocaleString('en-AU')
  return String(rounded)
}

function parseAnswer(text: string): number {
  return parseFloat(text.replace(/[$,\s%]/g, ''))
}

export function MathsQuestionWorkspace({
  slug,
  index,
  question,
  entry,
}: {
  slug: string
  index: number
  question: Question
  entry: MathsWorkspaceEntry
}) {
  const key = mathsKey(slug, question.id)
  const saved = useMathsAnswer(key)
  const answered = saved !== undefined
  const [inputValue, setInputValue] = useState(() => (saved ? String(saved.v) : ''))
  const [verdict, setVerdict] = useState<'idle' | 'enter-a-number'>('idle')
  const [stepsOpen, setStepsOpen] = useState(false)
  const [scratch, setScratch] = useState('')

  function checkNumeric() {
    if (inputValue.trim() === '') return
    const val = parseAnswer(inputValue)
    if (isNaN(val)) {
      setVerdict('enter-a-number')
      return
    }
    setVerdict('idle')
    const ok = question.type === 'num' && Math.abs(val - question.ans) <= question.tol
    progressStore.setMathsAnswer(key, val, ok)
  }

  function pickOption(optIndex: number) {
    if (answered) return
    const ok = question.type === 'mc' && optIndex === question.ans
    progressStore.setMathsAnswer(key, optIndex, ok)
  }

  return (
    <div
      className={['mqw', answered && (saved.ok ? 'right' : 'wrong'), answered && 'answered']
        .filter(Boolean)
        .join(' ')}
    >
      <div className="mqw-header">
        <span className="mqw-n">
          Question {index + 1}
        </span>
        <span className="mqw-marks">
          {question.marks} {question.marks === 1 ? 'mark' : 'marks'}
        </span>
      </div>

      <div className="mqw-question">
        <p className="mqw-intro">{entry.introText}</p>
        <div
          className="mqw-formula"
          dangerouslySetInnerHTML={{ __html: renderLatex(entry.formulaLatex, true) }}
        />
        {entry.diagramSvg && (
          <div className="mqw-diagram" dangerouslySetInnerHTML={{ __html: entry.diagramSvg }} />
        )}
      </div>

      <div className="mqw-working">
        <div className="mqw-working-head">
          <span>Your working</span>
          <button
            type="button"
            className="mqw-steps-toggle"
            onClick={() => setStepsOpen((o) => !o)}
          >
            {stepsOpen ? 'Hide steps' : 'Show steps'}
          </button>
        </div>
        {stepsOpen && (
          <ol className="mqw-steps">
            {entry.steps.map((step, i) => (
              <li key={i}>
                <span className="mqw-step-label">{step.label}</span>
                <span
                  className="mqw-step-latex"
                  dangerouslySetInnerHTML={{ __html: renderLatex(step.latex) }}
                />
              </li>
            ))}
          </ol>
        )}
        <textarea
          className="mqw-scratch"
          placeholder="Use this space to show your working — optional, not saved or graded"
          value={scratch}
          onChange={(e) => setScratch(e.target.value)}
          rows={4}
        />
      </div>

      <div className="mqw-answer">
        <span className="mqw-answer-label">Final answer</span>
        {question.type === 'num' ? (
          <div className="mqw-answer-row">
            <div className="mqw-answer-box">
              {question.prefix && <span className="mqw-pre">{question.prefix}</span>}
              <input
                type="text"
                inputMode="decimal"
                placeholder="?"
                value={inputValue}
                disabled={answered}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    checkNumeric()
                  }
                }}
              />
              {question.unit && <span className="mqw-unit">{question.unit}</span>}
            </div>
            <button type="button" className="mqw-check" onClick={checkNumeric} disabled={answered}>
              Check answer
            </button>
          </div>
        ) : (
          <div className="mqw-mc-grid">
            {question.opts.map((opt, i) => {
              const isCorrect = i === question.ans
              const isChosenWrong = answered && !saved.ok && i === saved.v
              return (
                <button
                  key={i}
                  type="button"
                  className={[
                    'mqw-mc-opt',
                    answered && isCorrect && 'correct',
                    isChosenWrong && 'chosen-wrong',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  disabled={answered}
                  onClick={() => pickOption(i)}
                >
                  <b>{'ABCD'[i]}</b>
                  <span dangerouslySetInnerHTML={{ __html: opt }} />
                </button>
              )
            })}
          </div>
        )}
        {!answered && verdict === 'enter-a-number' && (
          <span className="mqw-verdict no">Enter a number</span>
        )}
      </div>

      {answered && (
        <div className="mqw-feedback">
          <div className={`mqw-feedback-banner ${saved.ok ? 'ok' : 'no'}`}>
            {saved.ok ? (
              '✓ Correct'
            ) : (
              <>
                ✗ Not yet — the answer is{' '}
                <b>
                  {question.type === 'num' ? question.prefix : ''}
                  {formatAnswer(question)}
                  {question.type === 'num' && question.unit ? ` ${question.unit}` : ''}
                </b>
              </>
            )}
          </div>
          <details className="mqw-solution">
            <summary>Worked solution</summary>
            <ol>
              {entry.solutionSteps.map((step, i) => (
                <li key={i}>
                  <span className="mqw-step-label">{step.label}</span>
                  <span dangerouslySetInnerHTML={{ __html: renderLatex(step.latex, true) }} />
                </li>
              ))}
            </ol>
          </details>
        </div>
      )}
    </div>
  )
}
