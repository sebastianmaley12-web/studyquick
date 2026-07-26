import type { ProgressState } from './progressStore'
import { quizKey, triviaKey, practiceNoteKey, mathsKey } from './keys'
import type { MathsTopic } from './content/maths'

/**
 * Mirrors the original's historyStats()/mathsStats()/setBar() — same score
 * definitions (quiz right-count + trivia known-count + practice done-count)
 * and the same done/total-based percentage rounding — so the progress UI
 * (rail badges, topic cards, subject cards) reads identically to the
 * original even though it's recomputed from progressStore here instead of
 * counted off the live DOM.
 */

export interface HistoryTopicCounts {
  id: string
  quizCount: number
  triviaCount: number
  practiceCount: number
}

export interface HistoryTopicStats {
  qTotal: number
  qRight: number
  tTotal: number
  tKnown: number
  pTotal: number
  pDone: number
  score: number
  max: number
}

export function historyTopicStats(
  progress: ProgressState,
  topic: HistoryTopicCounts,
): HistoryTopicStats {
  let qRight = 0
  for (let i = 0; i < topic.quizCount; i++) {
    if (progress.quiz[quizKey(topic.id, i)]?.ok) qRight++
  }
  let tKnown = 0
  for (let i = 0; i < topic.triviaCount; i++) {
    if (progress.trivia[triviaKey(topic.id, i)] === 'known') tKnown++
  }
  let pDone = 0
  for (let i = 0; i < topic.practiceCount; i++) {
    if (progress.notes[practiceNoteKey(topic.id, i)]?.trim()) pDone++
  }
  const qTotal = topic.quizCount
  const tTotal = topic.triviaCount
  const pTotal = topic.practiceCount
  return {
    qTotal,
    qRight,
    tTotal,
    tKnown,
    pTotal,
    pDone,
    score: qRight + tKnown + pDone,
    max: qTotal + tTotal + pTotal,
  }
}

export interface MathsTopicStats {
  done: number
  right: number
  total: number
}

export function mathsTopicStats(progress: ProgressState, topic: MathsTopic): MathsTopicStats {
  let done = 0
  let right = 0
  for (const q of topic.questions) {
    const s = progress.maths[mathsKey(topic.slug, q.id)]
    if (s) {
      done++
      if (s.ok) right++
    }
  }
  return { done, right, total: topic.questions.length }
}

export function pct(done: number, total: number): number {
  return total ? Math.round((done / total) * 100) : 0
}

export function barClass(p: number): string | undefined {
  return p >= 100 ? 'good' : p > 0 ? 'mid' : undefined
}
