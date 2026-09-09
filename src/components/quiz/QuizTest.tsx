import { useEffect, useState } from 'react'
import type { HistoryQuizQuestion } from '../../lib/content/modernHistory'
import { progressStore, useProgress } from '../../lib/progressStore'
import { quizKey, sessionKey } from '../../lib/keys'
import { ensureSessionStarted, useTestSession } from '../../lib/testSession'
import { SequentialSession } from '../session/SequentialSession'
import { SessionResults } from '../session/SessionResults'
import { QuizQuestion } from './QuizQuestion'

/**
 * A quiz topic's sequential test mode — one multiple-choice question at a
 * time, randomised order per attempt, stable during an attempt, resumable
 * after a refresh. Additive alongside QuizPanel's existing "all questions"
 * browse view (which search depends on) rather than replacing it — see
 * lib/testSession.ts for the shared engine this and MathsTest both use.
 */
export function QuizTest({
  subject,
  topicId,
  questions,
  onExit,
}: {
  subject: string
  topicId: string
  questions: HistoryQuizQuestion[]
  onExit: () => void
}) {
  const key = sessionKey(subject, topicId, 'quiz')
  const poolSize = questions.length

  useEffect(() => {
    ensureSessionStarted(key, poolSize)
  }, [key, poolSize])

  const session = useTestSession(key, poolSize)
  const progress = useProgress()
  const [reviewMode, setReviewMode] = useState(false)

  function keyFor(originalIndex: number) {
    return quizKey(topicId, originalIndex)
  }
  function isAnswered(originalIndex: number) {
    return progress.quiz[keyFor(originalIndex)] !== undefined
  }
  function isCorrect(originalIndex: number) {
    return progress.quiz[keyFor(originalIndex)]?.ok === true
  }

  if (session.isComplete && !reviewMode) {
    const orderedIndices = session.order
    const correctCount = orderedIndices.filter((i) => isAnswered(i) && isCorrect(i)).length
    const incorrectIndices = orderedIndices.filter((i) => isAnswered(i) && !isCorrect(i))

    return (
      <SessionResults
        sectionLabel="Quiz"
        correct={correctCount}
        total={orderedIndices.length}
        hasIncorrect={incorrectIndices.length > 0}
        onRetryIncorrect={() => {
          progressStore.retryIncorrectQuiz(incorrectIndices.map(keyFor))
          progressStore.startNewAttempt(key, () => incorrectIndices)
        }}
        onReview={() => setReviewMode(true)}
        onNewAttempt={() => {
          progressStore.resetQuizTopic(questions.map((_, i) => quizKey(topicId, i)))
          session.startNewAttempt()
        }}
        onBackToTopic={onExit}
      />
    )
  }

  return (
    <SequentialSession
      session={session}
      sectionLabel="Quiz"
      isAnswered={isAnswered}
      isCorrect={isCorrect}
      onExit={() => (reviewMode ? setReviewMode(false) : onExit())}
      renderItem={(originalIndex) => (
        <QuizQuestion
          key={originalIndex}
          topicId={topicId}
          index={originalIndex}
          question={questions[originalIndex]}
        />
      )}
    />
  )
}
