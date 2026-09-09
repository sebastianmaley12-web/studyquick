import { useEffect, useState } from 'react'
import type { HistoryTriviaCard } from '../../lib/content/modernHistory'
import { progressStore, useProgress } from '../../lib/progressStore'
import { triviaKey, sessionKey } from '../../lib/keys'
import { ensureSessionStarted, useTestSession } from '../../lib/testSession'
import { SequentialSession } from '../session/SequentialSession'
import { SessionResults } from '../session/SessionResults'
import { TriviaCard } from './TriviaCard'

/**
 * A trivia topic's sequential test mode — one flashcard at a time: tap to
 * reveal, rate Got it / Still shaky, then Next. Additive alongside
 * TriviaGrid's existing grid/browse view. Confidence ratings are a personal,
 * ongoing learning signal (not a pass/fail attempt) so — unlike quiz/maths —
 * "new attempt" only reshuffles order and never clears them.
 */
export function TriviaTest({
  subject,
  topicId,
  cards,
  onExit,
}: {
  subject: string
  topicId: string
  cards: HistoryTriviaCard[]
  onExit: () => void
}) {
  const key = sessionKey(subject, topicId, 'trivia')
  const poolSize = cards.length

  useEffect(() => {
    ensureSessionStarted(key, poolSize)
  }, [key, poolSize])

  const session = useTestSession(key, poolSize)
  const progress = useProgress()
  const [reviewMode, setReviewMode] = useState(false)
  // Manual reveal toggles, keyed by original item index — cards already
  // rated start revealed (same as TriviaGrid), everything else derives from
  // this override rather than a synced effect.
  const [revealedOverride, setRevealedOverride] = useState<Record<number, boolean>>({})

  function keyFor(originalIndex: number) {
    return triviaKey(topicId, originalIndex)
  }
  function isAnswered(originalIndex: number) {
    return progress.trivia[keyFor(originalIndex)] !== undefined
  }
  function isCorrect(originalIndex: number) {
    return progress.trivia[keyFor(originalIndex)] === 'known'
  }
  function isRevealed(originalIndex: number) {
    return revealedOverride[originalIndex] ?? isAnswered(originalIndex)
  }

  if (session.isComplete && !reviewMode) {
    const orderedIndices = session.order
    const knownCount = orderedIndices.filter((i) => isAnswered(i) && isCorrect(i)).length
    const shakyIndices = orderedIndices.filter((i) => isAnswered(i) && !isCorrect(i))

    return (
      <SessionResults
        sectionLabel="Trivia"
        correct={knownCount}
        total={orderedIndices.length}
        hasIncorrect={shakyIndices.length > 0}
        onRetryIncorrect={() => progressStore.startNewAttempt(key, () => shakyIndices)}
        onReview={() => setReviewMode(true)}
        onNewAttempt={() => session.startNewAttempt()}
        onBackToTopic={onExit}
      />
    )
  }

  return (
    <SequentialSession
      session={session}
      sectionLabel="Trivia"
      isAnswered={isAnswered}
      isCorrect={isCorrect}
      onExit={() => (reviewMode ? setReviewMode(false) : onExit())}
      renderItem={(originalIndex) => (
        <TriviaCard
          key={originalIndex}
          tid={keyFor(originalIndex)}
          card={cards[originalIndex]}
          revealed={isRevealed(originalIndex)}
          onToggle={() =>
            setRevealedOverride((prev) => ({ ...prev, [originalIndex]: !isRevealed(originalIndex) }))
          }
        />
      )}
    />
  )
}
