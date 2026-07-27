import { useEffect, useMemo, useState } from 'react'
import type { MathsTopic } from '../../lib/content/maths'
import { progressStore, useMathsAnswer } from '../../lib/progressStore'
import { mathsKey } from '../../lib/keys'
import { shuffledIndices } from '../../lib/shuffle'
import { MATHS_VARIATION_ENTRIES } from '../../lib/content/mathsVariation'
import { createSeededRandom } from '../../lib/seededRandom'

type Question = MathsTopic['questions'][number]

/* typesetMathsHtml pulls in KaTeX (a sizeable dependency) via lib/latex, so
 * this is loaded on demand rather than statically imported — otherwise every
 * Maths topic page (including tabs that never render a question, like Key
 * Facts) would pay for it just by importing this file, the same bloat bug
 * fixed once already for the workspace component. Cached at module scope so
 * only the first MathsQuestion on a page triggers the fetch. Falls back to
 * the original HTML (today's rendering) until it resolves. */
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

/** Money rounds to 2dp; large numbers get thousands separators — matching the
 * original's `fmt()` exactly, used to show "the answer is X" on a miss.
 * Takes the value directly (rather than the Question object) so it works
 * equally for a static answer or a variation-generated one. */
function formatAnswer(value: number, prefix: string): string {
  if (prefix === '$') {
    return value.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }
  const rounded = Math.round(value * 1e6) / 1e6
  if (Math.abs(rounded) >= 10000) return rounded.toLocaleString('en-AU')
  return String(rounded)
}

/** Strips $, commas, % and spaces so "$1,420.00" and "26.4%" both parse. */
function parseAnswer(text: string): number {
  return parseFloat(text.replace(/[$,\s%]/g, ''))
}

export function MathsQuestion({
  slug,
  index,
  question,
}: {
  slug: string
  index: number
  question: Question
}) {
  const key = mathsKey(slug, question.id)
  const saved = useMathsAnswer(key)
  const answered = saved !== undefined
  const [solutionOpen, setSolutionOpen] = useState(false)
  const [inputValue, setInputValue] = useState(() => (saved ? String(saved.v) : ''))
  const [verdict, setVerdict] = useState<'idle' | 'enter-a-number'>('idle')

  /* MC options here have no letter of their own (just a plain string array,
   * correctness keyed by index) — unlike QuizQuestion, shuffling display
   * order needs an explicit permutation. Correctness checks and the stored
   * progress value both stay in terms of the *original* index (optionOrder
   * maps display position -> original index), so this is purely a display
   * change: existing saved answers and the localStorage schema are
   * unaffected. Stable for the lifetime of this mount, re-shuffles when the
   * question itself changes. */
  const optionOrder = useMemo(
    () => shuffledIndices(question.type === 'mc' ? question.opts.length : 0),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [question.id],
  )

  /* Numeric-variation layer: only questions listed in mathsVariation.ts get
   * fresh numbers; everything else (the vast majority) is untouched.
   * Seeded from `key` (topic + question id) rather than re-rolled per
   * render or per day, so the same student/device always sees the same
   * regenerated version — a reload never shows different numbers than
   * whatever was actually checked against a previously stored answer,
   * with no new field added to the progress-store schema. */
  const variation = useMemo(() => {
    if (question.type !== 'num') return null
    const entry = MATHS_VARIATION_ENTRIES[question.id]
    return entry ? entry.generate(createSeededRandom(key)) : null
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  const typeset = useMathsTypeset()
  const questionHtml = useMemo(() => {
    const raw = variation ? variation.questionHtml : question.q
    return typeset ? typeset(raw) : raw
  }, [variation, question.q, typeset])
  const solutionHtml = useMemo(() => {
    const raw = variation ? variation.solutionHtml : question.sol
    return typeset ? typeset(raw) : raw
  }, [variation, question.sol, typeset])
  const effectiveAnswer = variation ? variation.answer : question.type === 'num' ? question.ans : 0
  const effectiveTolerance = variation
    ? variation.tolerance
    : question.type === 'num'
      ? question.tol
      : 0

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
    setSolutionOpen(true)
  }

  function pickOption(optIndex: number) {
    if (answered) return
    const ok = question.type === 'mc' && optIndex === question.ans
    progressStore.setMathsAnswer(key, optIndex, ok)
    setSolutionOpen(true)
  }

  return (
    <div
      className={['mq', answered && (saved.ok ? 'right' : 'wrong'), answered && 'answered']
        .filter(Boolean)
        .join(' ')}
    >
      <div className="mq-top">
        <span className="mq-n">Q{index + 1}</span>
        <span className="mq-marks">
          {question.marks} {question.marks === 1 ? 'mark' : 'marks'}
        </span>
      </div>
      <div className="mq-q" dangerouslySetInnerHTML={{ __html: questionHtml }} />

      {question.type === 'num' ? (
        <div className="mq-input">
          <div className="mq-field">
            {question.prefix && <span className="pre">{question.prefix}</span>}
            <input
              type="text"
              inputMode="decimal"
              placeholder="answer"
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
            {question.unit && <span className="suf">{question.unit}</span>}
          </div>
          <button type="button" className="mq-check" onClick={checkNumeric} disabled={answered}>
            Check
          </button>
          {answered && (
            <span className={`mq-verdict ${saved.ok ? 'ok' : 'no'}`}>
              {saved.ok ? (
                '✓ Correct'
              ) : (
                <>
                  ✗ Not yet — answer is{' '}
                  <b>
                    {question.prefix}
                    {formatAnswer(effectiveAnswer, question.prefix)}
                    {question.unit ? ` ${question.unit}` : ''}
                  </b>{' '}
                  <span className="again">edit and check again</span>
                </>
              )}
            </span>
          )}
          {!answered && verdict === 'enter-a-number' && (
            <span className="mq-verdict no">Enter a number</span>
          )}
        </div>
      ) : (
        <div className="mq-opts">
          {optionOrder.map((originalIndex, displayIndex) => {
            const opt = question.opts[originalIndex]
            const isCorrect = originalIndex === question.ans
            const isChosenWrong = answered && !saved.ok && originalIndex === saved.v
            return (
              <button
                key={originalIndex}
                type="button"
                className={[
                  'mq-opt',
                  answered && isCorrect && 'correct',
                  isChosenWrong && 'chosen-wrong',
                ]
                  .filter(Boolean)
                  .join(' ')}
                disabled={answered}
                onClick={() => pickOption(originalIndex)}
              >
                <b>{'ABCD'[displayIndex]}.</b>{' '}
                <span dangerouslySetInnerHTML={{ __html: typeset ? typeset(opt) : opt }} />
              </button>
            )
          })}
        </div>
      )}

      <details
        className="mq-sol"
        open={solutionOpen}
        onToggle={(e) => setSolutionOpen(e.currentTarget.open)}
      >
        <summary>Worked solution</summary>
        <div className="body" dangerouslySetInnerHTML={{ __html: solutionHtml }} />
      </details>
    </div>
  )
}
