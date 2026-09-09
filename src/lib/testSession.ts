import { progressStore, useTestSessionState } from './progressStore'
import { shuffledIndices } from './shuffle'

export interface TestSession {
  /** Shuffled original-item indices — stable for the life of this attempt. */
  order: number[]
  /** Position within `order` (not the original item index itself). */
  position: number
  /** The original item index currently being shown — what callers use to
   * look up content and to build quiz/trivia/maths progress-store keys. */
  currentOriginalIndex: number
  total: number
  isFirst: boolean
  isLast: boolean
  isComplete: boolean
  /** Call after the current item is answered — moves to the next one, or
   * marks the session complete if it was the last. */
  advance: () => void
  /** Jumps directly to a position without changing `order` — used for
   * "review my answers" and "retry incorrect" (jump straight to a specific
   * missed item) rather than paging through one at a time. */
  goTo: (position: number) => void
  /** Reshuffles and restarts from position 0 — the only thing that changes
   * `order`; an active attempt's order never changes on its own. */
  startNewAttempt: () => void
}

/**
 * The one reusable engine behind every sequential experience (Maths tests,
 * quiz "test mode", trivia sessions) — see progressStore.ts's
 * TestSessionState for what's persisted and why it's safe alongside the
 * existing quiz/trivia/maths schema. `poolSize` is the topic's full question/
 * card count; `key` should come from lib/keys.ts's sessionKey().
 *
 * Deliberately does NOT touch per-item answer state (quiz[]/trivia[]/
 * maths[]) — that stays exactly how each subject already stores it. This
 * only tracks *which item, in what order, how far through*.
 */
export function useTestSession(key: string, poolSize: number): TestSession {
  const saved = useTestSessionState(key)
  const newOrder = () => shuffledIndices(poolSize)

  // First render before any write: reflect what getOrStartSession WOULD
  // return, without writing yet (writing belongs in an effect/event, not
  // render) — a natural, unshuffled order is a safe placeholder for that one
  // frame, since the real hook consumer should call ensureStarted() (below)
  // on mount to actually persist the real shuffled order.
  const session = saved ?? { order: Array.from({ length: poolSize }, (_, i) => i), position: 0 }
  const position = Math.min(session.position, Math.max(poolSize - 1, 0))

  return {
    order: session.order,
    position,
    currentOriginalIndex: session.order[position],
    total: poolSize,
    isFirst: position === 0,
    isLast: position === poolSize - 1,
    isComplete: session.completedAt !== undefined,
    advance: () => progressStore.advanceSession(key),
    goTo: (p: number) => progressStore.goToSessionPosition(key, p),
    startNewAttempt: () => progressStore.startNewAttempt(key, newOrder),
  }
}

/** Call once on mount (e.g. in a useEffect) to make sure a session actually
 * exists in the store — separate from the hook above so reading session
 * state during render never itself triggers a write. */
export function ensureSessionStarted(key: string, poolSize: number) {
  progressStore.getOrStartSession(key, () => shuffledIndices(poolSize))
}
