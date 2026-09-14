import { useEffect, useState } from 'react'
import type { McQuestion } from '../../lib/content/paper1'
import { paper1QuestionKey } from '../../lib/content/paper1'
import { progressStore, useProgress } from '../../lib/progressStore'
import { ensureSessionStarted, useTestSession } from '../../lib/testSession'
import { SequentialSession } from '../session/SequentialSession'
import { SessionResults } from '../session/SessionResults'
import { Paper1QuestionCard } from './Paper1QuestionCard'

/**
 * A Paper 1 practice pool run one question at a time — this is QuizTest's
 * exact pattern (randomised order per attempt, stable during an attempt,
 * resumable, retry-incorrect, review) reapplied to the generated
 * McQuestion pool instead of a subject's static quiz bank, with
 * Paper1QuestionCard as the leaf renderer instead of QuizQuestion. Spec
 * section 17: once a session starts its order never changes; only
 * "new attempt" reshuffles.
 */
export function Paper1QuizSession({
  sessionKey,
  sectionLabel,
  questions,
  onExit,
}: {
  sessionKey: string
  sectionLabel: string
  questions: McQuestion[]
  onExit: () => void
}) {
  const poolSize = questions.length

  useEffect(() => {
    ensureSessionStarted(sessionKey, poolSize)
  }, [sessionKey, poolSize])

  const session = useTestSession(sessionKey, poolSize)
  const progress = useProgress()
  const [reviewMode, setReviewMode] = useState(false)

  function keyFor(originalIndex: number) {
    return paper1QuestionKey(questions[originalIndex].id)
  }
  function isAnswered(originalIndex: number) {
    return progress.quiz[keyFor(originalIndex)] !== undefined
  }
  function isCorrect(originalIndex: number) {
    return progress.quiz[keyFor(originalIndex)]?.ok === true
  }

  if (poolSize === 0) {
    return <div className="emptymsg">No questions available for this practice mode yet.</div>
  }

  if (session.isComplete && !reviewMode) {
    const orderedIndices = session.order
    const correctCount = orderedIndices.filter((i) => isAnswered(i) && isCorrect(i)).length
    const incorrectIndices = orderedIndices.filter((i) => isAnswered(i) && !isCorrect(i))

    return (
      <SessionResults
        sectionLabel={sectionLabel}
        correct={correctCount}
        total={orderedIndices.length}
        hasIncorrect={incorrectIndices.length > 0}
        onRetryIncorrect={() => {
          progressStore.retryIncorrectQuiz(incorrectIndices.map(keyFor))
          progressStore.startNewAttempt(sessionKey, () => incorrectIndices)
        }}
        onReview={() => setReviewMode(true)}
        onNewAttempt={() => {
          progressStore.resetQuizTopic(questions.map((q) => paper1QuestionKey(q.id)))
          session.startNewAttempt()
        }}
        onBackToTopic={onExit}
      />
    )
  }

  return (
    <SequentialSession
      session={session}
      sectionLabel={sectionLabel}
      isAnswered={isAnswered}
      isCorrect={isCorrect}
      onExit={() => (reviewMode ? setReviewMode(false) : onExit())}
      renderItem={(originalIndex) => (
        <Paper1QuestionCard key={originalIndex} question={questions[originalIndex]} />
      )}
    />
  )
}
