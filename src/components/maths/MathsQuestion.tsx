import { useState } from 'react'
import type { MathsTopic } from '../../lib/content/maths'
import { progressStore, useMathsAnswer } from '../../lib/progressStore'
import { mathsKey } from '../../lib/keys'

type Question = MathsTopic['questions'][number]

/** Money rounds to 2dp; large numbers get thousands separators — matching the
 * original's `fmt()` exactly, used to show "the answer is X" on a miss. */
function formatAnswer(q: Question): string {
  if (q.type !== 'num') return ''
  if (q.prefix === '$') {
    return q.ans.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }
  const rounded = Math.round(q.ans * 1e6) / 1e6
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
      <div className="mq-q" dangerouslySetInnerHTML={{ __html: question.q }} />

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
                    {formatAnswer(question)}
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
          {question.opts.map((opt, i) => {
            const isCorrect = i === question.ans
            const isChosenWrong = answered && !saved.ok && i === saved.v
            return (
              <button
                key={i}
                type="button"
                className={[
                  'mq-opt',
                  answered && isCorrect && 'correct',
                  isChosenWrong && 'chosen-wrong',
                ]
                  .filter(Boolean)
                  .join(' ')}
                disabled={answered}
                onClick={() => pickOption(i)}
              >
                <b>{'ABCD'[i]}.</b> <span dangerouslySetInnerHTML={{ __html: opt }} />
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
        <div className="body" dangerouslySetInnerHTML={{ __html: question.sol }} />
      </details>
    </div>
  )
}
