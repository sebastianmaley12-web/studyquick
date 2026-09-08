import { useSyncExternalStore } from 'react'
import { nextReview, type ReviewState } from './spacedRepetition'

/**
 * Byte-compatible with the original app's localStorage schema, including the
 * per-item key scheme (topic/panel id + '#' + a DOM-order index) — anyone with
 * saved progress from the original file keeps it. Field names inside each
 * entry (`v`, `ok`, `pick`) match the original exactly, not just the shape.
 *
 * This is a vanilla external store (subscribe/getSnapshot), not React Context:
 * progress is persisted, global data that any component should be able to
 * read without being wrapped in a provider — unlike RailUiContext, which is
 * genuinely ephemeral, tree-scoped UI state.
 */

const KEY = 'studyquick.progress.v1'
const SAVE_DEBOUNCE_MS = 180

export type QuizAnswer = { pick: string; ok: boolean }
export type TriviaConfidence = 'known' | 'shaky'
export type MathsAnswer = { v: string | number; ok: boolean }

export interface ProgressState {
  v: 1
  quiz: Record<string, QuizAnswer>
  trivia: Record<string, TriviaConfidence>
  notes: Record<string, string>
  maths: Record<string, MathsAnswer>
  review: Record<string, ReviewState>
}

function emptyState(): ProgressState {
  return { v: 1, quiz: {}, trivia: {}, notes: {}, maths: {}, review: {} }
}

let canSave = true

function loadInitial(): ProgressState {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (parsed && parsed.v === 1) {
        return { ...emptyState(), ...parsed }
      }
    }
  } catch {
    canSave = false
  }
  return emptyState()
}

let state: ProgressState = loadInitial()
const listeners = new Set<() => void>()

let saveTimer: ReturnType<typeof setTimeout> | undefined
function scheduleSave() {
  if (!canSave) return
  clearTimeout(saveTimer)
  saveTimer = setTimeout(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state))
    } catch {
      canSave = false
      emit()
    }
  }, SAVE_DEBOUNCE_MS)
}

function emit() {
  listeners.forEach((l) => l())
}

/**
 * localStorage is still the only writer in this function — sync to Supabase
 * is a separate listener, not a branch in here. See progressSync.ts: it
 * subscribes to this store the same way any component would, and pushes
 * `state` to `progress.data` on every commit for a signed-in user, merging
 * remote with local once at sign-in via `progressStore.hydrate()`.
 */
function commit(next: ProgressState) {
  state = next
  emit()
  scheduleSave()
}

export const progressStore = {
  subscribe(cb: () => void) {
    listeners.add(cb)
    return () => listeners.delete(cb)
  },
  getSnapshot() {
    return state
  },
  isStorageAvailable() {
    return canSave
  },

  setQuizAnswer(qid: string, pick: string, ok: boolean) {
    const review = { ...state.review, [qid]: nextReview(state.review[qid], ok) }
    commit({ ...state, quiz: { ...state.quiz, [qid]: { pick, ok } }, review })
  },
  retryIncorrectQuiz(qids: string[]) {
    const quiz = { ...state.quiz }
    const review = { ...state.review }
    for (const qid of qids) {
      if (quiz[qid] && !quiz[qid].ok) {
        delete quiz[qid]
        delete review[qid]
      }
    }
    commit({ ...state, quiz, review })
  },
  resetQuizTopic(qids: string[]) {
    const quiz = { ...state.quiz }
    const review = { ...state.review }
    for (const qid of qids) {
      delete quiz[qid]
      delete review[qid]
    }
    commit({ ...state, quiz, review })
  },

  toggleTriviaConfidence(tid: string, value: TriviaConfidence) {
    const trivia = { ...state.trivia }
    if (trivia[tid] === value) delete trivia[tid]
    else trivia[tid] = value
    commit({ ...state, trivia })
  },

  setNote(key: string, text: string) {
    const notes = { ...state.notes }
    if (text.trim()) notes[key] = text
    else delete notes[key]
    commit({ ...state, notes })
  },
  clearNotesForTopic(prefix: string) {
    const notes = { ...state.notes }
    for (const k of Object.keys(notes)) {
      if (k.startsWith(prefix + '#')) delete notes[k]
    }
    commit({ ...state, notes })
  },

  setMathsAnswer(key: string, v: string | number, ok: boolean) {
    const review = { ...state.review, [key]: nextReview(state.review[key], ok) }
    commit({ ...state, maths: { ...state.maths, [key]: { v, ok } }, review })
  },
  retryIncorrectMaths(keys: string[]) {
    const maths = { ...state.maths }
    const review = { ...state.review }
    for (const k of keys) {
      if (maths[k] && !maths[k].ok) {
        delete maths[k]
        delete review[k]
      }
    }
    commit({ ...state, maths, review })
  },
  resetMathsTopic(keys: string[]) {
    const maths = { ...state.maths }
    const review = { ...state.review }
    for (const k of keys) {
      delete maths[k]
      delete review[k]
    }
    commit({ ...state, maths, review })
  },

  resetAll() {
    try {
      localStorage.removeItem(KEY)
    } catch {
      // ignore — canSave already reflects whether storage works at all
    }
    commit(emptyState())
  },

  /** Replaces the whole state at once — used by progressSync.ts to apply a
   * merged local+remote snapshot after sign-in. Goes through the same
   * commit path as everything else, so it still saves locally and notifies
   * subscribers (including the sync push listener). */
  hydrate(next: ProgressState) {
    commit(next)
  },
}

/** Subscribes to the whole store. Prefer the narrower selector hooks below
 * where possible — they skip re-renders for slices that didn't change. */
export function useProgress() {
  return useSyncExternalStore(progressStore.subscribe, progressStore.getSnapshot)
}

export function useQuizAnswer(qid: string): QuizAnswer | undefined {
  return useSyncExternalStore(progressStore.subscribe, () => progressStore.getSnapshot().quiz[qid])
}

export function useTriviaConfidence(tid: string): TriviaConfidence | undefined {
  return useSyncExternalStore(
    progressStore.subscribe,
    () => progressStore.getSnapshot().trivia[tid],
  )
}

export function useNote(key: string): string {
  return useSyncExternalStore(
    progressStore.subscribe,
    () => progressStore.getSnapshot().notes[key] ?? '',
  )
}

export function useMathsAnswer(key: string): MathsAnswer | undefined {
  return useSyncExternalStore(progressStore.subscribe, () => progressStore.getSnapshot().maths[key])
}

export function useStorageAvailable(): boolean {
  return useSyncExternalStore(progressStore.subscribe, () => progressStore.isStorageAvailable())
}
