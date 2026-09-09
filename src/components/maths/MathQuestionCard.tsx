import { useEffect, useMemo, useState } from 'react'
import type { MathsTopic } from '../../lib/content/maths'
import type { MathBlockEntry } from '../../lib/content/mathBlocks'
import { progressStore, useMathsAnswer } from '../../lib/progressStore'
import { mathsKey } from '../../lib/keys'
import { shuffledIndices } from '../../lib/shuffle'
import { MATHS_VARIATION_ENTRIES } from '../../lib/content/mathsVariation'
import { createSeededRandom } from '../../lib/seededRandom'
import { MathBlockRenderer } from './MathBlockRenderer'
import { MathEquation } from './MathEquation'

type Question = MathsTopic['questions'][number]

/* Same lazy-load pattern as MathsQuestion.tsx: the HTML-entity typeset pass
 * pulls in KaTeX, so it's loaded on demand rather than statically imported. */
let typesetPromise: Promise<(html: string) => string> | null = null
function loadTypeset() {
  if (!typesetPromise) {
    typesetPromise = Promise.all([
      import('../../lib/mathsTypeset'),
      import('katex/dist/katex.min.css'),
    ]).then(([mod]) => mod.typesetMathsHtml)
  }
  return typesetPromise
}
function useMathsTypeset() {
  const [fn, setFn] = useState<((html: string) => string) | null>(null)
  useEffect(() => {
    let alive = true
    loadTypeset().then((typeset) => {
      if (alive) setFn(() => typeset)
    })
    return () => {
      alive = false
    }
  }, [])
  return fn
}

/* Takes the answer value directly (rather than reading q.ans) so it works
 * equally for a static answer or a variation-generated one. */
function formatAnswer(q: Question, value: number): string {
  if (q.type !== 'num') return ''
  if (q.prefix === '$') {
    return value.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }
  const rounded = Math.round(value * 1e6) / 1e6
  if (Math.abs(rounded) >= 10000) return rounded.toLocaleString('en-AU')
  return String(rounded)
}
function parseAnswer(text: string): number {
  return parseFloat(text.replace(/[$,\s%]/g, ''))
}

/**
 * The Maths question card: header (question number, marks) -> content
 * blocks (paragraph/equation/diagram/graph/table, in author order) ->
 * working area -> answer input -> feedback -> worked solution blocks. Reads
 * and writes progress the same way the retired MathsQuestion.tsx/
 * MathsQuestionWorkspace.tsx always did (progressStore.maths, keyed by
 * mathsKey(slug, question.id)) — grading and saved-progress behaviour are
 * unchanged, only the presentation is new. Used standalone (rendered once
 * per topic in the old show-everything layout) or, since the sequential
 * migration, as the single "current item" inside MathsTest.tsx's
 * SequentialSession.
 */
