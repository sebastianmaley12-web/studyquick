import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { MathsTopic } from '../../lib/content/maths'
import { getMathBlockEntry } from '../../content/mathTopicBlocks'
import type { MathBlockEntry } from '../../lib/content/mathBlocks'
import { progressStore, useProgress } from '../../lib/progressStore'
import { mathsKey, sessionKey } from '../../lib/keys'
import { ensureSessionStarted, useTestSession } from '../../lib/testSession'
import { SequentialSession } from '../session/SequentialSession'
import { SessionResults } from '../session/SessionResults'
import { MathQuestionCard } from './MathQuestionCard'

/** Every question gets tested through the new presentation, even before a
 * topic's full block-entry migration lands — a question with no authored
 * entry yet falls back to its plain existing text/solution (still properly
 * KaTeX-typeset by MathQuestionCard's own typeset pass), so the sequential
 * experience never blocks on 100% diagram coverage. */
function fallbackEntry(q: MathsTopic['questions'][number]): MathBlockEntry {
  return {
    blocks: [{ kind: 'paragraph', html: q.q }],
    solutionBlocks: [{ kind: 'paragraph', html: q.sol }],
  }
}

/**
 * The Maths topic's sequential test — one question at a time, arranged by
 * topic (the caller, MathsTopic.tsx, is already per-topic), randomised order
 * per attempt, stable during an attempt, resumable after a refresh. Wraps
 * the existing MathQuestionCard (grading/progress-saving untouched) in the
 * shared SequentialSession/SessionResults shell also used by other subjects'
 * quiz/trivia test modes.
 */
export function MathsTest({ topic }: { topic: MathsTopic }) {
  const navigate = useNavigate()
  const key = sessionKey('maths', topic.slug, 'test')
  const poolSize = topic.questions.length

  useEffect(() => {
    ensureSessionStarted(key, poolSize)
  }, [key, poolSize])

  const session = useTestSession(key, poolSize)
  const progress = useProgress()
  const [reviewMode, setReviewMode] = useState(false)

  function keyFor(originalIndex: number) {
    return mathsKey(topic.slug, topic.questions[originalIndex].id)
  }
  function isAnswered(originalIndex: number) {
    return progress.maths[keyFor(originalIndex)] !== undefined
  }
  function isCorrect(originalIndex: number) {
    return progress.maths[keyFor(originalIndex)]?.ok === true
  }

  if (session.isComplete && !reviewMode) {
    const orderedIndices = session.order
    const correctCount = orderedIndices.filter((i) => isAnswered(i) && isCorrect(i)).length
    const incorrectIndices = orderedIndices.filter((i) => isAnswered(i) && !isCorrect(i))

    return (
      <SessionResults
        sectionLabel={topic.name}
        correct={correctCount}
        total={orderedIndices.length}
        hasIncorrect={incorrectIndices.length > 0}
        onRetryIncorrect={() => {
          progressStore.retryIncorrectMaths(incorrectIndices.map(keyFor))
          progressStore.startNewAttempt(key, () => incorrectIndices)
        }}
        onReview={() => setReviewMode(true)}
        onNewAttempt={() => {
          progressStore.resetMathsTopic(topic.questions.map((q) => mathsKey(topic.slug, q.id)))
          session.startNewAttempt()
        }}
        onBackToTopic={() => navigate('/subjects/maths')}
      />
    )
  }

  return (
    <SequentialSession
      session={session}
      sectionLabel={topic.name}
      isAnswered={isAnswered}
      isCorrect={isCorrect}
      onExit={() => (reviewMode ? setReviewMode(false) : navigate('/subjects/maths'))}
      renderItem={(originalIndex, position) => {
        const question = topic.questions[originalIndex]
        const entry = getMathBlockEntry(topic.slug, question.id) ?? fallbackEntry(question)
        return (
          <MathQuestionCard
            key={question.id}
            slug={topic.slug}
            index={position}
            question={question}
            entry={entry}
          />
        )
      }}
    />
  )
}
