import type { ReactNode } from 'react'
import type { TestSession } from '../../lib/testSession'

/**
 * The shared shell behind every one-at-a-time experience (Maths tests, quiz
 * "test mode", trivia sessions) — shows exactly one item, a progress bar,
 * and a "Next" affordance once that item is answered. Deliberately knows
 * nothing about how an item is graded or rendered: `renderItem` supplies
 * that (MathQuestionCard, a quiz question, a trivia card...), and
 * `isAnswered`/`isCorrect` are small lookups into whichever progress-store
 * slice that item type already uses (progress.quiz/maths/trivia). This is
 * what makes the one engine reusable across subjects instead of a bespoke
 * sequential system per subject.
 */
export function SequentialSession({
  session,
  sectionLabel,
  isAnswered,
  isCorrect,
  renderItem,
  onExit,
}: {
  session: TestSession
  sectionLabel: string
  isAnswered: (originalIndex: number) => boolean
  isCorrect: (originalIndex: number) => boolean
  renderItem: (originalIndex: number, position: number) => ReactNode
  onExit: () => void
}) {
  const answeredCount = session.order.filter((i) => isAnswered(i)).length
  const correctCount = session.order.filter((i) => isAnswered(i) && isCorrect(i)).length
  const currentAnswered = isAnswered(session.currentOriginalIndex)

  return (
    <div className="seq-shell">
      <div className="seq-header">
        <div>
          <div className="seq-section-label">{sectionLabel}</div>
          <div className="seq-meta">
            Question {session.position + 1} of {session.total}
            {answeredCount > 0 && (
              <span className="seq-score">
                &middot; {correctCount} / {answeredCount} correct so far
              </span>
            )}
          </div>
        </div>
        <button className="seq-exit" type="button" onClick={onExit}>
          Exit
        </button>
      </div>

      <div className="seq-progress-track">
        {session.order.map((originalIndex, i) => (
          <span
            key={originalIndex}
            className={[
              'seq-progress-seg',
              i === session.position && 'current',
              isAnswered(originalIndex) && (isCorrect(originalIndex) ? 'right' : 'wrong'),
            ]
              .filter(Boolean)
              .join(' ')}
          />
        ))}
      </div>

      <div className="seq-item">{renderItem(session.currentOriginalIndex, session.position)}</div>

      <div className="seq-nav">
        <button
          className="seq-back"
          type="button"
          disabled={session.isFirst}
          onClick={() => session.goTo(session.position - 1)}
        >
          &larr; Back
        </button>
        <button className="cta" type="button" disabled={!currentAnswered} onClick={session.advance}>
          {session.isLast ? 'Finish' : 'Next question'} <span className="arw">&rarr;</span>
        </button>
      </div>
    </div>
  )
}