export function MathQuestionCard({
  slug,
  index,
  question,
  entry,
}: {
  slug: string
  index: number
  question: Question
  entry: MathBlockEntry
}) {
  const key = mathsKey(slug, question.id)
  const saved = useMathsAnswer(key)
  const answered = saved !== undefined
  const [inputValue, setInputValue] = useState(() => (saved ? String(saved.v) : ''))
  const [verdict, setVerdict] = useState<'idle' | 'enter-a-number'>('idle')
  const [stepsOpen, setStepsOpen] = useState(false)
  const [scratch, setScratch] = useState('')
  const typeset = useMathsTypeset()

  /* Numeric-variation layer, ported unchanged from MathsQuestion.tsx: only
   * the ~2 questions listed in mathsVariation.ts get fresh numbers, seeded
   * from `key` so the same student/device always sees the same regenerated
   * version — a reload never shows different numbers than whatever was
   * already checked against a stored answer. When active, it fully
   * replaces the authored blocks/solution (both current variation
   * questions are plain formula text with no diagram, so this is safe) —
   * a diagram or table couldn't relabel itself from generated numbers. */
  const variation = useMemo(() => {
    if (question.type !== 'num') return null
    const variationEntry = MATHS_VARIATION_ENTRIES[question.id]
    return variationEntry ? variationEntry.generate(createSeededRandom(key)) : null
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])
  const effectiveBlocks = variation
    ? [{ kind: 'paragraph' as const, html: variation.questionHtml }]
    : entry.blocks
  const effectiveSolutionBlocks = variation
    ? [{ kind: 'paragraph' as const, html: variation.solutionHtml }]
    : entry.solutionBlocks
  const effectiveAnswer = variation ? variation.answer : question.type === 'num' ? question.ans : 0
  const effectiveTolerance = variation
    ? variation.tolerance
    : question.type === 'num'
      ? question.tol
      : 0

  const optionOrder = useMemo(
    () => shuffledIndices(question.type === 'mc' ? question.opts.length : 0),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [question.id],
  )

  function checkNumeric() {
    if (inputValue.trim() === '') return
    const val = parseAnswer(inputValue)
    if (isNaN(val)) {
      setVerdict('enter-a-number')
      return
    }
    setVerdict('idle')
    const ok = question.type === 'num' && Math.abs(val - effectiveAnswer) <= effectiveTolerance
    progressStore.setMathsAnswer(key, val, ok)
  }

  function pickOption(optIndex: number) {
    if (answered) return
    const ok = question.type === 'mc' && optIndex === question.ans
    progressStore.setMathsAnswer(key, optIndex, ok)
  }

  return (
    <div
      className={['mx-card', answered && (saved.ok ? 'right' : 'wrong'), answered && 'answered']
        .filter(Boolean)
        .join(' ')}
    >
      <div className="mx-card-header">
        <span className="mx-card-n">Question {index + 1}</span>
        <span className="mx-card-marks">
          {question.marks} {question.marks === 1 ? 'mark' : 'marks'}
        </span>
      </div>

      <div className="mx-card-body">
        {effectiveBlocks.map((block, i) => (
          <MathBlockRenderer key={i} block={block} typeset={typeset} />
        ))}
      </div>

      <div className="mx-working">
        <div className="mx-working-head">
          <span>Your working</span>
          {entry.steps && entry.steps.length > 0 && (
            <button type="button" className="mx-steps-toggle" onClick={() => setStepsOpen((o) => !o)}>
              {stepsOpen ? 'Hide steps' : 'Show steps'}
            </button>
          )}
        </div>
        {stepsOpen && entry.steps && (
          <ol className="mx-steps">
            {entry.steps.map((step, i) => (
              <li key={i}>
                <span className="mx-step-label">{step.label}</span>
                <MathEquation latex={step.latex} display={false} />
              </li>
            ))}
          </ol>
        )}
        <textarea
          className="mx-scratch"
          placeholder="Use this space to show your working — optional, not saved or graded"
          value={scratch}
          onChange={(e) => setScratch(e.target.value)}
          rows={4}
        />
      </div>

      <div className="mx-answer">
        <span className="mx-answer-label">Final answer</span>
        {question.type === 'num' ? (
          <div className="mx-answer-row">
            <div className="mx-answer-box">
              {question.prefix && <span className="mx-pre">{question.prefix}</span>}
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
              {question.unit && <span className="mx-unit">{question.unit}</span>}
            </div>
            <button type="button" className="mx-check" onClick={checkNumeric} disabled={answered}>
              Check answer
            </button>
          </div>
        ) : (
          <div className="mx-mc-grid">
            {optionOrder.map((originalIndex, displayIndex) => {
              const opt = question.opts[originalIndex]
              const isCorrect = originalIndex === question.ans
              const isChosenWrong = answered && !saved.ok && originalIndex === saved.v
              return (
                <button
                  key={originalIndex}
                  type="button"
                  className={[
                    'mx-mc-opt',
                    answered && isCorrect && 'correct',
                    isChosenWrong && 'chosen-wrong',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  disabled={answered}
                  onClick={() => pickOption(originalIndex)}
                >
                  <b>{'ABCD'[displayIndex]}</b>
                  <span dangerouslySetInnerHTML={{ __html: typeset ? typeset(opt) : opt }} />
                </button>
              )
            })}
          </div>
        )}
        {!answered && verdict === 'enter-a-number' && <span className="mx-verdict no">Enter a number</span>}
      </div>

      {answered && (
        <div className="mx-feedback">
          <div className={`mx-feedback-banner ${saved.ok ? 'ok' : 'no'}`}>
            {saved.ok ? (
              '✓ Correct'
            ) : (
              <>
                ✗ Not yet — the answer is{' '}
                <b>
                  {question.type === 'num' ? question.prefix : ''}
                  {formatAnswer(question, effectiveAnswer)}
                  {question.type === 'num' && question.unit ? ` ${question.unit}` : ''}
                </b>
              </>
            )}
          </div>
          <details className="mx-solution">
            <summary>Worked solution</summary>
            <div className="mx-solution-body">
              {effectiveSolutionBlocks.map((block, i) => (
                <MathBlockRenderer key={i} block={block} typeset={typeset} />
              ))}
            </div>
          </details>
        </div>
      )}
    </div>
  )
}
